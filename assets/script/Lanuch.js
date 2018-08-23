var dataMgr = require("DataMgr")
var gameLogic = require("GameLogic")
var matchMessage = require("matchMessage")
var loadingMessage = require('LoadingMessage')
var constant = require('constants')
var uimgr = require('UIMgr')
var scenemgr = require('SceneMgr')
//var actionfactory = require('./GameLogic/Action/ActionFactory')
//var Pool = require('Pool')
var utility = require('utility')

cc.Class({
    extends: cc.Component,

    properties: {
      
    },

    onLoad () {
        //Pool.init();
        scenemgr.init();
        //actionfactory.init();
        ////数据加载
        dataMgr.init(()=>{});
        uimgr = cc.find('Canvas').getComponent('UIMgr');
        uimgr.loadUI(constant.UI.Login);

        ///消息协议注册
        matchMessage.init();
        loadingMessage.init();
    },
    
    start () {
    },

    update (dt) {
       //cc.log('random = ',utility.rand(10));
        gameLogic.Tick(dt);
    },
});
