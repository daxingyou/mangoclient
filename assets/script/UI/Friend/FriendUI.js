var uiBase = require('UIBase')
var constant = require('constants')
var net = require("NetPomelo")
var addFriendProto = require("addFriendProto")
var acceptFriendProto = require("acceptFriendProto")
var confirmHeroProto = require("confirmHeroProto")
var getFriendsManageInfoProto = require("getFriendsManageInfoProto")
var dataCenter = require("DataCenter")
var friendData = require('FriendData')
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


    },

     onLoad() {
         this._uiMgr = cc.find('Canvas').getComponent('UIMgr');
         this.accepetMassage();
         GlobalEvent.on("onAddInviter",this.onAddInviter,this);
         GlobalEvent.on("onNewFriend",this.onNewFriend,this);
         GlobalEvent.on("onDeleteFriend",this.onDelteFriend,this);
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
        
        if (friendData.AddInviter != null) {
            GlobalEvent.emit("onAddInviter");
            //friendData.AddInviter = null;
        } 
    },
    
     //更新好友申请列表
    onAddInviter() {
        var self = this;
        self.applyTips.active = true;
        let data = friendData.AddInviter;
        console.log("好友申请列表----",data);
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
        let data = friendData.NewFriend;
        console.log("新增的游戏好友---",data);
        cc.loader.loadRes('UI/Friend/gameFriendItem', function (errorMessage, loadedResource) {
                let item = cc.instantiate(loadedResource);
                self.showGameFriend.addChild(item);
                self._showGameFriend.push(item.getComponent('gameFriendItem'));
                self._showGameFriend[lastIndex].initData(lastIndex,data.eid,data.openid,1,self);
                self._eidBar.push(data.eid);//删除查找索引
                self.showGameFriend.height += 160;
                cc.loader.release('UI/Friend/gameFriendItem');
            });
    },

     //点击删除后双方刷新游戏好友列表
     onDelteFriend () {
        var self = this;
        let eid = friendData.DeleteFriend;
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
        self.showApplyBar.height -=60;
        let itemCom;
        for(let i=0;i< allChildren.length;i++) {
            itemCom = allChildren[i].getComponent('applyItem');
            itemCom._curIndex = i;
        }
    },


     //一登陆就接收到的 好友列表/申请列表
     accepetMassage() {
        var self = this;
        var resIndex = 0;
        var applyIndex = 0;
        let friendInfos = dataCenter.massageList;
       
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
                        self._showGameFriend[i].initData(i,itemData.eid,itemData.openid,itemData.relation,self);
                        self._eidBar.push(itemData.eid);//方便删除查找
                        if (resIndex == friends.length) {
                            cc.loader.release('UI/Friend/gameFriendItem');
                            if (friends.length > 5)
                            self.showGameFriend.height = friends.length * 160;
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
                            if (invitedList.length > 5) 
                            self.showApplyBar.height = invitedList.length * 60;
                        }
                    }
            })
            }
         }
    },

    
    
    
    onEnable(){
        this._curState = true;
    },
    backMainUI () {
        cc.log("返回主界面");
        this._uiMgr.loadUI(constant.UI.Main,function(data){
        });
    },

    editingDidBegan : function() {
        this._inputContent = this.inputContent.string;
        if (this._inputContent!=null && this.inputContent.string.length>=1) {
            this.deleteBtn.active = true;
        }
        else {
            this.deleteBtn.active = false;
        }
    },

    deleteInputContent () {
        cc.log("清空搜索框");
        this.inputContent.Placeholder = "请输入关键词";
        this.inputContent.string = '';
        this._inputContent = null;
        this.deleteBtn.active = false;
    }, 

    onclickSelect () {
        var uid = "5bd66a5d4235b14a78b54106";//m
        //5bd66a5d4235b14a78b54106 
        //"5b7a6051ce71253d40bf7167";//name 11
       //5b6ab81a9f96ef630891ccf4 name 12;
       //5b911230713af49284a85068 name 103
       var self = this;
        cc.log("点击搜索");
        if (self.inputContent.string.length <=0) {
            self._uiMgr.showTips('请输入搜索关键词');
        }
        else {
            net.Request(new addFriendProto(uid), function (data) {
                cc.log(data,"data-----addFriend");
                if (data.code == 1) {
                    self._uiMgr.showTips("发送消息成功");
                    self.deleteInputContent();
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

    lookApplyList () {
        cc.log("点击查看申请列表");
        this.applyView.active = true;
        this.applyTips.active = false;
        this.showGameFriend.active = false;
    },
    closeApplyList () {
        cc.log("关闭申请面板");
        this.applyView.active = false;
        this.showGameFriend.active = true;
    },


  
    update (dt) {
        if(cc.sys.platform == cc.sys.WECHAT_GAME)
            this._updaetSubDomainCanvas();

        // //检测好友同意回复,两秒检测一次
        // this.count++;
        // if (this.count %60 == 0 && dataCenter.receivedReply) {
        //     this.addGameFriend(dataCenter.friendDispose.eid,dataCenter.friendDispose.openid);
        //     dataCenter.receivedReply = false;
        // }

        // // //检测好友删除
        // // if (this.count %60 == 0 && dataCenter.friendDelete) {
        // //     this.deleteGameFriend(dataCenter.deleteEid);
        // //     dataCenter.friendDelete = false;
        // // }

        // //在线收到好友请求
        // if (this.count %60 == 0 && dataCenter.onlineCtr){
        //     this.onlineAcceptMsg(dataCenter.onlineMsg);
        //     dataCenter.onlineCtr = false;
        // } 
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
        if (Object.keys(obj.query).length === 0) {

            return;
        }
        else {
            console.log("邀请成功----------启动相应执行");
        }
        // if (obj.query) {
        //     console.log("邀请成功----------启动相应执行");
        // }
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
        {   console.log("微信版本---------");
            wx.showShareMenu(true);
            window.wx.shareAppMessage({
                title: "come on bb！",
                imageUrl:'https://blockchain4.applinzi.com/remote/res/raw-assets/NewFolder/share.jpg',
                jquery:"1",
                });
        }
     },
   
});
