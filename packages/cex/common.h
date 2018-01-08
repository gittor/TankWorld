/*
 * 对实际使用的一些便利性扩展
*/

#pragma once

namespace cex
{
#define Return_If(condition) \
	if(condition)\
	return;

#define Return_True_If(condition)\
	if (condition)\
	return true;

#define Return_False_If(condition)\
	if (condition)\
	return false;

#define Return_Null_If(condition)\
	if (condition)\
	return NULL;

#define Continue_If(condition)\
	if (condition)\
	continue;

#define Break_If(condition)\
	if (condition)\
	break;
};