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
        _teamItemBar:[],
    },



    start () {
        this._uimgr =cc.find('Canvas').getComponent('UIMgr');
        this.soloRaid();
    },
    soloRaid() {

        var self = this;
        var resIndex = 0;
        let blongSolo = 0;
        self.display.removeAllChildren();
        self._soloItemBar = [];
        //cc.log(raid,"----------------raid");
        cc.loader.loadRes('UI/raidUI/raidItem', function (errorMessage, loadedResource) {
            for (let i in raid) {

                var itemData = raid[i];
                if (errorMessage) {
                    cc.log('载入预制资源失败, 原因:' + errorMessage);
                    return;
                }
                resIndex++;
                if (itemData.RequirePlayers == 1) {
                    blongSolo++;
                    let item = cc.instantiate(loadedResource);
                    self.display.addChild(item);
                    self._soloItemBar.push(item.getComponent('raidItem'));
                   // cc.log(resIndex,"resIndex",i,"----i");
                //    self._soloItemBar[blongSolo-1].initData(blongSolo-1,itemData.ID,itemData.Name,itemData.RequireLevel,self);
                    self._soloItemBar[blongSolo-1].initData(itemData,self);
                }

                if (resIndex == Object.keys(raid).length) {
                    cc.loader.release('UI/raidUI/raidItem');
                }
            }
    })
    },
    
    teamRaid() {
        var self = this;
        var resIndex = 0;
        let blongMult = 0;
        self.display.removeAllChildren();
        self._teamItemBar = [];
       // cc.log(raid,"----------------raid");
        cc.loader.loadRes('UI/raidUI/raidItem', function (errorMessage, loadedResource) {
            for (let i in raid) {
                var itemData = raid[i];
                if (errorMessage) {
                    cc.log('载入预制资源失败, 原因:' + errorMessage);
                    return;
                }
                resIndex++;
                if (itemData.RequirePlayers > 1) { 
                    blongMult++;
                    let item = cc.instantiate(loadedResource);
                    self.display.addChild(item);
                    self._teamItemBar.push(item.getComponent('raidItem'));
                    self._teamItemBar[blongMult-1].initData(itemData,self);
                }

                if (resIndex == Object.keys(raid).length) {
                    cc.loader.release('UI/raidUI/raidItem');
                }
            }
    })

    },
    backMainUI () {
        cc.log("返回主界面");
        this._uimgr.loadUI(constant.UI.Main,function(data){
        });
    },

    // update (dt) {},
});
