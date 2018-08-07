/**
 *      shader Utils
 *      by pwh
 */

cc.Class({
    extends: cc.Component,

    properties: {
        left : 0.1,
        right : 0.2,
        _shaderPrograms :null,
    },

    start : function()
    {
        var sprite = this.node.getComponent(cc.Sprite);
        this.setShader(sprite,'wsword');
    },
    setShader: function(sprite, shaderName) {
        
        var glProgram = new cc.GLProgram();
        var vert = require(cc.js.formatStr("%s.vert", shaderName));
        var frag = require(cc.js.formatStr("%s.frag", shaderName));
        glProgram.initWithString(vert, frag);

        glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);  
        glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);  
        glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);  
        
        glProgram.link();  
        glProgram.updateUniforms();

        var left = glProgram.getUniformLocationForName('left');
        var right = glProgram.getUniformLocationForName('right');

        glProgram.setUniformLocationWith1f(left,this.left);
        glProgram.setUniformLocationWith1f(right,this.right);

        //sprite._sgNode.setShaderProgram(glProgram);
        this.setProgram( sprite._sgNode,glProgram);
    },
    setProgram:function(node,program){
        /*if(cc.sys.isNative){
            var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(program);
            node.setGLProgramState(glProgram_state);
        }
        else*/
        {
            node.setShaderProgram(program);
        }
    }
})
