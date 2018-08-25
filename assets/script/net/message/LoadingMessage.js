var dataCenter = require('DataCenter');
var loading = {

    init: function () {
        pomelo.on('onLoadTimeout', function (data) {
            cc.log("加载超时", data);


        });

        pomelo.on('onLoadProgress', function (data) {
            cc.log("加载进度广播", data);
            dataCenter.otherLoadRes = data.progress;
            
        });

    }
}

module.exports = loading;