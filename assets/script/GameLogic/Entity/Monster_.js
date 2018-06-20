var CombatUnit = require('Combatunit')

function Monster_(data,pos,teamid){
    this.Hp = data.MaxHP;
    this.MaxHp = data.MaxHP;
    this.Mp = data.MaxMP;
    this.MaxMp = data.MaxMP;
    
    CombatUnit.call(this,data,pos,teamid);
}

(function(){
    // 创建一个没有实例方法的类
    var Super = function(){};
    Super.prototype = CombatUnit.prototype;
    //将实例作为子类的原型
    Monster_.prototype = new Super();
  })();

  Monster_.prototype.constructor = Monster_;

module.exports = Monster_;