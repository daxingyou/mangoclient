/**
 *      shader Utils
 *      by pwh
 */

var ShaderUtils = {
    shaderPrograms: {},

    setShader: function(sprite, shaderName) {
        
        var glProgram = this.shaderPrograms[shaderName];

        if (!glProgram) {

            glProgram = new cc.GLProgram();
            var vert = require(cc.js.formatStr("%s.vert", shaderName));
            var frag = require(cc.js.formatStr("%s.frag", shaderName));
            glProgram.initWithString(vert, frag);
/*
            if(cc.sys.isNative)
            {
                this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
                this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
                this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
    
                this._program.link();
                this._program.updateUniforms();
            }
            else*/
            {
                //var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(glProgram);
                //glProgram.setUniformLocationWith1f

                //glProgram.initWithVertexShaderByteArray(vert, frag);
                glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);  
                glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);  
                glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);  
                
                glProgram.link();  
                glProgram.updateUniforms();
            }

            this.shaderPrograms[shaderName] = glProgram;
        }

        //sprite._sgNode.setShaderProgram(glProgram);
        this.setProgram( sprite._sgNode,glProgram);
        return glProgram;
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
};

module.exports = ShaderUtils;