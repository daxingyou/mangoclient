/**
 *    战斗管理器
 *    战斗类基类
 *    by pwh  
 */

var dataMgr = require('DataMgr')
var dict = require('dict')

var Combat = function(){

}

Combat.prototype.enemy = [];

Combat.prototype.own = [];

Combat.prototype.Tick = function(){

}

Combat.prototype.init = function(data){
    
}

module.exports = Combat;
