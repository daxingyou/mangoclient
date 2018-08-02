/**
 *      Buff实体类
 *      by pwh         
 */

 var dataMgr = require('DataMgr')

 var Buff = function(id){
    this.id = id;
    this.image = dataMgr.buff[id].Image;
 }

 Buff.prototype.id = 0;
 Buff.prototype.image = '';

 module.exports = Buff;