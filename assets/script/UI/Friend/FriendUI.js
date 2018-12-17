var uiBase = require('UIBase')
var constant = require('constants')
var net = require("NetPomelo")
var consts = require('consts')
var back = require('backMainUI')
var eventMgr = require('eventMgr')
var playerData = require('playerData')
let loadRes = require('LoadRes');

let ITEM_HEIGHT = 110;
cc.Class({
    extends: uiBase,

    properties: {
        _curState: true,       //true 微信好友.false 游戏好友
        _inputContent: null,

        inputContent: cc.EditBox,
        applyTips: cc.Node,
        count: 0,
        checkMassage: true,
        wechatViewSprite: cc.Sprite,
        gameFriendContent: cc.Node,
        gameFriendView: cc.ScrollView,
        wechatTouchNode: cc.Node,
    },

    onLoad() {
        this._super();
        this.addCommonBackBtn('好友');
        eventMgr.on(eventMgr.events.EventNewFriend, this.onNewFriend, this);
        eventMgr.on(eventMgr.events.EventDelFriend, this.onDeleteFriend, this);
        this.initUI();
        this.wechatTouchNode.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            let delta = event.getDelta();
            wx.postMessage({
                message: 'Position',
                y: delta.y,
            });
            return true;
        });
    },

    start() {
        this._isShow = false;
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            this.tex = new cc.Texture2D();

            let contentSize = this.node.getContentSize();
            var openDataContext = wx.getOpenDataContext();
            var sharedCanvas = openDataContext.canvas;
            sharedCanvas.width = contentSize.width;
            sharedCanvas.height = contentSize.height;
            wx.postMessage({
                message: 'Resolution',
                width: contentSize.width,
                height: contentSize.height
            })
        }
        this.GameFriendClick();
    },

    //更新游戏好友列表
    onNewFriend(data) {
        var self = this;
        loadRes.loadPrefab('UI/Friend/gameFriendItem', false, function (loadedResource) {
            let item = cc.instantiate(loadedResource);
            self.gameFriendContent.addChild(item);
            let itemComp = item.getComponent('gameFriendItem');
            itemComp.initData(1, data);
            self._eidDict[data.eid] = itemComp;
            self.gameFriendContent.height += ITEM_HEIGHT;
        });
    },

    //点击删除后双方刷新游戏好友列表
    onDeleteFriend(eid) {
        if (this._eidDict.hasOwnProperty(eid)) {
            let comp = this._eidDict[eid];
            comp.node.parent = null;
            delete this._eidDict[eid];
            this.gameFriendContent.height -= ITEM_HEIGHT;
        }
    },

    //一登陆就接收到的 好友列表/申请列表
    initUI() {
        playerData.friendData.updateFriendsManageInfo(this._loadFriendItems.bind(this));
    },

    _loadFriendItems: function () {
        this._eidDict = {};
        this.friends = playerData.friendData.getSortedFriendData();
        this.gameFriendContent.height = this.friends.length * ITEM_HEIGHT + 10;
        this.loadIdx = 0;
        this._loadItem();
    },

    _loadItem: function () {
        let itemData = this.friends[this.loadIdx++];
        if (!itemData) {
            return;
        }
        let self = this;
        loadRes.loadPrefab('UI/Friend/gameFriendItem', false, function (res) {
            let item = cc.instantiate(res);
            self.gameFriendContent.addChild(item);
            let itemComp = item.getComponent('gameFriendItem');
            itemComp.initData(1, itemData);
            self._eidDict[itemData.eid] = itemComp;
            self._loadItem();
        });
    },

    onEnable() {
        this._curState = true;
    },

    backMainUI() {
        back.backMainUI();
    },

    editingDidBegan: function () {
        this._inputContent = this.inputContent.string;
    },

    //清空搜索框
    deleteInputContent() {
        this.inputContent.placeholder = "请输入关键词";
        this.inputContent.string = '';
        this._inputContent = null;
    },

    //点击搜索
    onclickSelect() {
        if (this.inputContent.string.length <= 0) {
            this._uiMgr.showTips('请输入搜索关键词');
        }
    },

    //点击查看申请列表
    lookApplyList() {
        this._uiMgr.loadUI(constant.UI.ApplyListPanel);
    },

    //推荐好友
    recommendFriend() {
        this._uiMgr.loadUI(constant.UI.RecommendFriend);
    },

    update(dt) {
        if (cc.sys.platform == cc.sys.WECHAT_GAME)
            this._updaetSubDomainCanvas();
    },

    _updaetSubDomainCanvas() {
        // if(!this._isShow)
        //     return;
        let contentSize = this.node.getContentSize();
        var openDataContext = wx.getOpenDataContext();
        var sharedCanvas = openDataContext.canvas;
        this.tex.initWithElement(sharedCanvas);
        this.tex.handleLoadedTexture();
        this.wechatViewSprite.node.setContentSize(contentSize);
        this.wechatViewSprite.spriteFrame = new cc.SpriteFrame(this.tex);

        let obj = wx.getLaunchOptionsSync();

    },

    WeChatclick() {
        this._isShow = true;
        this.gameFriendView.node.active = false;
        this.wechatViewSprite.node.active = true;
        this.wechatTouchNode.active = true;
        wxAPI.Show(1);

    },
    GameFriendClick() {
        this._isShow = false;
        this.gameFriendView.node.active = true;
        this.wechatViewSprite.node.active = false;
        this.wechatTouchNode.active = false;
        wxAPI.Hide();
    },
    invitedWechatGame() {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            wx.showShareMenu(true);
            window.wx.shareAppMessage({
                title: "come on bb！",
                imageUrl: 'https://blockchain4.applinzi.com/remote/res/raw-assets/NewFolder/share.jpg',
                jquery: "1",
            });
        }
    },

    onDestroy() {
        eventMgr.off(eventMgr.events.EventNewFriend, this.onNewFriend);
        eventMgr.off(eventMgr.events.EventDelFriend, this.onDeleteFriend);
        cc.loader.release('UI/Friend/gameFriendItem');
    },

});
