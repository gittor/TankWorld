#include "jsb_socketserver.hpp"
#include "SocketServer.hpp"
#include "cocos/scripting/js-bindings/jswrapper/SeApi.h"
#include "cocos/scripting/js-bindings/manual/jsb_conversions.hpp"
#include "cocos/scripting/js-bindings/manual/jsb_global.h"

se::Value g_onconnect;
se::Value g_onconnectobj;
se::Value g_onerror;
se::Value g_onerrorobj;
se::Value g_ondata;
se::Value g_ondataobj;

void onConnect(int sock)
{
    se::ValueArray args;
    args.push_back(se::Value(sock));
    g_onconnect.toObject()->call(args, g_onconnectobj.toObject());
}

void onError(SocketServerError err)
{
    se::ValueArray args;
    args.push_back(se::Value(err));
    g_onerror.toObject()->call(args, g_onerrorobj.toObject());
}

void onData(int sock, const std::string& data)
{
    se::ValueArray args;
    args.push_back(se::Value(sock));
    args.push_back(se::Value(data));
    g_ondata.toObject()->call(args, g_ondataobj.toObject());
}

static bool SocketServer_runAt(se::State& s)
{
    const auto& args = s.args();
    int argc = (int)args.size();
    if (argc==1)
    {
        int port = args.at(0).toInt32();
        g_server.onconnect = onConnect;
        g_server.onerror = onError;
        g_server.ondata = onData;
        g_server.runAt(port);
        return true;
    }
    return false;
}
SE_BIND_FUNC(SocketServer_runAt)

static bool SocketServer_close(se::State& s)
{
    g_server.close();
    return true;
}
SE_BIND_FUNC(SocketServer_close)

static bool SocketServer_localip(se::State& s)
{
    s.rval().setString(sock::localip());
    return true;
}
SE_BIND_FUNC(SocketServer_localip)

static bool SocketServer_localport(se::State& s)
{
    s.rval().setInt32(sock::port(g_server.sock()));
    return true;
}
SE_BIND_FUNC(SocketServer_localport)

static bool SocketServer_onconnect(se::State& s)
{
    const auto& args = s.args();
    int argc = (int)args.size();
    if (argc==1)
    {
        g_onconnect = args.at(0);
        g_onconnectobj = se::Value(s.thisObject());
    }
    return true;
}
SE_BIND_FUNC(SocketServer_onconnect)

static bool SocketServer_onerror(se::State& s)
{
    const auto& args = s.args();
    int argc = (int)args.size();
    if (argc==1)
    {
        g_onerror = args.at(0);
        g_onerrorobj = se::Value(s.thisObject());
        return true;
    }
    return false;
}
SE_BIND_FUNC(SocketServer_onerror)

static bool SocketServer_ondata(se::State& s)
{
    const auto& args = s.args();
    int argc = (int)args.size();
    if (argc==1)
    {
        g_ondata = args.at(0);
        g_ondataobj = se::Value(s.thisObject());
        return true;
    }
    return false;
}
SE_BIND_FUNC(SocketServer_ondata)

bool register_all_socketserver(se::Object* obj)
{
    se::Class* cls = se::Class::create("server", obj, nullptr, nullptr);
    cls->install();
    
    JSBClassType::registerClass<SocketServer>(cls);

    se::Value ctorVal;
    obj->getProperty("server", &ctorVal);
    ctorVal.toObject()->defineFunction("runAt", _SE(SocketServer_runAt));
    ctorVal.toObject()->defineFunction("close", _SE(SocketServer_close));
    ctorVal.toObject()->defineFunction("localip", _SE(SocketServer_localip));
    ctorVal.toObject()->defineFunction("localport", _SE(SocketServer_localport));
    ctorVal.toObject()->defineFunction("onconnect", _SE(SocketServer_onconnect));
    ctorVal.toObject()->defineFunction("onerror", _SE(SocketServer_onerror));
    ctorVal.toObject()->defineFunction("ondata", _SE(SocketServer_ondata));

//    __jsb_SocketIO_class = cls;

    se::ScriptEngine::getInstance()->clearException();
    return true;
}
