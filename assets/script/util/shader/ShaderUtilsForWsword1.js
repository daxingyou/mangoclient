/**
 *      shader Utils
 *      by pwh
 */

const renderEngine = cc.renderer.renderEngine;
//const renderer = renderEngine.renderer;

cc.Class({
    extends: cc.Component,

    properties: {
        _shaderName : 'wsword'
    },

    start : function()
    {
        this.sprite = this.node.getComponent(cc.Sprite);
    },
    setValue(leftValue , rightValue){
        var _shaderName = this._shaderName
        let mat = this.sprite.getMaterial(_shaderName);

        if (!mat) {
            const CustomMaterial = require("CustomMaterial");
            mat = new CustomMaterial(_shaderName, [
                //{_shaderName: 'left', type: renderer.PARAM_FLOAT},
                //{_shaderName: 'right', type: renderer.PARAM_FLOAT}
            ]);
            this.sprite.setMaterial(_shaderName, mat);
        }
        this.sprite.activateMaterial(_shaderName);
        mat.setParamValue('left', leftValue);
        mat.setParamValue('right', rightValue);
    }
})
