var UIBase = require('UIBase')
var net = require('NetPomelo')
var listItem = require('listItem')
var constant = require('constants')
var dataCenter = require('DataCenter')
var consts = require('consts')
var emailData = require('emailData')


cc.Class({
    extends: UIBase,
    listItem: listItem,

    properties: {
        serverList: cc.Node,
        content: cc.Node,
        list: cc.Node,
        last: cc.Node,
        exit: cc.Node,
        serverName: cc.Label,
        status: cc.Label,
        id: 0,
        host: null,
        port: null,
        click: true,
        click_status: cc.Node,
        rootBtn: cc.Node,
        storeId: [],
        card: cc.Node,
        showItem: cc.Node,
        start_btn: cc.Node,
        lastBar: cc.Node,
        exitBar: cc.Node,
        listBar: cc.Node,
        expret: cc.Node,
        root_N: cc.Node,
        //    showScore:[],
        _loginClicked: false,
        _socketErrFunc: null,
    },

    onLoad() {
        this.expret.on(cc.Node.EventType.TOUCH_START, function () {
            return true;
        }, this);//阻止往上传递
        //    this.exit.height = 52 * 5;
        //             var dis = this.exit.height - 52 * 2;
        //             this.listBar.y -=dis;
        //   self.content.height =480;
        this._socketErrFunc = this._onSocketError.bind(this);
        pomelo.on('io-error', this._socketErrFunc);
    },

    start() {
        //var uuid = cc.sys.localStorage.getItem("uuid");
        var uuid = dataCenter.uuid;
        dataCenter.openid = uuid;

        var self = this;
        cc.log("获取服务器列表");
        net.HttpRequest('http://203.195.206.97:3003/ServerList?code=' + uuid, (data) => {
            cc.log(data);
            var serverlist = data.serverlist;
            var serverLast = data.lastLoginSid;
            var roleList = data.ownRoleServers;
            if (serverLast == 0) {
                self.lastBar.active = false;
                self.exitBar.active = false;
                self.listBar.y += 230;
                self.content.height = 480;
            } //第一次登录
            else {
                var len = Math.ceil(Object.keys(roleList).length / 2);
                if (len <= 1) {
                    self.content.height = 480;
                }
                else {
                    var list_hei = Math.ceil(serverlist.length / 2);
                    self.list.height = 52 * list_hei;
                    self.content.height = 480 + self.list.height;

                }

            }//动态改变滑动的高度

            var resIndex = 0;
            var findLast = false;
            self.showScore = [];
            for (let item in roleList) {

                self.showScore.push(item);
            }


            for (var i = 0; i < serverlist.length; i++) {
                var serverinfo = serverlist[i];
                let itemData = JSON.stringify(serverinfo);
                self.storeId.push(serverlist[i].id);
                cc.loader.loadRes('UI/selectServer/listItem', function (errorMessage, loadedResource) {

                    if (errorMessage) {
                        cc.log('载入预制资源失败, 原因:' + errorMessage); return;
                    }
                    if (!(loadedResource instanceof cc.Prefab)) {
                        cc.log('你载入的不是预制资源!'); return;
                    }

                    let item = cc.instantiate(loadedResource);
                    self.list.addChild(item);
                    itemData = JSON.parse(itemData);

                    item.getComponent('listItem').init({
                        id: itemData.id,
                        name: itemData.name,
                        status: itemData.status,
                        ip: itemData.ip,
                        port: itemData.port,
                    }, self);

                    resIndex++;
                    if (resIndex == serverlist.length) {
                        cc.loader.release('UI/selectServer/listItem');
                    }
                });

                if (serverLast == serverinfo.id) {
                    self.serverName.string = serverinfo.name;
                    // self.status.string = serverinfo.status;
                    self.status.string = "新服";
                    self.id = serverinfo.lastLoginSid;
                    self.host = serverinfo.ip;
                    self.port = serverinfo.port;
                    findLast = true;
                }//默认显示   
            }
            var serverinfo = serverlist[0];
            if (!findLast) {
                self.serverName.string = serverinfo.name;
                // self.status.string = serverinfo.status;
                self.status.string = "新服";
                self.id = serverinfo.lastLoginSid;
                self.host = serverinfo.ip;
                self.port = serverinfo.port;
            }//服务器列表

            for (let i = 0; i < self.storeId.length; i++) {

                if (serverLast == self.storeId[i]) {
                    var item2Data = serverlist[i];
                    cc.loader.loadRes('UI/selectServer/lastItem', function (errorMessage, loadedResource) {
                        if (errorMessage) {
                            cc.log('载入预制资源失败, 原因:' + errorMessage);
                            return;
                        }
                        if (!(loadedResource instanceof cc.Prefab)) {
                            cc.log('你载入的不是预制资源!'); return;
                        }
                        let item2 = cc.instantiate(loadedResource);
                        self.last.addChild(item2);
                        item2.getComponent('listItem').init({
                            name: item2Data.name,
                            status: item2Data.status,
                            id: item2Data.id,
                            status: item2Data.status,
                            ip: item2Data.ip,
                            port: item2Data.port,
                        }, self);
                        cc.loader.release('UI/selectServer/lastItem');
                    });
                }
            }//上次登录

            // for(let i=0;i<10;i++){
            //         cc.loader.loadRes('UI/selectServer/roleItem', function(errorMessage, loadedResource){
            //             if( errorMessage ) { cc.log( '载入预制资源失败, 原因:' + errorMessage ); return; }
            //             if( !( loadedResource instanceof cc.Prefab ) ) { cc.log( '你载入的不是预制资源!' ); return; }
            //             let item3 = cc.instantiate(loadedResource);   

            //             self.exit.addChild(item3);

            //         });   

            // }

            for (let item in roleList) {

                var len = Math.ceil(Object.keys(roleList).length / 2);

                if (len > 2) {
                    this.exit.height = 52 * len;
                    var dis = this.exit.height - 52 * 2;
                    this.listBar.y -= dis;
                }//下移list

                var roleItem = parseInt(item);
                let item3Data = serverlist[roleItem - 1];

                cc.loader.loadRes('UI/selectServer/roleItem', function (errorMessage, loadedResource) {

                    if (errorMessage) {
                        cc.log('载入预制资源失败, 原因:' + errorMessage); return;
                    }
                    if (!(loadedResource instanceof cc.Prefab)) {
                        cc.log('你载入的不是预制资源!'); return;
                    }

                    let item3 = cc.instantiate(loadedResource);
                    self.exit.addChild(item3);

                    item3.getComponent('roleItem').init({
                        name: item3Data.name,
                        status: roleList[roleItem],
                        id: item3Data.id,
                        ip: item3Data.ip,
                        port: item3Data.port,
                    }, self);
                    //  cc.loader.release('UI/selectServer/roleItem');
                });
            }
        });//已有角色
    },

    rootEvent() {
        if (!this.click) {
            this.click = true;
            this.click_status.active = true;
        }
        else {
            this.click = false;
            this.click_status.active = false;
        }
    },//是否同意授权

    show_scrollView: function () {
        this.serverList.active = true;
        this.showItem.active = false;
        this.start_btn.active = false;
        this.root_N.active = false;
    },
    hide_scrollView: function () {
        this.serverList.active = false;
        this.showItem.active = true;
        this.start_btn.active = true;
        this.root_N.active = true;
    },

    _onSocketError: function () {
        this._loginClicked = false;
    },
    
    login () {
        wx.login({
            success: function(res) {
                console.log(res,"res-----------in success");
                if (res.code) {
                    wx.request({
                        url: '',
                        data: {
                            code: res.code,
                        },
                        method: 'POST',
                        success : function (res) {
                            console.log(res,"success------in request");
                        },
                        fail : function (res) {
                            console.log(res,"fail------in request");
                        },
                })
            }
            },
            fail: function(res) {
                console.log(res,"res-----------in fail");
            },
            timeout: function(res) {
                console.log(res,"res-----------in timeout");
            },
            // complete: function(res){
            //     console.log(res,"res-----------in complete");
            // },
        })
    },

    loginClick(event) {
        if (this._loginClicked) {
            return;
        }
        else {
            this._loginClicked = true;
        }
        var uid;
        var _getUid = function (code) {
            uid = code;
        }
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            wx.login({
                success: function(res) {
                    console.log(res,"res in success");
                    if (res.code) {
                        _getUid(res.code);
                    }
                },
                fail: function (res) {
                },
            });
        }
        else {
             uid = dataCenter.uuid;
        }
        console.log(uid + "uid");
        var that = this;
        pomelo.init({
            host: that.host,
            port: that.port,
            log: true
        }, function () {
            /// 注册获取 uuid 获取逻辑服 地址
            pomelo.request("gate.gateHandler.queryEntry", { code: uid }, function (data) {
                that._loginClicked = false;
                var uuid = data.uuid;
                that.port = data.port;
                console.log(that.port + "that.port");
                console.log("请求登陆地址 = %s 端口： = %i,uuid = %s", that.host, data.port, uuid);
                cc.sys.localStorage.setItem("uuid", data.uuid);
                ///连接逻辑服
                pomelo.disconnect(that._connectToConnector.bind(that, uuid, that.host, data.port));
            })
        });
    },

    _getLoginUserInfo(code) {
        let platform = cc.sys.platform;
        switch (platform) {
            case cc.sys.WECHAT_GAME:
            userInfo:dataCenter.userInfo
            case cc.sys.DESKTOP_BROWSER:
            default:
                return {
                    name: code || "unknow",
                    gender: 1,
                    avatarUrl: ""
                }
        }
    },

    _connectToConnector(code, host, port) {
        var that = this;
        that._loginClicked = true;
        pomelo.init({ host: host, port: port, log: true }, function (data) {
            pomelo.request(
                "connector.entryHandler.enter",
                { code: code, userInfo: that._getLoginUserInfo(code) },
                function (data) {
                    that._loginClicked = false;
                    if (data.code == consts.Login.RELAY) {
                        console.log("重连 ip:%s port:%s", data.host, data.port);
                        // 重定向
                        pomelo.disconnect(that._connectToConnector.bind(that, data.uuid, data.host, data.port));
                        return;
                    }
                    else if (data.code == consts.Login.OK) {
                        console.log("连接逻辑服 成功 info: ", data.info);
                        dataCenter.allInfo = data.info;
                        emailData.initMainInfo(dataCenter.allInfo.mailInfo);
                        dataCenter.uuid = data.info.id;
                        dataCenter.openid = data.info.openid;
                        that._mgr.release();
                        that._mgr.loadUI(constant.UI.Main);
                    }
                    else {

                    }
                });
        });
    }

});
