let emailData = require('emailData');
let eventMgr = require('eventMgr');
let bagData = require('bagData');
let constant = require('constants')
let teamData = require('teamData')
let leaveTeamProto = require('leaveTeamProto')   
let dataCenter = require('DataCenter')
let teamRaidData= require('teamRaidData')
let soloRaidData = require('soloRaidData')
let cardGroupData= require('cardGroupData')
var net = require("NetPomelo")
var tutorialEnterDungeonProto = require('tutorialEnterDungeonProto')
var constantss = require('Constant')

let playerData = {
    userInfo: null,
    logined: false, // 是否已经登录

    get name() {
        return this.userInfo.nickName;
    },
    get gender() {
        return this.userInfo.gender;
    },
    get avatarUrl() {
        return this.userInfo.avatarUrl;
    },

    // 登录时初始化
    init: function (info) {
        this.logined = true;
        
        this.id = info.id;
        dataCenter.uuid = this.id;
        this.openid = info.openid;
        this.level = info.level;
        this.gold = info.gold;
        this.freeGold = info.freeGold;
        this.silver = info.silver;
        this.power = info.power;
        let allGold = info.freeGold + info.gold;
        this.emailData = emailData;
        this.teamData = teamData;
        this.soloRaidData = soloRaidData;
        this.cardGroupData = cardGroupData;
        teamData.onTeamInvited = info.teamInfo.invitedList;
        soloRaidData.soloRaidInfo = info.raidsInfo.raids;
        cardGroupData.cardInfo = info.cardInfo.cards;
        this.emailData.initMainInfo(info.mailInfo);
        this.tutorialInfo = info.tutorialInfo;
        bagData.initInfo(info.bagInfo,info.silver,allGold,info.power);
        this._checkMatch(info.matchInfo,info.teamInfo);
    },

    _checkMatch(match,team) {
        var uiMgr = cc.find('Canvas').getComponent('UIMgr');
        let matchInfo = match;
        let teamInfo = team;
        let backShowListUI = function () {
            let comfirm = function(){
                net.Request(new leaveTeamProto(playerData.id), (data) => {
                    cc.log("离开队伍",data);
                });
                uiMgr.loadUI(constant.UI.ShowList,data => {
                data.init();
                uiMgr.loadUI(constant.UI.CommonTop,(data) =>{
                    data.initBackBtn(null,null);
                    data.changeTitle("对弈亭");
                });
            }
            );}
        };
        if (teamInfo["teamId"] != "") {
            this.teamData.refreshTeam = teamInfo;
            let match = matchInfo["inMatching"];
            let hadMatchTime = matchInfo["hadMatchTime"];
            uiMgr.loadUI(constant.UI.BuildTeam, function (data) {
                if (match) {
                    data.reconnect(hadMatchTime);
                }
                data.laodFriendList();
            });
            uiMgr.loadUI(constant.UI.CommonTop, function (data) {
                data.initBackBtn(backShowListUI,this);
                data.changeTitle("练习队伍");
            });
        }
        else
        {
            if(cc.find('Canvas').getComponent('Launch').IsTutorial)
            {
                if(this.tutorialInfo.finishedDgIds.length >= 4)
                {
                    uiMgr.loadUI(constant.UI.Main);
                }
                else
                {
                    net.Request(new tutorialEnterDungeonProto(constantss.TutorialDungeon[this.tutorialInfo.finishedDgIds.length]));
                }
            }
            else
            {
                uiMgr.loadUI(constant.UI.Main);
            }
        }
    },


    updateProp: function (data) {
        for (let prop in data) {
            this[prop] = data[prop];
        }
        eventMgr.emit(eventMgr.events.EventAvtPropUpdate, data);
    }
};

module.exports = playerData;