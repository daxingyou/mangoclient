var uibase = require('UIBase')
var constant = require('constants')
var consts = require('consts')
var net = require('NetPomelo')
let playerData = require('playerData');

cc.Class({
    extends: uibase,

    properties: {
        _curIndex: null,
        raidName: cc.Label,
        requireLevel: cc.Label,
        _parents: null,
        raidId: null,
        icon: cc.Sprite,
        raidIcon: cc.SpriteAtlas,//替换图集
        _requirePlayers: 1,

    },

    initData(index, data, parent) {
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
    onLoad() {
        this._super();
    },


    loadSoloSelectHero() {
        var self = this;
        if (self._requirePlayers == 1) {
            let raidInfo = playerData.raidData.getSingleRaidInfo(this.raidId);
            if (raidInfo) {
                let room = raidInfo.rooms[raidInfo.rooms.length - 1];
                if (room.state === consts.Raid.STATE_SELECT) {
                    self._uiMgr.loadUI(constant.UI.EnterSelectRaid, data => {
                        data.initData(raidInfo);
                    });
                    return;
                }
            }
            self._uiMgr.loadUI(constant.UI.SinglePickHero, data => {
                data.initData(self.raidId);
            });
        }
        else {
            net.requestWithCallback(
                'buildTeamProto', consts.Team.TYPE_RAID, self.raidId, (data) => {
                    if (data.code == consts.TeamCode.OK) {
                        cc.log("成功创建副本队伍");
                        self._uiMgr.loadUI(constant.UI.BuildTeam);
                    }
                    else if (data.code == consts.TeamCode.IN_PUNISH) {
                        self._uiMgr.showTips("超时惩罚中");
                        cc.log("超时惩罚");
                    }
                });
        }
    },

    backRaidUI() {
        this._uiMgr.release();
        this._uiMgr.loadUI(constant.UI.RaidUI, data => {
        });
    },
});
