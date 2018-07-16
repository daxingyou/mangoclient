cc.Class({
    extends: cc.Component,

    properties: {
        nickName: {
            default: null,
            type: cc.Label
        },
        imgUrl:{
            type:cc.Sprite,
            default:null,
        },
    },

    onLoad() {
        Global.token = (wx.getStorageSync('token'));
        console.log('Global.token-------'+Global.token);
        Global.score = (wx.getStorageSync('score'));
        console.log('Global.score-------'+Global.score);
        Global.userInfo = (wx.getStorageSync('userInfo'));
        

        var setImageUrl = function (node, url) {
            if (url != null && url != "") {
                cc.loader.load({
                    url: url,
                    type: 'png',
                }, (err, tex) => {
                    if (err) {
                    } else {
                        let oldWidth = node.width;
                        node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(tex);
                        node.scale = oldWidth / node.width;
                    }
                });
            }
    }

        var func1 = (nickName) =>{
            this.nickName.string = nickName;
        }
        var func2=(avatarUrl) =>{
            setImageUrl(this.imgUrl, avatarUrl);   
        }


      
    
        //再次登录
        if (Global.token) {
    
            wx.getUserInfo({
                success: function (res) {
                    wx.getUserInfo({
                        success: function (res) {
                            console.log(res+"res");
                            console.log("获取用户信息--3---");
                            if (res != null) {
                                Global.userInfo = res.userInfo;
                                wx.setStorageSync('userInfo', res.userInfo);
                                var nickName = res.userInfo.nickName;//用户昵称
                                var avatarUrl = res.userInfo.avatarUrl;//用户头像图片url
                                func1(nickName);
                                func2(avatarUrl);
                                Global.openid = wx.getStorageSync('openid');
                                console.log("Print openid: "+Global.openid);
                                wx.request({
                                    url: "https://blockchain4.applinzi.com/api/wx/reg",//服务器保存的token
                                    data: {//发送用户信息
                                        nickName: nickName,
                                        avatarUrl: avatarUrl, 
                                        openid:Global.openid
                                    },
                                    method: 'POST',
                                    header: {//发送tocken
                                        'token': Global.token,
                                    },
                                    success: function (src) {
                                        console.log("发送token-----------3--------返回值-----");
                                        console.log(src+"src");
                                        console.log(src.data + "src.data");
                                        Global.token = src.data.token;
                                        Global.score = src.data.score;
                                        wx.setStorageSync('token', src.data.token);
                                        wx.setStorageSync('score', src.data.score);
                                        Global.token = (wx.getStorageSync('token'));
                                    },
                                });
                            }
                        }
                    });
                    console.log("-3-------获取用户信息完成！");
                },
                fail: function () {
                    // fail
                    console.log("获取失败！")
                },
                complete: function () {
                    // complete
                    console.log("获取用户信息完成！")
                }
            })
        } else {
           
            //第一步----------
            wx.login({
                success: function (res) {
                   
                    if (res.code) {
                        //第二步------------发起网络请求获取tocken
                        wx.request({
                            url: 'https://blockchain4.applinzi.com/api/wx/token',
                            data: {
                                code: res.code,
                            },
                            method: 'POST',
                          
                            success: function (res) {//得到token
                                console.log("msg-------- :"+res.data.msg);
                                console.log("得到token------------" + JSON.stringify(res.data.token));
                                Global.token = res.data.token;
                                Global.score = res.data.score;
                                Global.openid = res.data.openid;
                                wx.setStorageSync('openid', res.data.openid);
                                wx.setStorageSync('token', res.data.token);
                                wx.setStorageSync('score', res.data.score);
                                Global.token = (wx.getStorageSync('token'));
                                
                                if (Global.token != null) {
                                    //第三步-----------授权
                                    wx.getSetting({
                                        success(res) {
                                            var authSetting = res.authSetting;//授权结果
                                            if(authSetting==true){console.log("已经授权了--------------");}
                                            if (!authSetting['scope.userInfo']) {
                                                //第四步-------------获取用户信息
                                                wx.getUserInfo({
                                                    success: function (res) {//用户允许
                                                        console.log(res);
                                                        console.log("获取用户信息--3---");
                                                        if (res != null) {
                                                            Global.userInfo = res.userInfo;
                                                            wx.setStorageSync('userInfo', res.userInfo);
                                                            console.log("获取用户信息---1--" + res.userInfo);
                                                            console.log("获取用户信息---1--" + res);
                                                            var nickName = res.userInfo.nickName;//用户昵称
                                                            var avatarUrl = res.userInfo.avatarUrl;//用户头像图片url
                                                            func1(nickName);
                                                            func2(avatarUrl);
                                                
                                                            wx.request({
                                                                url: "https://blockchain4.applinzi.com/api/wx/reg",
                                                                data: {//发送用户信息
                                                                    nickName: nickName,
                                                                    avatarUrl: avatarUrl,
                                                                },
                                                                method: 'POST',
                                                                header: {//发送tocken
                                                                    'token': Global.token,
                                                                },
                                                                success: function (src) {
                                                                    console.log("发送token-----------1--------返回值-----");
                                                                    console.log(src);
                                                                },
                                                            });
                                                        }
                                                    },
                                                    //用户取消授权处理
                                                    fail: function () {
                                                        //显示模态对话框
                                                        wx.showModal({
                                                            title: '警告通知',
                                                            content: '您点击了拒绝授权,将无法正常游戏,点击确定重新获取授权。',
                                                            success: function (res) {
                                                                if (res.confirm) {
                                                                    //调起客户端小程序设置界面，返回用户设置的操作结果。
                                                                    wx.openSetting({
                                                                        success: (res) => {
                                                                            if (res.authSetting["scope.userInfo"]) {////如果用户重新同意了授权登录
                                                                                wx.getUserInfo({
                                                                                    success: function (res) {
                                                                                        console.log(res);
                                                                                        if (Global.token != null) {
                                                                                            Global.userInfo = res.userInfo;
                                                                                            wx.setStorageSync('userInfo', res.userInfo);
                                                                                            var nickName = res.userInfo.nickName;//用户昵称
                                                                                            var avatarUrl = res.userInfo.avatarUrl;//用户头像图片url
                                                                                            func1(nickName);
                                                                                            func2(avatarUrl);
                                                                                            wx.request({
                                                                                                url: "https://blockchain4.applinzi.com/api/wx/reg",
                                                                                                data: {//发送用户信息
                                                                                                    nickName: nickName,
                                                                                                    avatarUrl: avatarUrl,
                                                                                                },
                                                                                                method: 'POST',
                                                                                                header: {//发送tocken
                                                                                                    'token': Global.token,
                                                                                                },
                                                                                                success: function (src) {
                                                                                                    console.log("发送tocken-----------2--------返回值-----");
                                                                                                    console.log(src);
                                                                                                },
                                                                                            });
                                                                                        }

                                                                                    }
                                                                                });
                                                                            }
                                                                        },
                                                                        fail: function (res) {
                                                                            console.log("用户再次拒绝授权");
                                                                        },
                                                                    })
                                                                }
                                                            }
                                                        })
                                                    },
                                                })
                                            }
                                            
                                        }
                                    })
                                }
                            },
                            fail:function(res){
                                console.log("请求网络失败——————"+res.data);
                            },
                        });
                    }
                }
            });
        };
    },

});