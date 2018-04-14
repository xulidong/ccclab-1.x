module.exports =
`
attribute vec4 a_position;
attribute vec2 a_texCoord;
attribute vec4 a_color;
varying vec4 v_fragmentColor;
varying vec2 v_texCoord;
void main()
{
    vec4 v = vec4(a_position);
    v_fragmentColor = a_color;
    v_texCoord = a_texCoord;
    if (v.x > 250.0 && v.y > 0.0) {
        v.x -= 250.0;
    }
    gl_Position = CC_PMatrix * v;
}
`
