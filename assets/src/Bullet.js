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
    extends: require('MapObject'),

    properties: {
        sprite: {
            default: null,
            type: cc.Sprite,
        },
    },

    onLoad () {
        this.accMoveTime = 0;
        this.step = this.step||5;
        this.master = this.master||undefined;
        this.schedule(this.checkMove, 0);
    },

    setTexture(tex_name) {
        this.sprite.spriteFrame = cc.loader.getRes(tex_name, cc.SpriteFrame);
        this.node.width = this.sprite.node.width;
        this.node.height = this.sprite.node.height;
    },

    checkMove(){
        if (Tool.canBulletMove(this.node, this.direction, 0)) {
            var newpos = this.node.position.add( Tool.dir2p(this.direction).mul(this.step) );
            this.node.position = newpos;
        }
        else{
            Tool.GameScene().mapCtrl.onHit(this);
            this.blood--;
        }
    },

    onDead() {

    },

    onCollisionEnter(other, self) {
        var otherObject = other.node.getComponent('MapObject');
        if (this.master===otherObject) {
            return;
        }
        this.blood--;
    },
    onCollisionStay(other, self) {

    },
    onCollisionExit(other, self) {

    },
});
