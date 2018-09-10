
var dataCenter = require('DataCenter')
var uibase = require('UIBase')
var constant = require('constants')

cc.Class({
    extends: uibase,

    properties: {
      
    },

 

   

    start () {

    },
    onClick () {
        var uimgr = cc.find('Canvas').getComponent('UIMgr');
        uimgr.loadUI(constant.UI.Match);
    }

    // update (dt) {},
});
