var constants = require('constants')

cc.wxAPI = function(){
    var api = Object.create(EventEmitter.prototype); 

    api.SetStartTime = function(){
        if(cc.sys.platform === cc.sys.WECHAT_GAME)
        {
            var time  = new Date().getTime();
            wx.setUserCloudStorage(
                {
                    KVDataList : [{key:"lv",value:"1"},{key:"rank",value:"1"},{key:"start",value:time.toString()}],
                    success : function(args){cc.log("wxAPI ->  setUserCloudStorage sucess .",args);
                    },
                    fail : function(args){
                        cc.log("wxAPI ->  setUserCloudStorage fail .",args);
                    }
                }
            );
        }
    }

    api.SetQuitTime = function(){
        if(cc.sys.platform === cc.sys.WECHAT_GAME)
        {
            var time  = new Date().getTime();
            wx.setUserCloudStorage(
                {
                    KVDataList : [{key:"lv",value:"1"},{key:"rank",value:"1"},{key:"leave",value:time.toString()}],
                    success : function(args){cc.log("wxAPI ->  setUserCloudStorage sucess .",args);
                    },
                    fail : function(args){
                        cc.log("wxAPI ->  setUserCloudStorage fail .",args);
                    }
                }
            );
        }
    }

    api.SendMessage = function(type,param){
        if(cc.sys.platform === cc.sys.WECHAT_GAME)
        {
            wx.postMessage({
                message: type,
                params : param
            })
        }
    }

    ///显示子域
    api.Show = function(){this.SendMessage(constants.MessageType.Show);}

    ///隐藏子域
    api.Hide = function(){this.SendMessage(constants.MessageType.Hide);}

    ///清空显示
    api.Clear = function(){this.SendMessage(constants.MessageType.Clear);}

    return api;
}

window.wxAPI = new cc.wxAPI();
