const constant = require('constants')
var combatMgr = require('CombatMgr')
var utility = require('utility')
var effectMgr = require('EffectMgr')
var EventEmitter = require('events').EventEmitter;
let eventMgr = require('eventMgr');
let formula = require('formula');

var SpawnSummoned = {
    // summoneds: [],
    summonedAs: {},
    summonedBs: {},
    index: 0,
    type2Nums: {},
    // 数据
    seed: 0,
    groupA: {},  // A组数据
    groupB: {},  // B组数据
    event: new EventEmitter(),

    init: function (data) {
        this.seed = data.seed % 233280;
        this.groupA = {}, this.groupB = {}, this.summonedAs = {}, this.summonedBs = {};
        setTimeout(() => {
            for (let type in data.groupA) {
                this.groupA[type] = {};
                let typeInfo = data.groupA[type];
                for (let area in typeInfo) {
                    let num = typeInfo[area];
                    this._createSummons('groupA', type, area, num);
                    this.groupA[type][area] = num;
                }
            }
            for (let type in data.groupB) {
                this.groupB[type] = {};
                let typeInfo = data.groupB[type];
                for (let area in typeInfo) {
                    let num = typeInfo[area];
                    this._createSummons('groupB', type, area, num);
                    this.groupB[type][area] = num;
                }
            }
        }, 1000);
    },

    _getSummons: function (groupId, opposite = false) {
        let summons = null;
        if (groupId === 'groupA') {
            if (opposite) {
                summons = this.summonedBs;
            }
            else {
                summons = this.summonedAs
            }
        }
        else {
            if (opposite) {
                summons = this.summonedAs;
            }
            else {
                summons = this.summonedBs
            }
        }
        return summons;
    },

    _getSummonsByType: function (groupId, type, area, opposite = false) {
        let summons = this._getSummons(groupId, opposite);
        if (!summons.hasOwnProperty(type)) {
            summons[type] = {};
        }
        if (area) {
            if (!(area in summons[type])) {
                summons[type][area] = [];
            }
            return summons[type][area];
        }
        return summons[type];
    },

    _clearSummonsByType: function (groupId, type, opposite = false) {
        let summons = this._getSummons(groupId, opposite);
        delete summons[type];
    },

    _getGroup: function (groupId, opposite = false) {
        if (groupId === 'groupA') {
            if (opposite)
                return this.groupB;
            return this.groupA;
        }
        else {
            if (opposite)
                return this.groupA;
            return this.groupB;
        }
    },

    onAddSpawnSummon: function (data) {
        let groupId = data.groupId, type = data.type, addList = data.addList;
        let group = this._getGroup(groupId);
        if (!(type in group)) {
            group[type] = {};
        }
        for (let info of addList) {
            let area = info.area, num = info.num;
            this._createSummons(groupId, type, area, num);
            group[type][area] = (group[type][area] || 0) + num;
        }
        eventMgr.emit(eventMgr.events.EventSpawnSummonChanged);
    },

    onRemoveSpawnSummon: function (data) {
        let groupId = data.groupId, type = data.type, removeList = data.removeList;
        let group = this._getGroup(groupId);
        for (let info of removeList) {
            let area = info.area, num = info.num;
            group[type][area] -= num;
            if (group[type][area] === 0)
                delete group[type][area];
            this._removeSummons(groupId, type, area, num);
        }
    },

    onClearSpawnSummon: function (data) {
        let groupId = data.groupId, type = data.type;
        let group = this._getGroup(groupId);
        group[type] = {};
        this._releaseSummonsByType(groupId, type);
    },

    _getRandomPoint: function (range) {
        if (range.x3) {
            // 四边形
            let p1 = cc.v2(range.x1, range.y1),
                p2 = cc.v2(range.x2, range.y2),
                p3 = cc.v2(range.x3, range.y3),
                p4 = cc.v2(range.x4, range.y4);
            let area1 = formula.triangleArea(p1, p3, p2),
                area2 = formula.triangleArea(p1, p4, p3);
            let randVal = Math.seededRandom() * (area1 + area2), A, B, C;
            if (randVal > area1) {
                A = p1;
                B = p3; 
                C = p2;
            }
            else {
                A = p1;
                B = p4; 
                C = p3;
            }
            // P = (1 - sqrt(r1)) * A + sqrt(r1) * (1 - r2) * B + sqrt(r1) * r2 * C
            let r1 = Math.seededRandom(), r2 = Math.seededRandom(), sr1 = Math.sqrt(r1);
            let a = 1 - sr1, b = sr1 * (1 - r2), c = sr1 * r2;
            let x = a * A.x + b * B.x + c * C.x;
            let y = a * A.y + b * B.y + c * C.y;
            return cc.v2(x, y);
        }
        else {
            let x = Math.seededRandomInt(range.x1, range.x2);
            let y = Math.seededRandomInt(range.y1, range.y2);
            return cc.v2(x, y);
        }
    },

    _createSummons: function (groupId, type, area, num) {
        let range = null, bLeft = false;
        if (combatMgr.getSelf().groupId == groupId) {
            // 左
            range = combatMgr.curCombat.matrix['Range' + area];
            bLeft = true;
        }
        else {
            // 右
            range = combatMgr.curCombat.monsterMatrix['Range' + area];
        }
        let curNum = this.getSummonNum(type);
        let summons = this._getSummonsByType(groupId, type, area);
        while (num--) {
            Math.seed = this.seed - curNum * 7;
            let point = this._getRandomPoint(range);
            curNum++;
            if (type == constant.SummonedType.wSword) {
                if (bLeft) {
                    effectMgr.geBezierEffect('chenjinchou', new cc.Vec2(370, 310), point, 5, 'wsword_bounce', 1, () => {
                        var effect = effectMgr.getWswordEffect('sword', point, 0);
                        summons.push(effect);
                    });
                }
                else {
                    effectMgr.geBezierEffect('chenjinchou', new cc.Vec2(1100, 310), point, 5, 'wsword_bounce', 0, () => {
                        var effect = effectMgr.getWswordEffect('sword', point, 0);
                        summons.push(effect);
                    });
                }
            }
        }
    },

    // 移除召唤物
    _removeSummons: function (groupId, type, area, num) {
        let summons = this._getSummonsByType(groupId, type, area);
        for (let i = 0; i < num; i++) {
            this._recycleSummonItem(type, summons[i]);
        }
        summons.splice(0, num);
    },

    onReverse: function (data) {
        let casterID = data.caster, sid = data.sid, type = data.type, damageInfo = data.damageInfo;
        let caster = combatMgr.getEntity(casterID);
        let summons = this._getSummonsByType(caster.groupId, type, null, true);
        let summonsList = [];
        for (let area in summons) {
            summonsList = summonsList.concat(summons[area]);
        }
        let group = this._getGroup(caster.groupId, true);
        group[type] = {};
        let idx = 0;
        if (summonsList.length > 0) {
            summonsList[idx++].showCollect(function () {
                for (let uid in damageInfo) {
                    let beDamageEnt = combatMgr.getEntity(uid);
                    beDamageEnt.onSpawnSummonDamage(damageInfo[uid], casterID);
                }
                // 回收
                for (let i = 1; i < summonsList.length; i++) {
                    this._recycleSummonItem(type, summonsList[i]);
                }
            }.bind(this));
            for (let i = 1; i < summonsList.length; i++) {
                summonsList[i].showCollect();
            }
        }
        this._clearSummonsByType(caster.groupId, type, true);
        eventMgr.emit(eventMgr.events.EventSpawnSummonChanged);
    },

    _getOppositeGroupId: function (groupId) {
        if (groupId === 'groupA')
            return 'groupB';
        return 'groupA';
    },

    _getTeamId: function (groupId) {
        if (groupId === combatMgr.getSelf().groupId) {
            return constant.Team.own
        }
        return constant.Team.enemy;
    },

    onSwordWheel: function (data) {
        let casterID = data.caster, sid = data.sid, type = data.type,
            damageInfo = data.damageInfo, summons = data.summons;
        let caster = combatMgr.getEntity(casterID), groupId = this._getOppositeGroupId(caster.groupId);
        for (let uid in damageInfo) {
            let beDamageEnt = combatMgr.getEntity(uid);
            beDamageEnt.onSpawnSummonDamage(damageInfo[uid], casterID);
        }
        // 清数据
        let group = this._getGroup(groupId);
        group[type] = {};
        this._clearSummonsByType(groupId, type);

        for (let area in summons) {
            this._createSummons(groupId, type, area, summons[area]);
        }
        eventMgr.emit(eventMgr.events.EventSpawnSummonChanged);
    },
    collectItem(target, type) {
        let summonsByGroup = this._getSummons(target.groupId);
        if (summonsByGroup.hasOwnProperty(type)) {
            let summonsByType = summonsByGroup[type];
            for (let area in summonsByType) {
                let items = summonsByType[area];
                if (items.length === 0)
                    continue;
                let idx = Math.floor(Math.random() * items.length);
                this._recycleSummonItem(type, items[idx]);
                items.splice(idx, 1);
                return;
            }
        }
    },
    collectAll(target, type) {
        this._releaseSummonsByType(target.groupId, type);
    },
    _recycleWSwordItem(item) {
        if (item.node.position.y >= 300) {
            effectMgr.putEffect('swordf', item);
        }
        else {
            effectMgr.putEffect('swordb', item);
        }
    },
    // 回收召唤物
    _recycleSummonItem(type, item) {
        switch (type) {
            case constant.SummonedType.wSword:
                this._recycleWSwordItem(item);
                break;
        }
    },
    _releaseSummonsByType(groupId, type) {
        let summonsByGroup = this._getSummons(groupId);
        this._releaseGroupSummnosByType(summonsByGroup, type);
    },
    _releaseGroupSummnosByType(summonsByGroup, type) {
        if (summonsByGroup.hasOwnProperty(type)) {
            let summonsByType = summonsByGroup[type];
            for (let area in summonsByType) {
                let items = summonsByType[area];
                for (let item of items) {
                    this._recycleSummonItem(type, item);
                }
            }
            delete summonsByGroup[type];
        }
    },
    releaseSummons(groupId) {
        let summonsByGroup = this._getSummons(groupId);
        for (let type of Object.getOwnPropertyNames(summonsByGroup)) {
            this._releaseGroupSummnosByType(summonsByGroup, type);
        }
    },
    Release() {
        this.releaseSummons('groupA');
        this.releaseSummons('groupB');
        this.groupA = {};
        this.groupB = {};
    },
    getSummonNum(type) {
        // 获取的是敌方的
        let group = this._getGroup(combatMgr.curCombat.getSelf().groupId, true);
        var summons = group[type];
        if (!summons)
            return 0;
        var total = 0;
        for (var area in summons) {
            total += summons[area];
        }
        return total;
    }
}
module.exports = SpawnSummoned;