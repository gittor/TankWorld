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
var GameData = require('GameData');

cc.Class({
    extends: require('MapObject'),

    properties: {
        sprite: cc.Sprite,
        cacheSP: [cc.SpriteFrame],
    },

    onLoad () {
       this.camp = Tool.Prop;
       var big = cc.fadeTo(1, 80);
       var normal = cc.fadeTo(1, 255);
       this.node.runAction( cc.sequence(big, normal).repeatForever() );
    },

    setType(type){
        this.type = type;
        this.sprite.spriteFrame = this.cacheSP[ type-1 ];
    },

    onDead() {
        if (this.blood===0) {
            return;
        }
    },

    onCollisionEnter(other, self) {
        var mo = other.node.getComponent('MapObject');
        if ( !(mo.camp&Tool.Tank) )
            return;
        if ( !(mo.camp&Tool.Player) )
            return;
        Tool.GameScene().pm.addProp(mo, this.type);
        this.blood--;
    },
    onCollisionStay(other, self) {

    },
    onCollisionExit(other, self) {

    },
});
