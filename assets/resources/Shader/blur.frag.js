/*
 * @Author: liuguolai 
 * @Date: 2018-12-01 16:39:20 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-12-01 17:09:25
 */
module.exports = `
#ifdef GL_ES
precision mediump float;
#endif

varying vec4 v_fragmentColor;
varying vec2 v_texCoord;

uniform vec2 blurSize;

void main() {
    vec4 sum = vec4(0.0);
    sum += texture2D(CC_Texture0, v_texCoord - 0.0004 * blurSize) * 0.05;
    sum += texture2D(CC_Texture0, v_texCoord - 0.0003 * blurSize) * 0.09;
    sum += texture2D(CC_Texture0, v_texCoord - 0.0002 * blurSize) * 0.12;
    sum += texture2D(CC_Texture0, v_texCoord - 0.0001 * blurSize) * 0.15;
    sum += texture2D(CC_Texture0, v_texCoord) * 0.16;
    sum += texture2D(CC_Texture0, v_texCoord + 0.0001 * blurSize) * 0.15;
    sum += texture2D(CC_Texture0, v_texCoord + 0.0002 * blurSize) * 0.12;
    sum += texture2D(CC_Texture0, v_texCoord + 0.0003 * blurSize) * 0.09;
    sum += texture2D(CC_Texture0, v_texCoord + 0.0004 * blurSize) * 0.05;

    gl_FragColor = sum * v_fragmentColor;
}
`