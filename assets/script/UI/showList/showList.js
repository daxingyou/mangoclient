var uibase = require('UIBase')
var constant = require('constants')
var combatMgr = require('CombatMgr')
var net = require("NetPomelo")
var matchProto = require('matchProto')
var buildTeamProto = require('buildTeamProto')
var consts = require('consts')
var teamData = require('teamData')


cc.Class({
    extends: uibase,

    properties: {
        Level:cc.Node,
        soloBtn:cc.Node,
        teamBtn:cc.Node,
        practiceBtn:cc.Node,
        teamKind:1,
        _CDState:false,
        cdTime:0,
    },


    onLoad () {
        this.showLevel(10);//假装等级为10
        this._uiMgr = cc.find('Canvas').getComponent('UIMgr');
        this.eableClick();
    },

    start () {
        if (teamData.punishBeginTime !=0) {
            let time = new Date().getTime(teamData.punishBeginTime); 
            this.unEableClick();
            this._uiMgr.showTips("30秒超时惩罚中");
            this.cdTime = 30;
            this._CDState = true;
        }
    },
    
    showLevel (data) {
         if (data > 5) {
            this.Level.getChildByName("moreFive").active = true;
            this.Level.getChildByName("lessFive").active = false;
         }
         else {
            this.Level.getChildByName("moreFive").active = false;
            this.Level.getChildByName("lessFive").active = true;
         }
    },

    init () {
        this.eableClick();
    },
    
    team (event, customEventData) {
        let that = this;
        that.unEableClick();
        let cust = parseInt(customEventData);
        that.teamKind = cust;
        if (cust == 1) {
            net.Request(new buildTeamProto(consts.Team.TYPE_LADDER,0), (data) => {
               
                if (data.code == consts.TeamCode.OK) {
                    cc.log("成功创建天梯队伍");
                    that._uiMgr.loadUI(constant.UI.BuildTeam,(data) =>{
                        data.laodFriendList();//加载可以邀请的好友信息
                    });   
                }
                else if (data.code == consts.TeamCode.TYPE_ERR) {
                    cc.log("类型错误");
                }
                else if (data.code == consts.TeamCode.IN_TEAM) {
                    cc.log("队伍中");
                }
                else if (data.code == consts.TeamCode.NOT_IN_TEAM) {
                    cc.log("队伍已解散");
                    that._uiMgr.showTips("队伍已解散");
                }
                else if (data.code == consts.TeamCode.TEAM_FULL) {
                    cc.log("人满了");
                    that._uiMgr.showTips("人满了");
                }
                else if (data.code == consts.TeamCode.IN_MY_TEAM) {
                    cc.log("已经在队伍中");
                    that._uiMgr.showTips("已经在队伍中");
                }
                else if (data.code == consts.TeamCode.PLAYING) {
                    cc.log("已经在游戏中");
                    that._uiMgr.showTips("已经在游戏中");
                }
                else if (data.code == consts.TeamCode.LEVEL_LIMIT) {
                    cc.log("等级限制");
                    that._uiMgr.showTips("等级限制");
                }
                else if (data.code == consts.TeamCode.RAND_LIMIT) {
                    cc.log("段位限制");
                    that._uiMgr.showTips("段位限制");
                }
                else if (data.code == consts.TeamCode.HERO_NUM_LIMIT) {
                    cc.log("英雄数量限制");
                    that._uiMgr.showTips("英雄数量限制");
                }
                else if (data.code == consts.TeamCode.TEAM_NOT_EXIST) {
                    cc.log("队伍不存在");
                    that._uiMgr.showTips("队伍不存在");
                }
                else if (data.code == consts.TeamCode.MEMBER_NOT_EXIST) {
                    cc.log("没有该成员");
                    that._uiMgr.showTips("没有该成员");
                }
                else if (data.code == consts.TeamCode.NOT_CAPTAIN) {
                    cc.log("不是队长");
                    that._uiMgr.showTips("不是队长");
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
                    that._uiMgr.showTips("超时惩罚");
                    cc.log("超时惩罚");
                }
            });    
            // this.canInvite.active = true;//加判断，可以邀请的段位
        }
        else if (cust == 2) {
          net.Request(new buildTeamProto(consts.Team.TYPE_PRACTICE,0), (data) => {
            cc.log("创建队伍",data);
            if (data.code == consts.TeamCode.OK) {
                cc.log("成功创建4v4队伍");
                that._uiMgr.loadUI(constant.UI.BuildTeam,(data) =>{
                    data.laodFriendList();//加载可以邀请的好友信息
                });   
            }
        });
        } 
        else if (customEventData == 3) {//协议暂时和4v4一样
            net.Request(new buildTeamProto(consts.Team.TYPE_PRACTICE,0), (data) => {
                if (data.code == consts.TeamCode.OK) {
                    cc.log("成功创建单人队伍");
                    that._uiMgr.loadUI(constant.UI.BuildTeam,(data) =>{
                        data.laodFriendList();//加载可以邀请的好友信息
                    });   
                }
                else if (data.code == consts.TeamCode.TYPE_ERR) {
                    cc.log("类型错误");
                }
                else if (data.code == consts.TeamCode.IN_TEAM) {
                    cc.log("队伍中");
                }
                else if (data.code == consts.TeamCode.NOT_IN_TEAM) {
                    cc.log("队伍已解散");
                    that._uiMgr.showTips("队伍已解散");
                }
                else if (data.code == consts.TeamCode.TEAM_FULL) {
                    cc.log("人满了");
                    that._uiMgr.showTips("人满了");
                }
                else if (data.code == consts.TeamCode.IN_MY_TEAM) {
                    cc.log("已经在队伍中");
                    that._uiMgr.showTips("已经在队伍中");
                }
                else if (data.code == consts.TeamCode.PLAYING) {
                    cc.log("已经在游戏中");
                    that._uiMgr.showTips("已经在游戏中");
                }
                else if (data.code == consts.TeamCode.LEVEL_LIMIT) {
                    cc.log("等级限制");
                    that._uiMgr.showTips("等级限制");
                }
                else if (data.code == consts.TeamCode.RAND_LIMIT) {
                    cc.log("段位限制");
                    that._uiMgr.showTips("段位限制");
                }
                else if (data.code == consts.TeamCode.HERO_NUM_LIMIT) {
                    cc.log("英雄数量限制");
                    that._uiMgr.showTips("英雄数量限制");
                }
                else if (data.code == consts.TeamCode.TEAM_NOT_EXIST) {
                    cc.log("队伍不存在");
                    that._uiMgr.showTips("队伍不存在");
                }
                else if (data.code == consts.TeamCode.MEMBER_NOT_EXIST) {
                    cc.log("没有该成员");
                    that._uiMgr.showTips("没有该成员");
                }
                else if (data.code == consts.TeamCode.NOT_CAPTAIN) {
                    cc.log("不是队长");
                    that._uiMgr.showTips("不是队长");
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
                    that._uiMgr.showTips("超时惩罚");
                    cc.log("超时惩罚");
                }
            });
        }
    },

    unEableClick () {
       
        this.soloBtn.getComponent(cc.Button).interactable = false;
        this.teamBtn.getComponent(cc.Button).interactable = false;
        this.practiceBtn.getComponent(cc.Button).interactable = false;
    },

    eableClick () {

        this.soloBtn.getComponent(cc.Button).interactable = true;
        this.teamBtn.getComponent(cc.Button).interactable = true;
        this.practiceBtn.getComponent(cc.Button).interactable = true;
    },

    enterShop() {
        this._uiMgr.loadUI(constant.UI.Shop,function(data){});
        var ui = this._uiMgr.getUI(constant.UI.CommonTop);
        if(ui != null) {
            ui.changeTitle("商店");
        }     
    },

    update () {
        if (this._CDState) {
            this.cdTime -= dt;
            if (this.cdTime <= 0) {
                this._CDState = false;
                teamData.punishBeginTime = 0;
            }
    }
    },
});
