var EffectListen = require('EffectListen')
var utility = require('utility')

cc.Class({
    extends: EffectListen,

    properties: {
        dmg : cc.Label,
        speed : 1000,
        _alpha : 255,
        _uimgr : null,
        dmgColor : cc.color,
        healColor : cc.color,
    },

    start () {

    },

    update (dt) {
        this._alpha -= dt*this.speed;
        this.node.opacity  = this._alpha;

        if(this._alpha <= 0)
        {
            this.node.position = new cc.v2(0,-1000);
            this._active = false;
        }
    },

    showDmg(combatUnit,dmg,dmgorheal){
        this._alpha = 255;
        this.node.opacity  = this._alpha;
        this.dmg.string = dmg.toString();
        this.node.position = cc.v2(combatUnit.agent.go.position.x+100+utility.RandomInt(0,50),combatUnit.agent.go.position.y + 220+utility.RandomInt(0,50));

        if(dmgorheal)
            this.node.color = new cc.color(211,13,13);
        else
            this.node.color = new cc.color(13,211,61);
    }
});
