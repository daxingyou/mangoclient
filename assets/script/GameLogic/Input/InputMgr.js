/**
 *      操作管理类
 *      先设定当前使用的卡组再设定目标
 *      by pwh
 */

var constant = require('constants')
var GameLogic = require('GameLogic')
var UIBase = require('UIBase')
var CombatUtility = require('CombatUtility')
var utility = require('utility');

cc.Class({
    extends: UIBase,

    properties: {
        dis : 50.0,
        _target : null,
        _touchid : null,
        _startPoint : null,
        _canUseSkill : false,
        fightUI : cc.Component,
        handsCards:cc.Node,
    },

    onLoad () {
        this._targetTips = new Array();
        for (var i = 0; i < this.node.children.length; ++i) {
            this._targetTips.push(this.node.children[i].getComponent('targetTips'));
        }

        this.HideTips();
        this.itemChild = this.fightUI.lineDot.children;
    },

    start () {
    },
    touchMove(point)
    {
        if (!this._startPoint)
            return;
        // if (this.curObjective.type == constant.SkillTargetType.ALL)
        // {
        //     var cardItem = this.fightUI.CardChildrenCount[this._curCard];
        //     cardItem.position = cardItem.parent.convertToNodeSpace(point);
        //     cc.log(point,"point-------------", cardItem.parent.convertToNodeSpace(point))
        // }
        var points = utility.ComputeBezier(this._startPoint,point);//路径点数组

        if(points.length > 4)
            this.fightUI.lineDotSrc.setTarget(this._target);

        for(let k = 0; k < this.itemChild.length; k++){
            if(k < points.length - 1)
            {
                this.itemChild[k].x = points[k].x + 100;
                this.itemChild[k].y = points[k].y;

                var v = points[k].sub(points[k+1]);
                var angle = cc.pToAngle(v) / Math.PI * 180;
                //cc.log(angle.toString());
                this.itemChild[k].rotation = -angle;
            }
            else if(k == points.length-1)
            {
                this.itemChild[35].x = points[k].x + 100;
                this.itemChild[35].y = points[k].y;

                this.itemChild[k].x = 0;
                this.itemChild[k].y = -1000;
            }
            else{
                if(k != this.itemChild.length-1)
                {
                    this.itemChild[k].x = 0;
                    this.itemChild[k].y = -1000;
                }
            } 
        }

        if(this.curObjective.type != constant.SkillTargetType.SINGEL)
        {
            if(cc.pDistance(this._startPoint,point) > this.dis)
            {
                this._canUseSkill = true;
                this.showCanUseEffect();
            }
            else
            {
                this._canUseSkill = true;
                this.hideCanUseSkillEffect();
            }
        }
    },
    curSelectCard(index, startPoint){//当前卡牌的起点，触摸位移，起始位置
        this._curCard = index;
        this._startPoint = startPoint;
        //cc.log('cur point = ',startPoint);
        ///显示可攻击目标
        var targets =  GameLogic.player.handsPile[this._curCard].ability.getTarget();
        var card = GameLogic.player.handsPile[this._curCard];

        this.curCardId = card.id;
        this.curObjective = card.ability.arrs.Target;

        if(this.curObjective.type == constant.SkillTargetType.ALL)
        {
            //if(targets instanceof Array)
            {
                this.ShowALl();
            }
            //else{
            //    this.ShowTips(targets);
            //}
        }
        else
        {
            this.ShowTips(targets);
        }
        this._target = targets;
    },
    CancleSelectCard(point,usrCard){
        if (!this._startPoint)
            return;
       
        for(var i =0;i<this.itemChild.length;i++){
            this.itemChild[i].x = 0;
            this.itemChild[i].y = 0;
        }
       
        if(usrCard)
        {
            if(this.curObjective.type != constant.SkillTargetType.SINGEL)
            {
                if(this._canUseSkill)
                {
                    GameLogic.UsePile(GameLogic.player,this._curCard,'','',this.curCardId,this.curObjective.type);
                }
            }
            else
            {
                ///获取可释放目标
                var target =  GameLogic.player.handsPile[this._curCard].ability.getTarget();
               
                ///判断是否选中目标
                this._target =  CombatUtility.getTargetForPoint(point,GameLogic.player.curCombat);

                //判断当前选中目标是否可以释放技能
                if(this._target != null)
                {
                    if(target instanceof Array)
                    {
                        for(var key in target)
                        {
                            if(target[key] == this._target)
                            {
                                GameLogic.UsePile(GameLogic.player,this._curCard,this._target,target,this.curCardId,this.curObjective.type);
                            }
                        }
                    }
                    else
                    {
                        if(this._target == target);
                        {
                            GameLogic.UsePile(GameLogic.player,this._curCard,this._target,this._target,this.curCardId,this.curObjective.type);
                        }
                    }
                }
            }
        }

        this._canUseSkill = false;
        this.CancleShowTargets();
        this.hideCanUseSkillEffect();
        this.fightUI.lineDotSrc.Reset();
        this._startPoint = null;
    },
    CancleShowTargets(){
        this.HideTips();
    },
    ShowTips(target){
        var index = 0;
        if(target instanceof Array)
        {
            for(var i in target){
                this._targetTips[index].show(target[i].agent.contentSize);
                index++;
            }
        }
        else{
            this._targetTips[0].show(target.agent.contentSize);
        }
    },
    ShowALl(){
        if(this._targetTips == null)
        {
            this._targetTips = new Array();
            for (var i = 0; i < this.node.children.length; ++i) {
                this._targetTips.push(this.node.children[i].getComponent('targetTips'));
            }
        }

        if(this.curObjective.team == constant.Team.own)
        {
            this._targetTips[0].show(cc.rect(55,247,550,320));
        }
        else
        {
            this._targetTips[0].show(cc.rect(775,247,550,320));
        }
    },
    HideTips(){
        for(var i in this._targetTips)
        {
            this._targetTips[i].hide();
        }
    },
      ///显示可以使用技能特效
    showCanUseEffect(){

    },  //隐藏可使用技能特效
    hideCanUseSkillEffect(){

    },      ///判断当前是否选中目标
    checkSelectedTarget(point){
        ///获取可释放目标
        var target =  GameLogic.player.handsPile[this._curCard].ability.getTarget();
               
        ///判断是否选中目标
        this._target =  CombatUtility.getTargetForPoint(point,GameLogic.player.curCombat);

        //判断当前选中目标是否可以释放技能
        if(this._target != null)
        {
            if(target instanceof Array)
            {
                for(var key in target)
                {
                    if(target[key] == this._target)
                    {
                        GameLogic.UsePile(GameLogic.player,this._curCard,this._target,target,this.curCardId,this.curObjective.type);
                    }
                }
            }
            else
            {
                if(this._target == target);
                {
                    GameLogic.UsePile(GameLogic.player,this._curCard,this._target,this._target,this.curCardId,this.curObjective.type);
                }
            }
        }
    }
});
