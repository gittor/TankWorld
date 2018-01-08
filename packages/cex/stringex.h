//
//  stringex.h
//  Jigsaw
//
//  Created by zhangdw on 15-8-20.
//
//

#ifndef __Jigsaw__stringex__
#define __Jigsaw__stringex__

#include "string"
#include "vector"

namespace cex
{
    using namespace std;
    
    vector<string> split(const string& str, char token);
    vector<int> splitInt(const string& str, char token);
}

#endif /* defined(__Jigsaw__stringex__) */
