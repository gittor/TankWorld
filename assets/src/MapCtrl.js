// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        tileMap: {
            default: null,
            type: cc.TiledMap
        },
        roadLayer: {
            default: null,
            type: cc.TiledLayer
        }
    },

    getRoundTiles(pos) {

    },

    start() {
        
    },

    pos2tile(pos) {
        var mapSize = this.node.getContentSize();
        var tileSize = this.tileMap.getTileSize();
        // return cc.p(Math.floor(pos.x/tileSize.width), Math.floor((mapSize.height-pos.y)/tileSize.height)-1);
        return cc.p(Math.floor(pos.x/tileSize.width), Math.floor((mapSize.height-pos.y)/tileSize.height)-1);
    },

    canStand(pos) {
        var tile = this.pos2tile(pos);
        if (tile.x<0 || tile.x>=26) {
            return false;
        }
        if (tile.y<0 || tile.y>=26) {
            return false;
        }
        var gid = this.roadLayer.getTileGIDAt(tile);
        if (gid==0) {
            return true;
        }
        return false;
    }
});
