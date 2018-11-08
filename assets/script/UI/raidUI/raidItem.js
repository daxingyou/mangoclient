var uibase = require('UIBase')
var constant = require('constants')
var dataCenter = require('DataCenter')
var buildTeamProto = require('buildTeamProto')
var consts = require('consts')
var net = require('NetPomelo')
var soloRaidData = require('soloRaidData')
var teamRaidData = require('teamRaidData')
cc.Class({
    extends: uibase,

    properties: {
        _curIndex:null,
        raidName:cc.Label,
        requireLevel:cc.Label,
        _parents:null,
        raidId:null,
        icon:cc.Sprite,
        raidIcon: cc.SpriteAtlas,//替换图集
        _requirePlayers:1,
        
    },

    initData (index,data,parent) {
       // cc.log("副本关卡信息",data);
        this._curIndex = index;
        this.raidId = data.ID;
        this.raidName.string = data.Name;
        this.requireLevel.string = data.RequireLevel + "级开启";
        this._requirePlayers = data.RequirePlayers;
     //   this.icon.spriteFrame = this.raidIcon.getSpriteFrame(data.Icon);
        this._parents = parent;
        cc.log("this._curIndex",this._curIndex,this.raidId,"this.raidId");
    },//名称，图标，状态
    //玩家还未开启的副本，显示开启等级。
    //该副本的当前状态为“已开启且无进度”，进入单人英雄选择界面。	
    //该副本的当前状态为“有进度”，读取服务器上保存的进度，进入关卡选择界面。	
    //该副本的当前状态为“未开启”，显示TIPS：“{RaidName}{RequireLevel}级开启。”
    onLoad () {
        this._uiMgr = cc.find('Canvas').getComponent('UIMgr');
    },


    loadSoloSelectHero() {
        var self = this;
        let obj = dataCenter.allInfo.raidsInfo.raids;
         // cc.log(dataCenter.allInfo.raidsInfo.raids,"dataCenter.allInfo.raidsInfo.raids");
        if (self._requirePlayers == 1) {
            soloRaidData.raidId = self._curIndex;
            dataCenter.fightType = 1;
            if (Object.keys(obj).length != 0) {
                cc.log("已经存在单人副本",obj);
                let raidData = dataCenter.allInfo.raidsInfo.raids;
                for (let raidId in raidData) {
                    let itemData = raidData[raidId];
                    self._uiMgr.loadUI(constant.UI.EnterSelectRaid,data =>{
                        data.initData(itemData);
                    });
                    return;
                }
            }
            else {
                self._uiMgr.loadUI(constant.UI.SoloRaidSelectHero,data =>{
                    data.initData();
                });
            }
          //  cc.log("单人副本选择的副本id",soloRaidData.raidId);
        }
        else {
            teamRaidData.teamRaidTitle = self.raidName.string;
          

          

            dataCenter.fightType = 2;

            net.Request(new buildTeamProto(consts.Team.TYPE_RAID,self.raidId), (data) => {
               
                if (data.code == consts.TeamCode.OK) {
                    cc.log("成功创建副本队伍");
                    self._uiMgr.loadUI(constant.UI.BuildTeam,(data) =>{
                        data.laodFriendList();//加载可以邀请的好友信息
                    });   
                }
                else if (data.code == consts.TeamCode.TYPE_ERR) {
                    cc.log("类型错误,非单人副本");
                }
                else if (data.code == consts.TeamCode.IN_TEAM) {
                    cc.log("队伍中,已经选择过副本");
                }
                else if (data.code == consts.TeamCode.NOT_IN_TEAM) {
                    cc.log("队伍已解散");
                    self._uiMgr.showTips("队伍已解散");
                }
                else if (data.code == consts.TeamCode.TEAM_FULL) {
                    cc.log("人满了");
                    self._uiMgr.showTips("人满了");
                }
                else if (data.code == consts.TeamCode.IN_MY_TEAM) {
                    cc.log("已经在队伍中");
                    self._uiMgr.showTips("已经在队伍中");
                }
                else if (data.code == consts.TeamCode.PLAYING) {
                    cc.log("已经在游戏中");
                    self._uiMgr.showTips("已经在游戏中");
                }
                else if (data.code == consts.TeamCode.LEVEL_LIMIT) {
                    cc.log("等级限制");
                    self._uiMgr.showTips("等级限制");
                }
                else if (data.code == consts.TeamCode.RAND_LIMIT) {
                    cc.log("段位限制");
                    self._uiMgr.showTips("段位限制");
                }
                else if (data.code == consts.TeamCode.HERO_NUM_LIMIT) {
                    cc.log("英雄数量限制");
                    self._uiMgr.showTips("英雄数量限制");
                }
                else if (data.code == consts.TeamCode.TEAM_NOT_EXIST) {
                    cc.log("队伍不存在");
                    self._uiMgr.showTips("队伍不存在");
                }
                else if (data.code == consts.TeamCode.MEMBER_NOT_EXIST) {
                    cc.log("没有该成员");
                    self._uiMgr.showTips("没有该成员");
                }
                else if (data.code == consts.TeamCode.NOT_CAPTAIN) {
                    cc.log("不是队长");
                    self._uiMgr.showTips("不是队长");
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
                    self._uiMgr.showTips("队长限制");
                    cc.log("队长限制（例如准备）");
                }
                else if (data.code == consts.TeamCode.MATCHING) {
                    self._uiMgr.showTips("匹配中");
                    cc.log("匹配中");
                }
                else if (data.code == consts.TeamCode.IN_PUNISH) {
                    self._uiMgr.showTips("超时惩罚");
                    cc.log("超时惩罚");
                }
            });
        } 
    },

    backRaidUI() {
        this._uiMgr.release();
        this._uiMgr.loadUI(constant.UI.RaidUI,data =>{
        });
    },


    
    	


   

    start () {

    },

    // update (dt) {},
});
