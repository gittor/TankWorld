// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
// const GameCenter = require("GameCenter");
const Tank = require("Tank");
export var inst = null;
cc.Class({
    extends: cc.Component,

    properties: {
        p1: {
            default: null,
            type: Tank,
        },
        p2: {
            default: null,
            type: Tank,
        },
        mapCtrl: {
            default: null,
            type: require('MapCtrl'),
        },
        hideEnermyBg: {
            default: null,
            type: cc.Node
        },
        hideEnermyTemp: {
            default: null,
            type: cc.Node
        },
    },

    start () {
        inst = this;
        this.mapObject = [];
        this.p1.position = cc.p(300,30);
        this.hideEnermy = [];
        for (let i = 0; i < 20; i++) {
            let node = cc.instantiate(this.hideEnermyTemp);
            node.parent = this.hideEnermyBg;
            node.position = cc.p(Math.floor(i%2)*40, -Math.floor(i/2)*40);
            this.hideEnermy.push(node);
        };
    },

    addMapObject(obj){
        obj.node.parent = this.mapCtrl.tileMap.node;
        this.mapObject.push(obj);
    },
    rmMapObject(obj){
        obj.node.removeFromParent();
        this.mapObject = this.mapObject.filter(x=>x!==obj);
    },
    cntMapObject(fun) {
        let ret = 0;
        for(let x of this.mapObject){
            if (fun(x)) {
                ret += 1;
            }
        }
        return ret;
    },

    subOneHideEnermy(){
        this.hideEnermy.pop().removeFromParent();
    },

    // update (dt) {},
});
