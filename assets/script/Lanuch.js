// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var dataMgr = require("DataMgr")
var gameLogic = require("GameLogic")
var fightMessage = require("fightMessage")
var constant = require('constant')
var actionfactory = require('ActionFactory')
var uimgr = require('UIMgr')

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        actionfactory.init();
        ////数据加载
        dataMgr.init(()=>{
            //gameLogic.startFight(constant.CombatType.PVECombat,1);
        });
        uimgr = cc.find('Canvas').getComponent('UIMgr');
        uimgr.loadUI(constant.UI.Login);

        //fightMessage.init();

        /*
        var host = "127.0.0.1";
        //host = "39.108.12.90";
        var port = 3010;
        
        cc.log("uuid = %s",uuid);
        pomelo.init({
            host: host,
            //host: "39.108.12.90",
            port: port,
            log: true
          }, function() {
              /// 注册获取 uuid 获取逻辑服 地址
          pomelo.request("gate.gateHandler.queryEntry", {code: uuid}, function(data) {

            uuid = data.uuid;
            if(data.host != '127.0.0.1'){
                host = data.host;
            }
            port = data.port;
            cc.log("请求登陆地址 = %s 端口： = %i,uuid = %s",host,port,uuid);
            cc.sys.localStorage.setItem("uuid",data.uuid);
            ///连接逻辑服
            pomelo.init({host:host,port:port,log:true},function(data){
                pomelo.request("connector.entryHandler.enter",{code:uuid},function(data){
                    cc.log("连接逻辑服 成功" + data.code + Object.keys(data.info));
                    // pomelo.request("fight.fightHandler.beginFight",{uid:uuid},function(data)
                    // {
                    //     cc.log("请求开始战斗");
                    //     /// 注册消息 分发
                    //     pomelo.on('OnFreshPile',fightMessage.OnFreshPile);
                    //     cc.log("注册消息 分发");

                    //     ///测试用PVE 战斗
                    //     gameLogic.startFight(constant.CombatType.PVECombat,1);
                    // });
                    var cnt = 1;
                    setInterval(function(){
                        pomelo.request("connector.entryHandler.connectTest", {}, function(data){
                            cc.log("tick: " + cnt);
                            cnt += 1;
                        });
                    }, 1000 * 10)
                    
                });
                });
            })
          });
          */
    },

    start () {

    },

    update (dt) {
        gameLogic.Tick(dt);
    },
});
