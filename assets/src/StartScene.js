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
        menuLayer: cc.Node,
        stageLayer: cc.Node,
        multiLayer: cc.Node,
        joinLayer: cc.Node,
        stageLab: cc.Label,
        serverAddr: cc.Label,
        p2name: cc.Label,
        multiStartBtn: cc.Node,
        p2Addr: cc.EditBox,
        p2State: cc.Label,
        p2Join: cc.Node,
        retBtn: cc.Node,
    },

    onLoad() {
        this.showLayer(this.menuLayer);
        this.stageLayer.width = cc.director.getWinSize().width;
        this.stageLayer.height = cc.director.getWinSize().height;
        this.stageLab.string = "1";
    },

    showLayer(wantshow){
        var lays = [this.menuLayer,this.stageLayer,this.multiLayer,this.joinLayer];
        for(let x of lays){
            x.active = x===wantshow;
        }
        this.retBtn.active = !this.menuLayer.active;
    },

    onClick1Player(event){
        this.showLayer(this.stageLayer);
    },

    onClick1PlayerStart(event) {
        let gd = require('GameData');
        gd.curLevel = parseInt(this.stageLab.string);
        gd.p1Life = 2;
        cc.director.loadScene('GameScene');
    },

    onClickMulti(event){
        this.showLayer(this.multiLayer);
        // console.log(require('socket.io'));
        // console.log(io.serve);
        // console.log(io.connect);
        // var socketio = require('socket.io');
        console.log(server);
    },

    onClickMultiStart(event){

    },

    onClickJoin(event){
        this.showLayer(this.joinLayer);
    },

    onClickJoinStart(event){

    },

    onClickReturn(event){
        this.showLayer(this.menuLayer);
    },
});
