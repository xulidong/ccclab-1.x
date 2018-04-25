/**
 *  玩家组件
 */
cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
        this.actor = null; // 玩家的角色
    },
    
    setActor (actor) {
        this.actor = actor;
    }
});
