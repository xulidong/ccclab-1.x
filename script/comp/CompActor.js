/**
 *  角色组件
 */
cc.Class({
    extends: cc.Component,

    onLoad () {
        this.body = this.node.addComponent(cc.Sprite);
        var url = cc.url.raw('resources/texture/cross.png');
        this.body.spriteFrame = new cc.SpriteFrame(url);
    },

    setActorPos: function (x, y) {
        this.node.setPosition(x, y);
    },
});
