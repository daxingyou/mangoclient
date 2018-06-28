/**
 *    战斗管理器
 *    战斗类基类
 *    by pwh  
 */

var dataMgr = require('DataMgr')
var dict = require('dict')
var sceneMgr = require('SceneMgr')
var MatrixPos = require('MatrixPos')
var Hero_ = require('Hero_')
var constant = require('constant')

var Combat = function(){

}

/// 战斗持续时间
Combat.prototype.time = 0;

Combat.prototype.enemy = [];

Combat.prototype.own = [];

Combat.prototype.Tick = function(){

}

Combat.prototype.init = function(data){
    var dungeon = dataMgr.dungeon[data.dgId];

    /// 加载场景
    sceneMgr.loadScene(dungeon.SceneID,function(){

    })

    this.time = dungeon.TimeLimit;


    ///test demo 默认 为 PVE_2
    var matrix = dataMgr.matrix[4];
    var matrix_pos = new MatrixPos(matrix.MatrixPos);

    var index = 0;
    for(var uid in data.teamInfo.teamA)
    {
        this.own[index] = new Hero_(dataMgr.hero[data.teamInfo.teamA[uid].heroid],dataMgr.heroAttributes[1001],matrix_pos.Matrixs[index+1],constant.Team.own);
        index++;
    }
    
    /*
    .dgId
    .myInfo
        mp
        .myInfo.cardsNum
        .myInfo.discardsNum
        .myInfo.exhaustsNum
        .myInfo.inHands
    .teamInfo
        teamA
        teamB
    */

    
}

module.exports = Combat;
