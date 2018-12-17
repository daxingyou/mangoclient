let emailData = require('emailData');
let eventMgr = require('eventMgr');
let bagData = require('bagData');
let constant = require('constants')
let teamData = require('teamData')
let cardGroupData = require('cardGroupData')
var net = require("NetPomelo")
var tutorialEnterDungeonProto = require('tutorialEnterDungeonProto')
var constantss = require('Constant')
let friendData = require('friendData');
let heroData = require('heroData');
let matchData = require('matchData');
let raidData = require('raidData');

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
        this.openid = info.openid;
        this.level = info.level;
        this.gold = info.gold;
        this.freeGold = info.freeGold;
        this.silver = info.silver;
        this.power = info.power;
        let allGold = info.freeGold + info.gold;

        this.friendData = friendData.init(info.friendsInfo);
        this.heroData = heroData.init(info.heroInfo);
        this.teamData = teamData.init(info.teamInfo);
        this.matchData = matchData.init(info.matchInfo);
        this.raidData = raidData.init(info.raidsInfo);

        this.emailData = emailData;
        this.cardGroupData = cardGroupData;
        cardGroupData.cardInfo = info.cardInfo.cards;
        this.emailData.initMainInfo(info.mailInfo);
        this.tutorialInfo = info.tutorialInfo;
        bagData.initInfo(info.bagInfo, info.silver, allGold, info.power);
        this._checkMatch(info.matchInfo, info.teamInfo);
    },

    _checkMatch(match, team) {
        var uiMgr = cc.find('Canvas').getComponent('UIMgr');
        let matchInfo = match;
        let teamInfo = team;
        if (teamInfo["teamId"] != "") {
            let match = matchInfo["inMatching"];
            let hadMatchTime = matchInfo["hadMatchTime"];
            uiMgr.loadUI(constant.UI.BuildTeam, function (data) {
                if (match) {
                    data.reconnect(hadMatchTime);
                }
            });
        }
        else {
            if (cc.find('Canvas').getComponent('Launch').IsTutorial) {
                if (this.tutorialInfo.finishedDgIds.length >= 4) {
                    uiMgr.loadUI(constant.UI.Main);
                }
                else {
                    net.Request(new tutorialEnterDungeonProto(constantss.TutorialDungeon[this.tutorialInfo.finishedDgIds.length]));
                }
            }
            else {
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