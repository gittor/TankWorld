
export let curLevel = 0;
export let destroy = [5,6,7,8];

export function cleanup()
{
	destroy = [0,0,0,0];
}

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