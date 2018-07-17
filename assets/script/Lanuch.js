var dataMgr = require("DataMgr")
var gameLogic = require("GameLogic")
var matchMessage = require("matchMessage")
var constant = require('constants')
var actionfactory = require('./GameLogic/Action/ActionFactory')
var uimgr = require('UIMgr')
//var net = require('NetPomelo')

cc.Class({
    extends: cc.Component,

    properties: {
      
    },

    onLoad () {
       

        actionfactory.init();
        ////数据加载
        dataMgr.init(()=>{
            
        });
        uimgr = cc.find('Canvas').getComponent('UIMgr');
     //  uimgr.loadUI(constant.UI.Login);
        uimgr.loadUI(constant.UI.SelectServer);
        matchMessage.init();
    },
    
    start () {

    },

    update (dt) {
        gameLogic.Tick(dt);
    },
});
