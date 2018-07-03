var ActionBase = require('ActionBase')

var SpawnSummoned = function(attrs,ability,owner)
{
    ActionBase.call(this,attrs,ability,owner);
}

SpawnSummoned.prototype.constructor = SpawnSummoned; // 需要修复下构造函数

(function(){
    // 创建一个没有实例方法的类
    var Super = function(){};
    Super.prototype = ActionBase.prototype;
    //将实例作为子类的原型
    SpawnSummoned.prototype = new Super();
  })();

SpawnSummoned.prototype.time = 0;

SpawnSummoned.prototype.enter = function()
{
}

SpawnSummoned.prototype.tick = function(dt){
    
}

module.exports = SpawnSummoned;