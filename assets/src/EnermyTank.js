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
        },
        bloodLabel: {
            default: null,
            type: cc.Label,
        },
        bloodBack: {
            default: null,
            type: cc.Label,
        }
    },

    onLoad () {
        this.init();
        this.step = 2;
        this.direction = 'down';
        this.camp = Tool.Enermy|Tool.Tank;
        this.schedule(this.autoChangeDirection, 3);
    },

    onBloodWillChange(v) {
        this.bloodLabel.string = v+"";
        this.bloodBack.string = v+"";
    },

    autoChangeDirection(dt) {
        this.direction = Tool.randDirection(this.direction);
    },

    setEnermyType(type) {
        switch(type)
        {
            case 0:
                this.sprite.spriteFrame = cc.loader.getRes("enermy0", cc.SpriteFrame);
                this.step = 1;
                this.blood = 1;
                break;
            case 1:
                this.sprite.spriteFrame = cc.loader.getRes("enermy1", cc.SpriteFrame);
                this.step = 2;
                this.blood = 2;
                break;
            case 2:
                this.sprite.spriteFrame = cc.loader.getRes("enermy2", cc.SpriteFrame);
                this.step = 3;
                this.blood = 3;
                break;
            case 3:
                this.sprite.spriteFrame = cc.loader.getRes("enermy3", cc.SpriteFrame);
                this.step = 4;
                this.blood = 4;
                break;
        }
    },

    update(dt) {
        // if(!this.checkMove(this.direction)) {
        //     this.autoChangeDirection();
        // }
    },

    onDead() {
        this.deadNode.active = true;
        this.deadNode.parent = Tool.GameScene().mapCtrl.node;
        this.deadNode.position = this.node.position;
        this.deadNode.getComponent(cc.Animation).play('blast');
        var seq = cc.sequence(cc.delayTime(0.6), cc.callFunc(()=>this.deadNode.removeFromParent()));
        this.deadNode.runAction(seq);
    },
    
    onCollisionEnter(other, self) {
        this.checkCollisionNumber(other, self, true);
        let camp = other.node.getComponent('MapObject').camp;
        if (Tool.campHasAll(camp,Tool.Bullet,Tool.Player)) {
            this.blood--;
        }
    },
    onCollisionStay(other, self) {

    },
    onCollisionExit(other, self) {
        this.checkCollisionNumber(other, self, false);
    },
});
