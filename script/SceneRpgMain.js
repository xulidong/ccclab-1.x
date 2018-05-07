/**
 *  游戏主场景
 *  包含组件： compMap
 */

var Roker = require("Roker");

cc.Class({
    extends: cc.Component,

    properties: {
        ndRootMap: cc.Node,
        ndRootObj: cc.Node,
        ndRootOp: cc.Node,
        ndRootUI: cc.Node,
        roker: Roker,

        compMap: cc.Component,
    },

    onLoad () {
        game.setAsGlobal("sceneMain", this);
    },

    start () {
        this.onEnterScene();
    },

    onEnterScene () {
        this.loadPlayer();
        var mapId = 1000;// test map id
        this.compMap.loadMap(mapId);
    },


    loadPlayer () {
        // acotr
        var ndActor = new cc.Node();
        ndActor.parent = this.compMap.node;
        var actor = ndActor.addComponent("CompActor");
        actor.setActorPos(480, 320);

        // player
        var ndPlayer = new cc.Node();
        ndPlayer.parent = this.ndRootMap;
        var player = ndPlayer.addComponent("CompPlayer");
        player.setActor(actor);
        game.setAsGlobal("player", player);

        this.compMap.setActorFollow(actor);
        this.roker.setActor(actor);
    },
});
