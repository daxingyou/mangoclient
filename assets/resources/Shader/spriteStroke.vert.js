/*
 * @Author: liuguolai 
 * @Date: 2018-12-10 16:24:58 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-12-10 16:27:11
 * 描边
 */
module.exports = `
attribute vec4 a_position;
attribute vec2 a_texCoord;
attribute vec4 a_color;

varying vec4 v_fragmentColor;
varying vec2 v_texCoord;

void main()
{
    gl_Position = CC_PMatrix * a_position;
    v_fragmentColor = a_color;
    v_texCoord = a_texCoord;
}
`