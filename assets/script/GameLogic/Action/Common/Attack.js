var ActionBase = require('ActionBase')
var util = require('util');

var Attack = function(attrs,ability,owner)
{
    ActionBase.call(this);

    //this.attrs = attrs;
     //this.ability = ability;
    //this.owner = owner;
}

Attack.prototype.constructor = Attack; // 需要修复下构造函数

Attack.prototype.enter = function(){
    util.computeDamage(owner,ability.target,this.attrs['dmg']);
    exit();
}

module.exports = Attack;