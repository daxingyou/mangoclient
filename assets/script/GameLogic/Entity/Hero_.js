var CombatUnit = require('Combatunit')

function Hero_(data,pos,teamid){
    CombatUnit.call(this,data,pos,teamid);

    this.Hp = data.HeroMaxHP;
    this.MaxHp = data.HeroMaxHP;
    this.Mp = data.HeroMaxMP;
    this.MaxMp = data.HeroMaxMP;

}

(function(){
    // 创建一个没有实例方法的类
    var Super = function(){};
    Super.prototype = CombatUnit.prototype;
    //将实例作为子类的原型
    Hero_.prototype = new Super();
  })();

  Hero_.prototype.constructor = Hero_;

module.exports = Hero_;