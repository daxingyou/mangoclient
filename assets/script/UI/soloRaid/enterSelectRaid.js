var uibase = require('UIBase')
var constant = require('constants')
var dataMgr = require('DataMgr')
var dataMgr = require('DataMgr')
var raidEnterRoomProto = require('raidEnterRoomProto')
var dataCenter = require('DataCenter')
var net = require('NetPomelo')
var soloRaidData = require('soloRaidData')
var fightData = require('fightData')
var raidGetCardProto = require('raidGetCardProto')


cc.Class({
    extends:uibase,
    properties: {
       heroName: cc.Label,
       heroIcon: cc.Sprite,
       heroIconAtlas : cc.SpriteAtlas,
       raidName:cc.Label,
       showRaid:cc.Node,
       _showRaid:[],
       roomId:null,
       raidId:null,
       showCard: cc.Node,

    },

    initData (raidInfo) {
        cc.log("副本信息",raidInfo);
        let rooms = raidInfo.rooms;
        this.roomId = rooms.length;
        let heroData = dataMgr.hero[raidInfo.heroid];
        let heroIcon = heroData.HeroIcon;
        this.heroIcon.spriteFrame = this.heroIconAtlas.getSpriteFrame(heroIcon);
        this.heroName.string = heroData.HeroName;
        let raidData = dataMgr.raid[raidInfo.raidID];
        this.raidName.string = raidData.Name;
        fightData.userName = heroData.HeroName;
        let raidsInfo = soloRaidData.soloRaidInfo;//已经存在副本信息
        let laststRoom = rooms[rooms.length - 1];// 最新的进度
        if (laststRoom.state == 1) {
            this.loadRaid(laststRoom.selectList);
            return;  
        }
        else if (laststRoom.state == 2) {
            net.Request(new raidEnterRoomProto(soloRaidData.raidId,raidInfo.rooms.length), (data) => {
                cc.log("进副本加载状态",data);
            });
        }
        else if (laststRoom.state == 3) {
            let cardList = laststRoom.cardsList;
            this.selectAward(cardList);
        }
        else if (laststRoom.state == 4) {
            cc.log("全部副本都打完了");
        }
    },

     //选择奖励卡牌
     selectAward(cardsList) {
       // cc.log("cardsList",cardsList,soloRaidData.raidId);
        if (cardsList == null) 
        return;
        var self = this;
        self.showCard.active = true;
        self.showRaid.active = false;
        self.showRaid.removeAllChildren();
        self._CDState = false;
        var resIndex = 0;
        cc.loader.loadRes('UI/teamRaid/awardCardItem', function (errorMessage, loadedResource) {
            for (let i = 0; i < cardsList.length; i++) {
                let itemData = cardsList[i];
                if (errorMessage) {
                    cc.log('载入预制资源失败, 原因:' + errorMessage);
                    return;
                }
                resIndex++;
                let item = cc.instantiate(loadedResource);
                self.showCard.addChild(item);
                item.getComponent('awardCardItem').initData(itemData,self,1,soloRaidData.raidId);
                if (resIndex == cardsList.length) {
                    cc.loader.release('UI/teamRaid/awardCardItem');
                }
            }
        }); 
    },

    // 选择完奖励卡牌
    selectCardEnd (info) {
    //    / cc.log("选择完卡牌");
        let raidInfo = info;
     //   cc.log(raidInfo,"raidInfo");
        let rooms = raidInfo.rooms;
        this.roomId = rooms.length;
        this.loadRaid(rooms[this.roomId-1]["selectList"]);
        this.showCard.active = false;
        this.showRaid.active = true;
    },

      //跳过卡牌奖励
      ingoreAwardCard () {
        net.Request(new raidGetCardProto(soloRaidData.raidId,0), (data) => {
            cc.log("跳过卡牌奖励",data);
        });
        this.showCard.active = false;
        this.showRaid.active = true;
    },
    
    //加载关卡，商店，奖励
    loadRaid (selectList) {
       // cc.log("可选关卡/商店/奖励",selectList);
        var self = this;
        var resIndex = 0;
        let raidIdx = 0;
        let raidType = null;
        self.showRaid.removeAllChildren();
        self._showRaid = [];
        cc.loader.loadRes('UI/raidUI/raidRoom', function (errorMessage, loadedResource) {
            for (let i in selectList) {
                var itemData = selectList[i];
                let raidId = itemData.id;
                let type = itemData.type;
                raidType = dataMgr[type][raidId];
                if (errorMessage) {
                    cc.log('载入预制资源失败, 原因:' + errorMessage);
                    return;
                }
                let item = cc.instantiate(loadedResource);
                resIndex++;
                self.showRaid.addChild(item);
                self._showRaid.push(item.getComponent('raidRoom'));
                //roomId,raidId,idx,raidName,parent,img,des
                self._showRaid[resIndex-1].initData(self.roomId,soloRaidData.raidId,resIndex,raidType.Name,raidType.Icon,raidType.Desc,self);
            }
        })
    },

    backRaidUI () {
        this._uiMgr.release();
        this._uiMgr.loadUI(constant.UI.RaidUI,function(data) {
        });
    },
    
    onLoad () {
        this._uiMgr = cc.find('Canvas').getComponent('UIMgr');
    },

    start () {

    },

    // update (dt) {},
});
