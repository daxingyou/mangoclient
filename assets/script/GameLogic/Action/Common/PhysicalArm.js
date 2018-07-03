var ActionBase = require('ActionBase')

var PhysicalArm = function(attrs,ability,owner)
{
    ActionBase.call(this,attrs,ability,owner);
}

PhysicalArm.prototype.constructor = PhysicalArm; // 需要修复下构造函数

(function(){
    // 创建一个没有实例方法的类
    var Super = function(){};
    Super.prototype = ActionBase.prototype;
    //将实例作为子类的原型
    PhysicalArm.prototype = new Super();
  })();

  PhysicalArm.prototype.time = 0;

  PhysicalArm.prototype.enter = function(){
    this.owner.addtional_Physical_arm += util.GetValue('physical_arm');
}

PhysicalArm.prototype.tick = function(dt){
    
}

module.exports = PhysicalArm;