
var uibase = require('UIBase')

cc.Class({
    extends: uibase,

    properties: {
        content:cc.Node,
    },

   

     onLoad () {
        var self = this;
        let resIndex = 0;
        cc.loader.loadRes('UI/fightPav/stuff', function (errorMessage, loadedResource) {
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
                self.content.addChild(item);
               // item.getComponent('wxImg').initData(i,"attack",self);
               // self._wxImgs.push(item.getComponent('wxImg'));
                if (resIndex == 8) {
                    cc.loader.release('UI/fightPav/stuff');
                  //  callback();
                 // self.matchSucessd();
                } 
                // cc.log(resIndex,"resIndex"); 
            }
        });

     },
     backPickHeroUI () {
        var uimgr = cc.find('Canvas').getComponent('UIMgr');
        uimgr.loadUI(constant.UI.PickHero,function(data){
    });
    },

    start () {

    },

    // update (dt) {},
});
