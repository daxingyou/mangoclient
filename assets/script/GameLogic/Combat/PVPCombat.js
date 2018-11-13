var Combat = require('Combat')
var dataMgr = require('DataMgr')
var gameCenter = require('DataCenter')
let playerData = require('playerData');

var PVPCombat = function () {
    Combat.call(this);//调用一个对象的方法，用另外一个对象去替换它
}

PVPCombat.prototype = new Combat();

////初始化怪物
PVPCombat.prototype.init = function (data) {
    cc.log(data, "PVP ------------------data,初始化怪物");
    Combat.prototype.init.call(this, data);

    ///pvp alpha demo 左侧阵营
    this.matrix = dataMgr.matrix[6];

    ///pvp alpha demo 右侧阵营
    this.monsterMatrix = dataMgr.matrix[7];

    for(var i in data.teamInfo.teamA)
    {
        var entityData = data.teamInfo.teamA[i];
        let entity = this.createEntity(entityData);
        if (entity.uid === playerData.id) {
            entity.InitMyInfo(data.myInfo);
            this.curPlayer = entity;
        }
    }

    for(var i in data.teamInfo.teamB)
    {
        var entityData = data.teamInfo.teamB[i];
        let entity = this.createEntity(entityData);
        if (entity.uid === playerData.id) {
            entity.InitMyInfo(data.myInfo);
            this.curPlayer = entity;
        }
    }


    cc.log('cur res = ', this.resNum);
    gameCenter.resNum = this.resNum;
    this.checkLoadRes = true;
    this._loadProgress = 0;
}

module.exports = PVPCombat;