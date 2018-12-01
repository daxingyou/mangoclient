var constant = require('constants')
var combatMgr = require('CombatMgr');
var ladder = {
    init: function () {
        this._uiMgr = cc.find('Canvas').getComponent('UIMgr');
        var that = this;

        pomelo.on('onLadderInfoUpdate', function (data) {
            cc.log("天梯信息更新", data);

            /* "onLadderInfoUpdate": {
                "required uInt32 rank": 1,
                "required uInt32 star": 2
            },*/

        });

        pomelo.on('onRaidInfoUpdate', function (data) {
            cc.log("副本信息更新", data);
            let info  = data.info;

            if (info == undefined) {
                that._uiMgr.loadUI(constant.UI.RaidUI,data =>{
                    combatMgr.Release();
                    combatMgr.curCombat.UILoadOk = true; 
                }); 
            }
            else {
                that._uiMgr.loadUI(constant.UI.EnterSelectRaid,data =>{
                    combatMgr.Release();
                    combatMgr.curCombat.UILoadOk = true; 
                    data.initData(info);
                });
            }
            
            /*"onRaidInfoUpdate": {
                "required uInt32 raidID": 1,
                "message RaidInfo": {
                  "required uInt32 raidID": 1,
                  "required uInt32 heroid": 2,
                  "repeated uInt32 cards": 3,
                  "required uInt32 hp": 4,
                  "required uInt32 maxHp": 5,
                  "message RoomInfo": {
                    "required uInt32 state": 1,
                    "optional string type": 2,
                    "optional uInt32 id": 3,
                    "repeated uInt32 selectList": 4,
                    "repeated uInt32 cardsList": 5
                  },
                  "repeated RoomInfo rooms": 6
                },
                "optional RaidInfo info": 2
              }*/
        });
    }
}

module.exports = ladder;