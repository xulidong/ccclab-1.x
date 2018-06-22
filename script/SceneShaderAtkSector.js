var ShaderUtils = require("ShaderUtils");
var SceneBase = require("SceneBase");

cc.Class({
    extends: SceneBase,

    properties: {
        spAtkArena: cc.Sprite,
    },

    onLoad: function() {
        this.atkAreaInfo = {
            color: {x: 1, y: 0, z: 0},
            minR: 0.05,
            maxR: 0.3,
            dura: 1,
            angle: 45,
            forward: {x: 0, y: 1}
        };
        this.aaShaderPro = ShaderUtils.setShader(this.spAtkArena, "atk_sector");
    },

    update: function(dt) {
        if (!this.aaShaderPro || !this.atkAreaInfo) {
            return;
        }

        this.aaShaderPro.use();
        if (cc.sys.isNative) {
            var state = cc.GLProgramState.getOrCreateWithGLProgram(this.aaShaderPro);
            state.setUniformFloat('saturation', this.atkAreaInfo.dura);
            state.setUniformFloat('maxRadius', this.atkAreaInfo.maxR);
            state.setUniformFloat('minRadius', this.atkAreaInfo.minR);
            state.setUniformVec3('areaColor', this.atkAreaInfo.color);
            state.setUniformVec2('forward', this.atkAreaInfo.forward);
            state.setUniformFloat('sectorAngle', this.atkAreaInfo.angle);
        } else {
            var saturation = this.aaShaderPro.getUniformLocationForName('saturation');
            var maxRadius = this.aaShaderPro.getUniformLocationForName('maxRadius');
            var minRadius = this.aaShaderPro.getUniformLocationForName('minRadius');
            var areaColor = this.aaShaderPro.getUniformLocationForName('areaColor');
            var sectorAngle = this.aaShaderPro.getUniformLocationForName('sectorAngle');
            var forward = this.aaShaderPro.getUniformLocationForName('forward');

            this.aaShaderPro.setUniformLocationWith1f(saturation, this.atkAreaInfo.dura);
            this.aaShaderPro.setUniformLocationWith1f(maxRadius, this.atkAreaInfo.maxR);
            this.aaShaderPro.setUniformLocationWith1f(minRadius, this.atkAreaInfo.minR);
            this.aaShaderPro.setUniformLocationWith3f(areaColor, this.atkAreaInfo.color.x, this.atkAreaInfo.color.y, this.atkAreaInfo.color.z);
            this.aaShaderPro.setUniformLocationWith2f(forward, this.atkAreaInfo.forward.x, this.atkAreaInfo.forward.y);
            this.aaShaderPro.setUniformLocationWith1f(sectorAngle, this.atkAreaInfo.angle);
        }
    }
});
