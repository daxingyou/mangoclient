var uibase = require('UIBase');
var constant = require('constants')
module.exports = {
    backMainUI:function () {
        let uiMgr = cc.find('Canvas').getComponent('UIMgr');
        uiMgr.release();
        uiMgr.loadUI(constant.UI.Main,function(data){
        });
    }
}