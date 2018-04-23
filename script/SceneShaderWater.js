var ShaderUtils = require("ShaderUtils");
var SceneBase = require("SceneBase");

cc.Class({
    extends: SceneBase,

    properties: {
        spSea: cc.Sprite,
        spfNor: cc.SpriteFrame,
    },

    onLoad : function(){
        this.time = {
            x: 0.0,
            y: 0.0
        };
        this.resolution = { 
            x: this.node.width, 
            y: this.node.height,
        };

        this.program = ShaderUtils.setShader(this.spSea, "water");
        // 初始化 shader 中的变量
        if (cc.sys.isNative) {
            this.program.use();
            var glState = cc.GLProgramState.getOrCreateWithGLProgram(this.program);
            glState.setUniformVec2("time", this.time);
            glState.setUniformTexture("u_normalMap", this.spfNor.getTexture());
        }
    },

    update: function(dt) {
        this.time.y = Math.sin(cc.director.getTotalFrames() * cc.director.getAnimationInterval()) * 0.5;
        this.time.x = this.time.y / 10;
        if (this.program) {
            if (cc.sys.isNative) {
                this.program.use();
                var glState = cc.GLProgramState.getOrCreateWithGLProgram(this.program);
                glState.setUniformVec2("time", this.time);
            }
        }
    }
});
