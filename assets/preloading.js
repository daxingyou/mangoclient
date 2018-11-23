let preloadConst = require('preloadConst');

cc.Class({
    extends: cc.Component,

    properties: {
        bg: cc.Sprite,
        progressBar: cc.ProgressBar,
        progressLabel: cc.Label,
        tipsLabel: cc.Label,

        _totalProgress: 0,
        _curProgress: 0,
        _tipsIdx: 0,
    },

    onLoad () {
        this._bgFit();
        this.progressBar.progress = 0;
        this.progressLabel.string = "0%";
        this._showTips();

        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            this._loadRes();
            return;
        }
        this._enterLaunch();
    },

    _bgFit () {
        //设计分辨率
        let designSize = cc.view.getDesignResolutionSize();
        let designRatio = designSize.width / designSize.height;
        //屏幕物理分辨率 也就是手机分辨率。
        let frameSize = cc.view.getFrameSize();
        let frameRatio = frameSize.width / frameSize.height;
        // 背景适配
        let bg = this.bg.node;
        let bgSize = bg.getContentSize();
        let bgRatio = bgSize.width / bgSize.height;
        let scale = 1;
        if (frameRatio > bgRatio) {
            scale = designSize.width / bgSize.width * (frameRatio / designRatio);
        }
        else {
            scale = designSize.height / bgSize.height * (designRatio / frameRatio);
        }
        bg.scale = scale;
    },

    _showTips () {
        this._func = function () {
            this.tipsLabel.string = "Tips: " + preloadConst.loadingTips[this._tipsIdx++ % preloadConst.loadingTips.length];
        }.bind(this);
        this._func();
        this.schedule(this._func, 3);
    },

    _loadRes () {
        this._loadSubpackages();
    },

    _loadSubpackages () {
        let subpackages = preloadConst.subpackages;
        this._totalProgress += subpackages.length;
        for (let subpackageName of subpackages) {
            this._doLoadSubpackage(subpackageName);
        }
    },

    _doLoadSubpackage(subpackageName) {
        cc.loader.downloader.loadSubpackage(subpackageName, (err) => {
            if (err) {
                cc.error('load subpackage error.', err);
                // 重试
                this._doLoadSubpackage(subpackageName);
                return;
            }
            this._addProgress();
        });
    },

    _addProgress () {
        this._curProgress += 1;
        this._refreshProgressBar();
        if (this._curProgress === this._totalProgress) {
            this._enterLaunch();
        }
    },

    _refreshProgressBar () {
        this.progressBar.progress = this._curProgress / this._totalProgress;
        this.progressLabel.string = Math.floor(this._curProgress / this._totalProgress * 1000) / 10 + "%";
    },

    _enterLaunch () {
        cc.director.loadScene('launch');
    },

    start () {

    },

    onDestroy () {
        this.unschedule(this._func);
    }
});
