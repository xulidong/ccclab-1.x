var ShaderUtils = {
	shaderPrograms: {},

	setShader: function(node, shaderName) {
		var glProgram = this.shaderPrograms[shaderName];
		if (!glProgram) {
			glProgram = new cc.GLProgram();
			var vert = require(cc.js.formatStr("%s.vert", shaderName));
			var frag = require(cc.js.formatStr("%s.frag", shaderName));
			glProgram.initWithString(vert, frag);
			if (!cc.sys.isNative) {  
				glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);  
				glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);  
				glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);  
				glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS); 
			}
			glProgram.link();  
			glProgram.updateUniforms();
			this.shaderPrograms[shaderName] = glProgram;
		}
		node._sgNode.setShaderProgram(glProgram);
		return glProgram;
	},

};

module.exports = ShaderUtils;
