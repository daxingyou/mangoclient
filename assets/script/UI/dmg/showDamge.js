var EffectListen = require('EffectListen')
var utility = require('utility')
var constants = require('constants')

cc.Class({
    extends: EffectListen,

    properties: {
        dmg: cc.Label,
        speed: 1000,
        _alpha: 255,
        _uimgr: null,
        dmgColor: cc.color,
        healColor: cc.color,
        _showType: 0,
    },

    start() {

    },

    // update(dt) {
    //     this._alpha -= dt * this.speed;
    //     this.node.opacity = this._alpha;

    //     if (this._alpha <= 0) {
    //         this.node.position = new cc.v2(0, -1000);
    //         this._active = false;
    //     }
    // },
    
    _getParabola (startPoint, length, height, angle) {
        height = height || 0;
        angle = angle || 60;
        var radian = angle * Math.PI / 180;
        var q1x = startPoint.x + length / 4;
        var q1 = cc.v2(q1x, height + startPoint.y + Math.cos(radian) * length / 4);
        var q2x = startPoint.x + length / 2;
        var q2 = cc.v2(q2x, height + startPoint.y + Math.cos(radian) * length / 2);
        var endPoint = cc.v2(startPoint.x + length, startPoint.y);

        return [q1, q2, endPoint];
    },

    _showParabolaAction (reverse) {
        // 根据怪物做的，所以相反反而是对的
        var symbol = reverse ? 1 : -1;
        var orginScale = this.node.scale;
        var s1 = cc.scaleTo(0.1, 3 * orginScale);
        var s2 = cc.scaleTo(0.15, 0.8 * orginScale);
        var s3 = cc.scaleTo(0.5, 1.2 * orginScale);
        var s4 = cc.scaleTo(0.2, 1 * orginScale);
        var scaleAction = cc.sequence(s1, s2, s3, s4);
        var m1 = cc.moveBy(0.4, cc.v2(3 * symbol, 20));
        var m2 = cc.moveBy(0.15, cc.v2(1 * symbol, 3));
        var m3 = cc.moveBy(0.11, cc.v2(1 * symbol, -4));
        var m4 = cc.moveBy(0.1, cc.v2(1 * symbol, -5));
        var m5 = cc.moveBy(0.09, cc.v2(1 * symbol, -6));
        var m6 = cc.moveBy(0.08, cc.v2(1 * symbol, -7));
        var m7 = cc.moveBy(0.07, cc.v2(1 * symbol, -8));
        var m8 = cc.sequence(m3, m4, m5, m6, m7).easing(cc.easeQuadraticActionIn());
        var moveByAction = cc.sequence(m1, m2, m8);
        var fadeoutAction = cc.sequence(cc.delayTime(0.8), cc.fadeTo(0.3, 0.5));
        // var length = 150;
        // var parabolaAction = cc.bezierTo(
        //     1, this._getParabola(originPos, length, 0, 10)).easing(cc.easeExponentialOut());
        var cb = cc.callFunc(function () {
            this.node.position = cc.v2(0, -1000);
            this._active = false;
        }.bind(this));
        this.node.runAction(cc.sequence(cc.spawn(scaleAction, moveByAction, fadeoutAction), cb));
    },

    _showUpFadeOutAction () {
        var orginScale = this.node.scale;
        var s1 = cc.scaleTo(0.1, 3 * orginScale);
        var s2 = cc.scaleTo(0.15, 1 * orginScale);
        var a2 = cc.moveBy(0.5, cc.v2(0, 30));
        var a3 = cc.fadeOut(0.8);
        var cb = cc.callFunc(function () {
            this.node.position = cc.v2(0, -1000);
            this._active = false;
        }.bind(this));
        this.node.runAction(cc.sequence(s1, s2, a2, a3, cb));
    },

    _showCombatAction (showType, reverse, isCrit) {
        if (isCrit) 
            this.node.scale = 1.5;
        else 
            this.node.scale = 1;
        if (showType === constants.CombatWordType.CAUSE_DAMAGE) {
            this._showParabolaAction(reverse);
        }
        else if (showType === constants.CombatWordType.GET_DAMAGE) {
            this.node.scale = 0.9;
            this._showParabolaAction(reverse);
        }
        else if (showType === constants.CombatWordType.CAUSE_HEAL) {
            this._showUpFadeOutAction();
        }
        else if (showType === constants.CombatWordType.GET_HEAL) {
            this._showUpFadeOutAction();
        }
    },

    showDmg(combatUnit, dmg, dmgorheal, showType, isCrit) {
        this._showType = showType;
        var str = dmgorheal ? dmg.toString() : "+" + dmg.toString();
        this._alpha = 255;
        this.node.opacity = this._alpha;
        this.dmg.string = str;
        var hitPoint = combatUnit.table.HitPoint;
        var entPos = combatUnit.agent.go.position;
        entPos = this.node.parent.convertToNodeSpaceAR(entPos);
        var entScale = Math.abs(combatUnit.agent.go.scale);
        var originPos = cc.v2(
            entPos.x + hitPoint[0] * entScale + utility.RandomInt(0, 50), 
            entPos.y + hitPoint[1] * entScale + utility.RandomInt(0, 50));
        this.node.position = originPos;
        var reverse = combatUnit.agent.go.scale > 0 ? false : true;
        this._showCombatAction(showType, reverse, isCrit);
    }
});
