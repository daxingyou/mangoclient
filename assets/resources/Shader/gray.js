var gray = {
    name : 'gray',
    defines: [],
    vert : `uniform mat4 viewProj;
            attribute vec4 a_position;
            attribute vec4 a_color;
            attribute vec2 a_texCoord;
            varying vec4 v_fragmentColor; 
            varying vec2 v_texCoord; 
            void main() 
            { 
                gl_Position = viewProj * vec4(a_position,1);
                v_fragmentColor = a_color; 
                v_texCoord = a_texCoord; 
            }`,
    frag : `uniform sampler2D texture;
            varying vec4 v_fragmentColor;
            varying vec2 v_texCoord;
            void main()
            {
                vec4 c = v_fragmentColor * texture2D(texture, v_texCoord);
                gl_FragColor.rgb = vec3(0.2126*c.r + 0.7152*c.g + 0.0722*c.b);
                gl_FragColor.a = c.a;
            }`,
}

module.exports = gray;