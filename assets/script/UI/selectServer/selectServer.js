var UIBase = require('UIBase')
var net = require('NetPomelo')
var listItem = require('listItem')
var constant = require('constants')
var dataCenter = require('DataCenter')

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
       rootBtn:cc.Node
    },

    onLoad () {

    },

    start () {
        var uuid = '5b1e6ec687ce5a36ccb8191b';
        var self = this;
        net.HttpRequest('http://182.254.234.140:3001/ServerList?openid='+uuid,(data)=>{
            cc.log(data);
            var serverlist = data.serverlist;
            var serverLast = data.lastLoginSid;//上次登录的服务器
            var resIndex = 0;
            for(let i=0; i<serverlist.length; i++){
                let itemData = JSON.stringify(serverlist[i]); 
                
                cc.loader.loadRes('UI/selectServer/listItem', function(errorMessage, loadedResource){
                    if( errorMessage ) { cc.log( '载入预制资源失败, 原因:' + errorMessage ); return; }
                    if( !( loadedResource instanceof cc.Prefab ) ) { cc.log( '你载入的不是预制资源!' ); return; }
                    let item = cc.instantiate(loadedResource);
                    self.list.addChild(item);
                    itemData = JSON.parse(itemData); 
                    item.getComponent('listItem').init({
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

                if(i == 0){
                    self.serverName.string = serverlist[i].name;
                    self.status.string = serverlist[i].status;
                    self.id = serverlist[i].lastLoginSid;
                    self.host = serverlist[i].ip;
                    self.port = serverlist[i].port;
                }//默认显示   
            }


            if(serverLast = serverlist[i].id){
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
        
        var uid = cc.sys.localStorage.getItem("uuid");
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
            var uuid = data.uuid;
            if(data.host != '127.0.0.1'){
               host = data.host;
            }
            that.port = data.port;
            cc.log(that.port + "that.port");
            cc.log("请求登陆地址 = %s 端口： = %i,uuid = %s",that.host,data.port,uuid);
            cc.sys.localStorage.setItem("uuid",data.uuid);
            ///连接逻辑服
            pomelo.init({host:that.host,port:data.port,log:true},function(data){
                pomelo.request("connector.entryHandler.enter",{code:uuid},function(data){
                    cc.log("连接逻辑服 成功" + data.code + Object.keys(data.info));
                    dataCenter.uuid =  data.info.id;
                    that._mgr.release();
                    that._mgr.loadUI(constant.UI.Match);
                });
                });
            })
          });
    //    }
    //    else{cc.log("未同意授权");}
       
    }

    // update (dt) {},
});
