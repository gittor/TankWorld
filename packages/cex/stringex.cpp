//
//  stringex.cpp
//  Jigsaw
//
//  Created by zhangdw on 15-8-20.
//
//

#include "stringex.h"
#include "cstdlib"

using namespace std;

vector<string> cex::split(const string& str, char token)
{
    vector<string> ret;
    
    string::size_type tk_pre = 0;
    string::size_type tk_cur = str.find(token);
    while (tk_cur != string::npos)
    {
        ret.push_back( str.substr(tk_pre, tk_cur-tk_pre) );
        tk_pre = tk_cur+1;
        tk_cur = str.find(token, tk_pre);
    }

    if (tk_pre < str.size())
    {
        ret.push_back(str.substr(tk_pre));
    }
    
    return ret;
}

vector<int> cex::splitInt(const string& str, char token)
{
    vector<string> tmp = split(str, token);
    vector<int> ret;
    for (auto it=tmp.begin(); it!=tmp.end(); ++it)
    {
        ret.push_back( atoi(it->c_str()) );
    }
    return ret;
}