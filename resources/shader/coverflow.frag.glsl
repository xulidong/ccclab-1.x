#ifdef GL_ES
precision mediump float;
#endif
varying vec2 v_texCoord;
uniform float u_scale;
uniform float u_dir;
void main()
{
    float x = v_texCoord.x;
    float y = v_texCoord.y;
    vec4 v;
    if (u_dir < 0.0) {
        if((y - (1.0 - u_scale) / 2.0 * x) / (1.0 - x + u_scale * x) > 1.0) discard;
        if((y - (1.0 - u_scale) / 2.0 * x) / (1.0 - x + u_scale * x) < 0.0) discard;
        v = texture2D(CC_Texture0, vec2(v_texCoord.x, (y - (1.0 - u_scale) / 2.0 * x) / (1.0 - x + u_scale * x))).rgba;
    } else if (u_dir > 0.0){
        if((y + (1.0 - u_scale) / 2.0 * x - (1.0 - u_scale) / 2.0) / ( u_scale + (1.0 - u_scale) * x) > 1.0) discard;
        if((y + (1.0 - u_scale) / 2.0 * x - (1.0 - u_scale) / 2.0) / ( u_scale + (1.0 - u_scale) * x) < 0.0) discard;
        v = texture2D(CC_Texture0, vec2(v_texCoord.x, (y + (1.0 - u_scale) / 2.0 * x - (1.0 - u_scale) / 2.0) / ( u_scale + (1.0 - u_scale) * x))).rgba;
    } else {
        v = texture2D(CC_Texture0, v_texCoord);
    }
    gl_FragColor = vec4(v.r, v.g, v.b, v.a);
}