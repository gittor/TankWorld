
var Tool = require('Tool');

var HelpProp = cc.Class({
	extends: cc.Component,
	properties: {
		master: null,
		type: Tool.PropType.Help,
	},
	finished(){
		return this.action===undefined;
	},
	remove(){
		this.master.node.stopAction(this.action);
		this.action = undefined;
        cc.director.getScheduler().unscheduleAllForTarget(this);
        Tool.GameScene().pm.rmProp(this);
	},
	start(){
		this.action = this.master.node.runAction(cc.blink(1,1).repeatForever());	
		cc.director.getScheduler().schedule(this.remove, this, 10);
	},
	update(){
        cc.director.getScheduler().unscheduleAllForTarget(this);
		this.start();
	},
});
