/**
 *    技能基类
 *    返回构造函数 
 *    by pwh  
 */

var Action = require('TAtest')
var constant = require('constants')
var combatMgr = require('CombatMgr')

var ability = function(data,owner){
	this.actions = new Array(data.length);
	for(var i in data)
	{
		this.ID = data[i].ID;// Int16Array  编号
		this.actions[i] = new Action(data[i],this,owner);
	}
}

ability.prototype.owner = null;
///当前目标
ability.prototype.curTarget = null;
///技能是否生效
ability.prototype.active = false;
///行为列表
ability.prototype.actions = null;
///技能生效
ability.prototype.Active = function(Target){
	this.active = true;
	this.curTarget = Target;

	for(var i=0;i<this.actions.length;i++)
	{
		this.actions[i].Active();
	}
	//this.actions.Active();
}
///技能失效
ability.prototype.Exit = function(){

}

ability.prototype.ActionExit = function(index){
	this.actions.slice(index,1);

	if(this.actions.length == 0)
		Exit();
}

//////////////////////// event ////////////////////////
ability.prototype.onDie = function(){
	for(var i=0;i<actions.length;i++)
	{
		if(this.actions[i].Conditions == constant.SkillActiveType.OnDie){
			this.actions[i].Active();
			break;
		}
	}
}

///使用卡牌监听
ability.prototype.onUsePile = function(){
	for(var i=0;i<this.actions.length;i++)
	{
		if(this.actions[i].Conditions == constant.SkillActiveType.OnUsePile){
			this.actions[i].Active();
			break;
		}
	}
}
////抽牌
ability.prototype.onDrawPile = function(){
	for(var i=0;i<this.actions.length;i++)
	{
		if(this.actions[i].Conditions == constant.SkillActiveType.onDrawPile){
			this.actions[i].Active();
			break;
		}
	}
}
ability.prototype.onDamage = function(){
	for(var i=0;i<this.actions.length;i++)
	{
		if(this.actions[i].Conditions == constant.SkillActiveType.onDamage){
			this.actions[i].Active();
			break;
		}
	}
}
ability.prototype.tick = function(dt){
	for(var i=0;i<this.actions.length;i++)
	{
		this.actions[i].tick(dt);
	}
}

ability.prototype.getTarget = function(){
	combatMgr.getAbilityTarget(this.actions[0].Objective,this.owner);
}

module.exports = ability;