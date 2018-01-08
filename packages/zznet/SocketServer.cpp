//
//  SocketServer.cpp
//  TankWorld
//
//  Created by zhangdw on 2018/1/5.
//
//

#include "SocketServer.hpp"
#include <sys/socket.h>
#include <netinet/in.h>
#include <sys/types.h>
#include "netdb.h"

SocketServer g_server;

void clientThread(int clientsock)
{
    while (1) {
        if(g_server.getClient(clientsock).wantClose)
            break;
        std::string raw_buff;
        
        char buff[1024] = {0};
        if(recv(clientsock, buff, sizeof(buff), 0)<=0){
            break;
        }
        raw_buff += buff;
        
        do{
            size_t endpos = raw_buff.find("$");
            if (endpos==-1)
                break;
            const std::string msg = raw_buff.substr(0, endpos);
            raw_buff = raw_buff.substr(endpos+1);
            
            g_server.mtx.lock();
            g_server.ondata(clientsock, msg);
            g_server.mtx.unlock();
        }while(1);
    }
    g_server.rmClient(clientsock);
}

void serverWaitClientThread()
{
    while(1){
        sockaddr_in addr;
        socklen_t len = sizeof(addr);
        int s = g_server.sock();
        const int client = accept(s, (struct sockaddr*)&addr, &len);
        if(client==-1){
            printf("%d=%s\n", errno, strerror(errno));
            continue;
        }
        Client c{client, false};
        g_server.mtx.lock();
        g_server.onconnect(client);
        g_server.clients.push_back(c);
        g_server.mtx.unlock();
        std::thread t(clientThread, client);
        t.detach();
    }
}

std::string sock::localip()
{
    char host[1024] = {0};
    if(gethostname(host,sizeof(host))==-1)
        return "";
    struct addrinfo *answer, hint;
    bzero(&hint, sizeof(hint));
    hint.ai_family = AF_INET;
    hint.ai_socktype = SOCK_STREAM;
    int ret = getaddrinfo(host, NULL, &hint, &answer);
    if (ret != 0) {
        printf("getaddrinfo: %s\n", gai_strerror(ret));
        return "";
    }
    
    for (addrinfo* curr = answer; curr != NULL; curr = curr->ai_next)
    {
        char ipstr[32];
        inet_ntop(AF_INET, &(((sockaddr_in *)(curr->ai_addr))->sin_addr), ipstr, sizeof(ipstr));
        return ipstr;
    }
    return "";
}

std::string sock::peerip(int sock)
{
    sockaddr_in addr;
    socklen_t len = 0;
    int ret = getpeername(sock, (sockaddr*)&addr, &len);
    if (ret == -1){
        return "";
    }
    return inet_ntoa(addr.sin_addr);
}

int sock::port(int sock)
{
    sockaddr_in addr;
    socklen_t len = 0;
    int ret = getsockname(sock, (sockaddr*)&addr, &len);
    if (ret == -1){
        return 0;
    }
    return ntohs(addr.sin_port);
}

void sock::send(int sock, const std::string& msg)
{
    ::send(sock, msg.c_str(), msg.size(), 0);
}

SocketServer::SocketServer()
{
    m_socket = -10;
}

SocketServer::~SocketServer()
{
    ::close(m_socket);
}

void SocketServer::runAt(int port)
{
    m_socket = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
    sockaddr_in addr;
    addr.sin_family = AF_INET;
    addr.sin_port = htons(port);
    addr.sin_addr.s_addr = htonl(INADDR_ANY);
    if(bind(m_socket, (sockaddr*)&addr, sizeof(addr))==-1){
        notifyError(BindFail);
        return;
    }
    if(listen(m_socket, 5)==-1){
        notifyError(ListenFail);
        return;
    }
    std::thread t(serverWaitClientThread);
    t.detach();
}

void SocketServer::close()
{
    mtx.lock();
    ::close(m_socket);
    for (int i=0; i<clients.size(); ++i)
    {
        clients[i].close();
    }
    mtx.unlock();
}

int SocketServer::sock()
{
    return m_socket;
}

Client SocketServer::getClient(int sock)
{
    mtx.lock();
    auto it = std::find_if(clients.begin(), clients.end(), [=](const Client& c){
        return c.sock==sock;
    });
    Client ret = it==clients.end() ? Client{0,true} : *it;
    mtx.unlock();
    return ret;
}

void SocketServer::rmClient(int sock)
{
    mtx.lock();
    clients.erase( std::find_if(clients.begin(), clients.end(), [=](Client& c){
        return c.sock==sock;
    }) );
    mtx.unlock();
}

void SocketServer::notifyError(SocketServerError err)
{
    if(!this->onerror)
        return;
    onerror(err);
}
