

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

export function createBullet(tank) {
	var prefab = cc.loader.getRes('bullet', cc.Prefab);
	var node = cc.instantiate(prefab);
	var bullet = node.getComponent(require('Bullet'));
	bullet.direction = tank.direction;
	node.position = tank.node.position;
	return bullet;
}

export function getCheckPos(node, direction){
	var size = node.width/2;
    var ret = [];
    switch(direction)
    {
        case 'up':
            ret.push(node.position.add( cc.p(-size+1,size-1) ));
            ret.push(node.position.add( cc.p(size-1,size-1) ));
        break;
        case 'down':
            ret.push(node.position.add( cc.p(-size+1,-size+1) ));
            ret.push(node.position.add( cc.p(size-1,-size+1) ));
        break;
        case 'left':
            ret.push(node.position.add( cc.p(-size+1,size-1) ));
            ret.push(node.position.add( cc.p(-size+1,-size+1) ));
        break;
        case 'right':
            ret.push(node.position.add( cc.p(size-1,size-1) ));
            ret.push(node.position.add( cc.p(size-1,-size+1) ));
        break;
        default:
        assert(false);
    }
    return ret;
}

export function canMove(node, direction, step)
{
	var GameScene = require('GameScene');
	var dis = this.dir2p(direction).mul(step);
	var pts = this.getCheckPos(node, direction);
	var canStand = true;
    for (var i = 0; i < pts.length; i++) {
        var newpos = pts[i].add(dis);
        if (!GameScene.inst.mapCtrl.canStand(newpos)) {
        	// console.log(pts[i]);
            canStand = false;
            break;
        }
    }
    return canStand;
}

export function canBulletMove(node, direction, step)
{
	var GameScene = require('GameScene');
	var dis = this.dir2p(direction).mul(step);
	var pts = this.getCheckPos(node, direction);
	var canStand = true;
	// console.log('canBulletMove', direction, node.position, pts[0], node.width/2);
    for (var i = 0; i < pts.length; i++) {
        var newpos = pts[i].add(dis);
        if (!GameScene.inst.mapCtrl.canBulletStand(newpos)) {
            canStand = false;
            break;
        }
    }
    return canStand;
}

export function GameScene() {
	return require('GameScene').inst;
}


export let Brick = 16;
export let Iron = 15;

export let Player1 = 1;
export let Player2 = 2;
export let Enermy = 4;
export let Tank = 8;
export let Bullet = 16;
export let Player = Player1|Player2;









