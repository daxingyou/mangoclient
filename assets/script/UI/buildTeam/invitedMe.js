
var teamData = require('teamData');
var uibase = require('UIBase')
var constant = require('constants')
var net = require("NetPomelo")
var acceptInviteProto = require("acceptInviteProto")
var refuseTeamInviteProto = require("refuseTeamInviteProto")
var ignoreTeamInviteProto = require('ignoreTeamInviteProto')
var leaveTeamProto = require('leaveTeamProto')
var dataCenter = require('DataCenter')
cc.Class({
    extends: uibase,
    properties: {
        userName:cc.Label,
        _type:null,
        _curIndex:null,
        _eid:null,
        _teamId:null,
        _parent:null,

    },
    initData (index,type,id,openid,teamId,self) {
        this.userName.string = openid;
        this._curIndex = index;
        this._type = type;
        this._eid = id;
        this._teamId = teamId;
        this._parent = self;
    },

    onLoad () {
        this._uimgr = cc.find('Canvas').getComponent('UIMgr');
    },

    start () {

    },
    comfirm:function() {
        var that = this;
        //返回选择模式界面
        var backShowListUI = function () {
        var comfirm = function() {
                net.Request(new leaveTeamProto(dataCenter.uuid), (data) => {
                    cc.log("离开队伍",data);
                })
                that._uimgr.loadUI(constant.UI.ShowList,data => {
                data.init();
                that._uimgr.loadUI(constant.UI.FightPavTop,(data) =>{
                    data.initBackBtn(null,null);
                    data.changeTitle("对弈亭");
                });
            });};
        if (teamData.refreshTeam.length > 1) {
            that._uimgr.popupTips(1,"确定要退出吗","提示",null,null,comfirm,that);
        }
        else {
          //  that._uimgr.release();
            net.Request(new leaveTeamProto(dataCenter.uuid), (data) => {
                cc.log("离开队伍",data);
            })
            that._uimgr.loadUI(constant.UI.ShowList,data =>{data.init();});   
            that._uimgr.loadUI(constant.UI.FightPavTop);   
        }
        };
        that._uimgr.loadUI(constant.UI.BuildTeam,(data) =>{
            data.initFriendList();//先移除
            data.laodFriendList();//加载可以邀请的好友信息
            that._uimgr.loadUI(constant.UI.FightPavTop,(data) =>{
                data.initBackBtn(backShowListUI,that);
                data.changeTitle("对弈亭");
            });
        });
        net.Request(new acceptInviteProto(that._eid,that._teamId), (data) => {
            cc.log("同意组队邀请",data);
        });

        that._parent._updateApplyList(that._curIndex);
    },

    refuse:function () {
        net.Request(new refuseTeamInviteProto(this._eid), (data) => {
            cc.log("拒绝组队邀请",data);
        });
        this._parent._updateApplyList(this._curIndex);
    },

    ignore:function () {
       
        net.Request(new ignoreTeamInviteProto(this._eid), (data) => {
            cc.log("忽略组队邀请",data);
        });
        this._parent._updateApplyList(this._curIndex);
    }


    // update (dt) {},
});
