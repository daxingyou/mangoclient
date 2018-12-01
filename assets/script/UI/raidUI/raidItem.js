var uibase = require('UIBase')
var constant = require('constants')
var dataCenter = require('DataCenter')
var buildTeamProto = require('buildTeamProto')
var consts = require('consts')
var net = require('NetPomelo')
var soloRaidData = require('soloRaidData')
var teamRaidData = require('teamRaidData')
var fightData = require('fightData')
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
      //  cc.log("this._curIndex",this._curIndex,this.raidId,"this.raidId");
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
        let raidData = soloRaidData.soloRaidInfo;
        if (self._requirePlayers == 1) {
            soloRaidData.raidId = self._curIndex;
            fightData.fightType = 1;
            if (Object.keys(raidData).length != 0) {
              //  cc.log("已经存在单人副本",obj);
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
            fightData.fightType = 2;

            net.Request(new buildTeamProto(consts.Team.TYPE_RAID,self.raidId), (data) => {
               
                if (data.code == consts.TeamCode.OK) {
                    cc.log("成功创建副本队伍");
                    self._uiMgr.loadUI(constant.UI.BuildTeam,(data) =>{
                        data.laodFriendList();//加载可以邀请的好友信息
                    });   
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
