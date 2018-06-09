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
var dict = require("dict")
var gameLogic = require("GameLogic")
var fightMessage = require("fightMessage")

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

        var test = dataMgr.load('data/Group.json',(data)=>{
            //var items = dict;
            //data[0].MonsterGroup.init(data[0].MonsterGroup);
            //items.init(data[0].MonsterGroup);

            cc.log("keys = %s",data[0].MonsterGroup.items);
            //cc.log("keys = %i",items.GetValue(items.items[0].key));
            ;
        });

        var uuid = cc.sys.localStorage.getItem("uuid");
        var host = "192.168.0.168";
        //host = "39.108.12.90";
        var port = 3010;
        fightMessage.init();
        
        cc.log("uuid = %s",uuid);
        pomelo.init({
            host: host,
            //host: "39.108.12.90",
            port: port,
            log: true
          }, function() {
              /// 注册获取 uuid 获取逻辑服 地址
          pomelo.request("gate.gateHandler.queryEntry", {uid: uuid}, function(data) {

            uuid = data.uuid;
            if(data.host != '127.0.0.1'){
                host = data.host;
            }
            port = data.port;
            cc.log("请求登陆地址 = %s 端口： = %i,uuid = %s",host,port,uuid);
            cc.sys.localStorage.setItem("uuid",data.uuid);
            ///连接逻辑服
            pomelo.init({host:host,port:port,log:true},function(data){
                pomelo.request("connector.entryHandler.enter",{uid:uuid},function(data){
                    cc.log("连接逻辑服 成功");
                    pomelo.request("fight.fightHandler.beginFight",{uid:uuid},function(data)
                    {
                        cc.log("请求开始战斗");
                        //fightMessage.init();
                        /// 注册消息 分发
                        pomelo.on('OnFreshPile',fightMessage.OnFreshPile);
                        cc.log("注册消息 分发");
                    });
                });
                });
            })
          });
    },

    start () {

    },

    update (dt) {
        gameLogic.Tick();
    },
});
