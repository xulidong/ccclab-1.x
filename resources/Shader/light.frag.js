module.exports =
`
#ifdef GL_ES
precision lowp float;
#endif

varying vec2 v_texCoord;
void main()
{
    vec4 textColor = texture2D(CC_Texture0, v_texCoord);
    float gray = dot(textColor.rgb, vec3(0.3, 0.59, 0.11));
    float intensify = (gray + 1.0) * 2.0;
    gl_FragColor = textColor * intensify;
}
`
