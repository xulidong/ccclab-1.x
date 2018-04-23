var ShaderUtils = require("ShaderUtils");
var SceneBase = require("SceneBase");

cc.Class({
    extends: SceneBase,

    properties: {
        spSea: cc.Sprite,
    },

    onLoad : function(){
        this.startTime = Date.now();
        this.time = 0;
        this.resolution = { 
            x: this.node.width, 
            y: this.node.height,
        };

        this.program = ShaderUtils.setShader(this.spSea, "wave");
        // 初始化 shader 中的变量
        this.program.use();
        if (cc.sys.isNative) {
            var glState = cc.GLProgramState.getOrCreateWithGLProgram(this.program);
            glState.setUniformFloat("time", this.time);
            glState.setUniformVec2( "resolution", this.resolution);
        } else {
            let res = this.program.getUniformLocationForName( "resolution" );
            let ba = this.program.getUniformLocationForName("time");
            this.program.setUniformLocationWith2f(res, this.resolution.x,this.resolution.y);
            this.program.setUniformLocationWith1f(ba, this.time);
        }
    },

    update: function(dt) {
        this.time = (Date.now() - this.startTime) / 1000;
        if (this.program) {
            this.program.use();
            if (cc.sys.isNative) {
                var glState = cc.GLProgramState.getOrCreateWithGLProgram(this.program);
                glState.setUniformFloat("time", this.time);
            } else {
                this.program.setUniformLocationWith1f(this.program.getUniformLocationForName("time"), this.time);
            }
        }
    }
});
