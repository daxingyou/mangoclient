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
        this._bGetServerList = false;
        this._code = "";
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
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            this.wxLogin(this.getServerList.bind(this));
            return;
        }
        else {
            this.getServerList(dataCenter.uuid);
        }
    },

    wxLogin(successCB, failCB) {
        wx.login({
            success: (res) => {
                console.log(res, "res in success");
                if (res.code) {
                    if (successCB) {
                        successCB(res.code);
                    }
                }
            },
            fail: function (res) {
                if (failCB) {
                    failCB();
                }
            },
        });
    },

    getServerList(code) {
        var self = this;
        self._code = code;
        cc.log("获取服务器列表");
        net.HttpRequest('http://203.195.206.97:3003/ServerList?code=' + code, (data) => {
            cc.log(data);
            self._bGetServerList = true;
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
            self.showScore = roleList;


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
                    cc.loader.loadRes('UI/selectServer/listItem', function (errorMessage, loadedResource) {
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
                        cc.loader.release('UI/selectServer/listItem');
                    });
                }
            }//上次登录

            for (let item in roleList) {

                var len = Math.ceil(Object.keys(roleList).length / 2);

                if (len > 2) {
                    this.exit.height = 52 * len;
                    var dis = this.exit.height - 52 * 2;
                    this.listBar.y -= dis;
                }//下移list

                var roleItem = parseInt(item);
                let item3Data = serverlist[roleItem - 1];

                cc.loader.loadRes('UI/selectServer/listItem', function (errorMessage, loadedResource) {

                    if (errorMessage) {
                        cc.log('载入预制资源失败, 原因:' + errorMessage); return;
                    }
                    if (!(loadedResource instanceof cc.Prefab)) {
                        cc.log('你载入的不是预制资源!'); return;
                    }

                    let item3 = cc.instantiate(loadedResource);
                    self.exit.addChild(item3);

                    item3.getComponent('listItem').init({
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
        if (!this._bGetServerList) {
            this.start();
            return;
        }
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

    loginClick(event) {
        if (this._loginClicked) {
            return;
        }
        this._loginClicked = true;
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            this.wxLogin(this.doLogicLogin.bind(this));
            return;
        }
        this.doLogicLogin(this._code);
    },

    doLogicLogin(code) {
        let self = this;
        cc.sys.localStorage.setItem("uuid", code);
        pomelo.init({
            host: self.host,
            port: self.port,
            log: true
        }, function () {
            /// 获取逻辑服 地址
            pomelo.request("gate.gateHandler.queryEntry", { code: code }, function (data) {
                self._loginClicked = false;
                if (data.code == consts.Login.MAINTAIN) {
                    self._handleMaintainState();
                    return;
                }
                console.log("请求登陆地址 = %s 端口： = %i", self.host, data.port);
                ///连接逻辑服
                pomelo.disconnect(self._connectToConnector.bind(self, self.host, data.port));
            })
        });
    },

    _getLoginUserInfo(code) {
        let platform = cc.sys.platform;
        switch (platform) {
            case cc.sys.WECHAT_GAME:
                let userInfo = dataCenter.userInfo;
                return {
                    name: userInfo.nickName,
                    gender: userInfo.gender,
                    avatarUrl: userInfo.avatarUrl
                }
            case cc.sys.DESKTOP_BROWSER:
            default:
                return {
                    name: code || "unknow",
                    gender: 1,
                    avatarUrl: ""
                }
        }
    },

    _getPlatform() {
        let platform = cc.sys.platform;
        switch (platform) {
            case cc.sys.WECHAT_GAME:
                return consts.Platform.WECHAT;
            case cc.sys.DESKTOP_BROWSER:
            default:
                return consts.Platform.WIN;
        }
    },

    _connectToConnector(host, port) {
        let self = this;
        self._loginClicked = true;
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            this.wxLogin(function (code) {
                self._ActualConnectToConnector(code, host, port);
            }, function () {
                self._onLoginFailed();
            });
            return;
        }
        this._ActualConnectToConnector(this._code, host, port);
    },

    _ActualConnectToConnector(code, host, port) {
        var that = this;
        pomelo.init({ host: host, port: port, log: true }, function (data) {
            pomelo.request(
                "connector.entryHandler.enter",
                {
                    code: code,
                    userInfo: that._getLoginUserInfo(code),
                    platform: that._getPlatform()
                }, function (data) {
                    that._loginClicked = false;
                    if (data.code == consts.Login.RELAY) {
                        console.log("重连 ip:%s port:%s", data.host, data.port);
                        // 重定向
                        pomelo.disconnect(that._connectToConnector.bind(that, data.host, data.port));
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
                    else if (data.code == consts.Login.MAINTAIN) {
                        that._handleMaintainState();
                    }
                    else {
                        that._onLoginFailed();
                    }
                });
        });
    },

    _onLoginFailed() {
        this._loginClicked = false;
        this._mgr.showTips('登录失败，请重新登录。');
    },

    _handleMaintainState() {
        var uiMgr = cc.find('Canvas').getComponent('UIMgr');
        uiMgr.showTips("服务器维护中...");
        pomelo.disconnect();
    }

});
