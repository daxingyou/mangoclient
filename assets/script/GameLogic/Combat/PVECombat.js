var Combat = require('Combat')
var dataMgr = require('DataMgr')
var Hero_ = require('Hero_')
var Monster_ = require('Monster_')
var constant = require('constants')
var Effectmgr = require('EffectMgr')
var gameCenter = require('DataCenter')

var PVECombat = function(){
    Combat.call(this);//调用一个对象的方法，用另外一个对象去替换它
} 

PVECombat.prototype = new Combat();

////初始化怪物
PVECombat.prototype.init = function(data){
 //  cc.log(data,"------------------data,初始化怪物");
    Combat.prototype.init.call(this,data);//PVECombat脚本

    ///test demo 默认 为 PVE_2
    this.matrix = dataMgr.matrix[5];

    for(var i in data.teamInfo.teamA)
    {
        var entity = data.teamInfo.teamA[i];
        if(entity.heroid / 1000 == 1)
            this.resNum +=Effectmgr.initSword();

        this.resNum++;
        var uid = entity.uid , idx = entity.pos;
        var hero = new Hero_(entity,dataMgr.heroAttributes[entity.heroid],this.matrix.MatrixPos[idx],constant.Team.own,this,uid,idx);
        this.own[idx] = hero;

        this.resNum +=Effectmgr.init(dataMgr.hero[entity.heroid].InitialDrawPile);
        if(uid == gameCenter.uuid)
        {
            if(data.hasOwnProperty('myInfo'))
                hero.InitMyInfo(data.myInfo);
            this.curPlayerIndex = idx;
        }
        
        this.units[uid] = hero;
    }

    var group_Data = dataMgr.group[this.dungeon.MonsterGroupID];
    this.monsterMatrix = dataMgr.matrix[group_Data.Matrix];

    ////怪物数据 暂是本地数据
    for(var i in data.teamInfo.teamB){
        var entity = data.teamInfo.teamB[i];
        this.resNum++;
        var uid = entity.uid, idx = entity.pos;
        var monster = new Monster_(entity,dataMgr.monster[entity.monsterid],this.monsterMatrix.MatrixPos[idx],constant.Team.enemy,this,uid);
        this.enemy[idx] = monster;

        this.resNum +=Effectmgr.init(dataMgr.monster[entity.monsterid].InitialDrawPile);
        this.units[uid] = monster;
    }

    cc.log('cur res = ',this.resNum );
    gameCenter.resNum = this.resNum;
    this.checkLoadRes = true;
    this._loadProgress = 0;
}

module.exports = PVECombat;