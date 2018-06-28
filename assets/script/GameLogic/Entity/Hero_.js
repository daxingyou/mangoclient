var CombatUnit = require('Combatunit')
var Card = require('HandCard')


function Hero_(data,attributes,pos,teamid){

    this.Hp = attributes.HeroMaxHP;
    this.MaxHp = attributes.HeroMaxHP;
    this.Mp = attributes.HeroMaxMP;
    this.MaxMp = attributes.HeroMaxMP;

    CombatUnit.call(this,data,pos,teamid);
    
    ////测试用
    //var card = new Card(1);
    //this.handsPile.push(card);
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