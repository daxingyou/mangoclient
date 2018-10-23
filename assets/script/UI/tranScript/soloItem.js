var uibase = require('UIBase')
var constant = require('constants')
var dataCenter = require('DataCenter')
cc.Class({
    extends: uibase,

    properties: {
        _curIndex:null,
        fubenName:cc.Label,
        requireLevel:cc.Label,
        _parents:null,
        raidId:null,
        
    },
    initData (index,raidId,name,requireLevel,parent,sprite) {
        this._curIndex = index;
        this.raidId = raidId;
        this.fubenName.string = name;
        this.requireLevel.string = requireLevel + "级开启";
        this._parents = parent;
        cc.log(raidId,"raidId");

    },//名称，图标，状态
    //玩家还未开启的副本，显示开启等级。
    //该副本的当前状态为“已开启且无进度”，进入单人英雄选择界面。	
    //该副本的当前状态为“有进度”，读取服务器上保存的进度，进入关卡选择界面。	
    //该副本的当前状态为“未开启”，显示TIPS：“{RaidName}{RequireLevel}级开启。”
    onLoad () {
        this._uimgr = cc.find('Canvas').getComponent('UIMgr');
    },

    laodSoloSelectHero() {
        var self = this;
       // cc.log(dataCenter.allInfo.raidsInfo.raids,"dataCenter.allInfo.raidsInfo.raids");
       let obj = dataCenter.allInfo.raidsInfo.raids;
        if (Object.keys(obj).length != 0) {
            cc.log("已经存在副本");
            let raidData = dataCenter.allInfo.raidsInfo.raids;
            for (let i in raidData) {
                let itemData = raidData[i];
                self._uimgr.loadUI(constant.UI.EnterSelectRaid,data =>{
                    data.initData(itemData);
                });
                return;
            }
        }
        else {
            self._uimgr.loadUI(constant.UI.SoloFubenSelectHero,data =>{
                data.initData();
                data.comfirmRaidID(self.raidId);
            });
        }
        
    },
    
    	


   

    start () {

    },

    // update (dt) {},
});
