/**
 *      shader Utils
 *      by pwh
 */

var ShaderUtils = {
    setShader: function(sprite, shaderName) {
        var mat = sprite.getMaterial(shaderName);
        //if (!mat) 
        {
            var CustomMaterial = require("CustomMaterial");
            mat = new CustomMaterial(shaderName);
            sprite._updateMaterial(mat);
        }
       // else{
        //    mat._color = { r: 0.2126, g: 0.7152, b: 0.0722, a: 1 };
        //}
        //sprite.setState(cc.Sprite.State.GRAY);
    }
};

module.exports = ShaderUtils;