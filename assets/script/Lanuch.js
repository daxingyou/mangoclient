var dataMgr = require("DataMgr")
var gameLogic = require("GameLogic")
var matchMessage = require("matchMessage")
var constant = require('constants')
var actionfactory = require('./GameLogic/Action/ActionFactory')
var uimgr = require('UIMgr')
var scenemgr = require('SceneMgr')
var Pool = require('Pool')
//var utility = require('utility')

cc.Class({
    extends: cc.Component,

    properties: {
      
    },

    onLoad () {
        Pool.init();
        scenemgr.init();
        actionfactory.init();
        ////数据加载
        dataMgr.init(()=>{
            
        });
        uimgr = cc.find('Canvas').getComponent('UIMgr');
        uimgr.loadUI(constant.UI.Login);
        matchMessage.init();
        //cc.game.setFrameRate(30);

        
    },
    
    start () {
      
    },

    update (dt) {
        gameLogic.Tick(dt);
    },
});
