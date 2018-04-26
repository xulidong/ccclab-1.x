/**
 * 地图管理组件
 */

cc.Class({
    extends: cc.Component,

    onLoad () {
         // tile width and height
         this.tileW = 1024;
         this.tileH = 1024;
         this.xMax = 5;
         this.yMax = 3;
 
         // count of tile on x and y
         var rootMap = this.node.parent;;
         this.cntX = Math.ceil(rootMap.width/this.tileW) + 1;
         this.cntY = Math.ceil(rootMap.height/this.tileH) + 1;
 
         // {'(x,y)': sprite}
         this.showTileMap = {};

         // the actor that camera follows
        this.actorFollow = null;
    },

    update (dt) {
        this.updateMap();
    },

    lateUpdate () {
        this.udpateCamera();
    },

    loadTile (x, y) {
        var mapId = 1000;
        var path = cc.js.formatStr("resources/texture/map_%s/tile_%s_%s.jpg", mapId, x, y);
        var node = new cc.Node();
        node.setAnchorPoint(0, 0);
        node.setLocalZOrder(-1);
        var sprite = node.addComponent(cc.Sprite);
        var url = cc.url.raw(path);
        sprite.spriteFrame = new cc.SpriteFrame(url); 
        sprite.sizeMode = cc.Sprite.SizeMode.RAW;
        sprite.trim = false;
        return sprite;
    },

    updateMap () {
        if (!player) {
            return;
        }
        var center = player.actor.node.getPosition();
        var cX = Math.floor(center.x/this.tileW);
        var cY = Math.floor(center.y/this.tileH);

        var curShow = {};
        var fromX = Math.min(Math.max(cX - Math.floor(this.cntX / 2), 0), this.xMax - this.cntX);
        var fromY = Math.min(Math.max(cY - Math.floor(this.cntY / 2), 0), this.yMax - this.cntY);
        for (var x = fromX; x <= fromX + this.cntX; x++) {
            for (var y = fromY; y <= fromY + this.cntY; y++) {
                var key = this.getCacheKey(x, y);
                var tile = this.getTileByKey(key);
                if (!tile) {
                    tile = this.loadTile(x, y);
                    tile.node.parent = this.node;
                    tile.node.setPosition(x * this.tileW, y * this.tileH);
                    this.setTileByKey(key, tile);
                }
                curShow[key] = true;
            }
        }
        this.clearShowTile(curShow);
    },

    getCacheKey (x, y) {
        return cc.js.formatStr("%s_%s", x, y);
    },

    getTileByKey (key) {
        return this.showTileMap[key];
    },

    setTileByKey (key, tile) {
        this.showTileMap[key] = tile;
    },

    clearShowTile (curShow) {
        for (var key in this.showTileMap) {
            if (!curShow[key]) {
                var tile = this.showTileMap[key];
                tile.destroy();
                delete this.showTileMap[key];
            }
        }
    },

    setActorFollow (actor) {
        this.actorFollow = actor; 
    },

    udpateCamera () {
        if (!this.actorFollow) {
            return;
        }
        var viewW = this.node.parent.width;
        var viewH = this.node.parent.height;
        
        this.node.x = viewW * 0.5 -this.actorFollow.node.x;
        this.node.y = viewH * 0.5 - this.actorFollow.node.y;
    },
});
