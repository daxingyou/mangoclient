var dataCenter = require('DataCenter');
var constants = require('constants');
var combatMgr =require('CombatMgr')

var loading = {

    init: function () {
        var uiMgr = cc.find('Canvas').getComponent('UIMgr');

        pomelo.on('onLoadTimeout', function (data) {
            cc.log("加载超时", data);
            uiMgr.showTips('加载超时',cc.v2(0,65));

        });

        pomelo.on('onLoadProgress', function (data) {
            cc.log("加载进度广播", data.progress,data);

            dataCenter.otherLoadRes[data.uid] = data.progress;
        });

        pomelo.on('onBeRelay', function (data) {
            uiMgr.releaseLoading();
            uiMgr.release();
            uiMgr.showTips('重复登录!',cc.v2(0,65));
            uiMgr.loadUI(constants.UI.Login,()=>{
                combatMgr.Release();
            });
        });
    }
}

module.exports = loading;