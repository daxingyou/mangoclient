var combatMgr = require('CombatMgr')//战斗相关
var constant = require('constants')
var eventMgr = require('eventMgr');
var teamData = require('teamData')


var fight = {
    _uiMgr: null,
    init: function () {
        this._uiMgr = cc.find('Canvas').getComponent('UIMgr');
        var that = this;
        let recMatch = 1;
        let clickBegin = 0;

        pomelo.on('onBeginMatch', function (data) {
            cc.log("匹配开始", data);
            recMatch++;
            if (recMatch != 1) {
                that._uiMgr.loadUI(constant.UI.BuildTeam,(data) => {
                    data.laodFriendList();
                    data.reconnect();
                });
                
            }
            else {
                eventMgr.emit("onBeginMatch",data.predictTime);
            }
            clickBegin = 0;
            /*  "onBeginMatch": {
                "required uInt32 predictTime": 1
            },
            */
        });

        pomelo.on('onUnmatch', function (data) {
            cc.log("匹配取消", data);
            var ui = that._uiMgr.getCurMainUI();
            ui.cancelMatch();
        });

        pomelo.on('onEnterMatchConfirm', function (data) {
            cc.log("进入匹配成功确认", data);
            var ui = that._uiMgr.getCurMainUI();

            ui.teamMatchSucess(data);
        });

        pomelo.on('onMatchConfirm', function (data) {
            cc.log("匹配确认", data);
            var ui = that._uiMgr.getCurMainUI();
            clickBegin += 1;
            ui.showComfirmTeamer(clickBegin,data);
        });

        pomelo.on('onMatchNoConfirm', function (data) {
            clickBegin = 0;
            cc.log("匹配未确认，回组队", data);
            that._uiMgr.release();
            that._uiMgr.loadUI(constant.UI.BuildTeam,(datas) => {
                datas.laodFriendList();
            });
        });

        pomelo.on('onPunishBeginTimeUpdate', function (data) {
            cc.log("超时惩罚开始时间更新", data);
            teamData.punishBeginTime = data.PunishBeginTime;
            /*
             "onPunishBeginTimeUpdate": {
                "required uInt32 punishBeginTime": 1
            }
            */
        });

        
        pomelo.on('onBeginSelect', function (data) {
            var ui = that._uiMgr.getCurMainUI();
            that._uiMgr.showTips('匹配成功');
            cc.log('匹配成功, 开始选英雄', data.teamInfo);
            let teamA = data.teamInfo.teamA;
            let teamB = data.teamInfo.teamB;
            that._uiMgr.loadUI(constant.UI.PickHero,function(data){
                data.initData(teamA,teamB);    
            });
        });

        pomelo.on('onSelectHeroNotify', function (data) {
            cc.log(data.uid, '选择英雄:%s', data.heroid);
            var ui = that._uiMgr.getCurMainUI();
            ui.showTeamerSelect(data);
        });

        pomelo.on('onConfirmHeroNotify', function (data) {
            cc.log(data.uid, '%s确认英雄:%s', data.heroid);
            var ui = that._uiMgr.getCurMainUI();
            ui.showTeamerComfirm(data);
        });

        pomelo.on('onEnterLoadCD', function (data) {
            cc.log('加载前倒计时:', data);
             var ui = that._uiMgr.getCurMainUI();
             ui.defalutSelect(data);
            // ui.selectScr.beginLoadCD(data);
        });
    }
}

module.exports = fight;