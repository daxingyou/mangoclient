/*
 * @Author: liuguolai 
 * @Date: 2018-12-11 15:01:45 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-12-11 17:43:47
 * 战斗加载界面
 */
let UIBase = require('UIBase');
let combatMgr = require('CombatMgr');
let playerData = require('playerData');

let MAX_TEAM_MEMBER = 4;
cc.Class({
    extends: UIBase,

    properties: {
        oddPosLeft: cc.Node,
        oddPosRight: cc.Node,
        evenPosLeft: cc.Node,
        evenPosRight: cc.Node,

        itemPrefab: cc.Node,

        dui: cc.Sprite,
        zhan: cc.Sprite,
        light: cc.Sprite,
        spark: cc.Sprite
    },

    onLoad() {
        let teamInfo = combatMgr.teamInfo;
        let myTeam, otherTeam, teamA = teamInfo.teamA, teamB = teamInfo.teamB;
        for (let memberInfo of teamA) {
            if (memberInfo.uid === playerData.id) {
                myTeam = teamA;
                otherTeam = teamB;
                break;
            }
        }
        if (!myTeam) {
            myTeam = teamB;
            otherTeam = teamA;
        }
        this._loadMyTeam(myTeam);
        this._loadOtherTeam(otherTeam);
    },

    _getOddStartPos(isLeft) {
        if (isLeft) {
            return this.oddPosLeft.position;
        }
        return this.oddPosRight;
    },

    _getEvenStartPos(isLeft) {
        if (isLeft) {
            return this.evenPosLeft.position;
        }
        return this.evenPosRight.position;
    },

    _getPosList(num, isLeft) {
        let startPos, posList = [], itemLen = this.itemPrefab.getContentSize().width;
        if (num % 2 === 1) {  // 奇数
            startPos = this._getOddStartPos(isLeft);
            posList.push(startPos);
            for (let i = 1; i < Math.ceil(num / 2); i++) {
                posList.push(new cc.Vec2(startPos.x - itemLen * i, startPos.y));
                posList.push(new cc.Vec2(startPos.x + itemLen * i, startPos.y));
            }
        }
        else {
            startPos = this._getEvenStartPos(isLeft);
            posList.push(startPos);
            posList.push(new cc.Vec2(startPos.x + itemLen, startPos.y));
            for (let i = 1; i < Math.ceil(num / 2); i++) {
                posList.push(new cc.Vec2(startPos.x - itemLen * i, startPos.y));
                posList.push(new cc.Vec2(startPos.x + itemLen * (i + 1), startPos.y));
            }
        }
        if (isLeft) {
            posList.sort(function (a, b) {
                return b.x - a.x;
            })
        }
        else {
            posList.sort(function (a, b) {
                return a.x - b.x;
            })
        }
        return posList;
    },

    _loadMyTeam(infos) {
        let num = Math.min(infos.length, MAX_TEAM_MEMBER);
        let posList = this._getPosList(num, true);
        for (let i = 0; i < num; i++) {
            let item = cc.instantiate(this.itemPrefab);
            item.active = true;
            item.position = posList[i];
            item.parent = this.node;
            item.getComponent('combatLoadingItem').initData(infos[i], true);
        }
    },

    _loadOtherTeam(infos) {
        let num = Math.min(infos.length, MAX_TEAM_MEMBER);
        let posList = this._getPosList(num, false);
        for (let i = 0; i < num; i++) {
            let item = cc.instantiate(this.itemPrefab);
            item.active = true;
            item.position = posList[i];
            item.parent = this.node;
            item.getComponent('combatLoadingItem').initData(infos[i], false);
        }
    },

    init() {

    },
});
