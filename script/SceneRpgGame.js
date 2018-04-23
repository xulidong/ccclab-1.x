/**
 * 游戏入口
 * 全局变量需要在这个类里面初始化
 */

cc.Class({
    extends: cc.Component,

    onLoad () {
        this.initGame();
    },

    start: function() {
        this.startGame();
    },

    initGame: function() {
        // 将当前节点添加为[常驻节点]
        cc.game.addPersistRootNode(this.node);

        // 将当前节点设为全局对象 game
        window.game = this;
    },

    startGame: function() {
        cc.director.loadScene("SceneRpgMain");
    },
});
