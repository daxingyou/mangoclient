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

          //  var ui = uiMgr.getUI(constants.UI.Match);
            //     cc.log('ui ==== ',ui);
            
         //  dataCenter.otherLoadRes = data.progress;
          
            // if (data.progress < 100)
            // {
            //     var ui = uiMgr.getUI(constants.UI.Match);
            //     cc.log('ui ==== ',ui);
           
            // }
            // else {
            //      ui = uiMgr.getUI(constants.UI.Fight);
            //      cc.log('ui ==== ',ui);
            // }
            
          //  cc.log('ui ==== ',ui);
           

        });

    }
}

module.exports = loading;