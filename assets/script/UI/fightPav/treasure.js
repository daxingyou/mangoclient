var uibase = require('UIBase')

cc.Class({
    extends: uibase,

    properties: {
        showItem:cc.Node,
    },

    

    onLoad () {
        var self = this;
        let resIndex = 0;
        cc.loader.loadRes('UI/matchTeam/treasureItem', function (errorMessage, loadedResource) {
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
                self.showItem.addChild(item);
               // item.getComponent('wxImg').initData(i,"attack",self);
               // self._wxImgs.push(item.getComponent('wxImg'));
                if (resIndex == 8) {
                    cc.loader.release('UI/matchTeam/treasureItem');
                  //  callback();
                 // self.matchSucessd();
                } 
                // cc.log(resIndex,"resIndex"); 
            }
        });
        
     },
     backPickHeroUI () {
         cc.log("如果还有可选宝物，弹出框，确认返回吗，");
        var uimgr = cc.find('Canvas').getComponent('UIMgr');
        uimgr.loadUI(constant.UI.PickHero,function(data){
    });
    },

    start () {

    },

    // update (dt) {},
});
