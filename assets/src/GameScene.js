// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
// const GameCenter = require("GameCenter");
var Tank = require("Tank");
var Tool = require('Tool');
var GameState = require('GameState');
var GameData = require('GameData');

export var inst = null;
cc.Class({
    extends: cc.Component,

    properties: {
        mapCtrl: require('MapCtrl'),
        hideEnermyBg: cc.Node,
        hideEnermyTemp: cc.Node,
        debugLab: cc.Label,
        bornPrefab: cc.Prefab,
        TankPrefab: cc.Prefab,
    },

    onLoad () {
        inst = this;
        this.cleanup();
        this.gs = new GameState.GameState();
        this.gs.addObserver(this);
        this.startLevel();
    },

    cleanup(){
        this.hideEnermyBg.removeAllChildren(true);
        this.hideEnermy = [];
        this.p1 = undefined;
        this.mapObject = [];
        this.mapCtrl.cleanup();
    },

    delayCreatePlayer(type){
        let bornpos;
        if (type==Tool.Player1) {
            bornpos = cc.p(300,30);
        }
        else if(type==Tool.Player2) {
            bornpos = cc.p(480,30);
        }

        var born = cc.instantiate(this.bornPrefab);
        born.position = bornpos;
        born.getComponent('AutoRemoveScript').animDelay("born", 1.5);
        born.parent = this.mapCtrl.dynamic;

        this.scheduleOnce(()=>{
            var node = cc.instantiate(this.TankPrefab);
            var tank = node.getComponent('Tank');
            node.position = bornpos;
            this.addMapObject(tank);
            tank.setType(type);
            if (type==Tool.Player1) {
                this.p1 = tank;
            }
            else if(type==Tool.Player2){
                this.p2 = tank;
            }
        }, 1.5);
    },

    startLevel() {
        this.cleanup();
        this.mapCtrl.startLevel();
        // this.delayCreatePlayer(Tool.Player1);
        // this.p1 = this.createPlayer();
        // this.p1.node.position = cc.p(300,30);
        for (let i = 0; i < 6; i++) {
            let node = cc.instantiate(this.hideEnermyTemp);
            node.parent = this.hideEnermyBg;
            node.position = cc.p(Math.floor(i%2)*40, -Math.floor(i/2)*40);
            this.hideEnermy.push(node);
        };
        this.gs.changeState(GameState.Prepare);
    },

    onEnable () {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
    },
    onDisable () {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
    },

    addMapObject(obj){
        obj.node.parent = this.mapCtrl.dynamic;
        this.mapObject.push(obj);
        // cc.assert(obj instanceof require('MapObject'));
        // console.log('addMapObject', this.mapObject.length);
    },
    rmMapObject(obj){
        obj.node.removeFromParent();
        this.mapObject = this.mapObject.filter(x=>x!==obj);
        this.checkState(obj);
    },
    cntMapObject(fun) {
        // console.log('cntMapObject', fun);
        let ret = 0;
        for(let x of this.mapObject){
            if (fun(x)) {
                ret += 1;
            }
        }
        return ret;
    },

    subOneHideEnermy(enermy){
        this.hideEnermy.pop().removeFromParent();
    },

    update (dt) {
        this.debugLab.string = this.cntMapObject(x=>Tool.campHasAll(x,Tool.Tank,Tool.Enermy))+"";
    },
    onStateChange(gs){
        console.log('gs', gs.state);
        if (gs.state==GameState.Prepare) {
            this.scheduleOnce(()=>{
                this.delayCreatePlayer(Tool.Player1);
                gs.changeState(GameState.Gaming);
            }, 1);
        }
        else if(gs.state==GameState.Failed) {
            // this.scheduleOnce(()=>{
            //     this.showFail();
            // }, 3);
        }
        else if(gs.state==GameState.Win) {
            // this.scheduleOnce(()=>{
            //     this.showWin();
            // }, 3);
            console.log('Win', ...GameData.destroy);
        }
    },

    checkState(mo) {
        if (Tool.campHasAll(mo.camp,Tool.Tank,Tool.Enermy)) {
            GameData.destroy[mo.type]++;
        }
        if (this.cntMapObject(x=>Tool.campHasAll(x.camp,Tool.Tank,Tool.Enermy))===0
            && this.hideEnermy.length===0) {
            this.gs.changeState(GameState.Win);
        }
    },
});
