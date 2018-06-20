var ActionBase = require('ActionBase')

var Defence = function(attrs,ability,owner)
{
    ActionBase.call(this,attrs,ability,owner);
}

Defence.prototype.constructor = Defence; // 需要修复下构造函数

(function(){
    // 创建一个没有实例方法的类
    var Super = function(){};
    Super.prototype = ActionBase.prototype;
    //将实例作为子类的原型
    Defence.prototype = new Super();
  })();

Defence.prototype.time = 0;

Defence.prototype.enter = function(){
    this.owner.addtional_Physical_arm += util.GetValue('physical_arm');
    this.time = util.GetValue('time');

    if(this.time > 0)
        exit();
}

Defence.prototype.tick = function(dt){
    this.time -= dt;
    if(this.time <= 0)
        exit();
}

module.exports = Defence;