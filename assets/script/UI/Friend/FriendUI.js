var uiBase = require('UIBase')
var constant = require('constants')
var net = require("NetPomelo")
var consts = require('consts')
var back = require('backMainUI')
var addFriendProto = require("addFriendProto")
var eventMgr = require('eventMgr')
var playerData = require('playerData')
let loadRes = require('LoadRes');

let ITEM_HEIGHT = 113;
cc.Class({
    extends: uiBase,

    properties: {
        _curState: true,       //true 微信好友.false 游戏好友
        _inputContent: null,

        inputContent: cc.EditBox,
        applyTips: cc.Node,
        count: 0,
        checkMassage: true,
        gameFriendScrollView: cc.Sprite,
        showGameFriend: cc.Node,
        _showGameFriend: [],
        _eidBar: [],
    },

    onLoad() {
        this._super();
        this.addCommonBackBtn('好友');
        eventMgr.on(eventMgr.events.EventNewFriend, this.onNewFriend, this);
        eventMgr.on(eventMgr.events.EventDelFriend, this.onDeleteFriend, this);
        this.initUI();
    },

    start() {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            this._isShow = true;
            this.tex = new cc.Texture2D();
            this.WeChatclick();
        }
        else {
            this.GameFriendClick();
        }
    },

    //更新游戏好友列表
    onNewFriend(data) {
        var self = this;
        var lastIndex = self.showGameFriend.childrenCount;
        loadRes.loadPrefab('UI/Friend/gameFriendItem', false, function (loadedResource) {
            let item = cc.instantiate(loadedResource);
            self.showGameFriend.addChild(item);
            self._showGameFriend.push(item.getComponent('gameFriendItem'));
            self._showGameFriend[lastIndex].initData(1, data);
            self._eidBar.push(data.eid);//删除查找索引
            self.showGameFriend.height += ITEM_HEIGHT;
        });
    },

    //点击删除后双方刷新游戏好友列表
    onDeleteFriend(eid) {
        var self = this;
        for (let i = 0; i < self._eidBar.length; i++) {
            if (self._eidBar[i] === eid) {
                let allGameFriend = self.showGameFriend.children;
                allGameFriend[i].removeFromParent();
                self._eidBar.splice(i, 1);
                self.showGameFriend.height -= ITEM_HEIGHT;
                break;
            }
        }
    },

    //一登陆就接收到的 好友列表/申请列表
    initUI() {
        var self = this;
        //好友列表
        var friends = playerData.friendData.friends;
        loadRes.loadPrefab('UI/Friend/gameFriendItem', false, function (res) {
            let i = 0;
            for (let eid in friends) {
                var itemData = friends[eid];
                let item = cc.instantiate(res);
                self.showGameFriend.addChild(item);
                self._showGameFriend.push(item.getComponent('gameFriendItem'));
                self._showGameFriend[i].initData(1, itemData);
                self._eidBar.push(itemData.eid);//方便删除查找
                i++;
            }
            self._updateFriendState();
            self.showGameFriend.height = i * ITEM_HEIGHT;
        });
    },

    _updateFriendState() {
        playerData.friendData.updateFriendsManageInfo();
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

    closeApplyList() {
        this.showGameFriend.active = true;
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
        // if (!this.tex) {
        //     return;
        // }

        // if(!this._isShow)
        //     return;
        var openDataContext = wx.getOpenDataContext();
        var sharedCanvas = openDataContext.canvas;
        this.tex.initWithElement(sharedCanvas);
        this.tex.handleLoadedTexture();
        this.gameFriendScrollView.node.setContentSize(cc.director.getVisibleSize());
        this.gameFriendScrollView.spriteFrame = new cc.SpriteFrame(this.tex);

        let obj = wx.getLaunchOptionsSync();

    },

    WeChatclick() {
        this._isShow = true;
        this.showGameFriend.active = false;
        wxAPI.Show(1);

    },
    GameFriendClick() {
        this._isShow = false;
        wxAPI.Hide();
        this.showGameFriend.active = true;
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
