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
       _bufflist : []
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start () {
        
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
    freshenBuff(data){
        for(var i=0;i<data.length;i++)
        {
            var buff = dataMgr.buff[data[i].id];
            if(buff.IsHide != 1)
            {
                this.showbuff(buff.Image);
            }
        }
    },
    showbuff(image){
        if(this._bufflist == null)
        {
            this._bufflist = new Array();

            for(var i=0;i<this.bufflist.children.length;i++)
            {
                this._bufflist.push(this.bufflist.children[i].getComponent('buffItem'));
            }
        }

        for(var i =0;i<this._bufflist.length;i++)
        {
            if(!this._bufflist[i].node.active)
            {
                this._bufflist[i].show();
                this._bufflist[i].fresh(image);
            }
        }
    }
});
