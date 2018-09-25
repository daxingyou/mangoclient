var uibase = require('UIBase')
var constant = require('constants')
cc.Class({
    extends: uibase,

    properties: {
        target: cc.PageView,
        pageIndex:cc.Label,
        content:cc.Node,
        _page:[],
        moveCard:cc.Node,
        showSelectCard:cc.Node,
    },


     onLoad () {
         for (let i =0;i < this.content.childrenCount;i++) {
             let item = this.content.children[i];
            this._page.push(item);
         }
        var self = this;
        var resIndex = 0;
        cc.loader.loadRes('UI/fightUI/Card', function (errorMessage, loadedResource) {
            for (var i = 0; i < 24; i++) {
                if (errorMessage) {
                    cc.log('载入预制资源失败, 原因:' + errorMessage);
                    return;
                }
                if (!(loadedResource instanceof cc.Prefab)) {
                    cc.log('你载入的不是预制资源!');
                    return;
                }
            
                let item = cc.instantiate(loadedResource);
                item.setScale(0.8);
                resIndex++;
                if (resIndex <= 8) {
                    self._page[0].addChild(item);
                }
                else if (resIndex > 8 && resIndex <=16) {
                    self._page[1].addChild(item);
                }
                else {
                    self._page[2].addChild(item);
                }
        
             // initData(index,cardName,CardQuality,cardImage,CardDescription,cardType,thew,mp,cardAttr,canUse, cid)
                let arr = [];
                arr.push[i];
                item.getComponent('CardItem').initData(i,"寒晶刺",2,"attack","对目标造成60点伤害，落地生成2把寒刃。",1,0,1,arr,0,1002,self);
               // self._HandsCards.push(item.getComponent('CardItem'));
                if (resIndex == 24) {
                    cc.loader.release('UI/fightUI/Card');
                   // callback();
                }
            }
        });
     },

    start () {
        // this.content.children.on(cc.Node.EventType.TOUCH_START, function () {
        //     return true;
        // }, this);//阻止往上传递
    },
    backPickHeroUI () {
        var uimgr = cc.find('Canvas').getComponent('UIMgr');
        uimgr.loadUI(constant.UI.PickHero,function(data){
    });
    },
      // 监听事件
      onPageEvent (sender, eventType) {
        // 翻页事件
        if (eventType !== cc.PageView.EventType.PAGE_TURNING) {
            return;
        }
        console.log("当前所在的页面索引:" + sender.getCurrentPageIndex());
    },

    onClickNextPage () {
        if (this.target.getCurrentPageIndex() == 3)
        return;

        else {
            var curPage = this.target.getCurrentPageIndex() + 1;
            this.target.scrollToPage(curPage);
        }
    },

    onClickPrevPage () {
        if (this.target.getCurrentPageIndex() == 0)
        return;

        else {
            var curPage = this.target.getCurrentPageIndex() - 1;
            this.target.scrollToPage(curPage);
        }
    },

    update () {
        // 当前页面索引
        this.pageIndex.string = "第" + (this.target.getCurrentPageIndex() + 1) + "页";
    },
});
