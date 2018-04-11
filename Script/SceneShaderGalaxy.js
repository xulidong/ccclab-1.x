var ShaderUtils = require("ShaderUtils");
var SceneBase = require("SceneBase");

cc.Class({
    extends: SceneBase,

    properties: {
        sp: cc.Sprite,
    },

    onLoad : function(){
        this._time = 0;
        this._sin = 0;

        this._program = ShaderUtils.setShader(this.sp, "galaxy");
    },

    update (dt) {
        this._time += 2 * dt;
        this._program.use();
        this._sin = Math.sin(this._time);
        if(this._sin > 0.99){
            this._sin = 0;
            this._time = 0;
        }        
        this._program.setUniformLocationWith1f(this._program.getUniformLocationForName("sys_time"), this._sin);
    },
});
