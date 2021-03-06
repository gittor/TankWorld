// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
var Tool = require('Tool');

cc.Class({
    extends: cc.Component,

    properties: {
        direction: {
            get: function(){
                return this._direction;
            },
            set: function(v){
                this._direction = v;
                this.node.rotation = Tool.dir2rot(v);
            }
        },
        camp: 0,
        blood: {
            get: function(){
                return this._blood===undefined?1:this._blood;
            },
            set: function(v){
                this.onBloodWillChange(v);
                this._blood = v;
                if (this._blood===0) {
                    this.die();
                }
            }
        },
        step: 5,
    },

    onLoad () {
    },

    die() {
        this.onDead();
        Tool.GameScene().rmMapObject(this);
    },

    onBloodWillChange(){

    },

    onCollisionEnter(other, self) {
    },
    onCollisionStay(other, self) {
    },
    onCollisionExit(other, self) {
    },
});
