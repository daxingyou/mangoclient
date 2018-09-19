
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

    return api;
}

window.wxAPI = new cc.wxAPI();
