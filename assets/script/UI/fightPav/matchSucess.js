var uibase = require('UIBase')
var constant = require('constants')
var net = require('NetPomelo')
var matchProto = require('matchProto')
var unmatchProto = require('unmatchProto')
var consts = require('consts')

cc.Class({
    extends: uibase,

    properties: {
       wxImg:cc.Node,
       _CDState:false,
       cdTime:0,
       count:cc.Label,
       comfirmRole:cc.Label,
       _wxImgs:[],
    },
    onLoad () {
       
    },
    init (callback) {
        var self = this;
        let resIndex = 0;
        self._CDState = false;
        cc.loader.loadRes('UI/fightPav/wxImg', function (errorMessage, loadedResource) {
            for (var i = 0; i < 8; i++) {
                if (errorMessage) {
                    cc.log('载入预制资源失败, 原因:' + errorMessage);
                    return;
                }
                if (!(loadedResource instanceof cc.Prefab)) {
                    cc.log('你载入的不是预制资源!');
                    return;
                }
                let item = cc.instantiate(loadedResource);
                resIndex++;
                self.wxImg.addChild(item);
                item.getComponent('wxImg').initData(i,"attack",self);
               // self._wxImgs.push(item.getComponent('wxImg'));
                if (resIndex == 8) {
                    cc.loader.release('UI/fightPav/wxImg');
                  //  callback();
                  self.matchSucessd();
                } 
                // cc.log(resIndex,"resIndex"); 
            }
        });
    },
 
    start () {
    },
    matchSucessd () {
        this._CDState = true;
        this.cdTime = 10;
        cc.log("匹配成功，显示头像");
        // for (let i=0;i<8;i++) {
        //     this._wxImgs[i].initData(i,"attack",this);
        // }
    },
    onClickEnterGame () {
        cc.log("点击进入游戏，显示蓝色边框，需要显示队友的，需要服务器通知");
        this.selfEnterGame = true;
    },

    update (dt) {
        if (this._CDState) {  
            this.cdTime -=dt;
            var  temp = Math.floor(this.cdTime);
            if (temp == 0 ) {
                this._CDState = false;
                var uimgr = cc.find('Canvas').getComponent('UIMgr');
                uimgr.loadUI(constant.UI.PickHero,function(data){
            });
            }
            this.count.string = temp + "秒";
            if (this.comfirmCount == undefined)
            return;
            this.comfirmCount.string = temp;
        }  
     },
});
