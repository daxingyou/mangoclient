var uibase = require('UIBase')
var constant = require('constants')
var dataMgr = require('DataMgr')
var dataMgr = require('DataMgr')
var raidEnterRoomProto = require('raidEnterRoomProto')
var dataCenter = require('DataCenter')
var net = require('NetPomelo')
var soloRaidData = require('soloRaidData')

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
        dataCenter.userName = heroData.HeroName;

        let raidsInfo = dataCenter.allInfo.raidsInfo.raids;//已经存在副本信息
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
                    else if (state  == 2) {
                        net.Request(new raidEnterRoomProto(soloRaidData.raidId,raidInfo.rooms.length), (data) => {
                            cc.log("进副本加载状态",data);
                        });
                    }
                    else if (state == 3) {
                         cc.log("加载前倒计时");
                         net.Request(new raidEnterRoomProto(soloRaidData.raidId,raidInfo.rooms.length), (data) => {
                             cc.log("进副本加载状态",data);
                         });
                    }
                }
            }
        }
    },
    
    //加载关卡，商店，奖励
    loadRaid (selectList) {
        cc.log("可选关卡商店奖励",selectList);
        var self = this;
        var resIndex = 0;
        let raidIdx = 0;
        let raidType = null;
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
                //roomId,raidId,idx,raidName,parent,img,des
                self._showRaid[resIndex-1].initData(self.roomId,soloRaidData.raidId,resIndex,raidType.Name,raidType.Icon,raidType.Desc,self);
        //         ID: 3,
		// Name: '怨鬼',
		// SceneID: 1,
		// MonsterGroupID: 4,
		// WinMode: 0,
		// TimeLimit: 180,
		// Icon: 'attack',
		// Desc: '河洞战斗3描述。
            }
        })
    },

    backMainUI () {
        cc.log("返回单人副本");
        this._uimgr.release();
        this._uimgr.loadUI(constant.UI.RaidUI,function(data) {
        });
    },
    
    onLoad () {
        this._uimgr = cc.find('Canvas').getComponent('UIMgr');
    },

    start () {

    },

    // update (dt) {},
});
