var dataMgr = require("DataMgr")
var gameLogic = require("GameLogic")
var matchMessage = require("matchMessage")
var constant = require('constants')
var actionfactory = require('./GameLogic/Action/ActionFactory')
var uimgr = require('UIMgr')
var net = require('NetPomelo')

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
        uimgr.loadUI(constant.UI.Login);

        matchMessage.init();
        //3001   '192.168.0.151:3001'  '182.254.234.140:3001'
        //net.HttpRequest('http://182.254.234.140:3001/ServerList?openid=5b1e6ec687ce5a36ccb8191b');
        //var uuid = '5b1e6ec687ce5a36ccb8191b';
        //net.HttpRequest('http://182.254.234.140:3001/ServerList?openid='+uuid,(data)=>{
        //    cc.log(data);
        //});
    },
    
    start () {

    },

    update (dt) {
        gameLogic.Tick(dt);
    },
});
