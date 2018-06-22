module.exports =
`
#ifdef GL_ES
precision mediump float;
#endif
uniform float saturation;
uniform float maxRadius;
uniform float minRadius;
uniform vec3 areaColor;
varying vec2 v_texCoord;
void main( void ) {
    vec2 uv = v_texCoord.xy;
    vec2 position = vec2(0.5 - uv.x, 0.5 - uv.y) * vec2(1.0, 1.0);
    float mold = length(position);
    vec4 tex = texture2D(CC_Texture0, uv);
    if (abs(mold) < maxRadius && abs(mold) > minRadius) {
        tex.r = areaColor.r;
        tex.g = areaColor.g;
        tex.b = areaColor.b;
        tex.a = (mold - minRadius) / (1.0 - minRadius) * saturation;
        gl_FragColor = tex;
    } 
}
`