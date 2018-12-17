var uibase = require('UIBase');
var constant = require('constants');
var net = require('NetPomelo')
var consts = require('consts')
var getFriendsManageInfoProto = require('getFriendsManageInfoProto')
var kickTeamMemberProto = require('kickTeamMemberProto')
var leaveTeamProto = require('leaveTeamProto')
var setTeamReadyOffProto = require('setTeamReadyOffProto')
var setTeamReadyOnProto = require('setTeamReadyOnProto')
var inviteProto = require("inviteProto")
var unmatchProto = require('unmatchProto')
var eventMgr = require('eventMgr')
var playerData = require('playerData')
var fightData = require('fightData')
let loadRes = require('LoadRes');

cc.Class({
    extends: uibase,

    properties: {
        allRole: 4,
        rolesBar: [],
        role0: cc.Node,
        role1: cc.Node,
        role2: cc.Node,
        role3: cc.Node,

        beginMatchBtn: cc.Node,
        _prepare: true,
        _cancelMatch: true,
        _isCanBeginMatch: false,
        title: cc.Label,
        titleImg: cc.Sprite,
        teamMatchAltas: cc.SpriteAtlas,
        showGameFriend: cc.Node,
        _showGameFriend: [],
        _isShow: false,
        _header: false,
        displayWeChat: cc.Sprite,
        _membersData: [],

        invitedTips: cc.Node,//邀请我
        invitedHotNode: cc.Node,
        beInvitedTips: cc.Node,//求邀我
        beInvitedHotNode: cc.Node,
        showApplyList: cc.Node,//
        _invitedBar: [],
        showApplyBtn: cc.Node,


        showWaitTime: cc.Node,
        _CDState: false,
        cdTime: 0,
        waitedTime: cc.Label,
        predictTime: cc.Label,
        minTime: 0,

        is_clickInvited: false,
        is_invitedSucceed: false,
        teamId: null,
        refreshUserSteate: 0,
        _refreshFriendState: true,

    },

    onLoad() {
        this._super();
        for (let i = 0; i < 4; i++) {
            this.rolesBar.push(this["role" + i]);
        }

        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            this.tex = new cc.Texture2D();
            this.WeChatclick();
        }

        eventMgr.on(eventMgr.events.EventTeamUpdate, this.refreshTeam, this);
        eventMgr.on(eventMgr.events.EventTeamBeKicked, this.onTeamBeKicked, this);
        eventMgr.on(eventMgr.events.EventTeamReadyChanged, this.teamReadyStateChange, this);
        eventMgr.on("onBeginMatch", this.showFloatWait, this);
        eventMgr.on("TeamInvited", this.teamInvited, this);//暂时被挂起,
        eventMgr.on("forTeamInvited", this.forTeamInvited, this);//求邀请暂时被挂起,
    },

    start() {
        let teamData = playerData.teamData;
        if (teamData.members.length > 0) {
            this.refreshTeam();
        }

        if (teamData.getInvitedListLength() != 0) {////存在邀请我的列表
            this.teamInvited();
        }
        this.initFriendList();
        this.laodFriendList();
    },

    //邀请信息提示
    teamInvited() {
        let num = playerData.teamData.getInvitedListLength();
        this.invitedTips.active = true;
        this.invitedHotNode.active = true;
        this.invitedTips.getComponent(cc.Label).string = num;
    },

    //求邀请信息提示
    forTeamInvited() {
        let num = Object.keys(playerData.teamData.applyList).length;
        if (num == 0) {
            this.showApplyList.active = false;
            this.beInvitedTips.active = false;
            this.beInvitedHotNode.active = false;
            this.showApplyBtn.getComponent(cc.Button).interactable = true;
        }
        else {
            this.beInvitedTips.active = true;
            this.beInvitedHotNode.active = true;
            this.beInvitedTips.getComponent(cc.Label).string = num;
        }
    },

    //显示求邀请我的列表
    clickBeInvited() {
        if (this.beInvitedTips.active) {
            this.showApplyList.active = true;
            this.content = this.showApplyList.getChildByName('view').getChildByName('content');
            this.content.removeAllChildren();
            var self = this;
            let resIndex = 0;
            self._forInvitedMe = [];
            cc.loader.loadRes('UI/buildTeam/forInvitedMe', function (errorMessage, loadedResource) {
                let beinvited = playerData.teamData.applyList;
                for (let id in beinvited) {
                    let itemData = beinvited[id];
                    if (errorMessage) {
                        cc.log('载入预制资源失败, 原因:' + errorMessage);
                        return;
                    }
                    resIndex++;
                    let item = cc.instantiate(loadedResource);
                    self.content.addChild(item);
                    self._forInvitedMe.push(item.getComponent('forInvitedMe'));
                    self._forInvitedMe[resIndex - 1].initData(resIndex - 1, itemData.id, itemData.openid, self, 1);
                }
            });
        }
        this.showApplyBtn.getComponent(cc.Button).interactable = false;
    },

    _remove(index) {
        let childCount = this.content.children;
        childCount[index].removeFromParent();
        this._forInvitedMe.splice(index, 1);
        for (let i = 0; i < childCount.length; i++) {
            this._forInvitedMe[i]._curIndex = i;
        }
    },

    //显示邀请我的列表
    clickInvited() {
        if (this.invitedTips.active) {
            this.showApplyList.active = true;
            this.content = this.showApplyList.getChildByName('view').getChildByName('content');
            this.content.removeAllChildren();
            var self = this;
            let resIndex = 0;
            self._invitedBar = [];
            cc.loader.loadRes('UI/buildTeam/invitedMe', function (errorMessage, loadedResource) {
                let invited = playerData.teamData.invitedList, i = 0;
                for (let uid in invited) {
                    let itemData = invited[uid];
                    if (errorMessage) {
                        cc.log('载入预制资源失败, 原因:' + errorMessage);
                        return;
                    }
                    let item = cc.instantiate(loadedResource);
                    resIndex++;
                    self.content.addChild(item);
                    self._invitedBar.push(item.getComponent('invitedMe'));
                    self._invitedBar[i].initData(i, 1, itemData.id, itemData.openid, itemData.teamId, self);
                    if (resIndex == invited.length) {
                        cc.loader.release('UI/BuildTeam/invitedMe');
                    }
                    i++;
                }
            });
        }
        this.showApplyBtn.getComponent(cc.Button).interactable = false;
    },

    //关闭邀请申请列表
    closeApplyList() {
        this.showApplyList.active = false;
        this.showApplyBtn.getComponent(cc.Button).interactable = true;
    },

    //更新申请列表
    _updateApplyList(curIndex) {
        var self = this;
        var allChildren = self.content.children;
        allChildren[curIndex].removeFromParent();
        self.content.height -= 60;
        let itemCom;
        let len = allChildren.length;
        for (let i = 0; i < len; i++) {
            itemCom = allChildren[i].getComponent('invitedMe');
            itemCom._curIndex = i;
        }

        self.invitedTips.getComponent(cc.Label).string = len;
        if (len == 0) {
            self.invitedHotNode.active = false;
            self.invitedTips.active = false;
            self.showApplyList.active = false;
        }
    },

    //刷新队友成员
    refreshTeam() {
        let teamData = playerData.teamData;
        this._membersData = [];
        this.teamId = teamData.teamId;
        if (this.teamId == '') {
            this._uiMgr.release();
            this._uiMgr.loadUI(constant.UI.ShowList, data => {
                data.init();
            });
            return;
        }
        let item = teamData.members;
        let len = item.length;
        let teamType = teamData.teamType;
        for (let i = 0; i < 4; i++) {
            this.rolesBar[i].active = false;
            if (item[0].id == playerData.id) {//  //是队长显示开始匹配按钮
                this._header = true;
                this.beginMatchBtn.active = true;
            }
            else {
                this._header = false;
                this.beginMatchBtn.active = false;
            }

            //队长显示踢人按钮
            if (this._header && i != 0) {
                this.rolesBar[i].getChildByName("out").active = true;
            }
            else {
                if (i != 0) {
                    this.rolesBar[i].getChildByName("out").active = false;
                }
            }

            if (i < len) {
                //成员信息
                this.rolesBar[i].active = true;
                if (i != 0 && !this._CDState) {
                    this.rolesBar[i].getChildByName('prepare').active = true;
                }

                var userName = this.rolesBar[i].getChildByName("userName").getComponent(cc.Label);
                userName.string = item[i].openid;
                this._membersData.push(item[i]);

                //隐藏其他队友准备按钮,踢人按钮
                if ((item[i].id != playerData.id && i != 0)) {
                    this.rolesBar[i].getChildByName('prepare').active = false;
                }
            }
        }
        if (teamType == consts.Team.TYPE_LADDER) {
            this.titleImg.spriteFrame = this.teamMatchAltas.getSpriteFrame('team_ladder');
            this.title.string = "天梯队伍";
        }
        else if (teamType == consts.Team.TYPE_PRACTICE) {
            fightData.fightType = 4;
            this.titleImg.spriteFrame = this.teamMatchAltas.getSpriteFrame('4v4');
            this.title.string = "练习队伍";
        }
        else if (teamType == consts.Team.TYPE_RAID) {
            fightData.fightType = 2;
            this.titleImg.spriteFrame = this.teamMatchAltas.getSpriteFrame('copy_team');
            this.title.string = "副本队伍";
        }
        let titleText = this.title.string;
        //修改返回按钮功能
        let self = this;
        let backShowListUI = function () {
            let comfirm = function () {
                net.Request(new leaveTeamProto(item[i].id), (data) => {
                    cc.log("离开队伍", data);
                });
                self._uiMgr.loadUI(constant.UI.ShowList, data => {
                    data.init();
                }
                );
            }

            if (len > 1) {
                self._uiMgr.popupTips(1, "确定要退出吗", "提示", null, null, comfirm, self);
            }
            else {
                net.Request(new leaveTeamProto(item[i].id), (data) => {
                    cc.log("离开队伍", data);
                });
                self.onTeamBeKicked();
            }
        };
        self.addCommonBackBtn(titleText, backShowListUI);
    },

    //被提出队伍 or 自己离开队伍
    onTeamBeKicked() {
        var self = this;
        self._uiMgr.loadUI(constant.UI.ShowList, data => { data.init(); });
        self._uiMgr.loadUI(constant.UI.CommonTop, (data) => {
            data.initBackBtn(null, null);
            data.changeTitle("对弈亭");
        });
    },

    //成员状态变更
    teamReadyStateChange(id, ready) {
        for (let i = 0; i < 4; i++) {
            if (i < this._membersData.length && this._membersData[i].id == id) {
                if (ready == 0) {

                    this.rolesBar[i].getChildByName('comfirm').active = false;
                }
                else {

                    this.rolesBar[i].getChildByName('comfirm').active = true;
                }
                this._membersData[i].ready = ready;
            }
        }
    },


    //微信邀请好友
    invitedWechatGame() {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            wx.showShareMenu(true);
            window.wx.shareAppMessage({
                title: "come on bitch！",
                imageUrl: '',
                query: "teamId=" + this.teamId,
                function(params) {
                    return query;
                }
            });
        }
        this.is_clickInvited = true;
    },


    //初始化信息
    initFriendList() {
        this.showGameFriend.removeAllChildren();
        this._showGameFriend = [];
        // this._header = false;
        this._membersData = [];
    },

    //加载好友
    laodFriendList() {
        var self = this;
        self.showGameFriend.removeAllChildren();
        self._showGameFriend = [];
        let friends = playerData.friendData.friends;
        if (friends.length == 0) {
            self._refreshFriendState = false;
            return;
        }
        loadRes.loadPrefab('UI/Friend/canInviteFriend', true, function (loadedResource) {
            let i = 0;
            for (let uid in friends) {
                var itemData = friends[uid];
                let item = cc.instantiate(loadedResource);
                self.showGameFriend.addChild(item);
                self._showGameFriend.push(item.getComponent('canInviteFriend'));
                self._showGameFriend[i].initData(i, itemData.eid, itemData.openid, self);
                i++;
            }
            if (i > 4) {
                self.showGameFriend.height = i * 130;
            }
        });
    },

    updateFriendState() {
        let self = this;
        net.Request(new getFriendsManageInfoProto(playerData.id), function (data) {
            let infos = data.infos;
            for (let i = 0; i < infos.length; i++) {
                let itemData = infos[i];
                let id = itemData.id;
                if (itemData.state == consts.UserState.ONLINE) {
                    self._showGameFriend[i].userState("在线");
                }
                else if (itemData.state == consts.UserState.OFFLINE) {
                    self._showGameFriend[i].userState("离线");
                }
                else if (itemData.state == consts.UserState.TEAM) {
                    self._showGameFriend[i].userState("组队中", id);
                }
                else if (itemData.state == consts.UserState.PLAYING) {
                    self._showGameFriend[i].userState("游戏中");
                }
            }
        });
    },

    //队长点击匹配按钮，队友点击准备按钮
    cancelPrepare(event, cust) {
        let index = parseInt(cust);
        if (this._header) {
            if (this._cancelMatch) {
                this._isCanBeginMatch = true;
                let len = this._membersData.length;
                for (let i = 0; i < len; i++) {
                    let ready = this._membersData[i].ready;
                    if (ready == 0) {
                        this._uiMgr.showTips(this._membersData[i].openid + "未准备");
                        this._isCanBeginMatch = false;
                        return;
                    }
                }
                if (this._isCanBeginMatch) {
                    net.requestWithCallback('beginTeamMatchProto', (data) => {
                        cc.log("开始匹配", data);
                    });
                    this.beginMatchBtn.getChildByName('Label').getComponent(cc.Label).string = "匹配中";
                    this.beginMatchBtn.getComponent(cc.Button).interactable = false;
                    this._cancelMatch = false;
                }
            }
        }
        else {
            let text = this.rolesBar[index].getChildByName('prepare').getChildByName("Label").getComponent(cc.Label);
            let id = this._membersData[index].id;
            if (this._prepare) {
                text.string = "准备";
                this._prepare = false;
                net.Request(new setTeamReadyOffProto(id), (data) => {
                });
            }
            else {
                text.string = "取消准备";
                net.Request(new setTeamReadyOnProto(id), (data) => {
                });
                this._prepare = true;
            }
        }
    },

    //取消匹配
    cancelMatch() {
        this._CDState = false;
        this.cdTime = 0;
        this.minTime = 0;
        this.showWaitTime.active = false;
        this.beginMatchBtn.getComponent(cc.Button).interactable = true;
        this.beginMatchBtn.getChildByName('Label').getComponent(cc.Label).string = "开始匹配";
        this._cancelMatch = true;
        net.Request(new unmatchProto(), (data) => {
            cc.log("取消匹配", data);
        });
        for (let i = 0; i < this._membersData.length; i++) {
            if (i != 0 && this._membersData[i].id == playerData.id) {
                this.rolesBar[i].getChildByName('prepare').active = true;
            }
        }
    },

    //显示等待浮窗
    showFloatWait(predictTime) {
        this._CDState = true;
        this.showWaitTime.active = true;
        if (predictTime != null)
            this.predictTime.string = predictTime;
        for (let i = 1; i < 4; i++) {
            this.rolesBar[i].getChildByName('prepare').active = false;
        }
    },

    //组队匹配成功
    teamMatchSucess(teamData) {
        let teamInfo = teamData;
        this._uiMgr.release();
        this._uiMgr.loadUI(constant.UI.MatchSucess, function (data) {
            data.init(teamInfo);
        });
    },

    //队友准备状态变更
    changePrepareState(data) {
        let id = data.id;
        let ready = data.ready;
        for (let i = 0; i < 4; i++) {
            if (this._membersData[i].id == id) {

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
    kickRole(event, cust) {
        if (!this._header) {
            return;
        }
        let index = parseInt(cust);
        let kickId = this._membersData[index].id;
        this.rolesBar[index].active = false;
        net.Request(new kickTeamMemberProto(kickId), (data) => {
            cc.log("踢出队伍", data);
        });
    },

    //显示邀请列表


    //微信相关 
    onEnable() {
        // this._curState = true;
        wxAPI.Hide();
    },

    onDestroy() {
        //   //取消队伍刷新事件
        eventMgr.off(eventMgr.events.EventTeamUpdate, this.refreshTeam);
        eventMgr.off(eventMgr.events.EventTeamBeKicked, this.onTeamBeKicked);
        eventMgr.off(eventMgr.events.EventTeamReadyChanged, this.teamReadyStateChange);
        eventMgr.off("onBeginMatch", this.showFloatWait);
        eventMgr.off("TeamInvited", this.teamInvited);
        eventMgr.off("forTeamInvited", this.forTeamInvited);
    },

    reconnect(time) {
        if (time == null) {
            this.cdTime = 0;
        }
        else {
            this.cdTime = parseInt(time / 1000);
        }
        this.beginMatchBtn.getComponent(cc.Button).interactable = false;
        this.beginMatchBtn.getChildByName('Label').getComponent(cc.Label).string = "匹配中...";
        this.showFloatWait();
    },

    update(dt) {
        if (this._refreshFriendState) {
            this.refreshUserSteate += dt;
            // 每15秒刷新一次
            if (this.refreshUserSteate >= 15) {
                this.refreshUserSteate = 0;
                this.updateFriendState();
            }
        }

        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            this._updaetSubDomainCanvas();
        }

        if (this._CDState) {
            this.cdTime += dt;
            var temp = Math.floor(this.cdTime);
            var moreSec = temp % 59;
            if (moreSec == 0 && temp != 0) {
                this.minTime = Math.floor(temp / 59);
                this.cdTime = 0;
                temp = 0;
            }
            if (temp < 10) {
                this.waitedTime.string = "0" + this.minTime + ":0" + temp.toString();
            }
            else {
                this.waitedTime.string = "0" + this.minTime + ":" + temp.toString();
            }
        }
    },

    _updaetSubDomainCanvas() {
        var openDataContext = wx.getOpenDataContext();
        var sharedCanvas = openDataContext.canvas;
        this.tex.initWithElement(sharedCanvas);
        this.tex.handleLoadedTexture();
        this.displayWeChat.node.setContentSize(cc.director.getVisibleSize());
        this.displayWeChat.spriteFrame = new cc.SpriteFrame(this.tex);
    },

    WeChatclick() {
        this._isShow = true;
        this.showGameFriend.active = false;
        wxAPI.Show();
    },

    GameFriendClick() {
        this._isShow = false;
        wxAPI.Hide();
        this.showGameFriend.active = true;
    },
});
