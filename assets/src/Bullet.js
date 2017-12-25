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
        sprite: {
            default: null,
            type: cc.Sprite,
        },
        direction: {
            get: function(){
                return this._direction;
            },
            set: function(v){
                this._direction = v;
                this.sprite.node.rotation = Tool.dir2rot(v);
            }
        },
        camp: Tool.Bullet,
    },

    start () {
        this.accMoveTime = 0;
        this.step = 5;
    },

    setTexture(tex_name) {
        this.sprite.spriteFrame = cc.loader.getRes(tex_name, cc.SpriteFrame);
        this.node.width = this.sprite.node.width;
        this.node.height = this.sprite.node.height;
    },

    autoMove(){
        var GameScene = require('GameScene').inst;
        if (Tool.canBulletMove(this.node, this.direction, 0)) {
            var newpos = this.node.position.add( Tool.dir2p(this.direction).mul(this.step) );
            this.node.position = newpos;
        }
        else{
            GameScene.mapCtrl.onHit(this);
            GameScene.rmMapObject(this);
        }
        // var GameScene = require('GameScene').inst;
        // if (Tool.canBulletMove(this.node, this.direction, this.step)) {
        //     var newpos = this.node.position.add( Tool.dir2p(this.direction).mul(this.step) );
        //     this.node.position = newpos;
        // }
        // else{
        //     GameScene.mapCtrl.onHit(this);
        //     this.node.removeFromParent();
        // }
    },

    update (dt) {
        this.accMoveTime += dt;
        if (this.accMoveTime>0.01) {
            this.accMoveTime-=0.01;
            this.autoMove();
        }
    },
});
