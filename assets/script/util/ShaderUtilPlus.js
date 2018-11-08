cc.Class({
    extends: cc.Component,

    properties: {
       texture1 : cc.SpriteFrame,
       texture2 : cc.SpriteFrame
    },

    onLoad () {
        this.enabled = false;
    },

    start () {

    },

    // update (dt) {},

    setShader: function(sprite, shaderName){
        let tex1 = this.texture1.getTexture();
        if(tex1 != null)
        {
            let gltex1 = tex1.glID;

            if(cc.sys.isNative)
            {

            }
            else{
                cc.glBindTexture2DN(1, tex1);
            }
        }   

        this.program = new cc.GLProgram();
        var vert = require(cc.js.formatStr("%s.vert", shaderName));
        var frag = require(cc.js.formatStr("%s.frag", shaderName));

        if (cc.sys.isNative) {
            this.program.initWithString(vert, frag);
        } else {
            this.program.initWithVertexShaderByteArray(vert, frag);
            this.program.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
            this.program.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
            this.program.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
        }

        this.program.link();
        this.program.updateUniforms();
        this.program.use();

        if (cc.sys.isNative) {
            var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this.program);
            //glProgram_state.setUniformFloat("time", this.time);
            glProgram_state.setUniformTexture("texture1", gltext1);
        } else {
           // let ba = this.program.getUniformLocationForName("time");
            let text1 = this.program.getUniformLocationForName("texture1");
            //this.program.setUniformLocationWith1f(ba, this.time);
            this.program.setUniformLocationWith1i(text1, 1);
        }
        this.setProgram(sprite._sgNode, this.program);
        this.enabled = true;
    },
    setProgram(node, program) {
        if (cc.sys.isNative)
        {
            var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(program);
            node.setGLProgramState(glProgram_state);
        } 
        else
        {
            node.setShaderProgram(program);
        }
    }
});
