var UIBase = require('UIBase')
var dataCenter = require('DataCenter')
var constant = require('constants')
cc.Class({
    extends: UIBase,

    properties: {
        nickName: {
            default: null,
            type: cc.Label
        },
        userAvatar:{
            type:cc.Sprite,
            default:null,
        },

        userInfoNode: cc.Node,
        userInfo:null,//个人信息
    },

    onLoad () {
        this.tex = new cc.Texture2D();
        this.checkAuth();
        this.userInfoNode.active = false;
    }, 
 
    checkAuth() {
        let self = this
        console.log('检查用户授权');
        wx.getSetting({
            success: (res) => {
                var authSetting = res.authSetting
                if (authSetting['scope.userInfo'] === true) {
                    // 用户已授权，可以直接调用相关 API
                    console.log('用户已经收授权')
                    self.userInfo = wx.getStorageSync('userInfo').userInfo
                    dataCenter.userInfo = wx.getStorageSync('userInfo').userInfo
                    console.log('userInfo',dataCenter.userInfo)
                    // 添加头像和名字
                    this.onGetUserInfo(self.userInfo)
                  //  self.toStartPage()
                } else if (authSetting['scope.userInfo'] === false) {
                    // 用户已拒绝授权，再调用相关 API 或者 wx.authorize 会失败，需要引导用户到设置页面打开授权开关
                    console.log('用户拒绝收授权');
                    self.toAuthPage();
                    self.createAuthButton()
                } else {
                    // 未询问过用户授权，调用相关 API 或者 wx.authorize 会弹窗询问用户
                    console.log('发起用户授权')
                   // self.toAuthPage()
                    self.createAuthButton()
                }
            }
        })
    },

    toStartPage() {
        console.log("关闭授权按钮");
        this.OpenSettingButton.destroy();
    },//关闭授权按钮

    toAuthPage() {
        console.log("打开授权按钮");
       this.OpenSettingButton = wx.createOpenSettingButton({
            type: 'text',
            text: '打开设置页面',
            style: {
                left: 10,
                top: 76,
                width: 200,
                height: 40,
                lineHeight: 40,
                backgroundColor: '#ff0000',
                color: '#ffffff',
                textAlign: 'center',
                fontSize: 16,
                borderRadius: 4
            }
        });
    },//打开授权按钮

    createAuthButton() {
        cc.log("创建用户授权点击按钮");
        let self = this
        this.getUserInfobutton = wx.createUserInfoButton({
            type: 'text',
            text: '点击登录',
            style: {
                left: 100,
                top: 220,
                width: 100,
                height: 50,
                backgroundColor: '#ff0000',
                color: '#ffffff',
                textAlign: 'center',
                fontSize: 16,
                borderRadius: 4,
                lineHeight: 50,
            }
        })
        self.getUserInfobutton.onTap((res) => {
             console.log('button res', res)
            // 如果授权成功 就保存信息
            if (res.userInfo) {
                wx.setStorage({
                    key: 'userInfo',
                    data: {
                        userInfo: res.userInfo,
                    }
                });
                self.onGetUserInfo(res.userInfo)
                self.getUserInfobutton.hide();
            }
            else {
                self.toAuthPage();
            }
        })
    },

    //加载选服列表
    loadSelectServer() {
        var uimgr = cc.find('Canvas').getComponent('UIMgr');
        uimgr.loadUI(constant.UI.SelectServer);
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

    onGetUserInfo(userInfo) {
        this.userInfoNode.active = true;
        this.createImage(this.userAvatar, userInfo.avatarUrl);
        this.nickName.string = userInfo.nickName;
        this.loadSelectServer();
    },

    // _updaetSubDomainCanvas() {
    //     this.tex.initWithElement(sharedCanvas);
    //     this.tex.handleLoadedTexture();
    //     this.display.spriteFrame = new cc.SpriteFrame(this.tex);
    // },
    createImage(sprite, url) {
        let image = wx.createImage();
        image.onload = function () {
            let texture = new cc.Texture2D();
            texture.initWithElement(image);
            texture.handleLoadedTexture();
            sprite.spriteFrame = new cc.SpriteFrame(texture);
        };
        image.src = url;
    },

    // update (dt) {},
});
