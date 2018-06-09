/**
 *     角色对象父类
 *      by pwh
 */
var CombatUnit = function(){
    
};

CombatUnit.prototype.uid = 0;

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