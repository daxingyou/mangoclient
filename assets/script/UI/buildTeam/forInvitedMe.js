var uibase = require('UIBase')
var net = require("NetPomelo")
var ignoreTeamInviteProto = require('ignoreTeamInviteProto')
var inviteProto = require("inviteProto")
var teamData = require('teamData')
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
        net.Request(new inviteProto(this._eid), (data) => {
            cc.log("发送组队邀请 ",data,"邀请的id",this._eid);
        });
        this._parents.hide();
        teamData.onForTeamInvited = null;
        if (this._hide !=null) {
            this._parents.clearBeinvitedTips();
        }

    },

    ignore () {
        net.Request(new inviteProto(this_eid), (data) => {
            cc.log("发送组队邀请 ",data,"邀请的id",this._eid);
        });
        teamData.onForTeamInvited = null;
        if (this._hide !=null) {
            this._parents.clearBeinvitedTips();
        }
    },





    start () {

    },

    // update (dt) {},
});
