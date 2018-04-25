/**
 * 地图管理组件
 */

cc.Class({
    extends: cc.Component,

    onLoad () {
        // tiles
        this.tileList = [
            "resources/texture/tile/tile0.png",
            "resources/texture/tile/tile1.png",
            "resources/texture/tile/tile2.png",
        ];
         // tile width and height
         this.tileW = 64;
         this.tileH = 64;
 
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

    loadTile (path) {
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
        var fromX = cX - Math.ceil(this.cntX / 2);
        var fromY = cY - Math.floor(this.cntY / 2);
        for (var x = fromX; x <= fromX + this.cntX; x++) {
            for (var y = fromY; y <= fromY + this.cntY; y++) {
                var key = this.getCacheKey(x, y);
                var tile = this.getTileByKey(key);
                if (!tile) {
                    var index = MathUtils.randInt(0, this.tileList.length - 1);
                    tile = this.loadTile(this.tileList[index]);
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
        return cc.js.formatStr("(%s,%s)", x, y);
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
        this.node.x = -this.actorFollow.node.x;
        this.node.y = - this.actorFollow.node.y;
    },
});
