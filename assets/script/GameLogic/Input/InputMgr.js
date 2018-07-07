/**
 *      操作管理类
 *      先设定当前使用的卡组再设定目标
 *      by pwh
 */

var constant = require('constants')
var GameLogic = require('GameLogic')
var UIBase = require('UIBase')

cc.Class({
    extends: UIBase,

    properties: {
        frame : [],
        _target : null,
        _clickNode : null,
        fightUI : cc.Component,
        _IsSelectCard : false,           //第一次点击是否已经选择了卡牌
    },

    onLoad () {
        for(var i in this.node.children){
            this.frame[i] = this.node.children[i];
        }
    },

    start () {

    },
    selelctTarget(index){
        if(!this._IsSelectCard)
            return;
        var curTarget = GameLogic.getCombatUnitForUid(GameLogic.player,index);

        if(this._target instanceof Array)
        {
            for(var key in this._target)
            {
                if(this._target[key] == curTarget)
                {
                    GameLogic.UsePile(GameLogic.player,this._curCard,curTarget,this._target);
                }
            }
        }
        else
        {
            if(this._target == curTarget);
            {
                GameLogic.UsePile(GameLogic.player,this._curCard,curTarget,this._target);
            }
        }
    },
    CheckClickNode(clickNode){
        this._IsSelectCard = this._clickNode == clickNode;
    },
    curSelectCard(index,clickNode){
        this._curCard = index;
        this._clickNode = clickNode;

        var targets =  GameLogic.player.handsPile[this._curCard].ability.getTarget();

        if(GameLogic.player.handsPile[this._curCard].ability.actions[0].Objective == constant.SkillTargetType.ALL)
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
    CancleSelectCard(index){
        this._clickNode = null;
        if(this._curCard == index)
        {
            this._curCard = 0;
        }
        else{
            console.error("wtf?!~~");
        }
        this.CancleShowTargets();
    },
    CancleShowTargets(){
        this._clickNode = null;
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
    }
    // update (dt) {},
});
