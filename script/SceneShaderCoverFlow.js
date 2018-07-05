var ShaderUtils = require("ShaderUtils");
var SceneBase = require("SceneBase");

cc.Class({
    extends: SceneBase,

    properties: {
        spCoverList: {
            default: [],
            type: cc.Sprite
        },
    },

    onLoad : function(){
        this.startX = null;

        this.glProgramList = [];
        for (var i = 0; i < this.spCoverList.length; i++) {
            ShaderUtils.useShader(this.spCoverList[0], "coverflow", function(glProgram) {
                this.glProgramList.push(glProgram);
                if (this.glProgramList.length === this.spCoverList.length) {
                    this.updateShader();
                }
            }.bind(this));
        }

        this.addTouchEvent();
    },

    addTouchEvent: function() {
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            this.onTouchStart(event);
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            this.onTouchMove(event);
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            this.onTouchEnd(event);
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            this.onTouchCancle(event);
        }, this);
    },

    onTouchStart: function(event) {
        this.startX = event.touch.getLocationX();
    },

    onTouchMove: function(event) {
        var moveX = event.touch.getLocationX();
        var delta = moveX - this.startX;
        var canMove = false;
        var tmp = 0;
        for (var i = 0; i < this.spCoverList.length; i++) {
            var sp = this.spCoverList[i];
            var x = sp.node.x + delta;
            if (tmp) {
                if(tmp * x < 0) {
                    canMove = true;
                }
            } else {
                tmp = x < 0 ? -1 : 1;
            }
        }
        if (canMove) {
            for (var i = 0; i < this.spCoverList.length; i++) {
                var sp = this.spCoverList[i];
                var x = sp.node.x + delta;
                sp.node.x = x;
            }
        }
        this.startX = moveX;
    },

    onTouchEnd: function(event) {
        this.startX = null;
    },

    onTouchCancle: function(event) {
        this.startX = null;
    },

    updateShader: function() {
        for (var i = 0; i < this.spCoverList.length; i++) {
            var glProgram = this.glProgramList[i];
            if (glProgram) {
                glProgram.use();
                var sp = this.spCoverList[i];
                var x = sp.node.x;
                var w = sp.node.width;
                var dir = 0;
                var scale = 1;
                if (x > w) {
                    dir = 1;
                    scale = 0.5;
                } else if (x < -w) {
                    dir = -1;
                    scale = 0.5;
                }
                cc.log(i, dir, scale);
                if (cc.sys.isNative) {
                    var gState = cc.GLProgramState.getOrCreateWithGLProgram(glProgram);
                    gState.setUniformFloat( "u_scale" , scale);
                    gState.setUniformFloat( "u_dir" , dir);
                } else if (cc._renderType === cc.game.RENDER_TYPE_WEBGL){
                    var u_scale = glProgram.getUniformLocationForName("u_scale");
                    glProgram.setUniformLocationWith1f(u_scale, scale);
    
                    var u_dir = glProgram.getUniformLocationForName("u_dir");
                    glProgram.setUniformLocationWith1f(u_dir, dir);
                }
            }
        }
    },

    update: function(dt) {
        if (this.startX === null) {
            return;
        }
        this.updateShader();
    },
});
