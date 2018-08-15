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
var Effectmgr = require('EffectMgr')

var Combat = function(){
    
}

Combat.prototype.curPlayerIndex = 0;
/// 战斗持续时间
Combat.prototype.time = 0;

Combat.prototype.summonedMgr = null;

Combat.prototype.enemy = [];

Combat.prototype.own = [];

Combat.prototype.units = [];

Combat.prototype.UIMgr = null;

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
    this.UIMgr = cc.find('Canvas').getComponent('UIMgr');
    
    var dungeon = dataMgr.dungeon[data.dgId];
    var that = this;

    /// 加载场景
    sceneMgr.loadScene(dungeon.SceneID,function(){
        that.sceneLoadOk = true;
    })

    this.time = dungeon.TimeLimit;

    ///test demo 默认 为 PVE_2
    this.matrix = dataMgr.matrix[4];

    for(var entity of data.teamInfo.teamA)
    {
        var uid = entity.uid, idx = entity.pos;
        var hero = new Hero_(entity,dataMgr.heroAttributes[entity.heroid],this.matrix.MatrixPos[idx],constant.Team.own,this,uid);
        this.own[idx] = hero;

        Effectmgr.init(dataMgr.hero[entity.heroid].InitialDrawPile);
        if(uid == gameCenter.uuid)
        {
            hero.InitMyInfo(data.myInfo);
            this.curPlayerIndex = idx;
        }
        
        this.units[uid] = hero;
    }
    
    ///低方初始化
    if(data.matchType == consts.MatchType.PVP)
    {

    }
    else    ///初始化怪物
    {
        var group_Data = dataMgr.group[dungeon.MonsterGroupID];
        this.monsterMatrix = dataMgr.matrix[group_Data.Matrix];

        ////怪物数据 暂是本地数据
        for(var entity of data.teamInfo.teamB){
            var uid = entity.uid, idx = entity.pos;
            var monster = new Monster_(entity,dataMgr.monster[entity.monsterid],this.monsterMatrix.MatrixPos[idx],constant.Team.enemy,this,uid);
            this.enemy[idx] = monster;

            Effectmgr.init(dataMgr.monster[entity.monsterid].InitialDrawPile);
            this.units[uid] = monster;
        }

        this.checkLoadRes = true;
    }
}

Combat.prototype.getSelf = function(){
    return this.own[this.curPlayerIndex];
}

module.exports = Combat;
