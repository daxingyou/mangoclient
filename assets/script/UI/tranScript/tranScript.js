var uibase = require('UIBase')
var constant = require('constants')
var net = require('NetPomelo')
var raid = require('Raid')
var dataMgr = require('DataMgr')
cc.Class({
    extends: uibase,

    properties: {
        display:cc.Node,
        defalutShow:true,
        _soloItemBar:[],
    },



    start () {
        this._uimgr =cc.find('Canvas').getComponent('UIMgr');
        this.soloFuben();
    },
    soloFuben() {
        var self = this;
        var resIndex = 0;
        self.display.removeAllChildren();
        self._soloItemBar = [];
        cc.log(raid,"----------------raid");
        cc.loader.loadRes('UI/tranScript/soloItem', function (errorMessage, loadedResource) {
            for (let i in raid) {
                var itemData = raid[i];
                if (errorMessage) {
                    cc.log('载入预制资源失败, 原因:' + errorMessage);
                    return;
                }
                resIndex++;
                let item = cc.instantiate(loadedResource);
                self.display.addChild(item);
                self._soloItemBar.push(item.getComponent('soloItem'));
                cc.log(resIndex,"resIndex",i,"----i");
                self._soloItemBar[resIndex-1].initData(resIndex-1,itemData.ID,itemData.Name,itemData.RequireLevel,self);

                if (resIndex == Object.keys(raid).length) {
                    cc.loader.release('UI/tranScript/soloItem');
                }
            }
    })
    },
    teamFuben() {
        this.display.removeAllChildren();
    },
    backMainUI () {
        cc.log("返回主界面");
        this._uimgr.loadUI(constant.UI.Main,function(data){
        });
    },

    // update (dt) {},
});
