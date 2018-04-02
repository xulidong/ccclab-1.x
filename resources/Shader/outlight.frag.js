module.exports =
`
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_texture;
varying vec2 v_texCoord;
varying vec4 v_fragmentColor;

void main(void)  
{
    vec2 pix_size = vec2(0.0083, 0.0083);
	vec4 sum = vec4(0, 0, 0, 0);
	sum += texture2D(u_texture, v_texCoord - 4.0 * pix_size) * 0.05;
	sum += texture2D(u_texture, v_texCoord - 3.0 * pix_size) * 0.09;
	sum += texture2D(u_texture, v_texCoord - 2.0 * pix_size) * 0.12;
	sum += texture2D(u_texture, v_texCoord - 1.0 * pix_size) * 0.15;
	sum += texture2D(u_texture, v_texCoord                 ) * 0.16;
	sum += texture2D(u_texture, v_texCoord + 1.0 * pix_size) * 0.15;
	sum += texture2D(u_texture, v_texCoord + 2.0 * pix_size) * 0.12;
	sum += texture2D(u_texture, v_texCoord + 3.0 * pix_size) * 0.09;
	sum += texture2D(u_texture, v_texCoord + 4.0 * pix_size) * 0.05;

    float gray = dot(sum.rgb, vec3(0.3, 0.59, 0.11));  
    float new_intensity = (gray + 1.0) * 2.0;
    gl_FragColor = sum * new_intensity; 
}
`
