var uibase = require('UIBase')
var constant = require('constants')
var net = require('NetPomelo')
var dataMgr = require('DataMgr')
var teamRaidSelectRoomProto = require('teamRaidSelectRoomProto')
var teamRaidIgnoreGetCardProto = require('teamRaidIgnoreGetCardProto')
var eventMgr = require('eventMgr')
let playerData = require('playerData');
let raidTpl = require('Raid');

cc.Class({
    extends: uibase,

    properties: {
        teamer0: cc.Node,
        teamer1: cc.Node,
        teamer2: cc.Node,
        teamer3: cc.Node,
        heroIconAtlas: cc.SpriteAtlas,
        cdTime: 30,
        _CDState: false,
        countDown: cc.Node,
        showRaid: cc.Node,
        _showRaid: [],
        raidName: cc.Label,
        showCard: cc.Node,
    },

    initData(data) {
        cc.log("队伍信息", data);
        this.raidName.string = raidTpl[playerData.raidData.teamRaid.raidID].Name;
        this._CDState = true;
        this.cdTime = 30;
        this.countDown.active = true;
        for (let i = 0; i < data.length; i++) {
            let itemData = data[i];
            this["teamer" + i].active = true;
            let heroData = dataMgr.hero[itemData.heroid];
            let heroIcon = heroData.HeroIcon;
            let heroName = this["teamer" + i].getChildByName("heroName");
            heroName.getComponent(cc.Label).string = heroData.HeroName;
            let icon = this["teamer" + i].getChildByName("heroImg");
            icon.getComponent(cc.Sprite).spriteFrame = this.heroIconAtlas.getSpriteFrame(heroIcon);
        }
    },

    //加载关卡，商店，奖励
    loadRaid(selectList) {
        // cc.log("可选关卡商店奖励",selectList);
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
                self._showRaid[resIndex - 1].initData(null, null, resIndex, raidType.Name, raidType.Icon, raidType.Desc, self);
                //roomId,raidId,idx,raidName,parent,img,des
                //heroid,heroName,heroIcon,parents
                //还需要添加卡牌图，描述字段
            }
        })
    },

    onLoad() {
        let teamRaid = playerData.raidData.teamRaid;
        this.initData(teamRaid.teamInfo);

        // //奖励卡牌
        // if (teamRaidData.cardsList != null) {
        //     this.teamerSelectAward(teamRaidData.cardsList);
        // }
    },

    //选择奖励卡牌
    teamerSelectAward(cardsList) {
        cc.log("cardsList", cardsList);
        if (cardsList == null)
            return;
        var self = this;
        self.showCard.active = true;
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
                item.getComponent('awardCardItem').initData(itemData, self, 2);
                if (resIndex == cardsList.length) {
                    cc.loader.release('UI/teamRaid/awardCardItem');
                }

            }
        });
    },

    //选择完关闭
    selectCardEnd() {
        this.showCard.active = false;
        this._CDState = true;
        this.cdTime = 30;
    },

    //跳过卡牌奖励
    ingoreAwardCard() {
        net.Request(new teamRaidIgnoreGetCardProto(), (data) => {
            cc.log("跳过卡牌奖励", data);
        });
        this.showCard.active = false;
    },

    onDestroy() {
    },

    update(dt) {
        if (this._CDState) {
            this.cdTime -= dt;
            var temp = Math.floor(this.cdTime);
            if (temp == 0) {
                this._CDState = false;
            }
            if (this.countDown == undefined)
                return;

            this.countDown.getComponent(cc.Label).string = "剩余" + temp + "秒";
        }
    },
});
