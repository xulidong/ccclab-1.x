var ShaderUtils = require("ShaderUtils");

cc.Class({
    extends: cc.Component,

    properties: {
        sp: sp.Skeleton
    },

    onLoad: function () {
        ShaderUtils.setShader(this.sp, "gray");
    },
});
