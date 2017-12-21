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
    },

    start () {
        inst = this;
    },

    // update (dt) {},
});
