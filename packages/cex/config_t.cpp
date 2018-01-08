#include "config_t.h"
#include "cex.h"
#include <fstream>

using namespace std;
using namespace cex;

inline bool key_value( const std::string& line, std::pair<string, string>& out )
{
	std::string::size_type equal = line.find('=');
	std::string::size_type space = line.find(' ', equal+1);
	Return_False_If(std::string::npos == equal);
	out.first = line.substr(0, equal);
	out.second = line.substr(equal+1, space-equal-1);
	return true;
}

config_t::config_t( void )
	:m_autoFlush(true)
{

}

config_t::config_t( const std::string& fname )
	:m_fname(fname)
	,m_autoFlush(true)
{
	load(fname);
}

config_t::~config_t( void )
{
	if (m_autoFlush)
	{
		flush();
	}
}

bool config_t::load( const std::string& fname )
{
	ifstream rd(fname.c_str());
	Return_False_If(!rd);
	string line;
	while (rd>>line)
	{
		std::pair<string, string> out;
		if (key_value(line, out))
		{
			m_content.insert(out);
		}
	}
	rd.close();
	return true;
}

string config_t::get( const std::string& key, const string& def /*= std::string()*/ )
{
	map<string, string>::iterator it = m_content.find(key);
	return it==m_content.end() ? def : it->second;
}

config_t& config_t::set( const std::string& key, const string& value )
{
#ifdef _DEBUG
	assert(!key.empty());
	assert(key.front()!=' ');
	assert(key.back()!=' ');
	assert(!value.empty());
	assert(value.front()!=' ');
	assert(value.back()!=' ');
#endif
	m_content.insert( make_pair(key, value) );
	return *this;
}

std::map<string, string> config_t::content()
{
	return m_content;
}

void config_t::flush()
{
	ofstream os(m_fname.c_str());
	Return_If(!os);
	for (auto iter = m_content.begin(); iter != m_content.end(); ++iter)
	{
		os<<iter->first<<"="<<iter->second<<"\n";
	}
	os.close();
}

void cex::config_t::autoFlush( bool bAutoFlushOnDestroy /*= true*/ )
{
	m_autoFlush = bAutoFlushOnDestroy;
}

string config_t::get( const std::string& fname, const std::string& key, const string& def /*= std::string()*/ )
{
	config_t cfg(fname);
	return cfg.get(key, def);
}

void config_t::set( const std::string& fname, const std::string& key, const string& value )
{
	config_t cfg(fname);
	cfg.set(key, value).flush();
}
