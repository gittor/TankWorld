
var Tool = require('Tool');

var TimerProp = cc.Class({
	extends: cc.Component,
	properties: {
		manager: null,
		type: Tool.PropType.Timer,
	},
	// ctor(manager){
	// 	this.manager = manager;
	// 	this.type = Tool.PropType.Timer;
	// },
	finished(){
		return this.manager.bPaused;
	},
	remove(){
		for(let x of Tool.GameScene().mapObject){
            if(x.camp&Tool.Enermy && x.camp&Tool.Tank){
                x.bPaused = false;
            }
        }
        this.manager.bPaused = false;
        console.log('重启所有坦克:', Tool.now());
        cc.director.getScheduler().unscheduleAllForTarget(this);
        Tool.GameScene().pm.rmProp(this);
	},
	start(){
		for(let x of Tool.GameScene().mapObject){
            if(x.camp&Tool.Enermy && x.camp&Tool.Tank){
                x.bPaused = true;
            }
        }
		this.manager.bPaused = true;
        console.log('暂停所有坦克:', Tool.now());
        cc.director.getScheduler().schedule(this.remove, this, 3);
	},
	update(){
		cc.director.getScheduler().unscheduleAllForTarget(this);
		this.start();
	},
});
