// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
var Tool = require("Tool");

cc.Class({
    extends: require("Tank"),

    properties: {
        sprite: {
            default: null,
            type: cc.Sprite,
        }
    },

    onLoad () {
        this.step = 2;
        this.direction = 'down';
        this.accMoveTime = 0;
        this.camp = Tool.Enermy|Tool.Tank;
        this.schedule(this.autoChangeDirection, 3);
    },

    autoChangeDirection(dt) {
        this.direction = Tool.randDirection(this.direction);
    },

    setEnermyType(type) {
        switch(type)
        {
            case 0:
                this.sprite.spriteFrame = cc.loader.getRes("enermy0", cc.SpriteFrame);
                this.step = 2;
                break;
            case 1:
                this.sprite.spriteFrame = cc.loader.getRes("enermy1", cc.SpriteFrame);
                this.step = 4;
                break;
            case 2:
                this.sprite.spriteFrame = cc.loader.getRes("enermy2", cc.SpriteFrame);
                this.step = 6;
                break;
            case 3:
                this.sprite.spriteFrame = cc.loader.getRes("enermy3", cc.SpriteFrame);
                this.step = 16;
                break;
        }
    },

    update(dt) {
        if(!this.checkMove(this.direction)) {
            this.autoChangeDirection();
        }
    },
    
    // checkFire() {
    //     var GameScene = require('GameScene');
    //     if (GameScene.inst.cntMapObject(x=>x.camp&(Tool.Bullet|Tool.Player1))>=1)
    //     {
    //         return;    
    //     }
    //     var bullet = Tool.createBullet(this);
    //     bullet.setTexture('bullet');
    //     bullet.camp |= Tool.Player;
    //     GameScene.inst.addMapObject(bullet);
    // },
});
