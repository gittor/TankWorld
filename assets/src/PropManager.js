
var Tool = require('Tool');
var TimerProp = require('TimerProp');
var HelpProp = require('HelpProp');

export class PropManager{
	constructor() {
		this.props = [];
		this.bPaused = false;
	}

	addProp(target, type){
		var prop = undefined;
		switch(type)
        {
            case Tool.PropType.Boom:
            {
                for(let x of Tool.GameScene().mapObject){
                    if(x.camp&Tool.Enermy && x.camp&Tool.Tank){
                        x.die();
                    }
                }
            }
            break;
            case Tool.PropType.Life:
            {
                GameData.p1Life++;
                Tool.GameScene().refreshView();
            }
            break;
            case Tool.PropType.Star:
            {
                if (target.bulletPower===1) {
                    target.maxBullet++;
                }
				target.bulletPower++;
            }
            break;
            case Tool.PropType.Timer:
            {
                prop = new TimerProp();
                prop.manager = this;
            }
            break;
            case Tool.PropType.Help:
            {
                prop = new HelpProp();
                prop.master = target;
            }
            break;
        }
        if (!prop)
        	return;

        var has = false;
        for(let p of this.props){
        	if (p.type===prop.type) {
        		p.update();
        		has = true;
        		break;
        	}
        }
        if(!has){
        	this.props.push(prop);
        	prop.start();
        }
        console.log(`当前有${this.props.length}个buff`)
	}

	rmProp(prop){
		this.props = this.props.filter(x=>x!=prop);
	}

	bulletCanHitPlayer(mo){
		for(let p of this.props){
			if (p.type===Tool.PropType.Help) {
				return false;
			}
		}
		return true;
	}

	cleanup(){
		for(let p of this.props){
			p.remove();
		}
		this.props = [];
	}
};
