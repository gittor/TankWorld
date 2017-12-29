// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
var Tool = require('Tool');
var GameData = require('GameData');

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
        },
        dynamic: cc.Node,
    },

    onLoad() {

    },

    startLevel() {
        this.tileMap.tmxAsset = cc.loader.getRes(`level${GameData.curLevel}.tmx`);
        this.roadLayer = this.tileMap.getLayer('块层 1');
    },

    cleanup() {
        this.dynamic.removeAllChildren();
    },

    pos2tile(pos) {
        var mapSize = this.node.getContentSize();
        var tileSize = this.tileMap.getTileSize();
        return cc.p(Math.floor(pos.x/tileSize.width), Math.floor((mapSize.height-pos.y)/tileSize.height));
    },

    tileInView(tile) {
        if (tile.x<0 || tile.x>=26) {
            return false;
        }
        if (tile.y<0 || tile.y>=26) {
            return false;
        }
        return true;
    },

    canStand(pos) {
        var tile = this.pos2tile(pos);
        if (!this.tileInView(tile)) {
            return false;
        }
        // console.log('canStand', tile);
        var gid = this.roadLayer.getTileGIDAt(tile);
        if ([0,Tool.Grass].includes(gid)) {
            return true;
        }
        return false;
    },

    canBulletStand(pos) {
        var tile = this.pos2tile(pos);
        if (!this.tileInView(tile)) {
            return false;
        }
        var gid = this.roadLayer.getTileGIDAt(tile);
        if ([0,Tool.Grass,Tool.Water].includes(gid)) {
            return true;
        }
        return false;
    },

    onHit(bullet) {
        var pts = Tool.getCheckPos(bullet.node, bullet.direction);
        for (var i = 0; i < pts.length; i++) {
            var tile = this.pos2tile(pts[i]);
            if (!this.tileInView(tile)) {
                continue;
            }
            var gid = this.roadLayer.getTileGIDAt(tile);
            if (gid===0 || gid===Tool.Grass || gid===Tool.Water) {
                continue;
            }
            else if (gid===Tool.Iron && bullet.power()<3) {
                continue;
            }
            this.roadLayer.setTileGID(0, tile);
        };
    },

});
