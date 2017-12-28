
export let curLevel = 0;
export let destroy = [0,0,0,0];
export let finishState = 0;
export let p1Life = 0;

export function startNextLevel()
{
	if (this.curLevel===4) {
		cc.director.loadScene('StartScene');
	}
	else{
		this.curLevel++;
		cc.director.loadScene('GameScene');
	}
}