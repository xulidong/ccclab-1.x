/**
 * used to change the shader of sprite
 * e.g. ShaderUtils.useShader(cc.Sprite, shader name);
 */

var ShaderUtils = {
	shaderMap: {}, // shader string map
	shaderPrograms: {},	//shader propgram map

	getGlPropgram: function(vert, frag) {
		var glProgram = new cc.GLProgram();
		glProgram.initWithString(vert, frag);
		if (!cc.sys.isNative) {  
			glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);  
			glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);  
			glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);  
		}
		glProgram.link();  
		glProgram.updateUniforms();
		return glProgram;
	},

	// sync
	setShader: function(sprite, shaderName) {
		var glProgram = this.shaderPrograms[shaderName];
		if (!glProgram) {
			var vert = require(cc.js.formatStr("%s.vert", shaderName));
			var frag = require(cc.js.formatStr("%s.frag", shaderName));
			glProgram = this.getGlPropgram(vert, frag);
			this.shaderPrograms[shaderName] = glProgram;
		}
		sprite._sgNode.setShaderProgram(glProgram);
		return glProgram;
	},

	// async
	useShader: function(sprite, shaderName, cb) {
		var glProgram = this.shaderPrograms[shaderName];
		if (glProgram) {
			sprite._sgNode.setShaderProgram(glProgram);
			if (cb) {
				cb(glProgram);
			}
			return;
		}

		// vart shader
		var vert = cc.js.formatStr("shader/%s.vert", shaderName);
		if (this.shaderMap[vert]) {
			this.onLoadShader(vert, shaderName, cb);
		} else {
			cc.loader.loadRes(vert, function (err, shaderStr){
				if (err) {
					console.error('load %s fail, error: ', err);
					return;
				}
				this.shaderMap[vert] = shaderStr;
				this.onLoadShader(sprite, shaderName, cb);
			}.bind(this));
		}

		// frag shader
		var frag = cc.js.formatStr("shader/%s.frag", shaderName);
		if (this.shaderMap[frag]) {
			this.onLoadShader(frag, shaderName, cb);
		} else {
			cc.loader.loadRes(frag, function (err, shaderStr){
				if (err) {
					console.error('load %s fail, error: ', err);
					return;
				}
				this.shaderMap[frag] = shaderStr;
				this.onLoadShader(sprite, shaderName, cb);
			}.bind(this));
		}
	},

	onLoadShader: function(sprite, shaderName, cb) {
		var vert = cc.js.formatStr("shader/%s.vert", shaderName);
		var frag = cc.js.formatStr("shader/%s.frag", shaderName);
		if (this.shaderMap[vert] && this.shaderMap[frag]) {
			var glProgram = this.getGlPropgram(this.shaderMap[vert], this.shaderMap[frag]);
			this.shaderPrograms[shaderName] = glProgram;
			sprite._sgNode.setShaderProgram(glProgram);
			if (cb) {
				cb(glProgram);
			}
		}
	}
};

module.exports = ShaderUtils;
