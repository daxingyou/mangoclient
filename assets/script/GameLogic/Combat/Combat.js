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
var loadProgressProto = require('loadProgressProto')
var Effectmgr = require('EffectMgr')

var Combat = function(){
    this._loadProgress = 0;
    this._loadProgressTickCnt = 0;
}

Combat.prototype.resNum = 0;

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
        //var result = true;

        //for(var i in this.own)
        //{
        //   if(!this.own[i].loadok)
        //        result = false;
        //}

        //for(var i in this.enemy)
        //{
        //    if(!this.enemy[i].loadok)
        //        result = false;
        //}

        //if(this.sceneLoadOk && this.UILoadOk && result
        if(gameCenter.curLoadRes >= this.resNum && this.UILoadOk)
        {
            this.checkLoadRes = false;
            cc.log('加载完成！');
            //this.UIMgr.getUI(constant.UI.Match).hide();
            net.Request(new loadFinishedProto(),function(){
                
            });
            return;
        }
        this._loadProgressTickCnt ++;
        if (this._loadProgressTickCnt >= 20) {
            this._loadProgressTickCnt = 0;
            var progress = Math.floor(gameCenter.curLoadRes / this.resNum * 100);
            if (progress != this._loadProgress) {
                this._loadProgress = progress;
                net.Request(new loadProgressProto(progress),function(){
                    
                });
            }
        }
    }
}

Combat.prototype.init = function(data){
    this.UIMgr = cc.find('Canvas').getComponent('UIMgr');
    this.UIMgr.initDmg();
    var dungeon = dataMgr.dungeon[data.dgId];
    var that = this;
    gameCenter.curLoadRes = 0;
    this.resNum++;
    /// 加载场景
    sceneMgr.loadScene(dungeon.SceneID,function(){
        that.sceneLoadOk = true;
        gameCenter.curLoadRes++;
    })

    this.time = dungeon.TimeLimit;

    ///test demo 默认 为 PVE_2
    this.matrix = dataMgr.matrix[4];

    for(var entity of data.teamInfo.teamA)
    {
        if(entity.heroid / 1000 == 1)
            this.resNum +=Effectmgr.initSword();

        this.resNum++;
        var uid = entity.uid, idx = entity.pos;
        var hero = new Hero_(entity,dataMgr.heroAttributes[entity.heroid],this.matrix.MatrixPos[idx],constant.Team.own,this,uid);
        this.own[idx] = hero;

        this.resNum +=Effectmgr.init(dataMgr.hero[entity.heroid].InitialDrawPile);
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
}

Combat.prototype.getSelf = function(){
    return this.own[this.curPlayerIndex];
}

Combat.prototype.Release = function(){
    for(var i in this.units)
    {
        this.units[i].release();
        delete this.units[i];
    }

    for(var i in this.own)
        delete this.own[i];

    for(var i in this.enemy)
        delete this.enemy[i];

    Effectmgr.release();

    if(this.summonedMgr != null)
        this.summonedMgr.Release();
        
    this.summonedMgr = null;
    this.UIMgr = null;
}

module.exports = Combat;
