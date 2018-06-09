/**
 *     角色对象父类
 *      by pwh
 */
var CombatUnit = function(){
    
};

//////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~////// 

///角色唯一id
CombatUnit.prototype.uid = 0;
///当前英雄 id
CombatUnit.prototype.sid = 0;

//////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~////// 

///手牌
CombatUnit.prototype.handsPile = [];

//////~~~~~~~~~~~~~~~~~~On function~~~~~~~~~~~~~~~~~~~~~~~~~~~////// 

////伤害监听
CombatUnit.prototype.onDamage = function(){

};
////抽牌
CombatUnit.prototype.onDrawPile = function(){

};
///使用卡牌监听
CombatUnit.prototype.onUsePile = function(){

};
module.exports = CombatUnit;