// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
const Tool = require('Tool');
const GameScene = require('GameScene');

cc.Class({
    extends: cc.Component,

    properties: {
        tank: {
            default: null,
            type: cc.Node,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.step = 30;
        // console.log(GameScene.inst.mapCtrl.canStand( cc.p(30.00, -0.00) ));
        // console.log(GameScene.inst.mapCtrl.pos2tile( cc.p(0,780) ));
        // console.log(-0<0);
        // console.log(0<0);
    },

    checkMove(dir) {
        this.tank.rotation = Tool.dir2rot(dir);
        var pts = [];
        pts[0] = this.tank.position.sub( cc.p(30,30) );
        pts[1] = cc.p(pts[0].x+30, pts[0].y);
        pts[2] = cc.p(pts[0].x+30, pts[0].y+30);
        pts[3] = cc.p(pts[0].x, pts[0].y+30);
        var dis = Tool.dir2p(dir).mul(this.step);

        var canStand = true;
        for (var i = 0; i < pts.length; i++) {
            var newpos = pts[i].add(dis);
            if (!GameScene.inst.mapCtrl.canStand(newpos)) {
                canStand = false;
                break;
            }
        }
        if (canStand)
        {
            this.tank.position = this.tank.position.add(dis);
        }
        // console.log('tank now is at '+this.tank.position.y);
    },
});
