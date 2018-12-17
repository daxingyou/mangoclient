/*
 * @Author: liuguolai 
 * @Date: 2018-12-13 10:18:43 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-12-14 11:15:59
 * 队伍数据管理
 */
let eventMgr = require('eventMgr');
let net = require("NetPomelo");
let consts = require('consts');

module.exports = {
    oneTeamNum: null,
    AcceptFriendNotify: null,
    DeleteFriend: null,
    teamInfo: null,
    recMatch: false,

    bInit: false,
    init: function (info) {
        this.teamId = info.teamId;
        this.teamType = info.teamType;
        this.specialId = info.specialId;
        this.members = info.members;
        this._initInvitedList(info.invitedList);
        this._initApplyList(info.applyList);
        if (this.bInited)
            return this;
        this.bInited = true;
        this._initNetEvent();
        return this;
    },

    _initInvitedList(infoList) {
        // 以字典存储
        this.invitedList = {};
        for (let info of infoList) {
            this.invitedList[info.id] = info;
        }
    },

    _initApplyList(infoList) {
        // 以字典存储
        this.applyList = {};
        for (let info of infoList) {
            this.applyList[info.id] = info;
        }
    },

    _initNetEvent: function () {
        this._uiMgr = cc.find('Canvas').getComponent('UIMgr');
        let self = this;
        pomelo.on('onRefreshTeam', function (data) {
            cc.log("队伍信息刷新", data);
            self.teamId = data.teamId;
            self.teamType = data.teamType;
            self.specialId = data.specialId;
            self.members = data.members || [];
            eventMgr.emit(eventMgr.events.EventTeamUpdate);
        });

        pomelo.on('onTeamInvited', function (data) {
            //加判断未解散，人数已满
            cc.log("收到组队邀请", data);
            self.invitedList[data.id] = data;
            let uid = data.id;
            self._uiMgr.popupTips(2, data.name + "邀请你一起玩游戏", "邀请",
                self._ignoreInvite.bind(self, uid, data.teamId),
                self._refuseInvite.bind(self, uid),
                self._acceptInvite.bind(self, uid), self);
        });

        pomelo.on('onTeamApplyed', function (data) {
            cc.log("收到求邀申请", data);
            self.applyList[data.id] = data;
            self._uiMgr.popupTips(3, data.name + "请求加入队伍", "求邀请", null, null, null, null, this.applyList);
        });

        pomelo.on('onTeamBeRefused', function (data) {
            cc.log("组队邀请被拒", data);
            self._uiMgr.showTips(data.name + "拒绝了你的组队邀请");
        });

        pomelo.on('onTeamBeKicked', function (data) {
            cc.log("被提出队伍", data);
            self._uiMgr.showTips("队长将你请离队伍");
            eventMgr.emit(eventMgr.events.EventTeamBeKicked);
        });

        pomelo.on('onTeamReadyStateChange', function (data) {
            cc.log("队员准备状态变更", data);
            self.updateMemberReadyState(data.id, data.ready);
        });
    },

    _acceptInvite(uid, teamId) {
        this.removeFromInvitedList(uid);
        net.requestWithCallback('acceptInviteProto', uid, teamId, (data) => {
            if (data.code == consts.TeamCode.OK) {
                cc.log("同意组队邀请", data);
                this._uiMgr.loadUI(constant.UI.BuildTeam, (data) => {
                    data.initFriendList();
                    data.laodFriendList();
                });
            }
            else if (data.code == consts.TeamCode.TEAM_NOT_EXIST) {
                this._uiMgr.showTips("队伍已解散");
            }
            else if (data.code == consts.TeamCode.TEAM_FULL) {
                this._uiMgr.showTips("人满了");
            }
        });
    },

    _refuseInvite(uid) {
        this.removeFromInvitedList(uid);
        net.requestWithCallback('refuseTeamInviteProto', uid, (data) => {
            cc.log("拒绝组队邀请", data);
        });
    },

    _ignoreInvite(uid) {
        this.removeFromInvitedList(uid);
        net.requestWithCallback('ignoreTeamInviteProto', uid, (data) => {
            cc.log("忽略组队邀请", data);
        });
    },

    removeFromInvitedList(uid) {
        delete this.invitedList[uid];
    },

    getInvitedListLength() {
        return Object.keys(this.invitedList).length;
    },

    updateMemberReadyState(id, ready) {
        for (let member of this.members) {
            if (member.id === id) {
                member.ready = ready;
            }
        }
        eventMgr.emit(eventMgr.events.EventTeamReadyChanged, id, ready);
    },

    isInTeam() {
        return this.members.length > 0;
    }

};
