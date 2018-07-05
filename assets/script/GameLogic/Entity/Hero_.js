var CombatUnit = require('Combatunit')
var Card = require('HandCard')

function Hero_(data,attributes,pos,teamid,combat){

    this.Hp = attributes.HeroMaxHP;
    this.MaxHp = attributes.HeroMaxHP;
    this.Mp = attributes.HeroMaxMP;
    this.MaxMp = attributes.HeroMaxMP;

    CombatUnit.call(this,data,pos,teamid,combat);
}

(function(){
    // 创建一个没有实例方法的类
    var Super = function(){};
    Super.prototype = CombatUnit.prototype;
    //将实例作为子类的原型
    Hero_.prototype = new Super();
  })();

  Hero_.prototype.constructor = Hero_;

  Hero_.prototype.handsPile = [];

  ///初始化当前玩家初始手牌
  Hero_.prototype.InitHands = function(hands){
    for(var i = 0; i<hands.length;i++)
    {
        this.handsPile.push(new Card(hands[i],this));
    }
  }

module.exports = Hero_;