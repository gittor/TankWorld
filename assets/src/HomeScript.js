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
        destroyImg: cc.Node,
    },

    onLoad () {
       this.camp = Tool.Home;
       var big = cc.scaleTo(0.2, 1.2, 1.2);
       var normal = cc.scaleTo(2, 1.0, 1.0);
       this.node.runAction( cc.sequence(big, normal).repeatForever() );
       this.destroyImg.active = false;
    },

    onDead() {
        var node = cc.instantiate(this.destroyImg);
        node.active = true;
        node.position = this.node.position;
        node.parent = Tool.GameScene().mapCtrl.dynamic;
    },

    onCollisionEnter(other, self) {
        var otherObject = other.node.getComponent('MapObject');
        if (otherObject.camp&Tool.Bullet) {
            console.log(this.blood);
            this.blood--;
        }
    },
    onCollisionStay(other, self) {

    },
    onCollisionExit(other, self) {

    },
});
