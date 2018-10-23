
var uibase = require('UIBase')
cc.Class({
    extends: uibase,

    properties: {
        showRoles:cc.Node,
        _showRoles:[],
    },

    

     onLoad () {

     },
     init (callback) {
        var self = this;
        let resIndex = 0;
        self._CDState = false;
        cc.loader.loadRes('UI/matchTeam/role', function (errorMessage, loadedResource) {
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
                self.showRoles.addChild(item);
               // initData(i,heroName,userName,loadProjess,heroImg)
                item.getComponent('role').initData(i,"余小雪","余小雪",100,"yuxiaoxue");
               // self._showRoles.push(item.getComponent('role'));
                if (resIndex == 8) {
                    cc.loader.release('UI/matchTeam/role');
                  //  callback();
                } 
                // cc.log(resIndex,"resIndex"); 
            }
        });
    },

    start () {

    },

    // update (dt) {},
});
