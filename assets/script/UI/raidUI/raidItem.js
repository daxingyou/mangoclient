var uibase = require('UIBase')
var constant = require('constants')
var dataCenter = require('DataCenter')
var buildTeamProto = require('buildTeamProto')
var consts = require('consts')
var net = require('NetPomelo')
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
    initData (data,parent) {
        cc.log("副本关卡信息",data);
        this.raidId = data.ID;
        this.raidName.string = data.Name;
        this.requireLevel.string = data.RequireLevel + "级开启";
        this._requirePlayers = data.RequirePlayers;
     //   this.icon.spriteFrame = this.raidIcon.getSpriteFrame(data.Icon);
        this._parents = parent;
    },//名称，图标，状态
    //玩家还未开启的副本，显示开启等级。
    //该副本的当前状态为“已开启且无进度”，进入单人英雄选择界面。	
    //该副本的当前状态为“有进度”，读取服务器上保存的进度，进入关卡选择界面。	
    //该副本的当前状态为“未开启”，显示TIPS：“{RaidName}{RequireLevel}级开启。”
    onLoad () {
        this._uimgr = cc.find('Canvas').getComponent('UIMgr');
    },


    loadSoloSelectHero() {
        var self = this;
        let obj = dataCenter.allInfo.raidsInfo.raids;
         // cc.log(dataCenter.allInfo.raidsInfo.raids,"dataCenter.allInfo.raidsInfo.raids");
        if (self._requirePlayers == 1) {
            cc.log("单人副本",obj);
            if (Object.keys(obj).length != 0) {
                cc.log("已经存在副本");
                let raidData = dataCenter.allInfo.raidsInfo.raids;
                for (let raidId in raidData) {
                    let itemData = raidData[raidId];
                    self._uimgr.loadUI(constant.UI.EnterSelectRaid,data =>{
                        data.initData(itemData);
                    });
                    return;
                }
            }
            else {
                self._uimgr.loadUI(constant.UI.SoloRaidSelectHero,data =>{
                    data.initData();
                    data.comfirmRaidID(self.raidId);
                });
            }
        }
        else {
            cc.log("多人副本",obj);
            self._uimgr.loadUI(constant.UI.BuildTeam,data =>{
                data.title.string = "组队副本";
                data.laodFriendList();
            });
            self._uimgr.loadUI(constant.UI.FightPavTop,(data) =>{
                data.initBackBtn(self.backRaidUI,self);
                data.changeTitle(5);
            });

            net.Request(new buildTeamProto(consts.Team.TYPE_RAID,self.raidId), (data) => {
                cc.log("创建副本队伍",data);
            });

        } 
    },

    backRaidUI() {
        cc.log("返回选择副本");
        this._uimgr.loadUI(constant.UI.RaidUI,data =>{

        });
    },


    
    	


   

    start () {

    },

    // update (dt) {},
});
