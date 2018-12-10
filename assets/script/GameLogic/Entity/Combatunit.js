/**
 *     角色对象父类
 *      by pwh
 */
 var HandCard = require('HandCard')
 var buff = require('AbilityBuff')
 var ability = require('Ability') 
 var dataMgr = require('DataMgr') 

 var FSM = require('FSM');
 var FSMEvent = require('FSMEvent');
 var StandbyState = require('StandbyState');
 var DieState = require('DieState');
 var HitState = require('HitState');
 var SingState = require('SingState');
 var SwoonState = require('SwoonState');
 var ReliveState = require('ReliveState');
 
 var constants = require('constants');
 let combatMgr = require('CombatMgr');
 let consts = require('consts');

var CombatUnit = function(data, combat){
    this.uid = data.uid;
    this.inHandsNum = data.inHandsNum;
    this.lv = data.lv;
    this.hp = data.hp;
    this.maxHp = data.maxHp;
    this.mp = data.mp;
    this.maxMp = data.maxMp;
    this.thew = data.thew;
    this.maxThew = data.maxThew;
    this.armor = data.armor;
    this.pos = data.pos;
    this.scale = data.scale;
    this.groupId = data.groupId;
    this.name = data.name;

    this.curCombat = combat;
    this.teamid = combat.curPlayerGroupId === this.groupId ? constants.Team.own : constants.Team.enemy;

    this.uimgr = cc.find('Canvas').getComponent('UIMgr');

    this.buffs = {};
    if(data.hasOwnProperty('buffs'))
    {
        for(var i = 0; i < data.buffs.length; i++)
        {
            var info = data.buffs[i];
            this.buffs[info.realID] = new buff(info);
        }
    }

    this._initFSM();

    Object.defineProperty(this, 'fightUI', {
        get: function () {
            if (!this._fightUI) {
                let uiMgr = cc.Canvas.instance.getComponent('UIMgr');
                this._fightUI = uiMgr.getUI(constants.UI.Fight);
            }
            return this._fightUI;
        }
    })
};

CombatUnit.prototype._initFSM = function () {
    var fsm = new FSM(this);
    fsm.addInitState(new StandbyState(fsm));
    fsm.addState(new DieState(fsm));
    fsm.addState(new HitState(fsm));
    fsm.addState(new SingState(fsm));
    fsm.addState(new SwoonState(fsm));
    fsm.addState(new ReliveState(fsm));

    this.fsm = fsm;
};

//////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~////// 

CombatUnit.prototype.IsDie = false;
///资源加载完成
CombatUnit.prototype.loadok = false;
///角色唯一id
CombatUnit.prototype.uid = 0;
///当前英雄 id
CombatUnit.prototype.sid = 0;
///队伍id 区分敌我
CombatUnit.prototype.teamid = 0;
////角色实体
CombatUnit.prototype.agent = null;
///当前血量
CombatUnit.prototype.hp = 0;
///最大血量
CombatUnit.prototype.maxHp = 0;
///当前灵力
CombatUnit.prototype.mp = 0;
///最大灵力
CombatUnit.prototype.maxMp = 0;
///体力
CombatUnit.prototype.thew = 0;
///最大体力
CombatUnit.prototype.maxThew = 0;
///基础物理防御,该数据不能修改
CombatUnit.prototype.armor = 0;
///附加防御供计算
CombatUnit.prototype.addtional_Physical_arm = 0;
// MP恢复基础时间
CombatUnit.prototype.mpRecoverTime = 3000;
// MP恢复速率
CombatUnit.prototype.mpRecoverRate = 1;
// MP恢复暂停
CombatUnit.prototype.mpRecoverPause = false;
// 模型缩放
CombatUnit.prototype.scale = 1;

//////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~////// 

///手牌
CombatUnit.prototype.handsPile = [];
///技能
CombatUnit.prototype.abilitys = [];
//////~~~~~~~~~~~~~~~~~~~~~~~~~~~Get function ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~///////

CombatUnit.prototype.GetPhysical = function(){
    return this.armor + this.addtional_Physical_arm;
}

//////~~~~~~~~~~~~~~~~~~On function~~~~~~~~~~~~~~~~~~~~~~~~~~~////// 
CombatUnit.prototype.isPlayer = function () {
    return this == this.curCombat.getSelf();
};

CombatUnit.prototype.onDot = function(){

};
////伤害监听
CombatUnit.prototype.onDamage = function(data){
    this.hp = data.hp;
    if (data.hasOwnProperty('armor'))
        this.armor = data.armor;
    this.agent.hpbar.freshen(this.hp,this.maxHp,this.armor);
    let dmg = data.oriDamage;
    this.uimgr.loadDmg(this, dmg, true, data.attackerID, data.isCrit);

    if(this.hp <= 0)
        this.onDie();
    else
        this.fsm.handleEvent(FSMEvent.HIT);

    if(this.isPlayer())
    {
        this.fightUI.updateBarLabel(this.hp,this.maxHp);
        this.fightUI.FreshHp();
    }
};

// spawnSummon伤害
CombatUnit.prototype.onSpawnSummonDamage = function (damageData, casterID) {
    this.hp = damageData.curHp;
    this.armor = damageData.curArmor;
    this.agent.hpbar.freshen(this.hp, this.maxHp, this.armor);

    for (var damageItem of damageData.damageList) {
        var deltaHp = damageItem[0] - damageItem[1];
        //var deltaArmor = damageItem[2] - damageItem[3];
        if (deltaHp > 0) {
            this.uimgr.loadDmg(this, deltaHp, true, casterID);
        }
    }
};

CombatUnit.prototype.freshAttri = function (data) {
    if (data) {
        for (var k in data) {
            this[k] = data[k];
        }
    }
    this.agent.hpbar.freshen(this.hp, this.maxHp, this.armor);

    if(this == this.curCombat.getSelf())
    {
        this.fightUI.updateBarLabel(this.hp,this.maxHp);
    }
};

CombatUnit.prototype.onHeal = function(curhp, value, casterID, isCrit){
    this.hp = curhp;
    this.agent.hpbar.freshen(this.hp,this.maxHp,this.armor);
    this.uimgr.loadDmg(this, value, false, casterID, isCrit);

    if(this == this.curCombat.getSelf())
    {
        this.fightUI.FreshHp(this.hp, this.maxHp);
    }
}

CombatUnit.prototype.Relive = function(curhp, casterID){
    this.hp = curhp;
    this.agent.hpbar.freshen(this.hp, this.maxHp, this.armor);
    this.uimgr.loadDmg(this,curhp,false, casterID);

    if(this == this.curCombat.getSelf())
    {
        this.fightUI.updateBarLabel(this.hp, this.maxHp);
    }
}

CombatUnit.prototype.useSkill = function(data,targets)
{
    var skilldata = dataMgr.skill[data.sid];
    var ab = new ability(skilldata[1],this);

    ab.Active(null,targets[1]);
    this.abilitys.push(ab);
}

CombatUnit.prototype.bounceEffect = function(sid,damageLine){
    var ab = this.getSkill(sid);
    ab.Active(null,null);
    ab.showtBounceEffect(damageLine);
}

CombatUnit.prototype.getSkill = function(sid){
    for(var i =0;i<this.abilitys.length;i++)
    {
        if(this.abilitys[i].ID == sid)
        {
            return this.abilitys[i];
        }    
    }

    var skilldata = dataMgr.skill[sid];
    var ab = new ability(skilldata[1],this);

    this.abilitys.push(ab);
    return ab;
}   

///播放技能特效
CombatUnit.prototype.skillEffective = function(){

}

///基础属性改变
CombatUnit.prototype.onPropUpdate = function(data){
    if(data.hasOwnProperty('armor'))
    {
        ///护甲
        this.armor = data.armor;
        this.agent.hpbar.freshen(this.hp,this.maxHp,this.armor);
    }
    else if(data.hasOwnProperty('hp'))
    {
        this.hp = data.hp;
        this.agent.hpbar.freshen(this.hp,this.maxHp,this.armor);
        this.fightUI.FreshHp();
    }
    else if(data.hasOwnProperty('maxHp'))
    {
        this.maxHp = data.maxHp;
        this.agent.hpbar.freshen(this.maxHp,this.maxHp,this.armor);
        this.fightUI.FreshHp();
    }
    else if(data.hasOwnProperty('scale'))
    {
        this.scale = data.scale;
        if (this.IsDie || combatMgr.fightEnd)
            return;
        ///模型缩放
        this.agent.setScale(data.scale);
    }
}

CombatUnit.prototype.buffUpdate = function(realID, info){
    if (!info) {
        delete this.buffs[realID];
    }
    else if (this.buffs.hasOwnProperty(realID)) {
        this.buffs[realID].updateInfo(info);
    }
    else {
        this.buffs[realID] = new buff(info);
    }
   
    this.agent.hpbar.freshenBuff(this.buffs);
}

// buff影响hp
CombatUnit.prototype.onBuffModHp = function (data) {
    let fromHp = data.fromHp, toHp = data.toHp, val = data.val, 
        casterID = data.casterID, isCrit = data.isCrit;
    if (fromHp < toHp) {
        this.onHeal(toHp, val, casterID, isCrit);
    }
    else {
        this.onDamage({
            hp: toHp,
            oriDamage: -val,
            attackerID: casterID,
            isCrit: isCrit
        })
    }
    if (this.isPlayer()) {
        this.fightUI.FreshHp();
    }
};

CombatUnit.prototype.onReverse = function(data){

}

CombatUnit.prototype.OnAbilityExit = function(ability){
    var index = 0;
    for(var i = 0;i< this.abilitys.length;i++)
    {
        if(this.abilitys[i].ID == ability.ID)
        {
            index = i;
            break;
        }
    }

    this.abilitys.splice(index,1);
}

CombatUnit.prototype.onDie = function(){
    this.fsm.handleEvent(FSMEvent.DIE);
}

CombatUnit.prototype.updatePos = function(pos){
    this.pos = pos;
    ///设置当前位置
    if(this.heroid)
    {
        this.agent.setPos(this.curCombat.matrix.MatrixPos[pos]);
    }
    else
    {
        this.agent.setPos(this.curCombat.monsterMatrix.MatrixPos[pos]);
    }
}

// 主动恢复灵力
CombatUnit.prototype.onGetMp = function (data) {
    this.mp = data.mp;
    if (this == this.curCombat.getSelf())
        this.fightUI.onFreshMp(this.mp);
};

CombatUnit.prototype.updatePileNum = function (pileType, deltaNum) {
    switch (pileType) {
        case consts.PileType.CARDS:
            this.cardsNum += deltaNum;
            break;
        case consts.PileType.DISCARDS:
            this.discardsNum += deltaNum;
            break;
        case consts.PileType.EXHAUSTS:
            this.exhaustsNum += deltaNum;
            break;
    }
};

CombatUnit.prototype.tick = function(dt){
    for(var i =0;i<this.abilitys.length;i++)
    {
        this.abilitys[i].tick(dt);
    }
};

CombatUnit.prototype.release = function(){
    this.handsPile.splice(0,this.handsPile.length);
    this.abilitys.splice(0,this.abilitys.length);

    if(this.agent != null)
    {
        this.agent.Release();
        this.agent = null;
    }
}

module.exports = CombatUnit;