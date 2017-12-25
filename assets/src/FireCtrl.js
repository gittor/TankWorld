// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

var GameScene = require('GameScene');

cc.Class({
    extends: cc.Component,

    properties: {
        firebtn: {
            default: null,
            type: cc.Node,
        },
    },

    start () {
        this.accTouchTime = 0;
        this.firebtn.active = false;
        var win = cc.director.getWinSize();
        this.node.width = win.width;
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBegin.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoving.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd.bind(this));
    },

    onTouchBegin(event) {
        this.firebtn.active = true;
        let loc = event.getTouches()[0].getLocation();
        this.firebtn.position = this.node.convertToNodeSpaceAR(loc);
        GameScene.inst.p1.checkFire();
    },

    onTouchMoving(event) {
        // var loc = event.getTouches()[0].getLocation();
        // this.point.position = this.bg.convertToNodeSpaceAR(loc);
    },

    onTouchEnd(event) {
        this.firebtn.active = false;
    },

    update (dt) {
        if (!this.firebtn.active)
            return;
        this.accTouchTime += dt;
        if (this.accTouchTime>=1) {
            this.accTouchTime-=1;
            GameScene.inst.p1.checkFire();
        }
    },
});
