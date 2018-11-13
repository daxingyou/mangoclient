var dataMgr = require("DataMgr")
var combatMgr = require("CombatMgr")
var matchMessage = require("matchMessage")
var loadingMessage = require('LoadingMessage')
var friendMessage = require('FriendMessage')
var ladderMessage = require('LadderMessage')
var teamRaidMessage = require('TeamRaidMessage')
let debugMessage = require('debugMessage')
var constant = require('constants')
var uimgr = require('UIMgr')
var scenemgr = require('SceneMgr')
var dataCenter = require('DataCenter')
var playerMessage = require('PlayerMessage')
let teamMessage = require('teamMessage');
let fightMessage = require('fightMessage');

cc.Class({
    extends: cc.Component,

    properties: {
    },
       invitedResult (mass) {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            let obj = wx.getLaunchOptionsSync();
            let data = obj.query;
            console.log(obj.query,JSON.stringify(data));
            console.log(data.id,typeof(data.id),"data.id");
            if (data.id || data.id!=undefined) {
                console.log("邀请成功----------房间id是为"+data.id);
                this._uimgr.loadUI(constant.UI.BuildTeam);
                wx.onShow(function (res){console.log(res,"------------res")});
            }
        }
        else {
            cc.log("加载登录");
            uimgr.loadUI(constant.UI.Login);
        }
     },

    onLoad () {
        this._uimgr = cc.find('Canvas').getComponent('UIMgr');
        this._uimgr.loadUI(constant.UI.Login);
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            console.log("微信版本");
            //监听分享是否成功
           // GlobalEvent.on("invited",this.invitedResult,this);
        }

        scenemgr.init();

        ////数据加载
        dataMgr.init(()=>{});

        ///消息协议注册
        matchMessage.init();
        loadingMessage.init();
        friendMessage.init();
        ladderMessage.init();
        teamRaidMessage.init();
        debugMessage.init();
        playerMessage.init();
        teamMessage.init();
        fightMessage.init();

        // 适配
        //设计分辨率
        let designSize = cc.view.getDesignResolutionSize();
        let designRatio = designSize.width / designSize.height;
        //屏幕物理分辨率 也就是手机分辨率。
        let frameSize = cc.view.getFrameSize();
        let frameRatio = frameSize.width / frameSize.height;
        var cvs = this.node.getComponent(cc.Canvas);
        // 保证战斗区域完整显示，允许黑边，背景填充
        // todo: 两个都勾上会有问题，先在代码处理
        if (frameRatio > designRatio) {
            cvs.fitHeight = true;
            cvs.fitWidth = false;
        }
        else {
            cvs.fitHeight = false;
            cvs.fitWidth = true;
        }
        // 背景适配
        let bg = this.node.getChildByName("background");
        let fg = this.node.getChildByName("frontground");
        let bgSize = bg.getContentSize();
        let bgRatio = bgSize.width / bgSize.height;
        let scale = 1;
        if (frameRatio > bgRatio) {
            scale = designSize.width / bgSize.width * (frameRatio / designRatio);
        }
        else {
            scale = designSize.height / bgSize.height * (designRatio / frameRatio);
        }
        bg.scale = scale;
        fg.scale = scale;
        cc.log("bgScale: ", scale, "designSize", designSize, designSize.width / designSize.height, frameSize, frameSize.width / frameSize.height);
    },
    
    start () {
        //var host = '127.0.0.1'
        //var port = 50007
        //pomelo.init({host:host,port:port,log:true},function(data){})

        if(cc.sys.platform == cc.sys.WECHAT_GAME)
        {
            wxAPI.SetStartTime();
        }

        cc.game.on(cc.game.EVENT_HIDE,function(){
            wxAPI.SetQuitTime();
        });
       if (cc.sys.platform == cc.sys.WECHAT_GAME) {
           
       }
     //  GlobalEvent.emit("invited",1);
    },

    initShaders() {
        //var ShaderLib = require("ShaderLib");
        //ShaderLib.addShader(require("gray"));
        //ShaderLib.addShader(require("normal"));
        //ShaderLib.addShader(require("wsword"));
    },


    update (dt) {
       //cc.log('random = ',utility.rand(10));
       combatMgr.Tick(dt);
    }
});
