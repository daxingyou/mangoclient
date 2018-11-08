/*
 * @Author: liuguolai 
 * @Date: 2018-11-02 10:42:37 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-11-02 11:35:48
 * 适配管理
 */

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {
        let frameSize = cc.view.getFrameSize();
        let frameRatio = frameSize.width / frameSize.height;
        let winSize = cc.director.getWinSize();
        let width = winSize.width, height = winSize.height, deltaX = 0;
        let winRatio = width / height;
        if (winRatio > 2) {
            let width = height * 2;
            deltaX = winSize.width - width;
            let widget = this.node.getComponent(cc.Widget);
            cc.log(deltaX, widget.left);
            widget.left = deltaX / 2;
            widget.right = deltaX / 2;
            // cc.log(widget.left);
            // widget.updateAlignment();
        }
        cc.log(frameSize, winSize, "xxxxxxxxx", frameRatio, winRatio);
    },

    start () {

    },
});
