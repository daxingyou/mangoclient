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