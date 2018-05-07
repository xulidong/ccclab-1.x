/**
 * 小地图组件
 */
cc.Class({
    extends: cc.Component,

    onLoad () {
        // mini map
        var ndMap = new cc.Node();
        ndMap.scale = 0.2;
        ndMap.setAnchorPoint(0, 0);
        ndMap.parent = sceneMain.ndRootMap;
        this.spMap = ndMap.addComponent(cc.Sprite);

        this.wid = ndMap.addComponent(cc.Widget);
        this.wid.isAlignOnce = false;
        this.wid.isAlignTop = true;
        this.wid.isAlignRight = true;

        // preload player flag
        var ndPlayer  = new cc.Node;
        ndPlayer.setLocalZOrder(1);
        ndPlayer.parent = ndMap;
        ndPlayer.active = false;

        this.spPlayer = ndPlayer.addComponent(cc.Sprite);
        var path = "resources/texture/player.png";
        var url = cc.url.raw(path);
        this.spPlayer.spriteFrame = new cc.SpriteFrame(url); 
        this.spPlayer.sizeMode = cc.Sprite.SizeMode.RAW;
        this.spPlayer.trim = true;
    },

    setMapId (mapId) {
        this.mapId = mapId;
        var path = cc.js.formatStr("resources/texture/map_%s/mini_map.jpg", this.mapId);
        var url = cc.url.raw(path);
        this.spMap.spriteFrame = new cc.SpriteFrame(url); 
        this.spMap.sizeMode = cc.Sprite.SizeMode.RAW;
        this.spMap.trim = false;
        this.wid.top = 0;
        this.wid.right = 0;
    },

    pos2miniMap (pos) {
        var p = {};
        var size = sceneMain.compMap.node.getContentSize();
        p.x = Math.floor(pos.x * this.spMap.node.width / size.width);
        p.y = Math.floor(pos.y * this.spMap.node.height / size.height);
        return p;
    },

    update (dt) {
        if (player) {
            this.spPlayer.node.active = true;
            var pos = this.pos2miniMap(player.actor.node.getPosition());
            this.spPlayer.node.setPosition(pos.x, pos.y);
        } else {
            this.spPlayer.node.active = false;
        }
    },
});
