var uibase = require('UIBase')
var net = require('NetPomelo')
var consts = require('consts')
var dataMgr = require('DataMgr')
var playerData = require('playerData')
let loadRes = require('LoadRes');
let constTpl = require('Constant');
let eventMgr = require('eventMgr');

cc.Class({
    extends: uibase,

    properties: {
        showSelect: cc.Node,
        comfirmCount: cc.Label,
        showOwnHero: cc.Node,
        heroIconAtlas: cc.SpriteAtlas,
        _CDState: false,

        heroName: cc.Label,
        modelPos: cc.Node,
        teamer: cc.Node,
        confirmBtn: cc.Button,
        ownHeroPrefab: cc.Prefab,
    },

    onLoad() {
        this._super();
        this._heroid = 0;
        this._curSelected = null;
        this._curModel = null;
        this._confirm = false; // 已经确认
        let self = this;
        let ownHeros = playerData.heroData.ownHeros;
        for (let heroid in ownHeros) {
            let item = cc.instantiate(this.ownHeroPrefab);
            self.showOwnHero.addChild(item);
            item.getComponent('ownHero').initData(heroid, this);
            item.on('click', self.selectHero, self);
        }
        this.showSelect.active = false;

        eventMgr.on(eventMgr.events.EventHeroSelectDone, this._onHeroSelectDone, this);
    },

    onDestroy() {
        eventMgr.off(eventMgr.events.EventHeroSelectDone, this._onHeroSelectDone);
    },

    _onHeroSelectDone() {
        this.cdTime = constTpl.ReadyStartTimer;
        this._CDState = true;
    },

    initData(teamA, teamB, teamType, unconfirm) {
        this._teamType = teamType;
        if (this._teamType === consts.Team.TYPE_LADDER ||
            this._teamType === consts.Team.TYPE_PRACTICE) {
            this.cdTime = constTpl.ReadyTimer;
            this._CDState = true;
        }
        else if (this._teamType === consts.Team.TYPE_RAID) {
            this.cdTime = 60;
            this._CDState = true;
        }
        let team;
        for (let i = 0; i < teamA.length; i++) {
            if (teamA[i].uid == playerData.id) {
                team = teamA;
                break;
            }
        }
        if (!team) {
            team = teamB;
        }
        // 更新未确认（重连）
        if (unconfirm) {
            if (unconfirm.indexOf(playerData.id) === -1) {
                this.setConfirmed();
            }
            for (let member of team) {
                if (unconfirm.indexOf(member.uid) !== -1)
                    member.unconfirm = 1;
            }
        }
        this.initTeam(team);
    },

    initDataByReconnect(teamA, teamB, teamType, unconfirm, leftTime) {
        this.initData(teamA, teamB, teamType, unconfirm);
        this.cdTime = Math.floor(leftTime / 1000);
    },

    _getPosList(num) {
        let startPos = this.teamer.position, posList = [],
            itemHeight = this.teamer.getContentSize().height;
        if (num % 2 === 1) {  // 奇数
            startPos = new cc.Vec2(startPos.x, startPos.y - itemHeight / 2);
            posList.push(startPos);
            for (let i = 1; i < Math.ceil(num / 2); i++) {
                posList.push(new cc.Vec2(startPos.x, startPos.y + itemHeight * i));
                posList.push(new cc.Vec2(startPos.x, startPos.y - itemHeight * i));
            }
        }
        else {
            posList.push(startPos);
            posList.push(new cc.Vec2(startPos.x, startPos.y - itemHeight));
            for (let i = 1; i < Math.ceil(num / 2); i++) {
                posList.push(new cc.Vec2(startPos.x, startPos.y + itemHeight * i));
                posList.push(new cc.Vec2(startPos.x, startPos.y - itemHeight * (i + 1)));
            }
        }
        posList.sort(function (a, b) {
            return b.y - a.y;
        });
        return posList;
    },

    initTeam(team) {
        let teamNum = team.length;
        let posList = this._getPosList(teamNum), parent = this.teamer.parent;
        for (let i = 0; i < teamNum; i++) {
            let item = cc.instantiate(this.teamer);
            item.active = true;
            item.position = posList[i];
            item.parent = parent;
            item.getComponent('selectedTeamer').initData(team[i]);
        }
    },

    _setSelectedHero(selectedComp) {
        if (this._curSelected) {
            this._curSelected.setSelected(false);
        }
        this._curSelected = selectedComp;
        this._curSelected.setSelected(true);

        this.showSelect.active = true;
        let heroid = this._curSelected.getHeroid();
        this._heroid = heroid;
        let heroConfig = dataMgr.hero[heroid];
        this.heroName.string = heroConfig.HeroName;
        // 英雄模型
        loadRes.load(heroConfig.HeroModel, false, (res) => {
            let go = cc.instantiate(res);
            go.parent = this.modelPos;
            go.position = cc.Vec2.ZERO;
            go.scale = 2;
            if (this._curModel) {
                this._curModel.destroy();
            }
            this._curModel = go;
        })
        eventMgr.emit(eventMgr.events.EventTeamerSelectHero, playerData.id, heroid);
    },

    // 英雄头像回调接口
    setSelectedHero(selectedComp) {
        if (this._curSelected === selectedComp)
            return;
        this._setSelectedHero(selectedComp);
    },

    //自己选择得英雄
    selectHero(event) {
        if (this._confirm)
            return;
        let btn = event.detail;
        let selected = btn.getComponent('ownHero');
        if (this._curSelected === selected)
            return;
        if (selected.isSelected())
            return;
        let heroid = selected.getHeroid();
        if (this._teamType === consts.Team.TYPE_LADDER ||
            this._teamType === consts.Team.TYPE_PRACTICE) {
            net.requestWithCallback('selectHeroProto', heroid, (data) => {
                cc.log("4v4组队选择英雄", data);
                let code = data.code;
                if (code === consts.SelectHeroCode.OK) {
                    this._setSelectedHero(selected);
                }
            })
        }
        else if (this._teamType === consts.Team.TYPE_RAID) {//副本
            net.requestWithCallback('teamRaidSelectHeroProto', heroid, (data) => {
                cc.log("组队副本选择英雄", data);
                let code = data.code;
                if (code === consts.SelectHeroCode.OK) {
                    this._setSelectedHero(selected);
                }
            });
        }
        // fightData.userName = heroData.HeroName;
    },

    //确认英雄
    comfirmHero() {
        if (!this._heroid)
            return;
        let heroid = this._heroid;
        if (this._teamType === consts.Team.TYPE_LADDER ||
            this._teamType === consts.Team.TYPE_PRACTICE) {
            net.requestWithCallback('confirmHeroProto', heroid, (data) => {
                cc.log("4v4组队确认英雄", data);
                if (data.code === consts.Code.OK) {
                    this.setConfirmed();
                    eventMgr.emit(eventMgr.events.EventTeamerConfirmHero, playerData.id, heroid);
                }
            });
        }
        else if (this._teamType === consts.Team.TYPE_RAID) {
            net.requestWithCallback('teamRaidConfirmHeroProto', heroid, (data) => {
                cc.log("组队副本确认英雄", data);
                if (data.code === consts.Code.OK) {
                    this.setConfirmed();
                    eventMgr.emit(eventMgr.events.EventTeamerConfirmHero, playerData.id, heroid);
                }
            });
        }
    },

    setConfirmed() {
        this._confirm = true;
        this.confirmBtn.interactable = false;
        let children = this.confirmBtn.node.children;
        for (let i = 0; i < children.length; i++) {
            if (children[i].getComponent(cc.Sprite))
                children[i].getComponent(cc.Sprite)._sgNode.setState(1);
        }
    },

    pickHeroAtt(event, cust) {
        cc.log("选择英雄属性");
        let index = parseInt(cust);
        this.heroAttribute = index;
    },

    enterCardGroup() {

    },

    enterTreasure() {

    },

    update(dt) {
        if (this._CDState) {
            this.cdTime -= dt;
            var temp = Math.max(Math.floor(this.cdTime), 0);
            if (temp == 0) {
                this._CDState = false;
            }
            this.comfirmCount.string = temp;
        }
    },
});
