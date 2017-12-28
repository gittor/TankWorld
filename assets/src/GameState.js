
export let None = 0;
export let Prepare = 1;
export let Gaming  = 2;
export let Failed  = 3;
export let Win 	   = 4;

export class GameState
{
	constructor(){
		this.objs = [];
		this.using = false;
		this.willadd = [];
		this.willrm = [];
		this.state = None;
		this.prestate = None;
		this.stateback = [];
	}

	addObserver(obj){
		if (this.using) {
			this.willadd.push(obj);
		}
		else{
			this.objs.push(obj);
		}
	}

	rmObserver(obj){
		if (this.using) {
			this.willrm.push(obj);
		}
		else {
			this.objs.push(obj);
		}
	}

	notify() {
		this.using = true;
		for(let x of this.objs){
			x.onStateChange(this);
		}
		this.using = false;
		this.objs.push(...this.willadd);
		this.willadd = [];
		this.objs = this.objs.filter(x=>!this.willrm.includes(x));
		this.willrm = [];
	}

	changeState(state){
		if (this.using) {
			this.stateback.push(state);
			return;
		}
		if (this.state === state) {
			return;
		}
		this.prestate = this.state;
		this.state = state;
		this.notify();
		if (this.stateback.length>0) {
			this.changeState( this.stateback.shift() );
		}
	}
}