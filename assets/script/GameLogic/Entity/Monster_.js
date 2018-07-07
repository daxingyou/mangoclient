var CombatUnit = require('Combatunit')
var Agent = require('Agent')
var DataMgr = require('DataMgr')

function Monster_(data,attributes,pos,teamid,combat,uid){
    this.Hp = data.hp;
    this.MaxHp = data.maxHp;
    this.Mp = data.mp;
    this.MaxMp = data.maxMp;
    this.basePhysical_arm = data.armor;
    
    var that = this;
    var monster = DataMgr.monster[data.monsterid];
    this.agent = new Agent(monster.Model,pos,teamid,this.Hp,this.MaxHp,uid,function(){
        that.loadok = true;
    });

    CombatUnit.call(this,attributes,pos,teamid,combat,uid);
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