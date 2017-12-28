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
    },

    onLoad () {
        this.init();
        this.step = 2;
        this.direction = 'down';
        this.camp = Tool.Enermy|Tool.Tank;
        this.maxBullet = 1;
        // this.schedule(this.autoChangeDirection, 3);
        this.schedule(this.checkFire.bind(this), 1);
    },

    onBloodWillChange(v) {
        
    },

    autoChangeDirection(dt) {
        this.direction = Tool.randDirection(this.direction);
    },

    setType(type) {
        this.type = type;
        switch(type)
        {
            case 0:
                this.sprite.spriteFrame = cc.loader.getRes("enermy0", cc.SpriteFrame);
                this.step = 1;
                this.blood = 4;
                break;
            case 1:
                this.sprite.spriteFrame = cc.loader.getRes("enermy1", cc.SpriteFrame);
                this.step = 2;
                this.blood = 3;
                break;
            case 2:
                this.sprite.spriteFrame = cc.loader.getRes("enermy2", cc.SpriteFrame);
                this.step = 3;
                this.blood = 2;
                break;
            case 3:
                this.sprite.spriteFrame = cc.loader.getRes("enermy3", cc.SpriteFrame);
                this.step = 4;
                this.blood = 1;
                break;
        }
    },

    specificBullet(bullet){
        // bullet.setTexture('enermymissile');
        bullet.camp = Tool.Enermy|Tool.Bullet;
        // console.log('Enermy.specificBullet', bullet.node.group);
    },

    update(dt) {
        // if(!this.checkMove(this.direction)) {
        //     this.autoChangeDirection();
        // }
    },

    checkCollisionObject(other, self){
        var mo = other.node.getComponent('MapObject');
        if (mo.camp&Tool.Player && mo.camp&Tool.Bullet) {
            this.blood--;
        }
    },
    
    // onCollisionEnter(other, self) {
    //     this.checkCollisionNumber(other, self, true);
    //     let camp = other.node.getComponent('MapObject').camp;
    //     if (Tool.campHasAll(camp,Tool.Bullet,Tool.Player)) {
    //         this.blood--;
    //     }
    // },
    // onCollisionStay(other, self) {

    // },
    // onCollisionExit(other, self) {
    //     this.checkCollisionNumber(other, self, false);
    // },
});
