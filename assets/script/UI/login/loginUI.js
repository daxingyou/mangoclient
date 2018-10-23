
var dataCenter = require('DataCenter')
var uibase = require('UIBase')
var constant = require('constants')

cc.Class({
    extends: uibase,

    properties: {
        userName : cc.EditBox,
        loginButton : cc.Button,
        _userName : '',
        showLabel:cc.Label,
        copy:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var uuid = cc.sys.localStorage.getItem("uuid");
        if(uuid == null)
            uuid = '';
        this._userName = this.userName.string = uuid;
        dataCenter.userId = uuid;
        if(this.userName.string == "undefine"){
            this.userName.string = "";
        }
     
       
    },

    start () {
       
    },

    // update (dt) {},
    
    editingDidBegan : function(){
        this._userName = this.userName.string;
        this.showLabel.string = this.userName.string;
        dataCenter.openid = this.userName.string;
        
    },

    loginClick(event){
        if(this.userName.string = '')
            return;

        var uid = this._userName;
        dataCenter.uuid = uid;

        var uimgr = cc.find('Canvas').getComponent('UIMgr');
        uimgr.loadUI(constant.UI.SelectServer);
        /*
        //var host = "192.168.0.139";
        var host = "192.168.0.113";
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

                    dataCenter.uuid =  data.info.id;
                    that._mgr.release();
                    that._mgr.loadUI(constant.UI.Match);
                });
                });
            })
          })
          */
    }
});
