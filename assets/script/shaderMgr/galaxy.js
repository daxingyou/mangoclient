/*
 * @Author: liuguolai 
 * @Date: 2018-12-01 14:16:04 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-12-03 15:37:58
 */
let ShaderUtils = require("ShaderUtils");

cc.Class({
    extends: cc.Component,

    properties: {
        spTarget: sp.Skeleton,
        sprite: cc.Sprite
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        if (this.spTarget)
            this._program = ShaderUtils.setShader(this.spTarget, 'galaxy');
        else
            this._program = ShaderUtils.setShader(this.sprite, 'galaxy');
        this._time = 0;
        this._sin = 0;
    },

    update(dt) {
        if (!this._program)
            return;
        this._time += 2 * dt;
        this._program.use();
        this._sin = Math.sin(this._time);
        if (this._sin > 0.99) {
            this._sin = 0;
            this._time = 0;
        }
        this._program.setUniformLocationWith1f(this._program.getUniformLocationForName("sys_time"), this._sin);
    },
});
