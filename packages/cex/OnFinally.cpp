#include "OnFinally.h"

using namespace cex;

OnFinally::OnFinally( std::function<void (void)> func )
	:m_func(func)
{

}

OnFinally::~OnFinally()
{
	m_func();
}
