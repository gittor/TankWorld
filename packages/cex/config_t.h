/*
 * 配置文件读写类
 *
 * 文件格式
 * key=value note
 * key和value中均不允许出现空格，value和note之间以空格隔开，以回车结束一行。
 * 可以没有note
 * 
 * 类的成员函数提供了与文件非同步的，速度优先的存取。
 * 类的静态函数提供了与文件同步的，但速度较低的存取。
*/
#pragma once

#include <map>
#include <string>

namespace cex
{
	class config_t
	{
	public:
		config_t(void);
		config_t(const std::string& fname);
		~config_t(void);

		bool load(const std::string& fname);

		std::string get(const std::string& key, const std::string& def = std::string());
		config_t& set(const std::string& key, const std::string& value);

		std::map<std::string, std::string> content();

		void flush();

		void autoFlush(bool bAutoFlushOnDestroy = true);

		std::string get(const std::string& fname, const std::string& key, const std::string& def/* = std::string()*/);
		void set(const std::string& fname, const std::string& key, const std::string& value);

	private:
		std::map<std::string, std::string> m_content;
		std::string m_fname;
		bool m_autoFlush;
	};
}
