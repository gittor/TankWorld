// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

var GameData = require('GameData');
var Tool = require('Tool');

cc.Class({
    extends: cc.Component,

    properties: {
        totalHighScore: cc.Label,
        p1HighScore: cc.Label,
        p1Destroy: [cc.Label],
        p1DestroyTotal: cc.Label,
        p1TankScore: [cc.Label],
        nextLevel: cc.Node,
    },

    onLoad () {
        this.curShowIdx = 0;
        this.scheduleOnce(this.showIndex.bind(this), 1);
        this.nextLevel.active = false;
        this.totalHighScore.string = GameData.curLevel;
    },

    showIndex(dt) {
        if (this.curShowIdx<this.p1Destroy.length) {
            this.p1Destroy[this.curShowIdx].string = GameData.destroy[this.curShowIdx]+"";
            this.p1TankScore[this.curShowIdx].string = GameData.destroy[this.curShowIdx]*(100*(this.curShowIdx+1))+"";
            this.scheduleOnce(this.showIndex.bind(this), 1);
        }
        else{
            this.p1DestroyTotal.string = Tool.sum(...GameData.destroy)+"";
            let s = Array.from(this.p1TankScore, x=>parseInt(x.string));
            this.p1HighScore.string = Tool.sum(...s)+"";
            this.nextLevel.active = true;
        }
        this.curShowIdx++;
    },

    onClickNext(){
        GameData.startNextLevel();
    },
});
