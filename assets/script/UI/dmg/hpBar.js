var uibase = require('UIBase')
var dataMgr = require('DataMgr')
var combatmgr = require('CombatMgr')


cc.Class({
    extends: uibase,

    properties: {
       text : cc.Label,
       armor : cc.Label,
       bar : cc.ProgressBar,
       bufflist : cc.Node,
       _bufflist : [],
       buffItem: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._buffItems = [];
    },

    start () {
        
    },

    getValidBuffItem: function () {
        for (var item of this._buffItems) {
            if (!item.active)
                return item;
        }
        if (this._buffItems.length >= 10) 
            return null;
        var item = cc.instantiate(this.buffItem);
        item.parent = this.bufflist;
        this._buffItems.push(item);
        return item;
    },

    deActiveBuffItems: function () {
        if(this._buffItems != undefined)
        {
            for (var item of this._buffItems) {
                item.active = false;
            }
        }
    },

    // update (dt) {},

    freshen(cur,max,curArmo){
        this.text.string = cur.toString() + '/'+ max.toString();//hp
        if(curArmo > 999)
            curArmo = 999;
        this.armor.string = curArmo.toString();
        this.armor.fontSize = 13;
        if(this.armor.string.length >= 3 ){
            this.armor.fontSize= 10;
        }

        this.bar.progress = cur / max;
    },

    freshenBuff(buffs){
        this.deActiveBuffItems();
        for (var realID in buffs) {
            var buff = buffs[realID];
            if (buff.isHide())
                continue;
            var image = buff.data.Image;
            var id = buff.data.ID;
            for (var _ in buff.info.cells) {
                var item = this.getValidBuffItem();
                if (!item)
                    break;
                item.active = true;
                item.getComponent('buffItem').fresh(image,id);
            }
        }
    }
});
