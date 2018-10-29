var dataCenter = require('DataCenter');
var message = {

    init: function () {
        var uiMgr = cc.find('Canvas').getComponent('UIMgr');

        pomelo.on('onAvatarPropUpdate', function (data) {
            cc.log("角色属性更新", data)
        }); 

        pomelo.on('onBagItemsUpdate', function (data) {
            cc.log("背包物品更新", data)
        }); 

        pomelo.on('onAddMails', function (data) {
            // mailID 与 title, desc互斥，有mailID时读表
            cc.log("新邮件", data)
        }); 

        pomelo.on('onMailsFlagUpdate', function (data) {
            cc.log("邮件标记跟新", data)
        }); 

    }
}

module.exports = message;