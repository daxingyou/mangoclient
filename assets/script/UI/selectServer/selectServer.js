var UIBase = require('UIBase')
var net = require('NetPomelo')
var listItem = require('listItem')
var constant = require('constants')
var dataCenter = require('DataCenter')
var consts = require('consts');

cc.Class({
    extends:UIBase,
    listItem:listItem,

    properties: {
       serverScrollView:cc.Node,
       list:cc.Node,
       last:cc.Node,
       exit:cc.Node,
       serverName:cc.Label,
       status:cc.Label,
       id:0,
       host:null,
       port:null,
       click:0,
       rootBtn:cc.Node,
       storeId:[],
       card:cc.Node,
    },

    // onLoad () {
     
    //     var self = this;
       
    //     var resIndex = 0;
    //     for(var i=0;i<10;i++)
    //     {
    //         cc.loader.loadRes('UI/fightUI/Card', function(errorMessage, loadedResource){
    //             if( errorMessage ) { cc.log( '载入预制资源失败, 原因:' + errorMessage ); return; }
    //             if( !( loadedResource instanceof cc.Prefab ) ) { cc.log( '你载入的不是预制资源!' ); return; }
    //             let item = cc.instantiate(loadedResource);
    //             self.card.addChild(item);
    //             resIndex ++ ;
    //             if(resIndex == 10)
    //             {
    //                 cc.loader.release('UI/fightUI/Card'); 
    //             }
    //         });   
    //     } 
 
    //  },

    start () {
        //var uuid = cc.sys.localStorage.getItem("uuid");
        var uuid = dataCenter.uuid;

        var self = this;
        net.HttpRequest('http://182.254.234.140:3001/ServerList?code='+uuid,(data)=>{
            cc.log(data);
            var serverlist = data.serverlist;
            var serverLast = data.lastLoginSid;//上次登录的服务器
            var resIndex = 0;
            var findLast = false;
            for(var i=0; i<serverlist.length; i++){
                var serverinfo = serverlist[i];
                let itemData = JSON.stringify(serverinfo); 
                self.storeId.push(serverlist[i].id);
                cc.loader.loadRes('UI/selectServer/listItem', function(errorMessage, loadedResource){
                    if( errorMessage ) { cc.log( '载入预制资源失败, 原因:' + errorMessage ); return; }
                    if( !( loadedResource instanceof cc.Prefab ) ) { cc.log( '你载入的不是预制资源!' ); return; }
                    let item = cc.instantiate(loadedResource);
                    self.list.addChild(item);
                    itemData = JSON.parse(itemData); 
                    item.getComponent('listItem').init({
                        id:itemData.id,
                        name:itemData.name,
                        status:itemData.status,
                        ip:itemData.ip,
                        port:itemData.port,
                    },self);
                    resIndex ++ ;
                    if(resIndex == serverlist.length)
                    {
                        cc.loader.release('UI/selectServer/listItem');
                    }
                });

                if(serverLast == serverinfo.id){
                    self.serverName.string = serverinfo.name;
                    self.status.string = serverinfo.status;
                    self.id = serverinfo.lastLoginSid;
                    self.host = serverinfo.ip;
                    self.port = serverinfo.port;
                    findLast = true;
                }//默认显示   
            }
            var serverinfo = serverlist[0];
            if (!findLast) {
                self.serverName.string = serverinfo.name;
                self.status.string = serverinfo.status;
                self.id = serverinfo.lastLoginSid;
                self.host = serverinfo.ip;
                self.port = serverinfo.port;
            }

           for(let i = 0;i < self.storeId.length; i++){
               if(serverLast == self.storeId[i]){
                    var item2Data = serverlist[i];
                    cc.loader.loadRes('UI/selectServer/test', function(errorMessage, loadedResource){
                        if( errorMessage ) { cc.log( '载入预制资源失败, 原因:' + errorMessage ); return; }
                        if( !( loadedResource instanceof cc.Prefab ) ) { cc.log( '你载入的不是预制资源!' ); return; }
                        let item2 = cc.instantiate(loadedResource);   
                        self.last.addChild(item2);
                        item2.getComponent('listItem').init({
                            name:item2Data.name,
                            status:item2Data.status,
                        });
                        cc.loader.release('UI/selectServer/test');
                    });   
                }
            }
        });

        this.rootBtn.on(cc.Node.EventType.TOUCH_START, function(event){
            this.click = 1;
            cc.log(this.click);
            });//判断是否同意root
        
    },

    show_scrollView: function () {
        this.serverScrollView.active = true;
    },
    hide_scrollView: function () {
        this.serverScrollView.active = false;
    },
    

    loginClick(event){
        // if(this.userName.string = '')
        //     return;
        
        //var uid = cc.sys.localStorage.getItem("uuid");
        var uid = dataCenter.uuid;
        cc.log(uid + "uid");

      
    //     cc.log(this.click + "执行到---");
    //    if(this.click == 1){ //判断是否勾选用户协议
    //     cc.log("进入游戏---------");
        var that = this;
      
        pomelo.init({
            host: that.host,
            port: that.port,
            log: true
        }, function() {
            /// 注册获取 uuid 获取逻辑服 地址
            pomelo.request("gate.gateHandler.queryEntry", {code: uid}, function(data) {
                pomelo.disconnect();
                var uuid = data.uuid;
                if(data.host != '127.0.0.1'){
                host = data.host;
                }
                that.port = data.port;
                cc.log(that.port + "that.port");
                cc.log("请求登陆地址 = %s 端口： = %i,uuid = %s",that.host,data.port,uuid);
                cc.sys.localStorage.setItem("uuid",data.uuid);
                ///连接逻辑服
                pomelo.disconnect(that._connectToConnector.bind(that, uuid, that.host, data.port));
            })
        });
    },

    _connectToConnector(code, host, port) {
        var that = this;
        pomelo.init({host: host, port:port, log:true},function(data){
            pomelo.request("connector.entryHandler.enter", {code: code}, function(data){
                if (data.code == consts.Login.RELAY) {
                    cc.log("重连 ip:%s port:%s", data.host, data.port);
                    // 重定向
                    pomelo.disconnect(that._connectToConnector.bind(that, data.uuid, data.host, data.port));
                    return;
                }
                else if (data.code == consts.Login.OK) {
                    cc.log("连接逻辑服 成功 info: ", data.info);
                    dataCenter.uuid =  data.info.id;
                    that._mgr.release();
                    that._mgr.loadUI(constant.UI.Match);
                }
                else {
                    
                }
            });
        });
    }

});
