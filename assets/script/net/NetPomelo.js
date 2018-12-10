/**
 *      网络接口的封装
 *      by pwh
 */

var netPomelo = {
    Request : function(proto,callback){
        cc.log("pomelo.request head = " , proto.head , " data = " , proto.data);
        pomelo.request(proto.head,proto.data,function(data){

            cc.log("pomelo.respone " , data.code);

            if(callback != undefined)
                callback(data);
        });
    },
    // args: protoName, ...params, callback
    requestWithCallback: function () {
        let argsLen = arguments.length;
        let protoName = arguments[0], callback = arguments[argsLen - 1];
        let args = [];
        for (let i = 1; i < argsLen - 1; i++) {
            args.push(arguments[i]);
        }
        let proto = require(protoName);
        let protoObj = new proto(...args);
        pomelo.request(protoObj.head, protoObj.data, function(data){
            if(callback)
                callback(data);
        });
    },

    HttpRequest : function(url,callback){
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.open("GET", url, true);
        //xhr.setRequestHeader('Content-Type',"text/html;charset=UTF-8");'
        //xhr.setRequestHeader('Access-Control-Allow-Origin','*' );
        //xhr.setRequestHeader('Access-Control-Allow-Origin','http://localhost:7456');
        xhr.timeout = 30000;
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
                callback(JSON.parse(xhr.responseText));
            }
        };
        xhr.send();
    }
}

module.exports = netPomelo;