var Combat = require('Combat')
var dataMgr = require('DataMgr')
var gameCenter = require('DataCenter')
let playerData = require('playerData');
let util = require('util');

var PVECombat = function(){
    Combat.call(this);//调用一个对象的方法，用另外一个对象去替换它
} 
util.inherits(PVECombat, Combat);

////初始化怪物
PVECombat.prototype.init = function(data){
    Combat.prototype.init.call(this, data);//PVECombat脚本

    ///test demo 默认 为 PVE_2
    this.matrix = dataMgr.matrix[5];

    for(var i in data.teamInfo.teamA)
    {
        var entityData = data.teamInfo.teamA[i];
        let entity = this.createEntity(entityData);
        if (entity.uid === playerData.id) {
            entity.InitMyInfo(data.myInfo);
            this.curPlayer = entity;
        }
    }

    var group_Data = dataMgr.group[this.dungeon.MonsterGroupID];
    this.monsterMatrix = dataMgr.matrix[group_Data.Matrix];

    ////怪物数据 暂是本地数据
    for(var i in data.teamInfo.teamB){
        var entityData = data.teamInfo.teamB[i];
        let entity = this.createEntity(entityData);
    }

    cc.log('cur res = ',this.resNum );
    gameCenter.resNum = this.resNum;
    this.checkLoadRes = true;
    this._loadProgress = 0;
}

module.exports = PVECombat;