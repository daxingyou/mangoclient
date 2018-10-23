var uibase = require('UIBase')
var constant = require('constants')
var dataMgr = require('DataMgr')
var Dungeon = require('Dungeon')
var dataMgr = require('DataMgr')
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
    },

    initData (raidInfo) {
        cc.log(raidInfo,"--------raidInfo",raidInfo.heroid,raidInfo.rooms);
        let rooms = raidInfo.rooms;
        let heroData = dataMgr.hero[raidInfo.heroid];
        let heroIcon = heroData.HeroIcon;
        this.heroIcon.spriteFrame = this.heroIconAtlas.getSpriteFrame(heroIcon);
        this.heroName.string = heroData.HeroName;
        let raidData = dataMgr.raid[raidInfo.raidID];
        this.raidName.string = raidData.Name;
        
        for (let i in rooms) {//遍历房间
           // cc.log(rooms[i],"------------rooms[i]",i,"----------rooid");
            for (let j in rooms[i]) {//房间里的关卡
                if (j == "state") {
                    let state = rooms[i][j];
                    if (state  == 1) {
                        cc.log("第一次进副本");
                        this.loadRaid(rooms[i]["selectList"]);
                        return;
                        
                    }
                    if (state  == 2) {
                        cc.log("进副本加载状态");
                        
                    }
                    
                }

            }
            //cc.log(i,"i",rooms[i]);
            

          //  cc.log(rooms[i]);

        }
    },
    loadRaid (selectList) {
        var self = this;
        var resIndex = 0;
        let raidType = null;
        cc.log(selectList,"-------------selectList");
        cc.loader.loadRes('UI/soloFuben/raidItem', function (errorMessage, loadedResource) {
            for (let i in selectList) {
                var itemData = selectList[i];
                let raidId = itemData.id;
                let type = itemData.type;
                raidType = dataMgr[type][raidId];
                cc.log(raidType,"raidType")
                // cc.log(itemData,"-------selectList",itemData.type,"itemData.type",itemData.id,"itemData.id");
                if (errorMessage) {
                    cc.log('载入预制资源失败, 原因:' + errorMessage);
                    return;
                }
                let item = cc.instantiate(loadedResource);
                resIndex++;
                self.showRaid.addChild(item);
                self._showRaid.push(item.getComponent('raidItem'));
                //index,raidName,parent,img,des
                cc.sys.localStorage.removeItem("roomIdAndIdx");
                self._showRaid[resIndex-1].initData(resIndex,raidId,resIndex,raidType.Name,self);
                //roomId,raidId,idx,raidName,parent,img,des
                //heroid,heroName,heroIcon,parents
                //还需要添加卡牌图，描述字段
            }
        })
    },


    





   
    onLoad () {},

    start () {

    },

    // update (dt) {},
});
