/*
 * @Author: liuguolai 
 * @Date: 2018-12-10 19:21:27 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-12-11 10:48:53
 */
let ShaderUtils = require("ShaderUtils");

cc.Class({
    extends: cc.Component,

    properties: {
        pressColor: cc.Color,
        outlineSize: 1,
        pressScale: 0.8,
        scaleTime: 0.1,
    },

    onLoad () {
        this.sprite = this.node.getComponent(cc.Sprite);
        
        this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
        
    },

    _checkProgram () {
        if (this._program)
            delete this._program;
        this._program = ShaderUtils.setShader(this.sprite, 'spriteStroke', true);
        let size = this.node.getContentSize();
        this._program.setUniformLocationWith1f(this._program.getUniformLocationForName("outlineSize")
            , this.outlineSize);
        this._program.setUniformLocationWith2f(this._program.getUniformLocationForName("textureSize")
            , size.width, size.height);
        this._program.setUniformLocationWith3f(this._program.getUniformLocationForName("outlineColor")
            , this.pressColor.r, this.pressColor.g, this.pressColor.b);
    },

    _onTouchStart(event) {
        this._setPress();
    },

    _onTouchEnd(event) {
        this._setNormal();
        let curPos = event.getLocation();
        if (cc.rectContainsPoint(this.node.getBoundingBox(), curPos)) {
            this.node.emit('click');
        }
    },

    _onTouchCancel(event) {
        this._setNormal();
    },

    _setPress() {
        this._checkProgram();
        this._program.setUniformLocationWith1f(this._program.getUniformLocationForName("open")
            , 1.0);
        this.node.stopAllActions;
        this.node.runAction(cc.scaleTo(this.scaleTime, this.pressScale));
    },

    _setNormal() {
        this._checkProgram();
        this._program.setUniformLocationWith1f(this._program.getUniformLocationForName("open")
            , 0.0);
        this.node.stopAllActions;
        this.node.runAction(cc.scaleTo(this.scaleTime, 1.0));
    },

    start () {

    },
});
