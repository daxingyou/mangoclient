/*
 * @Author: liuguolai 
 * @Date: 2018-12-12 17:47:28 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-12-14 10:39:53
 */
let heroTpl = require('Hero');
let eventMgr = require('eventMgr');

cc.Class({
    extends: cc.Component,

    properties: {
        heroIconAtlas: cc.SpriteAtlas,
        heroType: cc.Sprite,
        heroIcon: cc.Sprite,
        avatarName: cc.Label,
        confirm: cc.Sprite
    },

    initData(info) {
        this._uid = info.uid;
        cc.log(info);
        this._selected = false;
        this.heroIcon.node.active = false;
        this.confirm.node.active = false;
        this.avatarName.string = info.name;
        // 重连可能会有
        let heroid = info.heroid;
        if (heroid) {
            this.setHeroid(heroid);
            if (!info.unconfirm) {  // 已经确认
                this.setSelected();
            }
            // 这里做个事件分发，通知左边
            eventMgr.emit(eventMgr.events.EventTeamerSelectHero, info.uid, heroid);
        }
    },

    setSelected() {
        this.confirm.node.active = true;
        this._selected = true;
    },

    setHeroid(heroid) {
        let heroConfig = heroTpl[heroid];
        this.heroIcon.node.active = true;
        this.heroIcon.spriteFrame = this.heroIconAtlas.getSpriteFrame(heroConfig.HeroIcon);
    },

    _onTeamerSelectHero(uid, heroid) {
        if (uid == this._uid) {
            this.setHeroid(heroid);
        }
    },

    _onTeamerConfirmHero(uid, heroid) {
        if (uid == this._uid) {
            this.setSelected();
        }
    },

    _onHeroSelectDone(data) {
        if (this._selected)
            return;
        this.setHeroid(data[this._uid]);
        this.setSelected();
    },

    onLoad() {
        eventMgr.on(eventMgr.events.EventTeamerSelectHero, this._onTeamerSelectHero, this);
        eventMgr.on(eventMgr.events.EventTeamerConfirmHero, this._onTeamerConfirmHero, this);
        eventMgr.on(eventMgr.events.EventHeroSelectDone, this._onHeroSelectDone, this);
    },

    onDestroy() {
        eventMgr.off(eventMgr.events.EventTeamerSelectHero, this._onTeamerSelectHero);
        eventMgr.off(eventMgr.events.EventTeamerConfirmHero, this._onTeamerConfirmHero);
        eventMgr.off(eventMgr.events.EventHeroSelectDone, this._onHeroSelectDone);
    }
});
