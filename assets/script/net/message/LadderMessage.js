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

        
    }
}

module.exports = ladder;