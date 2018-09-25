var uiBase = require('UIBase')
var constant = require('constants')
var net = require("NetPomelo")
var addFriendProto = require("addFriendProto")
var acceptFriendProto = require("acceptFriendProto")
var confirmHeroProto = require("confirmHeroProto")
var dataCenter = require("DataCenter")
cc.Class({
    extends: uiBase,

    properties: {
        display : cc.Sprite,
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
        showGameFriend:cc.Node,
        _showGameFriend:[],
        _eidBar:[],
    },

     onLoad () {
         this._uiMgr = cc.find('Canvas').getComponent('UIMgr');
         this.accepetMassage();
     },

     //一登陆就接收到的 好友全量消息
     accepetMassage() {
        var self = this;
        var resIndex = 0;
         for (let i in dataCenter.massageList) {
            cc.log(dataCenter.massageList[i],"obj[i]",i,"i");
            if (i == "friends") {//好友列表
                var friends = dataCenter.massageList[i];
                cc.loader.loadRes('UI/Friend/gameFriendItem', function (errorMessage, loadedResource) {
                    for (var i = 0; i < friends.length; i++) {
                        var itemData = friends[i];
                        if (errorMessage) {
                            cc.log('载入预制资源失败, 原因:' + errorMessage);
                            return;
                        }
                        if (!(loadedResource instanceof cc.Prefab)) {
                            cc.log('你载入的不是预制资源!');
                            return;
                        }
                        let item = cc.instantiate(loadedResource);
                        resIndex++;
                        self.showGameFriend.addChild(item);
                        self._showGameFriend.push(item.getComponent('gameFriendItem'));
                        self._showGameFriend[i].initData(i,itemData.eid,itemData.openid,itemData.relation,self);
                        self._eidBar.push(itemData.eid);
                        cc.log(self._eidBar,"self._eidBar in begin");
                        if (resIndex == friends.length) {
                            cc.loader.release('UI/Friend/gameFriendItem');
                            self.checkMassage = false;
                        }
                    }
            });
            }
            else if (i == "invitedList") {//申请列表
                cc.log("有好友申请");
                resIndex = 0;
                self.applyTips.active = true;
                var invitedList = dataCenter.massageList[i];
                cc.loader.loadRes('UI/Friend/applyItem', function (errorMessage, loadedResource) {
                    for (var i = 0; i < invitedList.length; i++) {
                        var itemData = invitedList[i];
                        if (errorMessage) {
                            cc.log('载入预制资源失败, 原因:' + errorMessage);
                            return;
                        }
                        if (!(loadedResource instanceof cc.Prefab)) {
                            cc.log('你载入的不是预制资源!');
                            return;
                        }
                        let item = cc.instantiate(loadedResource);
                        resIndex++;
                        self.showApplyBar.addChild(item);
                        self._showApplyList.push(item.getComponent('applyItem'));
                        self._showApplyList[i].initData(i,itemData.eid,itemData.openid,self);
                        if (resIndex == invitedList.length) {
                            cc.loader.release('UI/Friend/applyItem');
                        }
                    }
            })
            }
         }
    },

    //增加游戏好友
    addGameFriend(eid,openid,curIndex) {
        var self = this;
        var lastIndex = self.showGameFriend.childrenCount;
        cc.loader.loadRes('UI/Friend/gameFriendItem', function (errorMessage, loadedResource) {
                let item = cc.instantiate(loadedResource);
                self.showGameFriend.addChild(item);
                self._showGameFriend.push(item.getComponent('gameFriendItem'));
                self._showGameFriend[lastIndex].initData(lastIndex,eid,openid,1,self);
                self._eidBar.push(eid);
                cc.log(self._eidBar,"self._eidBar in add");
                cc.loader.release('UI/Friend/gameFriendItem');
            });
    },

      //点击删除后双方刷新游戏好友列表
      deleteGameFriend (eid) {
          var self = this;
          for (let i = 0;i<self._eidBar.length;i++) {
              if (self._eidBar[i] == eid) {
                let allGameFriend = self.showGameFriend.children;
                allGameFriend[i].removeFromParent();
              }
          }
    },
    
    //更新申请列表
    _updateApplyList (curIndex) {
        var self = this;
        var allChildren = self.showApplyBar.children;
        allChildren[curIndex].removeFromParent();
        let itemCom;
        for(let i=0;i< allChildren.length;i++) {
            itemCom = allChildren[i].getComponent('applyItem');
            itemCom._curIndex = i;
        }
    },

    //在线收到好友请求
    onlineAcceptMsg(data) {
        var self = this;
        self.applyTips.active = true;
        var lastIndex = self.showApplyBar.childrenCount;
        cc.loader.loadRes('UI/Friend/applyItem', function (errorMessage, loadedResource) {
                if (errorMessage) {
                    cc.log('载入预制资源失败, 原因:' + errorMessage);
                    return;
                }
                if (!(loadedResource instanceof cc.Prefab)) {
                    cc.log('你载入的不是预制资源!');
                    return;
                }
                let item = cc.instantiate(loadedResource);
                self.showApplyBar.addChild(item);
                self._showApplyList.push(item.getComponent('applyItem'));
                self._showApplyList[lastIndex].initData(lastIndex,data.eid,data.openid,self);
            })
    },

    onEnable(){
        this._curState = true;
        wxAPI.Show();
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
        var uid = "5b6ab81a9f96ef630891ccf4";
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

        //检测好友同意回复,两秒检测一次
        this.count++;
        if (this.count %60 == 0 && dataCenter.receivedReply) {
            this.addGameFriend(dataCenter.friendDispose.eid,dataCenter.friendDispose.openid);
            dataCenter.receivedReply = false;
        }

        //检测好友删除
        if (this.count %60 == 0 && dataCenter.friendDelete) {
            this.deleteGameFriend(dataCenter.deleteEid);
            dataCenter.friendDelete = false;
        }

        //在线收到好友请求
        if (this.count %60 == 0 && dataCenter.onlineCtr){
            this.onlineAcceptMsg(dataCenter.onlineMsg);
            dataCenter.onlineCtr = false;
        }

       
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
        wxAPI.Show();
    },
    GameFriendClick(){
        this._isShow = false;
        wxAPI.Hide();
    },
   
});
