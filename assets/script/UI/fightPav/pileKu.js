var uibase = require('UIBase')
var constant = require('constants')
cc.Class({
    extends: uibase,

    properties: {
        target: cc.PageView,
        pageIndex:cc.Label,
    },


    // onLoad () {},

    start () {

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
