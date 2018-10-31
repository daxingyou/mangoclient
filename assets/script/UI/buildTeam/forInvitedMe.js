var uibase = require('UIBase')
var net = require("NetPomelo")
var ignoreTeamInviteProto = require('ignoreTeamInviteProto')
var inviteProto = require("inviteProto")
var teamData = require('teamData')
var consts = require('consts')
cc.Class({
    extends: uibase,

    properties: {
       userName:cc.Label,
       _eid:null,
       _parents:null,
       _hide:null,
    },




    // onLoad () {},
    initData (id,openid,parent,hide) {
        this._eid = id;
        this.userName.string = openid;
        this._parents = parent;
        this._hide = hide;
    },

    invited () {
        this._uimgr = cc.find('Canvas').getComponent('UIMgr');
        let self = this;
        net.Request(new inviteProto(self._eid), (data) => {
          
            if (data.code == consts.TeamCode.OK) {
                cc.log("成功发送组队邀请",data,"邀请的id",this._eid);
            }
            else if (data.code == consts.TeamCode.TYPE_ERR) {
                cc.log("类型错误");
            }
            else if (data.code == consts.TeamCode.IN_TEAM) {
                cc.log("队伍中");
                self._uimgr.showTips("已经在队伍中")
            }
            else if (data.code == consts.TeamCode.NOT_IN_TEAM) {
                cc.log("队伍已解散");
            }
            else if (data.code == consts.TeamCode.TEAM_FULL) {
                cc.log("人满了");
            }
            else if (data.code == consts.TeamCode.IN_MY_TEAM) {
                cc.log("已经在队伍中");
                self._uimgr.showTips("已经在队伍中");
            }
            else if (data.code == consts.TeamCode.PLAYING) {
                cc.log("已经在游戏中");
               
            }
            else if (data.code == consts.TeamCode.LEVEL_LIMIT) {
                cc.log("等级限制");
              
            }
            else if (data.code == consts.TeamCode.RAND_LIMIT) {
                cc.log("段位限制");
               
            }
            else if (data.code == consts.TeamCode.HERO_NUM_LIMIT) {
                cc.log("英雄数量限制");
             //   that.showTips("英雄数量限制");
            }
            else if (data.code == consts.TeamCode.TEAM_NOT_EXIST) {
                cc.log("队伍不存在");
               // that.showTips("队伍不存在");
            }
            else if (data.code == consts.TeamCode.MEMBER_NOT_EXIST) {
                cc.log("没有该成员");
              //  that.showTips("没有该成员");
            }
            else if (data.code == consts.TeamCode.NOT_CAPTAIN) {
                cc.log("不是队长");
                //that.showTips("不是队长");
            }
            else if (data.code == consts.TeamCode.READY_OFF_ALREADY) {
                cc.log("已经取消准备");
            }
            else if (data.code == consts.TeamCode.TEAM_NOT_EXIST) {
                cc.log("已经准备");
            }
            else if (data.code == consts.TeamCode.READY_ON_ALREADY) {
                cc.log("没有准备");
            }
            else if (data.code == consts.TeamCode.READY_OFF_ALREADY) {
                cc.log("已经取消准备");
            }
            else if (data.code == consts.TeamCode.CAPTAIN_LIMIT) {
                cc.log("队长限制（例如准备）");
            }
            else if (data.code == consts.TeamCode.MATCHING) {
                cc.log("匹配中");
            }
            else if (data.code == consts.TeamCode.IN_PUNISH) {
                cc.log("超时惩罚");
            }
        

        });
        this._parents.hide();
        teamData.onForTeamInvited = null;
        if (this._hide != null) {
            this._parents.clearBeinvitedTips();
        }
        this._parents.hide();

    },

    ignore () {
        net.Request(new inviteProto(this._eid), (data) => {
            cc.log("忽略 ",data,"邀请的id",this._eid);
        });
        teamData.onForTeamInvited = null;
        if (this._hide != null) {
            this._parents.clearBeinvitedTips();
        }
        this._parents.hide();
    },





    start () {

    },

    // update (dt) {},
});
