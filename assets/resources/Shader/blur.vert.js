/*
 * @Author: liuguolai 
 * @Date: 2018-12-01 16:38:21 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-12-01 17:00:49
 * 模糊
 */
module.exports = `
attribute vec4 a_position;
attribute vec2 a_texCoord;
attribute vec4 a_color;


#ifdef GL_ES
varying lowp vec4 v_fragmentColor;
varying mediump vec2 v_texCoord;
#else
varying vec4 v_fragmentColor;
varying vec2 v_texCoord;
#endif


void main()
{
    gl_Position = CC_PMatrix * a_position;
    v_fragmentColor = a_color;
    v_texCoord = a_texCoord;
}
`