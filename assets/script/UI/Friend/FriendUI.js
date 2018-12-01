var uiBase = require('UIBase')
var constant = require('constants')
var net = require("NetPomelo")
var consts = require('consts')
var back = require('backMainUI')
var addFriendProto = require("addFriendProto")
var acceptFriendProto = require("acceptFriendProto")
var confirmHeroProto = require("confirmHeroProto")
var getFriendsManageInfoProto = require("getFriendsManageInfoProto")
var getRecommendListProto = require("getRecommendListProto")
var dataCenter = require("DataCenter")
var friendData = require('FriendData')
var eventMgr = require('eventMgr')
var playerData = require('playerData')
cc.Class({
    extends: uiBase,

    properties: {
        
        _curState : true,       //true 微信好友.false 游戏好友
        _inputContent:null,
       
        inputContent:cc.EditBox,
        deleteBtn:cc.Node,
        applyTips:cc.Node,
        applyView:cc.Node,
        showApplyBar:cc.Node,
        _showApplyList: [],
        count:0,
        checkMassage:true,
        gameFriendScrollView:cc.Sprite,
        showGameFriend:cc.Node,
        _showGameFriend:[],
        _eidBar:[],

        _clickToggle1: 1,
        _clickToggle2: 1,

    },

     onLoad() {
         this._uiMgr = cc.find('Canvas').getComponent('UIMgr');
         this.accepetMassage();
         eventMgr.on("onAddInviter",this.onAddInviter,this);
         eventMgr.on("onNewFriend",this.onNewFriend,this);
         eventMgr.on("onDeleteFriend",this.onDelteFriend,this);
     },

     start () {
        if(cc.sys.platform == cc.sys.WECHAT_GAME)
        {
            this._isShow = true;
            this.tex = new cc.Texture2D();
            this.WeChatclick();
        }
        else {
            this.GameFriendClick();
        }
        
        //一登录就有好友申请
        if (friendData.addInviter != null) {
            eventMgr.emit("onAddInviter");
        } 
    },
    
     //更新好友申请列表
    onAddInviter() {
        var self = this;
        self.applyTips.active = true;
        let data = friendData.addInviter;
        if (data == null) 
        return;
        var lastIndex = self.showApplyBar.childrenCount;
        cc.loader.loadRes('UI/Friend/applyItem', function (errorMessage, loadedResource) {
                if (errorMessage) {
                    cc.log('载入预制资源失败, 原因:' + errorMessage);
                    return;
                }
                let item = cc.instantiate(loadedResource);
                self.showApplyBar.addChild(item);
                self.showApplyBar.height += 60;
                var itemCom = item.getComponent('applyItem');
                itemCom.initData(lastIndex,data.eid,data.openid,self);
            });
    },

     //更新游戏好友列表
     onNewFriend() {
        var self = this;
        var lastIndex = self.showGameFriend.childrenCount;
        let data = friendData.newFriend;
        console.log("新增的游戏好友---",data);
        cc.loader.loadRes('UI/Friend/gameFriendItem', function (errorMessage, loadedResource) {
                let item = cc.instantiate(loadedResource);
                self.showGameFriend.addChild(item);
                self._showGameFriend.push(item.getComponent('gameFriendItem'));
                self._showGameFriend[lastIndex].initData(lastIndex,data,self,1);
                self._eidBar.push(data.eid);//删除查找索引
                self.showGameFriend.height += 160;
                cc.loader.release('UI/Friend/gameFriendItem');
        });
    },

     //点击删除后双方刷新游戏好友列表
     onDelteFriend () {
        var self = this;
        let eid = friendData.deleteFriend;
        for (let i = 0;i< self._eidBar.length;i++) {
            if (self._eidBar[i] === eid) {
              let allGameFriend = self.showGameFriend.children;
              allGameFriend[i].removeFromParent();
               self._eidBar.splice(i,1);
               self.showGameFriend.height -= 160;
            }
        }
    },

     //更新申请列表
    _updateApplyList (curIndex) {
        var self = this;
        var allChildren = self.showApplyBar.children;
        allChildren[curIndex].removeFromParent();
        self.showApplyBar.height -= 60;
        let itemCom;
        for(let i=0;i<allChildren.length;i++) {
            itemCom = allChildren[i].getComponent('applyItem');
            itemCom._curIndex = i;
        }
       friendData.AddInviter = null;
    },


     //一登陆就接收到的 好友列表/申请列表
     accepetMassage() {
        var self = this;
        var resIndex = 0;
        var applyIndex = 0;
        let friendInfos = friendData.allFriend;
       
         for (let i in friendInfos) {
            if (i == "friends") {//好友列表
                var friends = friendInfos[i];
                cc.loader.loadRes('UI/Friend/gameFriendItem', function (errorMessage, loadedResource) {
                    for (var i = 0; i < friends.length; i++) {
                        var itemData = friends[i];
                        if (errorMessage) {
                            cc.log('载入预制资源失败, 原因:' + errorMessage);
                            return;
                        }
                        let item = cc.instantiate(loadedResource);
                        resIndex++;
                        self.showGameFriend.addChild(item);
                        self._showGameFriend.push(item.getComponent('gameFriendItem'));
                        self._showGameFriend[i].initData(i,itemData,self,1);
                        self._eidBar.push(itemData.eid);//方便删除查找
                        if (resIndex == friends.length) {
                            cc.loader.release('UI/Friend/gameFriendItem');
                            self._updateFriendState();
                            if (friends.length >= 5)
                            self.showGameFriend.height = friends.length * 120;
                            cc.log(self.showGameFriend.height);
                        }
                    }
                });
            }
            else if (i == "invitedList") {//申请列表
                if (friendInfos[i].length === 0 || friendInfos[i].length === undefined )
                return;
                self.applyTips.active = true;
                var invitedList = friendInfos[i];
                cc.loader.loadRes('UI/Friend/applyItem', function (errorMessage, loadedResource) {
                    for (var i = 0; i < invitedList.length; i++) {
                        var itemData = invitedList[i];
                        if (errorMessage) {
                            cc.log('载入预制资源失败, 原因:' + errorMessage);
                            return;
                        }
                        let item = cc.instantiate(loadedResource);
                        applyIndex++;
                        self.showApplyBar.addChild(item);
                        self._showApplyList.push(item.getComponent('applyItem'));
                        self._showApplyList[i].initData(i,itemData.eid,itemData.openid,self);
                        if (applyIndex == invitedList.length) {
                            cc.loader.release('UI/Friend/applyItem');
                            if (invitedList.length >= 5) {
                                self.showApplyBar.height = invitedList.length * 60;
                            }
                        }
                    }
                })
            }
         }
    },

    _updateFriendState () {
        let self = this;
        net.Request(new getFriendsManageInfoProto(playerData.id), function (data) {
            let infos = data.infos;
            for (let i =0;i<infos.length;i++) {
                let itemData = infos[i];
                let id = itemData.id;
                self._showGameFriend[i].userState(itemData.state);
            } 
        });
    },

    
    
    
    onEnable(){
        this._curState = true;
    },

    backMainUI () {
        back.backMainUI();
     },

    editingDidBegan : function() {
        this._inputContent = this.inputContent.string;
        // if (this._inputContent!=null && this.inputContent.string.length>=1) {
        //     this.deleteBtn.active = true;
        // }
        // else {
        //     this.deleteBtn.active = false;
        // }
    },

    //清空搜索框
    deleteInputContent () {
        this.inputContent.placeholder = "请输入关键词";
        this.inputContent.string = '';
        this._inputContent = null;
    }, 

    //点击搜索
    onclickSelect () {
        var uid = "5bd66a5d4235b14a78b54106";//m
       var self = this;
        if (self.inputContent.string.length <=0) {
            self._uiMgr.showTips('请输入搜索关键词');
        }
        else {
            self.deleteInputContent();
            net.Request(new addFriendProto(uid), function (data) {
                cc.log(data,"data-----addFriend");
                if (data.code == 1) {
                    self._uiMgr.showTips("发送消息成功");
                }
                else if (data.code == 2) {
                    self._uiMgr.showTips("ID错误");
                }
                else if (data.code == 3) {
                    self._uiMgr.showTips("已经是好友了");
                }
                else if (data.code == 4) {
                    self._uiMgr.showTips("已经邀请了");
                }
                else if (data.code == 5) {
                    self._uiMgr.showTips("申请者不存在");
                }
                else if (data.code == 500) {
                    cc.log("内部服务器错误");
                }
            });
        }
    },

    //点击查看申请列表
    lookApplyList () {
        this.applyView.active = true;
        this.applyTips.active = false;
        this.showGameFriend.active = false;
    },
    
    closeApplyList () {
        this.applyView.active = false;
        this.showGameFriend.active = true;
    },

    //推荐好友
    recommendFriend () {
        let self = this;
        let backFriendUI = function () {
            self._uiMgr.loadUI(constant.UI.FightPavTop,(data) =>{
                data.changeTitle("好友");
              });
            self._uiMgr.loadUI(constant.UI.Friend);
        };
        self._uiMgr.loadUI(constant.UI.FightPavTop,(data) =>{
            data.initBackBtn(backFriendUI,self);
            data.changeTitle("好友");
        });
        this._uiMgr.loadUI(constant.UI.RecommendFriend, (data) => {
            data.init();
        });
    },

  
    update (dt) {
        if(cc.sys.platform == cc.sys.WECHAT_GAME)
            this._updaetSubDomainCanvas();
    },

    
    _updaetSubDomainCanvas () {
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
    
    WeChatclick(){
        this._isShow = true;
        this.showGameFriend.active = false;
        wxAPI.Show(1);
        
    },
    GameFriendClick(){
        this._isShow = false;
        wxAPI.Hide();
        this.showGameFriend.active = true;
    },
    invitedWechatGame () {
        if(cc.sys.platform == cc.sys.WECHAT_GAME)
        {   
            wx.showShareMenu(true);
            window.wx.shareAppMessage({
                title: "come on bb！",
                imageUrl:'https://blockchain4.applinzi.com/remote/res/raw-assets/NewFolder/share.jpg',
                jquery:"1",
                });
        }
     },

     onDestroy() {
        eventMgr.off("onAddInviter",this.onAddInviter);
         eventMgr.off("onNewFriend",this.onNewFriend);
         eventMgr.off("onDeleteFriend",this.onDelteFriend);
    },
   
});
