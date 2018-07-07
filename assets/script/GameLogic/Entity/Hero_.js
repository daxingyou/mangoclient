var CombatUnit = require('Combatunit')
var Card = require('HandCard')
var Agent = require('Agent')
var DataMgr = require('DataMgr')

function Hero_(data,attributes,pos,teamid,combat,uid){

    this.Hp = data.hp;
    this.MaxHp = data.maxHp;
    this.Mp = data.mp;
    this.MaxMp = data.maxMp;
    this.basePhysical_arm = data.armor;

    var that = this;
    var hero = DataMgr.hero[data.heroid];
    this.agent = new Agent(hero.HeroModel,pos,teamid,this.Hp,this.MaxHp,uid,function(){
        that.loadok = true;
    });

    CombatUnit.call(this,data,attributes,pos,teamid,combat,uid);
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