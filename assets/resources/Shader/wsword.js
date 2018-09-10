var wsword = {
    name : 'wsword',
    defines: [],
    vert : `uniform mat4 viewProj;
            attribute vec4 a_position;
            attribute vec2 a_texCoord;
            attribute vec4 a_color;
            varying vec4 v_fragmentColor; 
            varying vec2 v_texCoord; 
            void main() 
            { 
                gl_Position = viewProj * vec4(a_position,1);
                v_fragmentColor = a_color; 
                v_texCoord = a_texCoord; 
            }
            `,
    frag :  `#ifdef GL_ES
            precision lowp float;
            #endif
            
            uniform sampler2D texture;
            varying vec4 v_fragmentColor;
            varying vec2 v_texCoord;
            
            uniform float left;
            uniform float right;
            
            bool inPoint(vec2 uv)
            {
                float max;
                float min;
            
                if(left > right)
                {
                    max = left;
                    min = right;
                }
                else
                {
                    max = right;
                    min = left;
                }
            
                if(uv.y <= min)
                    return false;
                else if(uv.y >= max)
                    return true;
                else{
                    float z = left;
                    float k = right - z;
            
                    float tempy = k * uv.x + z;
            
                    if(uv.y >= tempy)
                        return true;
                }
                
                return false;
            }
            
            void main()
            {
                vec4 c = v_fragmentColor * texture2D(texture, v_texCoord);
                gl_FragColor.xyz = c.xyz;
                gl_FragColor.w = c.w;
                
                if(inPoint(v_texCoord))
                {
                    gl_FragColor.w = 0.0;
                }
                else{
                    gl_FragColor.w = c.w;
                }
                
            }
            `,
}

module.exports = wsword;