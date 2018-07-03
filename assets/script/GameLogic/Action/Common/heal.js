var ActionBase = require('ActionBase')

var Heal = function(attrs,ability,owner)
{
    ActionBase.call(this,attrs,ability,owner);
}

Heal.prototype.constructor = Heal; // 需要修复下构造函数

(function(){
    // 创建一个没有实例方法的类
    var Super = function(){};
    Super.prototype = ActionBase.prototype;
    //将实例作为子类的原型
    Heal.prototype = new Super();
  })();

  Heal.prototype.time = 0;

  Heal.prototype.enter = function(){
    this.owner.addtional_Physical_arm += util.GetValue('physical_arm');
}

Heal.prototype.tick = function(dt){
    
}

module.exports = Heal;