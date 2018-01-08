/*
 * DynamicCreation
 * by implement the dynamic create

 * some class can 
 * (derive the Rtti or some base class that has derived the Rtti, use the DeclareRTTI, ImplementRTTI to)
 * get this ability(create by class name)
 *
 *
*/

#pragma once

#include <map>
#include <string>

namespace cex
{

    class DynamicCreation
    {
    public:
        virtual ~DynamicCreation(){};

        typedef DynamicCreation* (*createFunc)();


    public:
        static DynamicCreation* create(const std::string& name)
        {
             std::map< std::string, createFunc>::iterator iter = getClassInfo().find(name);
             return iter==getClassInfo().end() ? 0 : iter->second();
        }

        template<class T>
        static T createCast(const std::string& name)
        {
            return dynamic_cast<T>(create(name));
        }

        // getClassInfo is designed to initialize the classInfo
        static std::map< std::string, createFunc>& getClassInfo()
        {
            static std::map< std::string, createFunc > classInfo;
            return classInfo;
        }

        static void Register(const char* name, DynamicCreation* (*func)())
        {
            getClassInfo()[name] = func;
        }
    };

    struct AutoRegister
    {
        AutoRegister(const char* name, DynamicCreation* (*createFunc)())
        {
            DynamicCreation::Register(name, createFunc);
        }
    };

    #define varName(Class) cexInfo##Class
    #define funcName(Class) cexNew##Class

    #define DeclareDynamicCreation(ThisClass) \
        static DynamicCreation* funcName(ThisClass)(void) \
    { \
        return new ThisClass(); \
    } \
        static AutoRegister varName(ThisClass);

    #define ImplementDynamicCreation(ThisClass) \
        AutoRegister ThisClass::varName(ThisClass)(#ThisClass, ThisClass::funcName(ThisClass));
};
