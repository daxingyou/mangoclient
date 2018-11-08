var uibase = require('UIBase')
var constant = require('constants')
var net = require('NetPomelo')
var dataCenter = require('DataCenter')
var matchProto = require('matchProto')
var unmatchProto = require('unmatchProto')
var consts = require('consts')
var matchConfirmProto = require('matchConfirmProto')
var playerData = require('playerData')
cc.Class({
    extends: uibase,

    properties: {
       wxImg:cc.Node,
       _CDState:false,
       cdTime:0,
       count:cc.Label,
       comfirmRole:cc.Label,
       _wxImgs:[],
       selfEnterGame:false,
       _eid:[],
       wxImgScr:null,
    },
    onLoad () {
       
    },
    init (data) {
        var self = this;
        let resIndex = 0;
        self._CDState = true;
        self.cdTime = 30;
        self._wxImgs = {};
        cc.loader.loadRes('UI/matchTeam/wxImg', function (errorMessage, loadedResource) {
            for (var i = 0; i < data.length; i++) {
                let itemData = data[i];
                if (errorMessage) {
                    cc.log('载入预制资源失败, 原因:' + errorMessage);
                    return;
                }
                let item = cc.instantiate(loadedResource);
                resIndex++;
                self.wxImg.addChild(item);
                item.getComponent('wxImg').initData(i,itemData.id,itemData.openid,self);
                self._wxImgs[itemData.id] = item.getComponent('wxImg');;
        
                if (resIndex == 8) {
                    cc.loader.release('UI/matchTeam/wxImg');
                    self.matchSucessd();
                    cc.log(self._wxImgs,"adlkfssssssssssssssssj");
                } 
            }
        });
    },
 
    start () {
    },

    //匹配成功
    matchSucessd () {
        // this.scheduleOnce(function(){
        //     this.onClickEnterGame();
        // },1);
    },

    //点击开始游戏
    onClickEnterGame () {
        this._wxImgs[playerData.id].onclickBegin();
        net.Request(new matchConfirmProto(playerData.id), (data) => {
            cc.log("匹配确认",data);
        });
    },

    //显示队友准备人数
    showComfirmTeamer (num,data) {
        cc.log(data.id,this._wxImgs[data.id],this._wxImgs);
        this._wxImgs[data.id].onclickBegin();
        this.comfirmRole.string = num;
    },

    update (dt) {
        if (this._CDState) {  
            this.cdTime -= dt;
            var  temp = Math.floor(this.cdTime);
            if (temp == 0 ) {
                this._CDState = false;
            }
            this.count.string = temp + "秒";
            if (this.comfirmCount == undefined)
            return;
            this.comfirmCount.string = temp;
        }  
     },
});
