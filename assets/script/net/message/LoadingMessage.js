var dataCenter = require('DataCenter');
var constants = require('constants');

var loading = {

    init: function () {
        var uiMgr = cc.find('Canvas').getComponent('UIMgr');

        pomelo.on('onLoadTimeout', function (data) {
            cc.log("加载超时", data);


        });

        pomelo.on('onLoadProgress', function (data) {
            cc.log("加载进度广播", data.progress);
            dataCenter.otherLoadRes[data.uid] = data.progress;
        });

    }
}

module.exports = loading;