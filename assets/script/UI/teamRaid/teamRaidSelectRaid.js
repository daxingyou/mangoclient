var uibase = require('UIBase')
var constant = require('constants')
var net = require('NetPomelo')
var dataMgr = require('DataMgr')
var dataCenter = require('DataCenter')
var teamRaidData = require('teamRaidData')
var teamRaidSelectRoomProto = require('teamRaidSelectRoomProto')
cc.Class({
    extends: uibase,

    properties: {
       teamer0:cc.Node,
       teamer1:cc.Node,
       teamer2:cc.Node,
       teamer3:cc.Node,
       heroIconAtlas : cc.SpriteAtlas,
       cdTime:30,
       _CDState:false,
       countDown :cc.Node,
       showRaid:cc.Node,
       _showRaid:[],

    },
    initData (data) {
        cc.log("队伍信息",data);
        this._CDState = true;
        for (let i=0;i < data.length;i++) {
            let itemData = data[i];
            this["teamer" + i].active = true;
            let heroData = dataMgr.hero[itemData.heroid];
            let heroIcon = heroData.HeroIcon;
            let heroName =  this["teamer" + i].getChildByName("heroName");
            heroName.getComponent(cc.Label).string = heroData.HeroName;
            let icon = this["teamer" + i].getChildByName("heroImg");
            icon.getComponent(cc.Sprite).spriteFrame = this.heroIconAtlas.getSpriteFrame(heroIcon);
        }
    },

      //加载关卡，商店，奖励
      loadRaid (selectList) {
        cc.log("可选关卡商店奖励",selectList);
        var self = this;
        var resIndex = 0;
        let raidIdx = 0;
        let raidType = null;
        self.roomId = selectList.length;
        cc.loader.loadRes('UI/raidUI/raidRoom', function (errorMessage, loadedResource) {
            for (let i in selectList) {
                var itemData = selectList[i];
                let raidId = itemData.id;
                let type = itemData.type;
                raidType = dataMgr[type][raidId];
                // if (type == "dungeon") {
                //     cc.log("是副本");
                // }
                //cc.log(raidType,"raidType")
                // cc.log(itemData,"-------selectList",itemData.type,"itemData.type",itemData.id,"itemData.id");
                if (errorMessage) {
                    cc.log('载入预制资源失败, 原因:' + errorMessage);
                    return;
                }
                let item = cc.instantiate(loadedResource);
                resIndex++;
                self.showRaid.addChild(item);
                self._showRaid.push(item.getComponent('raidRoom'));
                //idx,data,parent
                self._showRaid[resIndex-1].initData(null,null,resIndex,raidType.Name,raidType.Icon,raidType.Desc,self);
                //roomId,raidId,idx,raidName,parent,img,des
                //heroid,heroName,heroIcon,parents
                //还需要添加卡牌图，描述字段
            }
        })
    },

    

    onLoad () {
        if(teamRaidData.teamRaidInfo !=null) {
            this.loadRaid(teamRaidData.teamRaidInfo);
        }
    },

    start () {

    },

    update (dt) {
        if (this._CDState) {  
            this.cdTime -=dt;
            var  temp = Math.floor(this.cdTime);
            if (temp == 0 ) {
                this._CDState = false;
            }
            if (this.countDown == undefined)
            return;
           // getComponent(cc.Label).string
            this.countDown.getComponent(cc.Label).string = "剩余"+temp+"秒";
        }
     },
});
