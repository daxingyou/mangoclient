module.exports = 

`
#ifdef GL_ES
precision lowp float;
#endif
varying vec4 v_fragmentColor;
varying vec2 v_texCoord;

void main()
{
    vec4 c =  texture2D(CC_Texture0, v_texCoord);
    
    if(v_texCoord.x < 0.043 || v_texCoord.y < 0.043 || abs(1.0-v_texCoord.x)< 0.043 || abs(1.0-v_texCoord.y)< 0.043 )
    {
        gl_FragColor = vec4(1,0,0,1);
        return;
    }

    gl_FragColor = c;
}
`