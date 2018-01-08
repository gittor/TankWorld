//
//  SocketServer.hpp
//  TankWorld
//
//  Created by zhangdw on 2018/1/5.
//
//

#ifndef SocketServer_hpp
#define SocketServer_hpp

#include "cex.h"
#include "common.h"
#include "unistd.h"
#include "arpa/inet.h"
#include "thread"
#include "mutex"

enum SocketServerError
{
    BindFail,
    ListenFail,
};

struct Client
{
    int sock;
    bool wantClose;
    void close(){
        ::close(sock);
        wantClose = true;
    }
};

namespace sock
{
    std::string localip();
    std::string peerip(int sock);
    int port(int sock);
    void send(int sock, const std::string& msg);
};

class SocketServer
{
public:
    SocketServer();
    ~SocketServer();
    void runAt(int port);
    void close();
    
    int sock();
    Client getClient(int sock);
    void rmClient(int sock);
    
    std::function<void (SocketServerError)> onerror;
    std::function<void (int)> onconnect;
    std::function<void (int,const std::string& )> ondata;
    
    std::vector<Client> clients;
    std::mutex mtx; 
private:
    void notifyError(SocketServerError err);
private:
    int m_socket;
};

extern SocketServer g_server;

#endif /* SocketServer_hpp */
