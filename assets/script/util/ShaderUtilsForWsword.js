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
        _shaderName : 'wsword',
        glProgram : null
    },

    start : function()
    {
        this.sprite = this.node.getComponent(cc.Sprite);
        //this.setShader(sprite,'wsword');
    },
    setShader: function(sprite, shaderName) {
        if(this.glProgram == null)
        {
            this.sprite = sprite;
            this.glProgram = new cc.GLProgram();
            var vert = require(cc.js.formatStr("%s.vert", shaderName));
            var frag = require(cc.js.formatStr("%s.frag", shaderName));
            this.glProgram.initWithString(vert, frag);
    
            this.glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);  
            this.glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);  
            this.glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);  
            
            this.glProgram.link();  
            this.glProgram.updateUniforms();
    
            //var left = this.glProgram.getUniformLocationForName('left');
            //var right = this.glProgram.getUniformLocationForName('right');
    
            //this.glProgram.setUniformLocationWith1f(left,this.left);
            //this.glProgram.setUniformLocationWith1f(right,this.right);
    
            //sprite._sgNode.setShaderProgram(glProgram);
            this.setProgram( this.sprite._sgNode,this.glProgram);
        }
        else{
            this.glProgram = new cc.GLProgram();
            var vert = require(cc.js.formatStr("%s.vert", this.shaderName));
            var frag = require(cc.js.formatStr("%s.frag", this.shaderName));
            this.glProgram.initWithString(vert, frag);
    
            this.glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);  
            this.glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);  
            this.glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);  
            
            this.glProgram.link();  
            this.glProgram.updateUniforms();

            //var left = this.glProgram.getUniformLocationForName('left');
            //var right = this.glProgram.getUniformLocationForName('right');
    
            //this.glProgram.setUniformLocationWith1f(left,this.left);
            //this.glProgram.setUniformLocationWith1f(right,this.right);
    
            //sprite._sgNode.setShaderProgram(glProgram);
            this.setProgram( this.sprite._sgNode,this.glProgram);
        }
    },
    setValue(leftValue , rightValue){
        this.glProgram = new cc.GLProgram();
        var vert = require(cc.js.formatStr("%s.vert", 'wsword'));
        var frag = require(cc.js.formatStr("%s.frag", 'wsword'));
        this.glProgram.initWithString(vert, frag);

        this.glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);  
        this.glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);  
        this.glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);  
        
        this.glProgram.link();  
        this.glProgram.updateUniforms();

        var left = this.glProgram.getUniformLocationForName('left');
        var right = this.glProgram.getUniformLocationForName('right');

        this.glProgram.setUniformLocationWith1f(left,leftValue);
        this.glProgram.setUniformLocationWith1f(right,rightValue);

        this.setProgram( this.sprite._sgNode,this.glProgram);

        //cc.log('left ... ',leftValue,' right =',rightValue);
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
