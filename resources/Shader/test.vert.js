module.exports =
`
attribute vec4 a_position;
attribute vec2 a_texCoord;
attribute vec4 a_color;

uniform float u_test;

varying vec4 v_fragmentColor;
varying vec2 v_texCoord;

void main()
{
    gl_Position = CC_PMatrix * a_position;
    v_fragmentColor = vec4(u_test, 0.0, 0.0, 1.0);
    v_texCoord = a_texCoord;
}
`
