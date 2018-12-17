/*
 * @Author: liuguolai 
 * @Date: 2018-12-10 16:27:30 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-12-10 20:54:00
 */
module.exports = `
varying vec4 v_fragmentColor;  
varying vec2 v_texCoord;  

uniform float outlineSize;  
uniform vec3 outlineColor;  
uniform vec2 textureSize;  
uniform float open;

int getIsStrokeWithAngel(float angel)  
{  
    int stroke = 0;  
    float rad = angel * 0.01745329252; // 这个浮点数是 pi / 180，角度转弧度  
    float a = texture2D(CC_Texture0, vec2(v_texCoord.x + outlineSize * cos(rad) / textureSize.x, v_texCoord.y + outlineSize * sin(rad) / textureSize.y)).a; // 这句比较难懂，outlineSize * cos(rad)可以理解为在x轴上投影，除以textureSize.x是因为texture2D接收的是一个0~1的纹理坐标，而不是像素坐标  
    // vec2 unit = 1.0 / textureSize.xy;//单位坐标
    // vec2 offset = vec2(outlineSize * cos(rad) * unit.x, outlineSize * sin(rad) * unit.y); //偏移量
    // float a = texture2D(CC_Texture0, v_texCoord + offset).a;
    if (a >= 0.5)// 我把alpha值大于0.5都视为不透明，小于0.5都视为透明  
    {  
        stroke = 1;  
    }  
    return stroke;  
} 

void main() {
    vec4 myC = texture2D(CC_Texture0, v_texCoord);
    if (open == 0.0 || myC.a >= 0.5)
    {  
        gl_FragColor = v_fragmentColor * myC;
        return;  
    }
    int strokeCount = 0;  
    strokeCount += getIsStrokeWithAngel(0.0);  
    strokeCount += getIsStrokeWithAngel(30.0);  
    strokeCount += getIsStrokeWithAngel(60.0);  
    strokeCount += getIsStrokeWithAngel(90.0);  
    strokeCount += getIsStrokeWithAngel(120.0);  
    strokeCount += getIsStrokeWithAngel(150.0);  
    strokeCount += getIsStrokeWithAngel(180.0);  
    strokeCount += getIsStrokeWithAngel(210.0);  
    strokeCount += getIsStrokeWithAngel(240.0);  
    strokeCount += getIsStrokeWithAngel(270.0);  
    strokeCount += getIsStrokeWithAngel(300.0);  
    strokeCount += getIsStrokeWithAngel(330.0); 

    if (strokeCount > 0) // 四周围至少有一个点是不透明的，这个点要设成描边颜色  
    {  
        myC.rgb = outlineColor; 
        myC.a = 1.0; 
    }  
  
    gl_FragColor = v_fragmentColor * myC;  
}
`

/*
`
varying vec4 v_fragmentColor;  
varying vec2 v_texCoord;  
uniform float outlineSize;  
uniform vec3 outlineColor;  
uniform vec2 textureSize;  
uniform vec3 foregroundColor;  

const float cosArray[12] = {1, 0.866, 0.5, 0, -0.5, -0.866, -0.1, -0.866, -0.5, 0, 0.5, 0.866};  
const float sinArray[12] = {0, 0.5, 0.866, 1, 0.866, 0.5, 0, -0.5, -0.866, -1, -0.866, -0.5};  

int getIsStrokeWithAngelIndex(int index)
{
    int stroke = 0;  
    float a = texture2D(CC_Texture0, vec2(v_texCoord.x + outlineSize * cosArray[index] / textureSize.x, v_texCoord.y + outlineSize * sinArray[index] / textureSize.y)).a;  
    if (a >= 0.5)
    {  
        stroke = 1;  
    }  

    return stroke;  
}  
  
void main()
{
    vec4 myC = texture2D(CC_Texture0, vec2(v_texCoord.x, v_texCoord.y));  
    myC.rgb *= foregroundColor;  
    if (myC.a >= 0.5)
    {  
        gl_FragColor = v_fragmentColor * myC;  
        return;  
    }  

    int strokeCount = 0;  
    strokeCount += getIsStrokeWithAngelIndex(0);  
    strokeCount += getIsStrokeWithAngelIndex(1);  
    strokeCount += getIsStrokeWithAngelIndex(2);  
    strokeCount += getIsStrokeWithAngelIndex(3);  
    strokeCount += getIsStrokeWithAngelIndex(4);  
    strokeCount += getIsStrokeWithAngelIndex(5);  
    strokeCount += getIsStrokeWithAngelIndex(6);  
    strokeCount += getIsStrokeWithAngelIndex(7);  
    strokeCount += getIsStrokeWithAngelIndex(8);  
    strokeCount += getIsStrokeWithAngelIndex(9);  
    strokeCount += getIsStrokeWithAngelIndex(10);  
    strokeCount += getIsStrokeWithAngelIndex(11);  

    bool stroke = false;  
    if (strokeCount > 0)
    {  
        stroke = true;  
    }  
  
    if (stroke)
    {  
        myC.rgb = outlineColor;  
        myC.a = 1.0;  
    }  
  
    gl_FragColor = v_fragmentColor * myC;  
}
`*/