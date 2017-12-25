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
var Bullet = require('Bullet');

cc.Class({
    extends: cc.Component,

    properties: {
        bullet: {
            default: null,
            type: cc.Prefab
        },
        direction: {
            get: function() {
                return this._direction;
            },
            set: function(v) {
                this._direction = v;
                this.node.rotation = Tool.dir2rot(v);
            }
        },
        camp: Tool.Player1|Tool.Tank,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.step = 30;
        this.direction = 'up';
    },

    checkMove(dir) {
        this.direction = dir;

        if (Tool.canMove(this.node, this.direction, this.step))
        {
            var dis = Tool.dir2p(dir).mul(this.step);
            this.node.position = this.node.position.add(dis);
        }
        // console.log('tank now is at '+this.node.position.y);
    },
    
    checkFire() {
        var GameScene = require('GameScene');
        if (GameScene.inst.cntMapObject(x=>x.camp&(Tool.Bullet|Tool.Player1))>=1)
        {
            return;    
        }
        var bullet = Tool.createBullet(this);
        bullet.setTexture('bullet');
        bullet.camp |= Tool.Player;
        GameScene.inst.addMapObject(bullet);
    },
});
