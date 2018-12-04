/*
 * @Author: liuguolai 
 * @Date: 2018-12-01 16:40:23 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-12-03 15:37:48
 */
let ShaderUtils = require("ShaderUtils");

cc.Class({
    extends: cc.Component,

    properties: {
        spTarget: sp.Skeleton,
        sprite: cc.Sprite,
        blurSize: cc.Size
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        if (this.spTarget)
            this._program = ShaderUtils.setShader(this.spTarget, 'blur');
        else
            this._program = ShaderUtils.setShader(this.sprite, 'blur');
        this._program.setUniformLocationWith2f(this._program.getUniformLocationForName("blurSize"), this.blurSize.width, this.blurSize.height);
    },

    // update (dt) {},
});
