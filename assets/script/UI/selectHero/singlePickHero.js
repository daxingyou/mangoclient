/*
 * @Author: liuguolai 
 * @Date: 2018-12-14 19:30:32 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-12-14 20:03:48
 */

var uibase = require('UIBase')
var net = require('NetPomelo')
var consts = require('consts')
var dataMgr = require('DataMgr')
var playerData = require('playerData')
let loadRes = require('LoadRes');
let constTpl = require('Constant');
let eventMgr = require('eventMgr');
let constants = require('constants');

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
        confirmBtn: cc.Button,
        ownHeroPrefab: cc.Prefab,
        pileBtn: cc.Button,
        treasureBtn: cc.Button
    },

    onLoad() {
        let self = this;
        this._super();
        this.addCommonBackBtn('xxx', function () {
            self._uiMgr.loadUI(constants.UI.RaidUI);
        });
        this._heroid = 0;
        this._curSelected = null;
        this._curModel = null;
        this._confirm = false; // 已经确认
        let ownHeros = playerData.heroData.ownHeros;
        for (let heroid in ownHeros) {
            let item = cc.instantiate(this.ownHeroPrefab);
            self.showOwnHero.addChild(item);
            item.getComponent('ownHero').initData(heroid, this);
            item.on('click', self.selectHero, self);
        }
        this.showSelect.active = false;
        this.pileBtn.node.active = false;
        this.treasureBtn.node.active = false;
    },

    initData(raidID) {
        this._raidID = raidID;
    },

    _setSelectedHero(selectedComp) {
        if (this._curSelected) {
            this._curSelected.setSelected(false);
        }
        this._curSelected = selectedComp;
        this._curSelected.setSelected(true);

        this.showSelect.active = true;
        this.pileBtn.node.active = true;
        this.treasureBtn.node.active = true;
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
        this._setSelectedHero(selected);
    },

    //确认英雄
    comfirmHero() {
        if (!this._heroid)
            return;
        let heroid = this._heroid;
        playerData.raidData.singleRaidSelectHero(this._raidID, heroid);
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
