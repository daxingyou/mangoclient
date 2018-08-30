var UIBase = require("UIBase")

cc.Class({
    extends: UIBase,

    properties: {
        tips0: cc.Node,
        tips1: cc.Node,
        tips2: cc.Node,
        _textList: [],
        _maxCnt: 3,
        _cnt: 0,
        _margin: 5,
    },

    onLoad() {
        this._beginPos = this.tips1.position;
        this._deltaHeight = this.tips2.position.y - this._beginPos.y;
        this._lastShowTime = 0;
        this._uiIdx = 0;
        this._inShowIdxes = [];
        this.tips0.active = false;
        this.tips1.active = false;
        this.tips2.active = false;
    },

    start() {
    },

    _show(text) {
        var idx = this._uiIdx++ % this._maxCnt;
        var tips = this["tips" + idx];
        tips.active = true;
        tips.opacity = 255;
        tips.position = this._beginPos;
        var label = tips.getChildByName('text');
        label.getComponent(cc.Label).string = text;
        var bg = tips.getChildByName('bg');
        if (label.getContentSize().height > 40) {  // 两行
            bg.scaleY = 2.2;
            label.getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT;
        }
        else {
            bg.scaleY = 1.1;
            label.getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        }
        var moveHeight = bg.getContentSize().height * bg.scaleY / 2 + this._margin;
        if (this._inShowIdxes.length > 0) {
            var firstBg = this["tips" + this._inShowIdxes[this._inShowIdxes.length - 1]].getChildByName('bg');
            moveHeight += firstBg.getContentSize().height * firstBg.scaleY / 2;
        }
        // 上移
        for (var preIdx of this._inShowIdxes) {
            var node = this["tips" + preIdx];
            var oldPos = node.position;
            node.position = cc.v2(oldPos.x, oldPos.y + moveHeight);
        }
        this._lastShowTime = new Date().getTime();
        this._inShowIdxes.push(idx);
        this._cnt++;
        var self = this;
        tips.runAction(cc.sequence(cc.delayTime(3), cc.fadeOut(1), cc.callFunc(function () {
            self._inShowIdxes.shift();
            self._cnt--;
        })));
    },

    update(dt) {
        if (this._maxCnt > this._cnt
            && this._textList.length > 0
            && new Date().getTime() - this._lastShowTime > 1000) {
            var text = this._textList.shift();
            this._show(text);
            return;
        }
    },
    showText(text, pos) {
        this._textList.push(text);
        // if (pos == undefined)
        //     pos = cc.v2(0, 0);
    }
});
