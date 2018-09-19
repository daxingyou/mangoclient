var uiBase = require('UIBase')

cc.Class({
    extends: uiBase,

    properties: {
        display : cc.Sprite,
        _curState : true,       //true 微信好友.false 游戏好友
    },

    // onLoad () {},

    onEnable(){
        this._curState = true;

        if(cc.sys.platform == cc.sys.WECHAT_GAME)
            wx.postMessage({ message:'Show'});
    },

    start () {
        if(cc.sys.platform == cc.sys.WECHAT_GAME)
        {
            this._isShow = true;
            this.tex = new cc.Texture2D();
        }
    },

    update (dt) {
        if(cc.sys.platform == cc.sys.WECHAT_GAME)
            this._updaetSubDomainCanvas();
    },
    
    _updaetSubDomainCanvas () {
        if (!this.tex) {
            return;
        }

        if(! this._isShow)
            return;

        var openDataContext = wx.getOpenDataContext();
        var sharedCanvas = openDataContext.canvas;
        this.tex.initWithElement(sharedCanvas);
        this.tex.handleLoadedTexture();
        this.display.spriteFrame = new cc.SpriteFrame(this.tex);
    },
    WeChatclick(){
        this._isShow = true;
        if(cc.sys.platform == cc.sys.WECHAT_GAME)
        {
            // 发消息给子域
            wx.postMessage({
                message: this._isShow ? 'Show' : 'Hide'
            })
        }
    },
    GameFriendClick(){
        this._isShow = false;
        if(cc.sys.platform == cc.sys.WECHAT_GAME)
        {
            // 发消息给子域
            wx.postMessage({
                message: this._isShow ? 'Show' : 'Hide'
            })
        }
    }
});
