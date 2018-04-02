module.exports =
`
#ifdef GL_ES
precision lowp float;
#endif

varying vec2 v_texCoord;
varying vec4 v_fragmentColor;

void main()
{
    vec3 u_outlineColor = vec3(1.0, 1.0, 0.0);
    float radius = 0.002;
    float u_threshold = 1.75;
    vec4 accum = vec4(0.0);
    vec4 normal = vec4(0.0);
    
    normal = texture2D(CC_Texture0, vec2(v_texCoord.x, v_texCoord.y));
    
    accum += texture2D(CC_Texture0, vec2(v_texCoord.x - radius, v_texCoord.y - radius));
    accum += texture2D(CC_Texture0, vec2(v_texCoord.x + radius, v_texCoord.y - radius));
    accum += texture2D(CC_Texture0, vec2(v_texCoord.x + radius, v_texCoord.y + radius));
    accum += texture2D(CC_Texture0, vec2(v_texCoord.x - radius, v_texCoord.y + radius));
    
    accum *= u_threshold;
    accum.rgb = u_outlineColor * accum.a;
    
    normal = ( accum * (1.0 - normal.a)) + (normal * normal.a);
    
    gl_FragColor = v_fragmentColor * normal;
}
`
