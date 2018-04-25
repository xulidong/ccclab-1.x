/**
 * 游戏入口
 * 全局变量需要在这个类里面初始化
 */

cc.Class({
    extends: cc.Component,

    onLoad () {
        this.initGame();
    },

    start () {
        this.startGame();
    },

    initGame () {
        // 全局变量初始化一下，防止出现为声明变量的错误，同时也方便写个注释
        window.game = null; // 游戏应用对象
        window.mainScene = null; // 游戏主场景
        window.player = null; // 玩家对象

        // utils
        window.MathUtils = require("MathUtils");

        // 将当前节点添加为[常驻节点]
        cc.game.addPersistRootNode(this.node);

        // 将当前节点设为全局对象 game
        this.setAsGlobal("game", this);
    },

    startGame () {
        cc.director.loadScene("SceneRpgMain");
    },

    // 全局表里统一在这里设置
    setAsGlobal (key, val) {
        window[key] = val;
    },
});
