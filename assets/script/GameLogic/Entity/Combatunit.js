/**
 *     角色对象父类
 *      by pwh
 */

 var DataMgr = require('DataMgr')
 var HandCard = require('HandCard')

var CombatUnit = function(data,attrs,pos,teamid,combat,uid){
   
    this.Pos = pos.index;
    this.teamid = teamid;
    this.curCombat = combat;
    this.uid = uid;
};

//////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~////// 

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
CombatUnit.prototype.onDamage = function(dmg,from){
    for(var i =0;i<this.abilitys.length;i++)
    {
        this.abilitys[i].onDamage();
    }

    this.Hp -= dmg;

    this.agent.hpbar.freshen(this.Hp,this.MaxHp);

    if(this.Hp <= 0)
        this.onDie();
};
////抽牌       服务器会将所有手牌下发，这里需要做校验
CombatUnit.prototype.onDrawPile = function(ids){
    for(var i =0;i<this.abilitys.length;i++)
    {
        this.abilitys[i].onDrawPile();
    }

    //理论上单次下发一张牌
    if(ids.length - this.handsPile.length > 0)
    {
        for(var i = this.handsPile.length ;i<ids.length;i++)
        {
            var card = new HandCard(ids[i],this);
            this.handsPile.push(card);

            cc.log('当前抽牌 手牌数！',this.handsPile.length.toString());
        }
    }
    else{
        cc.log('发牌逻辑 异常请检查！');
    }
};
///使用卡牌监听
CombatUnit.prototype.onUsePile = function(index,Target,targets){
    var card = this.handsPile[index];

    if(card != null){
        var ability = card.Active(Target,targets);
        this.abilitys.push(ability);
        this.handsPile.splice(index,1);
    }
   
    for(var i =0;i<this.abilitys.length;i++)
    {
        this.abilitys[i].onUsePile();
    }
};

CombatUnit.prototype.OnAbilityExit = function(ability){
    this.abilitys.splice(this.abilitys.indexof(ability),1);
}

CombatUnit.prototype.tick = function(dt){
    for(var i =0;i<this.abilitys.length;i++)
    {
        this.abilitys[i].tick(dt);
    }
};

module.exports = CombatUnit;