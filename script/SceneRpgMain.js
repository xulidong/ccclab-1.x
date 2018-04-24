var Roker = require("Roker");

cc.Class({
    extends: cc.Component,

    properties: {
        ndRootMap: cc.Node,
        ndRootObj: cc.Node,
        ndRootOp: cc.Node,
        ndRootUI: cc.Node,
        roker: Roker,
    },

    onLoad: function() {
        this.initData();
    },

    start: function() {
        this.onEnterScene();
    },

    initData: function () {
        // tile width and height
        this.tileW = 64;
        this.tileH = 64;

        // count of tile on x and y
        this.cntX = Math.ceil(this.ndRootMap.width/this.tileW);
        this.cntY = Math.ceil(this.ndRootMap.height/this.tileH);

        // {'(x,y)': sprite}
        this.showTileMap = {};
    },

    update: function(dt) {
        if (this.player) {
            this.updateMap();
        }
    },

    loadTile: function(path) {
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

    onEnterScene: function() {
        this.player = this.loadPlayer();
        this.updateMap();

        this.roker.setPlayer(this.player.node);
    },

    loadPlayer: function() {
        var node = new cc.Node();
        node.parent = this.ndRootMap;
        node.x = 0;
        node.y = 0;

        var sprite = node.addComponent(cc.Sprite);
        var url = cc.url.raw('resources/texture/cross.png');
        sprite.spriteFrame = new cc.SpriteFrame(url); 

        return sprite;;
    },

    getCacheKey: function(x, y) {
        return cc.js.formatStr("(%s,%s)", x, y);
    },

    getTileByKey: function(key) {
        return this.showTileMap[key];
    },

    setTileByKey: function(key, tile) {
        this.showTileMap[key] = tile;
    },

    clearShowTile: function (curShow) {
        for (var key in this.showTileMap) {
            if (!curShow[key]) {
                var tile = this.showTileMap[key];
                tile.destroy();
                delete this.showTileMap[key];
            }
        }
    },

    updateMap: function() {
        var center = this.player.node.getPosition();
        var cX = Math.floor(center.x/this.tileW);
        var cY = Math.floor(center.y/this.tileH);

        var curShow = {};
        var fromX = Math.max(cX - Math.floor(this.cntX / 2), 0);
        var fromY = Math.max(cY - Math.floor(this.cntY / 2), 0);
        for (var x = fromX; x <= fromX + this.cntX; x++) {
            for (var y = fromY; y <= fromY + this.cntY; y++) {
                var key = this.getCacheKey(x, y);
                var tile = this.getTileByKey(key);
                if (!tile) {
                    tile = this.loadTile('resources/texture/tile.png');
                    tile.node.parent = this.ndRootMap;
                    tile.node.setPosition(x * this.tileW, y * this.tileH);
                    this.setTileByKey(key, tile);
                }
                curShow[key] = true;
            }
        }
        this.clearShowTile(curShow);
    },
});
