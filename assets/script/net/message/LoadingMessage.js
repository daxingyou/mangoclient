var constants = require('constants');
var combatMgr = require('CombatMgr');

var loading = {

    init: function () {
        var uiMgr = cc.find('Canvas').getComponent('UIMgr');

        pomelo.on('onLoadTimeout', function (data) {
            cc.log("加载超时", data);
            uiMgr.showTips('加载超时', cc.v2(0, 65));
        });

        pomelo.on('onLoadProgress', function (data) {
            cc.log("加载进度广播", data.progress, data);
            combatMgr.setLoadProgress(data.uid, data.progress);
        });

        pomelo.on('onKick', function (data) {
            cc.log('被踢', data);
            let reason = data.reason;
            uiMgr.releaseLoading();
            uiMgr.release();
            if (reason === 'relay') {
                uiMgr.showTips('重复登录!');
            }
            else if (reason === 'maintain') {
                uiMgr.showTips('服务器维护中');
            }
            uiMgr.loadUI(constants.UI.Login, () => {
                combatMgr.Release();
            });
        });

        pomelo.on('disconnect', function () {
            cc.log('掉线了');
        });
        
        pomelo.on('heartbeat timeout', function () {
            cc.log('心跳超时');
            // todo: 重连处理
        });
    }
}

module.exports = loading;