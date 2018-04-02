var ShaderUtils = require("ShaderUtils");


cc.Class({
	extends: cc.Component,

	properties: {
		sp: cc.Sprite
	},

	onClickDefault: function() {
		ShaderUtils.setShader(this.sp, "default");
	},

	onClickGray: function() {
		ShaderUtils.setShader(this.sp, "gray");
	},

	onClickAlpha: function(){
		this.sp.node.opacity = 128;
	},

	onClickNoAlpha: function(){
		this.sp.node.opacity = 255;
	},

	onClickOutline: function(){
		ShaderUtils.setShader(this.sp, "outline");
	},

	onClickLight: function(){
		ShaderUtils.setShader(this.sp, "light");
	},

	onClickBlur: function(){
		ShaderUtils.setShader(this.sp, "blur");
	},

	onClickOutlight: function(){
		ShaderUtils.setShader(this.sp, "outlight");
	},

	onClickTest: function(){
		ShaderUtils.setShader(this.sp, "test");
	},
});
