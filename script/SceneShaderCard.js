var ShaderUtils = require("ShaderUtils");
var SceneBase = require("SceneBase");

cc.Class({
    extends: SceneBase,

    properties: {
        spBack: cc.Sprite,
        spFace: cc.Sprite,
    },

    onLoad : function(){
        // this.texBack = this._loadTexture("resources/texture/card_back.png");
        // this.texFace = this._loadTexture("resources/texture/card_back.png");

        // this.spBack.spriteFrame = new cc.SpriteFrame(this.texBack);
        // this.spFace.spriteFrame = new cc.SpriteFrame(this.texFace);

        // ShaderUtils.setShader(this.spBack, "card");
        ShaderUtils.setShader(this.spFace, "card");
    },

    _loadTexture: function(path) {
        var url = cc.url.raw(path);
        var tex = cc.textureCache.addImage(url);;
        return tex;
    },
});
