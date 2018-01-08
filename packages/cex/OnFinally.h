/*
 *	谨慎使用这个工具
 *	在大多数情况下它的缺点比优点多
 */

#pragma once

#include <functional>

namespace cex
{
	class OnFinally
	{
	public:
		OnFinally(std::function<void (void)> func);
		~OnFinally();
	private:
		std::function<void (void)> m_func;
	private:
		OnFinally(const OnFinally&);
		OnFinally& operator=(const OnFinally&);
	};

#define On_Finally(func) OnFinally onFinally__LINE__(func);

}
