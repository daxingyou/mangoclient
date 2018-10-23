var uibase = require('UIBase');
var constant = require('constants');
var dataCenter = require('DataCenter')
var net = require('NetPomelo')
var consts = require('consts')
var getFriendsManageInfoProto = require('getFriendsManageInfoProto')
var kickTeamMemberProto = require('kickTeamMemberProto')
var leaveTeamProto = require('leaveTeamProto')
var setTeamReadyOffProto = require('setTeamReadyOffProto')
var setTeamReadyOnProto = require('setTeamReadyOnProto')
var beginTeamMatchProto = require('beginTeamMatchProto')
var inviteProto = require("inviteProto")
// var matchProto = require('matchProto')
var unmatchProto = require('unmatchProto')
var eventMgr = require('eventMgr')

cc.Class({
    extends: uibase,

    properties: {
        allRole:4,
        rolesBar:[],
        role0:cc.Node,
        role1:cc.Node,
        role2:cc.Node,
        role3:cc.Node,

        beginMatchBtn:cc.Node,
        _prepare: true,
        _cancelMatch: true,
        _isCanBeginMatch:false,
        title:cc.Label,
        showGameFriend:cc.Node,
        _showGameFriend:[],
        _isShow:false,
        _header:false,
        displayWeChat:cc.Sprite,
        _membersData:[],

        invitedTips:cc.Node,//邀请我
        beInvitedTips:cc.Node,//求邀我

        showWaitTime:cc.Node,
        _CDState:false,
        cdTime:0,
        waitedTime:cc.Label,
        predictTime:cc.Label,
        minTime:0,

        is_clickInvited: false,
        is_invitedSucceed: false,
        teamId:null,
    },


   

     onLoad () {
       for (let i=0;i < 4 ;i++) {
        this.rolesBar.push(this["role" + i]);        
        } 
        this._uimgr = cc.find('Canvas').getComponent('UIMgr');

        if(cc.sys.platform == cc.sys.WECHAT_GAME) {
            this.tex = new cc.Texture2D();
        }
       
        
      //  this.showGameFriend.active = false;
     },

     start () {
     },
     
     invitedWechatGame () {
        if(cc.sys.platform == cc.sys.WECHAT_GAME)
        {  
            wx.showShareMenu(true);
            window.wx.shareAppMessage({
                title: "come on bitch！",
                imageUrl:'',
                query:"teamId="+ this.teamId,
                function  (params) {
                    return query;
                }
                });
        }
        this.is_clickInvited = true;
        //wx.getLaunchInfoSync()
     },

     //加载队友成员
     loadMebers(data) {
        this._membersData= [];
        this.teamId = data.teamId;
        let item = data.members;
        let len = item.length;
        for (let i=0;i < 4;i++) {
            this.rolesBar[i].active = false;
            //是队长显示开始匹配按钮
            if (item[0].id == dataCenter.uuid) {
                let self = this;
                self._header = true;
                self.beginMatchBtn.active = true;
                //修改队长返回按钮的功能
                var backShowListUI = function () {
                if (dataCenter.oneTeamNum > 1) {
                    self._uimgr.popupTips(1,"确定要退出吗","提示",null,null,
                    function(){
                        net.Request(new leaveTeamProto(item[0].id), (data) => {
                            cc.log("离开队伍",data);
                        })
                        self._uimgr.loadUI(constant.UI.ShowList,data => {
                        data.init();
                        self._uimgr.loadUI(constant.UI.FightPavTop,(data) =>{
                            data.initBackBtn(null,null);
                            data.changeTitle(0);
                        });
                    }
                    );},self);
                }
                else {
                    net.Request(new leaveTeamProto(item[0].id), (data) => {
                        cc.log("离开队伍",data);
                    })
                    self._uimgr.loadUI(constant.UI.ShowList,data =>{data.init();});   
                    self._uimgr.loadUI(constant.UI.FightPavTop,data =>{
                    data.initBackBtn(null,null);
                    data.changeTitle(0);});   
                }
                };
                self._uimgr.loadUI(constant.UI.FightPavTop,(data) =>{
                    data.initBackBtn(backShowListUI,self);
                    data.changeTitle(2);
                });
                }
            else {
                this._header = false;
                this.beginMatchBtn.active = false;
            }

            //队长显示踢人按钮
            if (this._header && i!=0) {
                this.rolesBar[i].getChildByName("out").active = true;
            }
            else {
                if (i!=0) {
                    this.rolesBar[i].getChildByName("out").active = false;
                }    
            }

            if (i < len) {

                //成员信息
                this.rolesBar[i].active = true;
                var userName = this.rolesBar[i].getChildByName("userName").getComponent(cc.Label);
                userName.string = item[i].openid;
                this._membersData.push(item[i]);
               
                //隐藏其他队友准备按钮,踢人按钮
                if (item[i].id != dataCenter.uuid && i!=0) {
                   this.rolesBar[i].getChildByName('prepare').active = false;
                } 
            }
           
        } 
     },

     //初始化信息
     initFriendList () {
        this.showGameFriend.removeAllChildren();
        this._showGameFriend = [];
        this._header = false;
        this._membersData = [];
     },

     //加载在线好友
     laodFriendList () {
        // var self = this;
        // var resIndex = 0;
        // net.Request(new getFriendsManageInfoProto(dataCenter.uuid), function (data) {
        //     console.log(data,"getFriendsManageInfoProto");
        //     var friends = data.infos;
        //     cc.loader.loadRes('UI/Friend/canInviteFriend', function (errorMessage, loadedResource) {
        //         for (let i=0; i< friends.length; i++) {
        //             var itemData = friends[i];
        //             if (errorMessage) {
        //                 cc.log('载入预制资源失败, 原因:' + errorMessage);
        //                 return;
        //             }

        //             let item = cc.instantiate(loadedResource);
        //             resIndex++;
        //             self.showGameFriend.addChild(item);
                   
        //             self._showGameFriend.push(item.getComponent('canInviteFriend'));
                        
        //             if (itemData.state != undefined) {
        //                 cc.log("state 在线",itemData.state);
        //                 self._showGameFriend[i].initData(i,itemData.id,itemData.state,self);
        //             }
        //             else {
        //                 self._showGameFriend[i].initData(i,itemData.id,null,self);
        //             }
                    
        //             if (resIndex == friends.length) {
        //                 cc.loader.release('UI/Friend/canInviteFriend');
                        
        //                 if (friends.length > 5){
        //                     self.showGameFriend.height = friends.length * 150;
        //                 }                      
        //             }
        //         }
        // });
        // });
       
        // 显示可以邀请的好友列表
         var resIndex = 0;
         var self = this;
         for (let i in dataCenter.massageList) {
             if (i == "friends") {
                 let friends = dataCenter.massageList[i];
                 cc.loader.loadRes('UI/Friend/canInviteFriend', function (errorMessage, loadedResource) {
                     for (var i = 0; i < friends.length; i++) {
                         var itemData = friends[i];
                         if (errorMessage) {
                             cc.log('载入预制资源失败, 原因:' + errorMessage);
                             return;
                         }
                         let item = cc.instantiate(loadedResource);
                         resIndex++;
                         self.showGameFriend.addChild(item);
                         self._showGameFriend.push(item.getComponent('canInviteFriend'));
                         self._showGameFriend[i].initData(i,itemData.eid,itemData.openid,self);
                        
                         if (resIndex == friends.length) {
                             cc.loader.release('UI/Friend/canInviteFriend');
                             if (friends.length > 4) {
                              self.showGameFriend.height = (friends.length+1) * 150;
                            }   
                         }
                     }
             });
            }  
            cc.log("加载好友列表");
        } 
     },
   
    //队长点击匹配按钮，队友点击准备按钮
    cancelPrepare (event,cust) {
        let index = parseInt(cust);
        if (this._header) {
            if (this._cancelMatch) {
                this._isCanBeginMatch = true;
                for (let i =0;i<this.rolesBar.length;i++) {
                    if (this.rolesBar[i].getChildByName('comfirm').active = false) {
                        let id = this._membersData[i].openid;
                        this._uimgr.showTips(id+"未准备");
                        this._isCanBeginMatch = false;
                    }
                }
                if (this._isCanBeginMatch) {
                    var self = this;
                    net.Request(new beginTeamMatchProto(dataCenter.uuid), (data) => {
                        cc.log("开始匹配",data);
                    });
                    this.beginMatchBtn.getChildByName('Label').getComponent(cc.Label).string = "匹配中";
                    this.beginMatchBtn.getComponent(cc.Button).interactable = false;
                    this._cancelMatch = false;
                }
            }  
        }
        else {
            let text = this.rolesBar[index].getChildByName('prepare').getChildByName("Label").getComponent(cc.Label);
            let id = this._membersData[index].eid;
            if (this._prepare) {
                text.string = "取消准备";
                this._prepare = false;
                net.Request(new setTeamReadyOnProto(id), (data) => {
                    cc.log("准备",data.id);
                });
            }
            else {
                net.Request(new setTeamReadyOffProto(id), (data) => {
                    cc.log("取消准备",data,id);
                });
                this._prepare = true;
                text.string = "准备";
            }
        }
    },
         
    //取消匹配
    cancelMatch () {
        this._CDState = false;
        this.cdTime = 0;
        this.minTime = 0;
        this.showWaitTime.active = false;
        this.beginMatchBtn.getComponent(cc.Button).interactable = true;
        this.beginMatchBtn.getChildByName('Label').getComponent(cc.Label).string = "开始匹配";
        this._cancelMatch = true;
        net.Request(new unmatchProto(), (data) => {
            cc.log("取消匹配",data);
        });
    },

    //显示等待浮窗
    showFloatWait() {
        this._CDState = true;
        this.showWaitTime.active = true;
    },

    //组队匹配成功
    teamMatchSucess(teamData) {
        let teamInfo = teamData;
        cc.log(teamInfo,"好友信息");
        var uimgr = cc.find('Canvas').getComponent('UIMgr');
                uimgr.loadUI(constant.UI.MatchSucess,function(data){
                   data.init(teamData);
                });
        uimgr.getUI(constant.UI.FightPavTop).hide();
    },

    //队友准备状态变更
    changePrepareState(data) {
        let id = data.id;
        let ready = data.ready;
        cc.log(this._membersData,"this._membersData",id);
        for (let i=0;i<4;i++) {
            if (this._membersData[i].eid == id) {
                cc.log(i,"第几个队友");
                if (ready == 0) {
                    this.rolesBar[i].getChildByName('comfirm').active = false;
                    return;
                }
                else {
                    this.rolesBar[i].getChildByName('comfirm').active = true;
                }
            }
        }
    },

    //队长踢人
    kickRole (event,cust) {
        if (!this._header) {
            return;
        }

        net.Request(new kickTeamMemberProto(id), (data) => {
            cc.log("踢出队伍",data,id);
        });
        // this.rolesBar[nowIndex].opacity = 0;
        this.rolesBar[nowIndex].active = false;
        // if ( nowIndex == this.rolesBar.length - 1) {
        //     return;
        // }//踢得是最后一个人
        // else {
        //     let firstMovAct = cc.moveTo(0.5,this.rolesBar[nowIndex].x,this.rolesBar[nowIndex].y).easing(cc.easeQuadraticActionOut());
        //     if (nowIndex == 1 && this.allRole == 4) {
        //     cc.log("踢得是第一个人");
        //     this.rolesBar[nowIndex + 1].runAction(firstMovAct);
        //     let secondMovAct = cc.moveTo(0.5,this.rolesBar[nowIndex +1].x,this.rolesBar[nowIndex +1].y).easing(cc.easeQuadraticActionOut());
        //     this.rolesBar[nowIndex + 2].runAction(secondMovAct);
        //     }//踢得是第一个人
        //    else {
        //        if (this.allRole!= 4) {
        //         this.rolesBar[this.allRole].runAction(firstMovAct);
        //        }
        //        else {
        //         this.rolesBar[nowIndex + 1].runAction(firstMovAct);
        //        }
        // }
        // }
        dataCenter.oneTeamNum -=1;
    },

    //显示邀请列表


    //微信相关 
    onEnable(){
       // this._curState = true;
        wxAPI.Hide();
    },


   

     update (dt) {
    
        if(cc.sys.platform == cc.sys.WECHAT_GAME) {
            this._updaetSubDomainCanvas();
        }
        

        //检测队友成员有无增加
        if (dataCenter.changeMembers) {
            this.loadMebers(dataCenter.members);
            dataCenter.changeMembers = false;
        }

        //邀请暂时被挂起
        if (dataCenter.ingoreInvited) {
            let num  = dataCenter.inviteList.length;
            this.invitedTips.active = true;
            this.invitedTips.getComponent(cc.Label).string = num;
            dataCenter.ingoreInvited = false; 
        }

        if (this._CDState) {
                this.cdTime += dt;
            var temp = Math.floor(this.cdTime);
            var moreSec = temp%59;
            if ( moreSec == 0 && temp!=0) {
                this.minTime = Math.floor(temp/59);
                this.cdTime = 0;
                temp = 0;
            }
            if (temp < 10) {
                this.waitedTime.string ="0"+ this.minTime + ":0" + temp.toString();
            }
            else {
                this.waitedTime.string ="0"+ this.minTime + ":" + temp.toString();
            } 
        }
     },

     _updaetSubDomainCanvas () {
        // if (!this.tex) {
        //     return;
        // }

        // if(! this._isShow)
        //     return;

        var openDataContext = wx.getOpenDataContext();
        var sharedCanvas = openDataContext.canvas;
        this.tex.initWithElement(sharedCanvas);
        this.tex.handleLoadedTexture();
        this.displayWeChat.node.setContentSize(cc.director.getVisibleSize());
        this.displayWeChat.spriteFrame = new cc.SpriteFrame(this.tex);
    },

    WeChatclick(){
        this._isShow = true;
        this.showGameFriend.active = false;
        wxAPI.Show();
    },

    GameFriendClick(){
        this._isShow = false;
        wxAPI.Hide();
        this.showGameFriend.active = true;
    },
});
