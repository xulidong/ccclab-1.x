module.exports =
`
#ifdef GL_ES
precision lowp float;
#endif

varying vec4 v_fragmentColor;
varying vec2 v_texCoord;

uniform vec2 time;
uniform sampler2D u_normalMap;


vec3 waveNormal(vec2 p) {
    vec3 normal = texture2D(u_normalMap, p).xyz;
    normal = normal * 2.0 - 1.0;
    return normalize(normal);
}

void main() {
    float timeFactor = 0.1;
    float offsetFactor = 0.5;
    float refractionFactor = 0.66;

    // simple UV animation
    vec3 normal = waveNormal(v_texCoord + vec2(time.y * timeFactor, time.x * timeFactor));

    // simple calculate refraction UV offset
    vec2 p = 2.0 * v_texCoord - 1.0;
    vec3 eyePos = vec3(0.0, 0.0, 10.0); // 眼睛位置 位于中心点正上方
    vec3 inVec = normalize(vec3(p, 0.0) - eyePos);
    vec3 refractVec = refract(inVec, normal, refractionFactor);  // 根据入射向量，法线，折射系数计算折射向量
    vec2 v_texCoordN = v_texCoord;
    v_texCoordN += refractVec.xy * offsetFactor;
    v_texCoordN.x -= time.y * timeFactor * 0.6; //移动水面贴图，可选
    gl_FragColor = texture2D(CC_Texture0, v_texCoordN);
}

`