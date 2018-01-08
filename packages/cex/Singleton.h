#pragma once

namespace cex
{
	template<class Derived>
	class Singleton
	{
	protected:
		Singleton(void){};
		~Singleton(void){};

	public:
		static Derived& inst()
		{
			static Derived theOnlyInstance;
			return theOnlyInstance;
		}

	private:
		Singleton(const Singleton&);
		Singleton& operator=(const Singleton&);
	};
};