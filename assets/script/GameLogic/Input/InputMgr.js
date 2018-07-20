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
        frame : [],
        dis : 20.0,
        _target : null,
        _touchid : null,
        _startPoint : null,
        _canUseSkill : false,
        fightUI : cc.Component,
        
    },

    onLoad () {
        this.itemChild = this.fightUI.lineDot.children;
        
        for(var i in this.node.children){
            this.frame[i] = this.node.children[i];
        }
       
    },

    start () {
       
    },
    touchMove(touchid,point)
    {
        var points = utility.ComputeBezier(this._startPoint,point);//路径点数组

        if(points.length > 3)
            this.fightUI.lineDotSrc.setDire(points[points.length-1],points[points.length-2]);

        for(let k=0; k < this.itemChild.length;k++){
            if(k < points.length - 1)
            {
                this.itemChild[k].x = points[k].x+100;
                this.itemChild[k].y = points[k].y;
            }
            else if(k == points.length-1)
            {
                this.itemChild[19].x = points[k].x+100;
                this.itemChild[19].y = points[k].y;

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

        if(this._touchid == touchid)
        {
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
        }
    },
    curSelectCard(index,touchid,startPoint){//当前卡牌的起点，触摸位移，起始位置
        this._curCard = index;
        this._touchid = touchid;
        this._startPoint = startPoint;
        cc.log('cur point = ',startPoint);
        ///显示可攻击目标
        var targets =  GameLogic.player.handsPile[this._curCard].ability.getTarget();
        var card = GameLogic.player.handsPile[this._curCard];

        this.curCardId = card.id;
        this.curObjective = card.ability.actions[1].Objective;

        if(this.curObjective.type == constant.SkillTargetType.ALL)
        {
            if(targets instanceof Array)
            {
                this.ShowALl();
            }
            else{
                this.ShowTips(targets,0);
            }
        }
        else
        {
            if(targets instanceof Array)
            {
                for (const key in targets) {
                    if (targets.hasOwnProperty(key)) {
                        const element = targets[key];
                        this.ShowTips(element,key);
                    }
                }
            }
            else
            {
                this.ShowTips(targets,0);
            }
        }
        this._target = targets;
    },
    CancleSelectCard(index,touchid,point){
       
        for(var i =0;i<this.itemChild.length;i++){
            this.itemChild[i].x = 0;
            this.itemChild[i].y = 0;
        }
       
        if(this._touchid == touchid && this._curCard == index)
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

            this._touchid = null;
            this._canUseSkill = false;
            this.CancleShowTargets();
            this.hideCanUseSkillEffect();
        }
    },
    CancleShowTargets(){
        this._touchid = null;
        for(var i in this.node.children){
            this.frame[i].active = false;
        }
    },
    ShowTips(target,index){
        this.frame[index].active = true;
        this.frame[index].position = cc.v2(target.agent.go.position.x,target.agent.go.position.y + 110.0);
        this.frame[index].setContentSize(200,220); 
    },
    ShowALl(){
        this.frame[0].active = true;
        this.frame[0].position = cc.v2(1000,407);
        this.frame[0].setContentSize(550,320);
    },  ///显示可以使用技能特效
    showCanUseEffect(){

    },  //隐藏可使用技能特效
    hideCanUseSkillEffect(){

    },
  

    // update (dt) {},
});
