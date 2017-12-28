// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
const GameScene = require("GameScene");

cc.Class({
    extends: cc.Component,

    properties: {
        bg: {
            default: null,
            type: cc.Node,
        },
        point: {
            default: null,
            type: cc.Node,
        },
    },

    onLoad() {
        this.accTouchTime = 0;
        this.bg.active = false;
        this.point.active = false;
        var win = cc.director.getWinSize();
        this.node.width = win.width;
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBegin.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoving.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd.bind(this));
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onKeyDown(event) {
        // this.bg.active = true;
        this.point.active = true;
        switch(event.keyCode){
            case cc.KEY.w:
                this.point.position = cc.p(0,10);
            break;
            case cc.KEY.s:
                this.point.position = cc.p(0,-10);
            break;
            case cc.KEY.a:
                this.point.position = cc.p(-10, 0);
            break;
            case cc.KEY.d:
                this.point.position = cc.p(10, 0);
            break;
        }
    },

    onKeyUp(event) {
        this.bg.active = false;
        this.point.active = false;
    },

    onTouchBegin(event) {
        this.bg.active = true;
        this.point.active = true;
        let loc = event.getTouches()[0].getLocation();
        this.bg.position = this.node.convertToNodeSpaceAR(loc);
        this.point.position = this.bg.convertToNodeSpaceAR(loc);
    },

    onTouchMoving(event) {
        var loc = event.getTouches()[0].getLocation();
        this.point.position = this.bg.convertToNodeSpaceAR(loc);
    },

    onTouchEnd(event) {
        this.bg.active = false;
        this.point.active = false;
    },

    moveTank() {
        var radian = cc.v2(0,1).signAngle(this.point.position);
        var scale = radian/Math.PI;
        if (scale>=-0.25 && scale<0.25) {
            GameScene.inst.p1.checkMove('up');
        }
        else if (scale>=0.25 && scale<0.75) {
            GameScene.inst.p1.checkMove('right');
        }
        else if (scale>=0.75 && scale<1.25) {
            GameScene.inst.p1.checkMove('down');
        }
        else{
            GameScene.inst.p1.checkMove('left');
        }
    },

    update (dt) {
        if (!this.point.active)
            return;
        if (!GameScene.inst.p1)
            return;
        this.moveTank();
    },
});
