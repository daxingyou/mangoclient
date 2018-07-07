/**
 *      网络接口的封装
 *      by pwh
 */

//var consts = require('consts')

var netPomelo = {
    Request : function(proto,callback){
        cc.log("pomelo.request head = " , proto.head , " data = " , proto.data);
        pomelo.request(proto.head,proto.data,function(data){

            cc.log("pomelo.respone " , data.code);
            if(callback != undefined)
                callback(data);
        });
    }
}

module.exports = netPomelo;