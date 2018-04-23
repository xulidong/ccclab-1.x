module.exports =
`
#ifdef GL_ES
precision lowp float;
#endif

uniform float time;
uniform vec2 resolution;
varying vec2 v_texCoord;

vec2 s(vec2 p)
{
    float d = time * 0.2;
    float x = 8.0 * (p.x + d);
    float y = 8.0 * (p.y + d);
    float a = cos(x - y) * cos(y);
    float b = sin(x + y) * sin(y);
    return vec2(a, b);
}

void main()
{
    vec2 rs = resolution.xy;
    vec2 uv = v_texCoord.xy;
    vec2 p =  uv + 2.0 / resolution.x * (s(uv) - s(uv + rs));
    gl_FragColor = texture2D(CC_Texture0, p);
}
`
