var uibase = require('UIBase');
var constant = require('constants')
var net = require('NetPomelo')
var teamRaidGetCardProto = require('teamRaidGetCardProto')
var dataMgr = require('DataMgr')

cc.Class({
    extends: uibase,

    properties: {
       showCard:cc.Node,
    },

    

     onLoad () {
       //  this.initData();
     },

    start () {

    },

    initData (data) {
        cc.log("cardsList",data);
        var self = this;
        cc.loader.loadRes('UI/teamRaid/awardCardItem', function (errorMessage, loadedResource) {
            // let invited = teamData.onTeamInvited;
            for (let i = 0; i < data.length; i++) {
                let itemData = data[i];
                if (errorMessage) {
                    cc.log('载入预制资源失败, 原因:' + errorMessage);
                    return;
                }
                let item = cc.instantiate(loadedResource);
                self.showCard.addChild(item);
                item.getComponent('awardCardItem').initData(itemData,self);
            }
        });
    },

   

    // update (dt) {},
});
