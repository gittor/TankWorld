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
        if(Tool.GameScene().cntMapObject(x=>x.camp&(Tool.Enermy|Tool.Tank))===4)
            return;
        if (Tool.GameScene().hideEnermy.length===0)
            return;
        var node = cc.instantiate(this.EnermyTankPrefab);
        var enermy = node.getComponent(require('EnermyTank'));
        node.position = this.getCurPosition();
        Tool.GameScene().addMapObject(enermy);
        Tool.GameScene().subOneHideEnermy();
        enermy.setEnermyType(1);
    },

    update(dt) {
        this.accMoveTime += dt;
        if (this.accMoveTime<3)
            return;
        this.accMoveTime -= 3;
        this.checkEnermy();
    }
});
