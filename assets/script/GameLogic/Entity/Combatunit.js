/**
 *     角色对象父类
 *      by pwh
 */
 var Agent = require('Agent');

var CombatUnit = function(data){
    this.agent = new Agent('/Hero/change');

    this.Hp = data.MaxHp;
    this.MaxHp = data.MaxHp;
    this.Mp = data.Mp;
    this.MaxMp = data.MaxMp;
};

//////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~////// 

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

//////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~////// 

///手牌
CombatUnit.prototype.handsPile = [];
///技能
CombatUnit.prototype.abilitys = [];

//////~~~~~~~~~~~~~~~~~~On function~~~~~~~~~~~~~~~~~~~~~~~~~~~////// 
CombatUnit.prototype.onDie = function(){
    for(var i =0;i<this.abilitys.length;i++)
    {
        abilitys[i].onDie();
    }
};
CombatUnit.prototype.onDot = function(){

};
////伤害监听
CombatUnit.prototype.onDamage = function(){
    for(var i =0;i<this.abilitys.length;i++)
    {
        abilitys[i].onDamage();
    }
};
////抽牌
CombatUnit.prototype.onDrawPile = function(id){
    for(var i =0;i<this.abilitys.length;i++)
    {
        abilitys[i].onDrawPile();
    }
};
///使用卡牌监听
CombatUnit.prototype.onUsePile = function(Card,Target){
    var card = this.handsPile[Card.id];

    if(card != null){
        var ability = card.Active(Target,this);
        abilitys.push(ability);

        var index = this.handsPile.indexOf(Card);

        if(index > -1)
        {
            this.handsPile.splice(index,1);
        }
    }
    
    for(var i =0;i<this.abilitys.length;i++)
    {
        abilitys[i].onUsePile();
    }
};
module.exports = CombatUnit;