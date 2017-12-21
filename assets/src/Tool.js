
export function dir2p(dir) 
{
	if (dir=='up') {
		return cc.p(0, 1);
	}
	else if(dir=='right') {
		return cc.p(1, 0);
	}
	else if (dir=='down') {
		return cc.p(0, -1);
	}
	else if (dir=='left') {
		return cc.p(-1, 0);
	}
	else{
		assert(false);
	}
}

export function dir2rot(dir){
	if (dir=='up') {
		return 0;
	}
	else if(dir=='right') {
		return 90;
	}
	else if (dir=='down') {
		return 180;
	}
	else if (dir=='left') {
		return 270;
	}
	else{
		assert(false);
	}
}

export function logP(data) {
	console.log(data.x, data.y);
}