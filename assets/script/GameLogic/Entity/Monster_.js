var CombatUnit = require('Combatunit')
var Agent = require('Agent')
var DataMgr = require('DataMgr')
var gameCenter = require('DataCenter')

function Monster_(data,attributes,pos,teamid,combat,uid,idx){
    this.Hp = data.hp;
    this.MaxHp = data.maxHp;
    this.Mp = data.mp;
    this.MaxMp = data.maxMp;
    this.basePhysical_arm = data.armor;
    
    var that = this;

    this.table = DataMgr.monster[data.monsterid];
    ///蛟精分身
    this.summoned = DataMgr.monster[10002];

    CombatUnit.call(this,data,attributes,pos,teamid,combat,uid);
    
    var scale = 1;
    if(data.hasOwnProperty('scale'))
        scale = data.scale;

    this.agent = new Agent(this.table.Model,pos,teamid,this.Hp,this.MaxHp,this.basePhysical_arm,uid,this.buffs,scale,idx,function(){
        that.loadok = true;
        gameCenter.curLoadRes++;
    });
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