/*
 * @Author: liuguolai 
 * @Date: 2018-12-01 14:31:55 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-12-12 17:38:10
 */
let ShaderUtils = require("ShaderUtils");

cc.Class({
    extends: cc.Component,

    properties: {
        spTarget: sp.Skeleton,
        sprite: cc.Sprite,
        hue: 0,
        saturation: 0,
        lightness: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        if (this.spTarget)
            this._program = ShaderUtils.setShader(this.spTarget, 'color', true);
        else
            this._program = ShaderUtils.setShader(this.sprite, 'color', true);
        this._program.setUniformLocationWith1f(this._program.getUniformLocationForName("u_dH"), this.hue);
        this._program.setUniformLocationWith1f(this._program.getUniformLocationForName("u_dS"), this.saturation);
        this._program.setUniformLocationWith1f(this._program.getUniformLocationForName("u_dL"), this.lightness);
    },
});
