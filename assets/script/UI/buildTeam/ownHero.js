let heroTpl = require('Hero');
let eventMgr = require('eventMgr');
let playerData = require('playerData');

cc.Class({
    extends: cc.Component,

    properties: {
        heroIconAtlas: cc.SpriteAtlas,
        heroImg: cc.Sprite,
        heroName: cc.Label,
        tips: cc.Node,
    },

    initData(heroid, parent) {
        this._heroid = heroid;
        this._parent = parent;
        this._selectByUid = null;  // 被谁选中

        let heroConfig = heroTpl[heroid];
        this.heroName.string = heroConfig.HeroName;
        this.heroImg.spriteFrame = this.heroIconAtlas.getSpriteFrame(heroConfig.HeroIcon);
        this.setSelected(false);
    },
    setSelected(bSelected) {
        this._bSelected = bSelected;
        this.tips.active = bSelected;
    },
    isSelected() {
        return this._selectByUid !== null;
    },
    getHeroid() {
        return this._heroid;
    },

    setDisable(bDisable) {
        if (bDisable) {
            this.heroImg._sgNode.setState(1);
        }
        else {
            this.heroImg._sgNode.setState(0);
        }
    },

    _onTeamerSelectHero(uid, heroid) {
        if (heroid == this._heroid) {
            // 自己选的不变灰
            if (uid !== playerData.id) {
                this._selectByUid = uid;
                this.setDisable(true);
            }
            else {
                this.setSelected(true);
                this._parent.setSelectedHero(this);
            }
        }
        else if (this._selectByUid == uid) {
            this._selectByUid = null;
            this.setDisable(false);
        }
    },

    _onHeroSelectDone(data) {
        if (this._selectByUid)
            return;
        for (let uid in data) {
            this._onTeamerSelectHero(uid, data[uid]);
        }
    },

    onLoad() {
        eventMgr.on(eventMgr.events.EventTeamerSelectHero, this._onTeamerSelectHero, this);
        eventMgr.on(eventMgr.events.EventHeroSelectDone, this._onHeroSelectDone, this);
    },

    onDestroy() {
        eventMgr.off(eventMgr.events.EventTeamerSelectHero, this._onTeamerSelectHero);
        eventMgr.off(eventMgr.events.EventHeroSelectDone, this._onHeroSelectDone);
    }
});
