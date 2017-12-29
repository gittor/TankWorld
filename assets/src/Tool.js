

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

// export function createBullet(tank) {
// 	var prefab = cc.loader.getRes('bullet', cc.Prefab);
// 	var node = cc.instantiate(prefab);
// 	var bullet = node.getComponent(require('Bullet'));
// 	bullet.direction = tank.direction;
// 	node.position = tank.node.position;
// 	return bullet;
// }

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

export function willCollisionObject(node, direction, step)
{
	var dis = this.dir2p(direction).mul(step);
	var pts = this.getCheckPos(node, direction);
	let willcollision = false;
	for(let x of this.GameScene().mapObject)
	{
		if (x.node===node) {
			continue;
		}
		let p = x.node.position;
		let s = x.node.width;
		let box = cc.rect(p.x-s/2,p.y-s/2,s,s);
		for(let y of pts)
		{
			if (box.contains(y)) {
				willcollision = true;
				break;
			}
		}
		if (willcollision) {
			break;
		}
	}
	return willcollision;
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

export function randint() {
	return Math.floor(Math.random()*1000000);
}

export function choose(arr) {
	return arr[ this.randint()%arr.length ];
}

export function randDirection(except) {
	return this.choose(['up', 'down', 'left', 'right'].filter(x=>x!=except));
}

export function resolveCamp(camp) {
	var ret = [ camp,
				camp&this.Player1 ? "Player1" : null,
				camp&this.Player2 ? "Player2" : null,
				camp&this.Enermy ? "Enermy" : null,
				camp&this.Tank ? "Tank" : null,
				camp&this.Bullet ? "Bullet" : null,
				].filter(x=>x);
	return ret.join(',');
}

export function campHasAll(camp, ...args){
	for(let x of args){
        if( !(camp & x) ){
            return false;
        }
    }
    return true;
}

export function sum(...datas){
	let ret = 0;
	for(let x of datas){
		ret += x;
	}
	return ret;
}

export function now(){
	var d = new Date();
	return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}:${d.getMilliseconds()}`;
}

export let Brick = 16;
export let Iron = 15;
export let Grass = 9;
export let Water = 1;

export let Player1 = 1;
export let Player2 = 2;
export let Enermy = 4;
export let Tank = 8;
export let Bullet = 16;
export let Home = 32;
export let Prop = 64;
export let Player = Player1|Player2;

export let PropType = {
	Boom: 1,
	Life: 2,
	Star: 3,
	Timer:4,
	Help: 5,
}







