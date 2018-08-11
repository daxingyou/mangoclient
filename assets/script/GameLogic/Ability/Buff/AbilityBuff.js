/**
 *      Buff实体类
 *      by pwh         
 */

 var dataMgr = require('DataMgr')

 var Buff = function(info){
    this.info = info;
    // this.image = dataMgr.buff[info.id].Image;
    this.data = dataMgr.buff[info.id];
 };

 Buff.prototype.updateInfo = function (info) {
    this.info = info;
 };

 Buff.prototype.isHide = function () {
    return this.data.IsHide === 1;
 };

 module.exports = Buff;