/**
 *     角色对象父类
 *      by pwh
 */
 var HandCard = require('HandCard')
 var buff = require('AbilityBuff')
 var ability = require('Ability') 
 var dataMgr = require('DataMgr') 

var CombatUnit = function(data,attrs,pos,teamid,combat,uid){
   
    this.Pos = pos.index;
    this.teamid = teamid;
    this.curCombat = combat;
    this.uid = uid;

    this.uimgr = cc.find('Canvas').getComponent('UIMgr');
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
///站位  左侧站位 1~10 右侧站位 100 ~ 110
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
///基础物理防御,该数据不能修改
CombatUnit.prototype.basePhysical_arm = 0;
///附加防御供计算
CombatUnit.prototype.addtional_Physical_arm = 0;

//////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~////// 

///手牌
CombatUnit.prototype.handsPile = [];
///技能
CombatUnit.prototype.abilitys = [];
///buff
CombatUnit.prototype.buffs = [];
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

    this.uimgr.loadDmg(this,dmg,true);

    if(this.Hp <= 0)
        this.onDie();
};

CombatUnit.prototype.onHeal = function(curhp,value){
    this.HP = curhp;
    this.agent.hpbar.freshen(this.Hp,this.MaxHp,this.basePhysical_arm);
    this.uimgr.loadDmg(this,value,false);
}

////抽牌       服务器会将所有手牌下发，这里需要做校验
CombatUnit.prototype.onDrawPile = function(ids){
    cc.log('服务器下发 手牌 = ',ids);
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

CombatUnit.prototype.useSkill = function(data)
{
    var skilldata = dataMgr.skill[data.sid];
    var ab = new ability(skilldata[1],this);

    var targets = new Array();

    for(var i in data.targets)
    {
        if(this.curCombat.units.hasOwnProperty(data.targets[i]))
            targets[i] = this.curCombat.units[data.targets[i]];
    }

    ab.Active(null,targets);
    //this.abilitys.push(ab);
}

///播放技能特效
CombatUnit.prototype.skillEffective = function(){

}

///基础属性改变
CombatUnit.prototype.porpUpdate = function(data){
    ///护甲
    this.basePhysical_arm = data.armor;
    this.agent.hpbar.freshen(this.Hp,this.MaxHp,this.basePhysical_arm);
}

CombatUnit.prototype.buffUpdate = function(data){
    cc.log('buff Update ',data);
    //this.buffs.push(new buff(data.info.id,data.info.cells));
    
}

CombatUnit.prototype.onReverse = function(data){

}

CombatUnit.prototype.OnAbilityExit = function(ability){
    //this.abilitys.splice(this.abilitys.indexof(ability),1);
}

CombatUnit.prototype.onDie = function(){
    this.IsDie = true;
    this.agent.PlayAnimation('die',false);
}

CombatUnit.prototype.tick = function(dt){
    for(var i =0;i<this.abilitys.length;i++)
    {
        this.abilitys[i].tick(dt);
    }
};

CombatUnit.prototype.release = function(){
    this.agent.Release();
    this.agent = null;
}

module.exports = CombatUnit;