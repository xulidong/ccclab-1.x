var SceneBase = require("SceneBase");
var ShaderUtils = require("ShaderUtils");

cc.Class({
    extends: SceneBase,

    properties: {
        sp: sp.Skeleton
    },

    onLoad: function () {
        ShaderUtils.setShader(this.sp, "gray");
    },
});
