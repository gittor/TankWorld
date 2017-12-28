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
    extends: require('MapObject'),

    properties: {
        bulletPrefab: cc.Prefab,
        deadPrefab: cc.Prefab,
    },

    init () {
        this.step = 2;
        this.direction = 'up';
        this.collisionTankNumber = 0;
    },

    onLoad() {
        this.init();
    },

    setType(type) {
        if (type==Tool.Player1) {
            this.camp = Tool.Tank|Tool.Player1;
            this.node.getComponent(cc.Sprite).spriteFrame = cc.loader.getRes('p1', cc.SpriteFrame);
        }
        else if (type==Tool.Player2) {
            this.camp = Tool.Tank|Tool.Player2;
            this.node.getComponent(cc.Sprite).spriteFrame = cc.loader.getRes('p2', cc.SpriteFrame);
        }
    },

    onDead() {
        var node = cc.instantiate(this.deadPrefab);
        node.position = this.node.position;
        node.parent = Tool.GameScene().mapCtrl.dynamic;
        node.getComponent('AutoRemoveScript').animDelay("blast", 0.6);
    },

    formatPosition(){
        var pos = this.node.position;
        switch(this.direction)
        {
            case 'up':
            case 'down':
                pos.x = Math.round(pos.x/30)*30;
                break;
            case 'left':
            case 'right':
                pos.y = Math.round(pos.y/30)*30;
                break;
        }
        this.node.position = pos;
    },

    checkMove(dir) {
        this.direction = dir;
        
        if (!Tool.canMove(this.node, this.direction, this.step))
        {
            this.formatPosition();
        }
        
        if (!Tool.canMove(this.node, this.direction, this.step))
        {
            return false;
        }
        if(this.collisionTankNumber===0 && Tool.willCollisionObject(this.node,this.direction,this.step))
        {
            return false;
        }
        else
        {
            var dis = Tool.dir2p(dir).mul(this.step);
            this.node.position = this.node.position.add(dis);
            return true;
        }
    },
    
    checkFire() {
        if (Tool.GameScene().cntMapObject(x=>Tool.campHasAll(x.camp,Tool.Bullet,Tool.Player1))>=3){
            // console.log('can not fire');
            return;
        }
        var node = cc.instantiate(this.bulletPrefab);
        node.position = this.node.position;
        var bullet = node.getComponent(Bullet);
        bullet.direction = this.direction;
        bullet.setTexture('bullet');
        bullet.camp = Tool.Player1|Tool.Bullet;
        Tool.GameScene().addMapObject(bullet);
    },

    checkCollisionNumber(other, self, bEnterOrExit){
        let camp = other.node.getComponent('MapObject').camp;
        if (camp&Tool.Tank) {
            if (bEnterOrExit) {
                this.collisionTankNumber++;
            }
            else{
                this.collisionTankNumber--;
            }
        }
    },

    onCollisionEnter(other, self) {
        this.checkCollisionNumber(other, self, true);
    },
    onCollisionStay(other, self) {
    },
    onCollisionExit(other, self) {
        this.checkCollisionNumber(other, self, false);
    },
});
