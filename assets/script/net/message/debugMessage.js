/*
 * @Author: liuguolai 
 * @Date: 2018-10-17 17:37:52 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-10-19 10:53:41
 */
let constants = require('constants');

module.exports = {
    init: function () {
        let self = this;
        self._uiMgr = cc.find('Canvas').getComponent('UIMgr');
        pomelo.on('fightEndDpsInfo', function (data) {
            cc.log("战斗结束dps数据", data);
            self._uiMgr.loadUI(constants.UI.DpsPanel, function (script) {
                cc.log(constants.debug.autoDpsExport)
                if (constants.debug.autoDpsExport) {
                    script.updateInfo(data);
                    script.doExport();
                }
                script.hide();
            });
        });
    }
};
