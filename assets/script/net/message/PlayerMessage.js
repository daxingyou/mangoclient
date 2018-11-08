var dataCenter = require('DataCenter');
var emailData = require('emailData');
var eventMgr = require('eventMgr');
var bagData = require('bagData');
let playerData = require('playerData');

var message = {
    init: function () {
        var uiMgr = cc.find('Canvas').getComponent('UIMgr');

        pomelo.on('onAvatarPropUpdate', function (data) {
            cc.log("角色属性更新", data);
            playerData.updateProp(data);
            bagData.refreshMoney = data;
            eventMgr.emit("refreshSilver",data);
        });

        pomelo.on('onBagItemsUpdate', function (data) {
            cc.log("背包物品更新", data);
            bagData.refreshBag = data;
            eventMgr.emit("refreshBag", data);

        });

        pomelo.on('onAddMails', function (data) {
            // mailID 与 title, desc互斥，有mailID时读表
            cc.log("新邮件", data);
            playerData.emailData.updateMailInfo(data);
        });

        pomelo.on('onMailsFlagUpdate', function (data) {
            cc.log("邮件标记跟新", data)
        });

        pomelo.on('onTips', function (text) {
            uiMgr.showTips(text);
        })
    }
}

module.exports = message;