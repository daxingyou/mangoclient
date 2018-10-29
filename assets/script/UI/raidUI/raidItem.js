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
//     ID: 1,
// 		Name: '月河河洞',
// 		RequirePlayers: 1,
// 		RequireLevel: 0,
// 		TotalCount: 2,
// 		Rooms: {"1":{"cardcount":3, "room_id":1},
// "2":{"cardcount":3, "room_id":2},
// "3":{"cardcount":1, "room_id":3},
// "4":{"cardcount":3, "room_id":4},
// "5":{"cardcount":3, "room_id":5},
// "6":{"cardcount":1, "room_id":6},
// "7":{"cardcount":1, "room_id":7}},
// 		Icon: 'dilingbiyou'
    initData (index,data,parent) {
        cc.log("副本关卡信息",data);
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
        this._uimgr = cc.find('Canvas').getComponent('UIMgr');
    },


    loadSoloSelectHero() {
        var self = this;
        let obj = dataCenter.allInfo.raidsInfo.raids;
         // cc.log(dataCenter.allInfo.raidsInfo.raids,"dataCenter.allInfo.raidsInfo.raids");
        if (self._requirePlayers == 1) {
            soloRaidData.raidId = self._curIndex;
            if (Object.keys(obj).length != 0) {
                cc.log("已经存在单人副本");
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
                   // data.comfirmRaidID(self._curIndex);
                });
            }
            cc.log("单人副本选择的副本id",soloRaidData.raidId);

        }
        else {
            teamRaidData.teamRaidTitle = self.raidName.string;
            self._uimgr.loadUI(constant.UI.BuildTeam,data =>{
                data.title.string = "组队副本";
                data.laodFriendList();
            });

            self._uimgr.loadUI(constant.UI.FightPavTop,(data) =>{
                data.initBackBtn(self.backRaidUI,self);
                data.changeTitle("组队副本");
            });
            dataCenter.fightType = 2;

            net.Request(new buildTeamProto(consts.Team.TYPE_RAID,self.raidId), (data) => {
                cc.log("创建副本队伍",data);
                if (data.code == consts.RaidCode.OK) {
                    cc.log("创建副本队伍");
                }
                else if (data.code == consts.RaidCode.HAD_SELECTED) {
                    cc.log("非单人副本");
                }
                else if (data.code == consts.RaidCode.HAD_SELECTED) {
                    cc.log("已经选择过副本");
                }
                else if (data.code == consts.RaidCode. LEVEL_LIMIT) {
                    cc.log("等级不足");
                }
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
