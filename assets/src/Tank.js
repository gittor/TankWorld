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
        this.maxBullet = 1;
        this.bulletPower = 1;
        this.bPaused = false;
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
        if (this.bPaused) {
            return true;
        }
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

    specificBullet(bullet){
        bullet.setTexture('bullet');
        bullet.camp = Tool.Player1|Tool.Bullet;
    },
    
    checkFire() {
        if (this.bPaused) {
            return;
        }
        if (Tool.GameScene().cntMapObject(x=>x.master===this)>=this.maxBullet){
            // console.log(this, 'can not fire');
            return;
        }
        
        var node = cc.instantiate(this.bulletPrefab);
        node.position = this.node.position;
        var bullet = node.getComponent(Bullet);
        bullet.direction = this.direction;
        bullet.master = this;
        this.specificBullet(bullet);
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

    checkCollisionObject(other, self){
        var mo = other.node.getComponent('MapObject');
        if (mo.camp&Tool.Enermy && mo.camp&Tool.Bullet) {
            if (Tool.GameScene().pm.bulletCanHitPlayer(mo)) {
                this.blood--;
            }
        }
    },

    onCollisionEnter(other, self) {
        this.checkCollisionNumber(other, self, true);
        this.checkCollisionObject(other, self);
    },
    onCollisionStay(other, self) {
    },
    onCollisionExit(other, self) {
        this.checkCollisionNumber(other, self, false);
    },
});
