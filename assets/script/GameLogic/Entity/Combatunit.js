/**
 *     角色对象父类
 *      by pwh
 */
 var HandCard = require('HandCard')
 var buff = require('AbilityBuff')
 var ability = require('Ability') 
 var dataMgr = require('DataMgr') 
 var gameCenter = require('DataCenter')

 var FSM = require('FSM');
 var FSMEvent = require('FSMEvent');
 var StandbyState = require('StandbyState');
 var DieState = require('DieState');
 var HitState = require('HitState');
 var SingState = require('SingState');
 var SwoonState = require('SwoonState');
 var ReliveState = require('ReliveState');

var CombatUnit = function(data,attrs,pos,teamid,combat,uid){
    this.Pos = data.pos;
    this.teamid = teamid;
    this.curCombat = combat;
    this.uid = uid;
    this.scale = data.scale;

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
///站位  
CombatUnit.prototype.Pos = 0;
////角色实体
CombatUnit.prototype.agent = null;
///当前血量
CombatUnit.prototype.Hp = 0;
///最大血量
CombatUnit.prototype.MaxHp = 0;
///当前灵力
CombatUnit.prototype.Mp = 0;
///最大灵力
CombatUnit.prototype.MaxMp = 0;
///体力
CombatUnit.prototype.Thew = 0;
///最大体力
CombatUnit.prototype.MaxThew = 0;
///基础物理防御,该数据不能修改
CombatUnit.prototype.basePhysical_arm = 0;
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
    return this.basePhysical_arm + this.addtional_Physical_arm;
}

//////~~~~~~~~~~~~~~~~~~On function~~~~~~~~~~~~~~~~~~~~~~~~~~~////// 
CombatUnit.prototype.onDie = function(){
    for(var i =0;i<this.abilitys.length;i++)
    {
        this.abilitys[i].onDie();
    }
};
CombatUnit.prototype.onDot = function(){

};
////伤害监听
CombatUnit.prototype.onDamage = function(dmg,from,data = null){
    this.Hp = data.hp;
    this.basePhysical_arm = data.armor;
    this.agent.hpbar.freshen(this.Hp,this.MaxHp,this.basePhysical_arm);

    this.uimgr.loadDmg(this, dmg, true, data.attackerID);

    if(this.Hp <= 0)
        // this.onDie();
        this.fsm.handleEvent(FSMEvent.DIE);
    else
        this.fsm.handleEvent(FSMEvent.HIT);

    if(this.uid == this.curCombat.getSelf().uid)
    {
        if(this.ui == null  || this.ui == undefined)
            this.ui = this.curCombat.UIMgr.getCurMainUI();
        this.ui.updateBarLabel(this.Hp,this.MaxHp);
    }
};

// spawnSummon伤害
CombatUnit.prototype.onSpawnSummonDamage = function (damageData, casterID) {
    this.Hp = damageData.curHp;
    this.basePhysical_arm = damageData.curArmor;
    this.agent.hpbar.freshen(this.Hp, this.MaxHp, this.basePhysical_arm);

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
    this.agent.hpbar.freshen(this.Hp, this.MaxHp, this.basePhysical_arm);

    if(this.uid == this.curCombat.getSelf().uid)
    {
        if(this.ui == null  || this.ui == undefined)
            this.ui = this.curCombat.UIMgr.getCurMainUI();
        this.ui.updateBarLabel(this.Hp,this.MaxHp);
    }
};

CombatUnit.prototype.onHeal = function(curhp, value, casterID){
    this.Hp = curhp;
    this.agent.hpbar.freshen(this.Hp,this.MaxHp,this.basePhysical_arm);
    this.uimgr.loadDmg(this,value,false, casterID);

    if(this.uid == this.curCombat.getSelf().uid)
    {
        if(this.ui == null  || this.ui == undefined)
            this.ui = this.curCombat.UIMgr.getCurMainUI();
        this.ui.updateBarLabel(this.Hp,this.MaxHp);
    }
}

CombatUnit.prototype.Relive = function(curhp, value, casterID){
    this.Hp = curhp;
    this.agent.hpbar.freshen(this.Hp, this.MaxHp, this.basePhysical_arm);
    this.uimgr.loadDmg(this,value,false, casterID);

    this.fsm.handleEvent(FSMEvent.RELIVE);

    if(this.uid == this.curCombat.getSelf().uid)
    {
        if(this.ui == null  || this.ui == undefined)
            this.ui = this.curCombat.UIMgr.getCurMainUI();
        this.ui.updateBarLabel(this.Hp,this.MaxHp);
    }
}

////抽牌       服务器会将所有手牌下发，这里需要做校验
CombatUnit.prototype.onDrawPile = function(ids){
    ids = ids || [];
   // cc.log('服务器下发 手牌 = ',ids);//更新牌的张数
    cc.log('当前 手牌 = ',this.handsPile);

    this.handsPile.length = 0;
    for(var i = 0 ;i<ids.length;i++)
    {
        this.handsPile[i] = new HandCard(ids[i],this);
    }
};

///刷新数据
CombatUnit.prototype.onUsePile = function(ids){
    this.handsPile.length = 0;
    for(var i =0;i<ids.length;i++)
    {
        this.handsPile[i] = new HandCard(ids[i],this);
    }
}

CombatUnit.prototype.useCard = function(data)
{
    var card = new HandCard(data.cid,this);
    card.Active(this.curCombat.units[data.tid]);
}

CombatUnit.prototype.useSkill = function(data,targets)
{
    var skilldata = dataMgr.skill[data.sid];
    var ab = new ability(skilldata[1],this);

    ab.Active(null,targets);
    this.abilitys.push(ab);
}

///播放技能特效
CombatUnit.prototype.skillEffective = function(){

}

///基础属性改变
CombatUnit.prototype.porpUpdate = function(data){
    if(data.hasOwnProperty('armor'))
    {
        ///护甲
        this.basePhysical_arm = data.armor;
        this.agent.hpbar.freshen(this.Hp,this.MaxHp,this.basePhysical_arm);
    }
    else if(data.hasOwnProperty('scale'))
    {
        this.scale = data.scale;
        if (this.IsDie || gameCenter.fightEnd)
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
    this.IsDie = true;
    this.agent.PlayAnimation('die',false);
}

CombatUnit.prototype.onAddSummon = function(pos){
    this.Pos = pos;
    ///设置当前位置
    if(this.teamid == this.curCombat.getSelf().teamid)
    {
        //this.curCombat.ow
        this.agent.setPos(this.curCombat.matrix.MatrixPos[pos]);
    }
    else{
        this.agent.setPos(this.curCombat.monsterMatrix.MatrixPos[pos]);
    }
}

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