/**
 *    战斗管理器
 *    战斗类基类
 *    by pwh  
 */

var dataMgr = require('DataMgr')
var gameCenter = require('DataCenter')
var sceneMgr = require('SceneMgr')
var Hero_ = require('Hero_')
var constant = require('constants')
var consts = require('consts')
var Monster_ = require('Monster_')
var net = require('NetPomelo')
var loadFinishedProto = require('loadFinishedProto')

var Combat = function(){
    
}

Combat.prototype.curPlayerIndex = 0;
/// 战斗持续时间
Combat.prototype.time = 0;

Combat.prototype.enemy = [];

Combat.prototype.own = [];

///检查资源是否加载完毕
Combat.prototype.checkLoadRes = false;
////场景是否加载完毕
Combat.prototype.sceneLoadOk = false;
///战斗UI 是否加载完成
Combat.prototype.UILoadOk = false;

Combat.prototype.Tick = function(){
    if(this.checkLoadRes)
    {
        var result = true;

        for(var i in this.own)
        {
            if(!this.own[i].loadok)
                result = false;
        }

        for(var i in this.enemy)
        {
            if(!this.enemy[i].loadok)
                result = false;
        }

        if(this.sceneLoadOk && this.UILoadOk && result)
        {
            this.checkLoadRes = false;
            cc.log('加载完成！');
            net.Request(new loadFinishedProto(),function(){
                
            });
        }
    }
}

Combat.prototype.init = function(data){
    var dungeon = dataMgr.dungeon[data.dgId];
    var that = this;

    /// 加载场景
    sceneMgr.loadScene(dungeon.SceneID,function(){
        that.sceneLoadOk = true;
    })

    this.time = dungeon.TimeLimit;


    ///test demo 默认 为 PVE_2
    var matrix = dataMgr.matrix[4];
    //var matrix_pos = new MatrixPos(matrix.MatrixPos);

    var index = 1;
    for(var uid in data.teamInfo.teamA)
    {
        this.own[index] = new Hero_(data.teamInfo.teamA[uid],dataMgr.heroAttributes[1001],matrix.MatrixPos[index],constant.Team.own,this,uid);

        if(uid == gameCenter.uuid)
        {
            this.own[index].InitHands(data.myInfo.inHands);
            this.curPlayerIndex = index;
        }
        
        index++;
    }
    
    ///低方初始化
    if(data.matchType == consts.MatchType.PVP)
    {

    }
    else    ///初始化怪物
    {
        var group_Data = dataMgr.group[dungeon.MonsterGroupID];
        var matrix = dataMgr.matrix[group_Data.Matrix];
        
        var monsters = new Array();
        for(var index in group_Data.MonsterGroup)
        {
            monsters[group_Data.MonsterGroup[index]] = index;
        }
        

        if(monsters.length > matrix.MatrixPos.length){
            cc.error('PVE matrix data error !');
            return;
        }

        ////怪物数据 暂是本地数据
        for(var uid in data.teamInfo.teamB){
            var i = 1;
            this.enemy[i] = new Monster_(data.teamInfo.teamB[uid],dataMgr.monster[data.teamInfo.teamB[uid].monsterid],matrix.MatrixPos[monsters[data.teamInfo.teamB[uid].monsterid]],constant.Team.enemy,this,uid);
            i++;
        }

        this.checkLoadRes = true;
    }
}

Combat.prototype.getSelf = function(){
    return this.own[this.curPlayerIndex];
}

module.exports = Combat;
