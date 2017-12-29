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
        EnermyTankPrefab: {
            default: null,
            type: cc.Prefab,
        },
        bornNode: {
            default: null,
            type: cc.Node,
        }
    },

    onLoad() {
        this.accMoveTime = 0;
        this.createIndex = -1;
    },

    getCurPosition() {
        this.createIndex = (this.createIndex+1)%3;
        switch(this.createIndex)
        {
            case 0: return cc.p(30,750);
            case 1: return cc.p(390,750);
            case 2: return cc.p(750,750);
        }
    },

    checkEnermy() {
        if(4===Tool.GameScene().cntMapObject(x=>Tool.campHasAll(x.camp,Tool.Enermy,Tool.Tank)))
            return;
        if (Tool.GameScene().hideEnermy.length===0)
            return;
        this.delayCreateEnermy(this.getCurPosition(), Tool.randint()%4);
    },

    delayCreateEnermy(pos, type){

        var born = cc.instantiate(this.bornNode);
        born.parent = Tool.GameScene().mapCtrl.dynamic;
        born.position = pos;
        born.getComponent(cc.Animation).play('born');

        this.scheduleOnce(()=>{
            born.removeFromParent();
            var node = cc.instantiate(this.EnermyTankPrefab);
            var enermy = node.getComponent('EnermyTank');
            node.position = pos;
            Tool.GameScene().addMapObject(enermy);
            enermy.setType(type);
            enermy.bPaused = Tool.GameScene().pm.bPaused;
            Tool.GameScene().subOneHideEnermy();
        }, 1);
    },

    update(dt) {
        this.accMoveTime += dt;
        if (this.accMoveTime<3)
            return;
        this.accMoveTime -= 3;
        this.checkEnermy();
    }
});
