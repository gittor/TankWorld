#pragma once

#include "common.h"
#include "DynamicCreation.h"
#include "Observer.h"
#include "OnFinally.h"
#include "Singleton.h"
#include "stringex.h"

//using namespace cex;


#include <cstdarg>
#include <cassert>

#ifndef byte
typedef unsigned char byte;
#endif

#ifndef uchar
typedef unsigned char uchar;
#endif

#ifndef uint
typedef unsigned int uint;
#endif

#ifndef ushort
typedef unsigned short ushort;
#endif

#ifndef ulong
typedef unsigned long ulong;
#endif

namespace cex
{	
	/*
	 *	可重入版本
	 *	线程安全但效率低一点
	 *	建议使用
	 *	
	 *	本来应该使用变参模板去做
	 *	但vs2012不支持
	 */
	template<int buffsize>
	std::string to_str(const char* format, ...)
	{
		char temp[buffsize] = {0};
		va_list list;
		long ret;

		va_start (list, format);
		ret = vsnprintf(temp, buffsize, format, list);
		assert(ret<buffsize);
		va_end (list);
		
		return temp;
	}

	/*
	 *	不可重入版本
	 *	非线程安全但效率高一点
	 *	易错，慎用
	 */
	template<int buffsize>
	const char* to_cstr(const char* format, ...)
	{
		static char static_buff[buffsize] = {0};
		va_list list;
		long ret;

		va_start (list, format);
		ret = vsnprintf(static_buff, buffsize, format, list);
		assert(ret<buffsize);
		va_end (list);

		return static_buff;
	}

	/*
	 *	一般情况下，可以使用这两个宏定义简化代码编写
	 */
	#define cstr to_cstr<512>
	#define sstr to_str<512>
}