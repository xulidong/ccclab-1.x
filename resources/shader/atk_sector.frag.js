module.exports =
`
#ifdef GL_ES
precision mediump float;
#endif
uniform float sectorAngle;
uniform float saturation;
uniform float maxRadius;
uniform float minRadius;
uniform vec2 forward;
uniform vec3 areaColor;
uniform vec2 obstacleStart;
uniform vec2 obstacleSize;
varying vec2 v_texCoord;
float calulateAngle (vec2 posA, vec2 posB) {
    float pro = dot(posA, posB);
    float radian = acos( pro / (length(posA) * length(posB)) );
    float angle = degrees(radian);
    return angle;
}
void main( void ) {
    vec2 uv = v_texCoord.xy;
	vec2 position = vec2(0.5 - uv.x, 0.5 - uv.y) * vec2(1.0, 1.0);
	float mold = length(position);
    float angle = abs(calulateAngle(position, forward));

	if (abs(mold) < maxRadius && abs(mold) > minRadius && angle < sectorAngle) {
        gl_FragColor = vec4(areaColor.rgb, (mold - minRadius) / (1.0 - minRadius) * saturation);
    }
}
`