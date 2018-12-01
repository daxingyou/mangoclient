/*
 * @Author: liuguolai 
 * @Date: 2018-11-28 14:29:26 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-11-29 09:49:04
 */
let combatMgr = require('CombatMgr')

cc.Class({
    extends: cc.Component,

    properties: {
        comboLabel: cc.Label,
        lianjiLabel: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this._curCombo = -1;
    },

    refresh () {
        let combo = combatMgr.getSelf().combo;
        if (this._curCombo == combo)
            return;
        this._curCombo = combo;
        if (combo <= 0) {
            this.comboLabel.node.active = false;
            this.lianjiLabel.node.active = false;
            return;
        }
        this.comboLabel.node.active = true;
        this.lianjiLabel.node.active = true;
        this.comboLabel.string = combo;
        let scale, color;
        if (combo < 25) {
            scale = 1;
            color = new cc.Color(255, 255, 255, 255);
        }
        else if (combo < 50) {
            scale = 1.1;
            color = new cc.Color(255, 255, 0, 255);
        }
        else if (combo < 75) {
            scale = 1.2;
            color = new cc.Color(255, 155, 0, 255);
        }
        else {
            scale = 1.3;
            color = new cc.Color(255, 0, 0, 255);
        }
        this.node.scale = scale;
        this.comboLabel.node.color = color;
        this.lianjiLabel.node.color = color;
    }
});
