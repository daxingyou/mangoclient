/**
 *    战斗管理器
 *    战斗类基类
 *    by pwh  
 */

var dataMgr = require('DataMgr')
var gameCenter = require('DataCenter')
var sceneMgr = require('SceneMgr')
var net = require('NetPomelo')
var loadFinishedProto = require('loadFinishedProto')
var loadProgressProto = require('loadProgressProto')
var Effectmgr = require('EffectMgr')
let constants = require('constants')
let consts = require('consts')
let playerData = require('playerData');

var Combat = function () {
    this._loadProgress = 0;
    this._loadProgressTickCnt = 0;

    this.curPlayer = null;
}

Combat.prototype.resNum = 0;

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
///战斗阵形位置 默认为0 左边 1 为右边
Combat.prototype.pos = 0;

Combat.prototype.Tick = function () {
    if (this.checkLoadRes) {
        if (gameCenter.curLoadRes >= this.resNum && this.UILoadOk) {
            this.checkLoadRes = false;
            cc.log('~~~~~~~ 加载完成！');
            //this.uiMgr.getUI(constant.UI.Match).hide();
            net.Request(new loadFinishedProto(), function () {

            });
            return;
        }
        this._loadProgressTickCnt++;
        if (this._loadProgressTickCnt >= 20) {
            this._loadProgressTickCnt = 0;
            var progress = Math.floor(gameCenter.curLoadRes / this.resNum * 100);
            if (progress != this._loadProgress) {
                this._loadProgress = progress;
                net.Request(new loadProgressProto(progress), function () {

                });
            }
        }
    }
}

Combat.prototype._initPlayerGroupId = function (data) {
    let bDone = false;
    for (let i in data.teamInfo.teamA) {
        let entityData = data.teamInfo.teamA[i];
        if (entityData.uid === playerData.id) {
            this.curPlayerGroupId = entityData.groupId;
            gameCenter.curTeamID = entityData.groupId;
            bDone = true;
            break;
        }
    }
    if (!bDone) {
        for (let i in data.teamInfo.teamB) {
            let entityData = data.teamInfo.teamB[i];
            if (entityData.uid === playerData.id) {
                this.curPlayerGroupId = entityData.groupId;
                gameCenter.curTeamID = entityData.groupId;
            }
        }
    }
    this.own = this.groups[this.curPlayerGroupId];
    if (this.curPlayerGroupId == 'groupA') {
        this.enemy = this.groups['groupB'];
    }
    else {
        this.enemy = this.groups['groupA'];
    }
};

Combat.prototype._initData = function (data) {
    this.dgId = data.dgId;
    this.teamType = data.teamType;
    this.matchNum = data.matchNum;
    this.summonedMgr = require('SpawnSummoned');
    this.summonedMgr.init(data.spawnSummons);

    this.groups = {
        groupA: [],
        groupB: []
    }
    this.curPlayerGroupId = 'groupA';
    gameCenter.curTeamID = 'groupA';
    this._initPlayerGroupId(data);
}

Combat.prototype.init = function (data) {
    this._initData(data);

    this.uiMgr = cc.find('Canvas').getComponent('UIMgr');
    this.uiMgr.initDmg();
    this.dungeon = dataMgr.dungeon[data.dgId];
    var that = this;
    gameCenter.curLoadRes = 0;
    this.resNum++;

    /// 加载场景
    sceneMgr.loadScene(this.dungeon.SceneID, function () {
        that.sceneLoadOk = true;
        gameCenter.curLoadRes++;
    })

    this.time = this.dungeon.TimeLimit;
}

Combat.prototype.getSelf = function () {
    return this.curPlayer;
};

Combat.prototype.createHero = function (data) {
    var Hero_ = require('Hero_')
    if (data.heroid / 1000 == 1)
        this.resNum += Effectmgr.initSword();

    this.resNum++;
    var uid = data.uid, idx = data.pos;
    let position = this.curPlayerGroupId === data.groupId ? this.matrix.MatrixPos[idx] : this.monsterMatrix.MatrixPos[idx];
    var hero = new Hero_(data, position, this);
    this.groups[data.groupId][idx] = hero;

    this.resNum += Effectmgr.init(dataMgr.hero[data.heroid].InitialDrawPile);

    this.units[uid] = hero;
    return hero;
};

Combat.prototype.createMonster = function (data) {
    var Monster_ = require('Monster_')
    this.resNum++;
    var uid = data.uid, idx = data.pos;
    var monster = new Monster_(data, this.monsterMatrix.MatrixPos[idx], this);
    this.groups[data.groupId][idx] = monster;

    this.resNum += Effectmgr.init(dataMgr.monster[data.monsterid].InitialDrawPile);
    this.units[uid] = monster;
    return monster;
};

Combat.prototype.createEntity = function (entityData) {
    if (entityData.hasOwnProperty('heroid')) {
        return this.createHero(entityData);
    }
    else {
        return this.createMonster(entityData);
    }
};

Combat.prototype.getEntity = function (uid) {
    return this.units[uid];
};

Combat.prototype.delEntity = function (uid) {
    let entity = this.getEntity(uid);
    if (!entity)
        return;
    let group = this.groups[entity.groupId];
    delete group[entity.pos];
    delete this.units[uid];
    entity.release();
};

// 更新站位
Combat.prototype.updatePos = function (uid, newPos) {
    let entity = this.getEntity(uid);
    let pos = entity.pos;
    if (pos == newPos)
        return;
    entity.updatePos(newPos);
    let group = this.groups[entity.groupId];
    group[newPos] = entity;
    delete group[pos];
};

Combat.prototype.onFightEnd = function (result) {
    if (this.teamType === consts.Team.TYPE_RAID)
    return;
    let ui = this.uiMgr.getUI(constants.UI.Fight);
    if (ui)
        ui.loadFightOver(result,this.teamType)
};

Combat.prototype.Release = function () {
    for (var i in this.units) {
        this.units[i].release();
        delete this.units[i];
    }

    for (var i in this.own)
        delete this.own[i];

    for (var i in this.enemy)
        delete this.enemy[i];

    if (this.summonedMgr != null)
        this.summonedMgr.Release();

    Effectmgr.release();

    if (this.summonedMgr != null)
        this.summonedMgr.Release();

    this.summonedMgr = null;
    this.uiMgr = null;
}

module.exports = Combat;
