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

//////~~~~~~~~~~~~~~~~~~On function~~~~~~~~~~~~~~~~~~~~~~~~~~~////// 

////伤害监听
CombatUnit.prototype.onDamage = function(){

};
////抽牌
CombatUnit.prototype.onDrawPile = function(id){
    
};
///使用卡牌监听
CombatUnit.prototype.onUsePile = function(){

};
module.exports = CombatUnit;