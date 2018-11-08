var UIBase = require('UIBase')
var net = require('NetPomelo')
var listItem = require('listItem')
var constant = require('constants')
var dataCenter = require('DataCenter')
var consts = require('consts')
var emailData = require('emailData')
let LoadRes = require('LoadRes');
let playerData = require('playerData');

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
        statusIcon: cc.Sprite,
        atlas: cc.SpriteAtlas,
        //    showScore:[],
        _loginClicked: false,
        _socketErrFunc: null,
    },

    onLoad() {
        this._bGetServerList = false;
        this._code = "";
        this.expret.on(cc.Node.EventType.TOUCH_START, function () {
            return true;
        }, this);
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

    _initListItem(item, serverinfo) {
        item.getComponent('listItem').init(serverinfo, this);
    },

    _updateServerStatus(status) {
        switch (status) {
            case consts.ServerList.STATUS_CLOSED:
                this.statusIcon.spriteFrame = this.atlas.getSpriteFrame('mantain');
                this.status.string = "维护";
                break;
            case consts.ServerList.STATUS_NEW:
                this.statusIcon.spriteFrame = this.atlas.getSpriteFrame('new');
                this.status.string = "新服";
                break;
            case consts.ServerList.STATUS_BUSY:
                this.statusIcon.spriteFrame = this.atlas.getSpriteFrame('busy');
                this.status.string = "繁忙";
                break;
            case consts.ServerList.STATUS_HOT:
                this.statusIcon.spriteFrame = this.atlas.getSpriteFrame('hot');
                this.status.string = "火爆";
                break;
        }
    },

    updateSelectedServer(serverinfo) {
        this._updateServerStatus(serverinfo.status);
        this.serverName.string = serverinfo.name;
        this.id = serverinfo.lastLoginSid;
        this.host = serverinfo.ip;
        this.port = serverinfo.port;
    },

    getServerList(code) {
        var self = this;
        self._code = code;
        cc.log("获取服务器列表");
        net.HttpRequest('https://mango.haisenyouxi.com/ServerList/?code=' + code, (data) => {
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

            var findLast = false;
            self.showScore = roleList;
            var id2ServerInfo = {};

            LoadRes.loadPrefab('UI/selectServer/listItem', true, function (loadedResource) {
                for (var i = 0; i < serverlist.length; i++) {
                    var serverinfo = serverlist[i];
                    id2ServerInfo[serverinfo.id] = serverinfo;
                    self.storeId.push(serverlist[i].id);

                    let item = cc.instantiate(loadedResource);
                    self.list.addChild(item);
                    self._initListItem(item, serverinfo);

                    if (serverLast == serverinfo.id) {
                        self.updateSelectedServer(serverinfo);
                        findLast = true;
                    }//默认显示   
                }
                var serverinfo = serverlist[0];
                if (!findLast) {
                    self.updateSelectedServer(serverinfo);
                }//服务器列表

                for (let i = 0; i < self.storeId.length; i++) {

                    if (serverLast == self.storeId[i]) {
                        var item2Data = serverlist[i];
                        let item2 = cc.instantiate(loadedResource);
                        self.last.addChild(item2);
                        self._initListItem(item2, item2Data);
                    }
                }//上次登录

                var len = Math.ceil(Object.keys(roleList).length / 2);
                if (len > 2) {
                    this.exit.height = 52 * len;
                    var dis = this.exit.height - 52 * 2;
                    this.listBar.y -= dis;
                }//下移list
                for (let serverId in roleList) {
                    let item3Data = id2ServerInfo[serverId];
                    let item3 = cc.instantiate(loadedResource);
                    self.exit.addChild(item3);
                    self._initListItem(item3, item3Data);
                }//已有角色
            });
        });
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
                return {
                    name: playerData.name,
                    gender: playerData.gender,
                    avatarUrl: playerData.avatarUrl
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
                        cc.log("重连 ip:%s port:%s", data.host, data.port);
                        // 重定向
                        pomelo.disconnect(that._connectToConnector.bind(that, data.host, data.port));
                        return;
                    }
                    else if (data.code == consts.Login.OK) {
                        cc.log("连接逻辑服 成功 info: ", data.info);
                        dataCenter.allInfo = data.info;
                        playerData.init(data.info);
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
