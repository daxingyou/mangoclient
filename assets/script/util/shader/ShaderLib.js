var ShaderLib = {
    _shaders : {},

    addShader : function(shader){
        if (this._shaders[shader.name]) {
            console.error("addShader - shader already exist: ", shader.name);
            return;
        }
        cc.renderer._forward._programLib.define(shader.name, shader.vert, shader.frag, shader.defines);
        this._shaders[shader.name] = shader;
    },

    getShader : function(name){
        return this._shader[name];
    }
}

module.exports = ShaderLib;