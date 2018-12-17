/*
 * @Author: liuguolai 
 * @Date: 2018-12-11 15:14:52 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-12-14 20:39:43
 * 战斗加载对象
 */
let heroTpl = require('Hero');
let monsterTpl = require('Monster');
let loadRes = require('LoadRes');
let eventMgr = require('eventMgr');
let combatMgr = require('CombatMgr');

cc.Class({
    extends: cc.Component,

    properties: {
        portrait: cc.Sprite,
        heroName: cc.Label,
        playerName: cc.Label,
        progress: cc.Label
    },

    initData(data, isLeft) {
        this._uid = data.uid;
        let portrait, name;;
        if (data.heroid) {
            portrait = heroTpl[data.heroid].Portrait;
            name = heroTpl[data.heroid].HeroName;
            this.updateProgress(combatMgr.getLoadProgress(this._uid));
            this.playerName.string = data.name;
        }
        else {
            portrait = monsterTpl[data.monsterid].Portrait;
            name = monsterTpl[data.monsterid].Name;
            this.progress.node.active = false;
            this.playerName.string = name;
        }
        this.heroName.string = name;
        let self = this;
        loadRes.loadSprite('portrait/' + portrait, false, function (spriteFrame) {
            self.portrait.spriteFrame = spriteFrame;
        });
        if (!isLeft) {
            this.portrait.node.scaleX = -1;
        }
    },

    updateProgress(progress) {
        if (this._progress >= progress)
            return;
        this.progress.string = progress + '%';
    },

    _onLoadProgressUpdate(uid, progress) {
        if (uid === this._uid) {
            this.updateProgress(progress)
        }
    },

    onLoad() {
        this._progress = -1;
        eventMgr.on(eventMgr.events.EventCombatLoadProgress, this._onLoadProgressUpdate, this);
    },

    onDestroy() {
        eventMgr.off(eventMgr.events.EventCombatLoadProgress, this._onLoadProgressUpdate);
    }
});
