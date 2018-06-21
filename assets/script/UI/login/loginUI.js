// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var dataCenter = require('DataCenter')
var uibase = require('UIBase')
var constant = require('constant')

cc.Class({
    extends: uibase,

    properties: {
        userName : cc.EditBox,
        loginButton : cc.Button,
        _userName : ''
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var uuid = cc.sys.localStorage.getItem("uuid");
        this._userName = this.userName.string = uuid;

    },

    start () {

    },

    // update (dt) {},

    loginClick(event){
        if(this.userName.string = '')
            return;

        var uid = this._userName;
        var host = "192.168.0.139";
        var port = 3010;
        var that = this;

        pomelo.init({
            host: host,
            port: port,
            log: true
          }, function() {
              /// 注册获取 uuid 获取逻辑服 地址
          pomelo.request("gate.gateHandler.queryEntry", {code: uid}, function(data) {

            var uuid = data.uuid;
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

                    dataCenter.uid =  data.info;
                    that._mgr.release();
                    that._mgr.loadUI(constant.UI.Match);
                });
                });
            })
          });
    }
});
