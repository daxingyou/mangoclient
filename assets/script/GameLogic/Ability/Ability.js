/**
 *    技能基类
 *    返回构造函数 
 *    by pwh  
 */

var Action = require('TAtest')
var CombatUtility = require('CombatUtility')
var effectMgr = require('EffectMgr')

var ability = function(data,owner){
	this.arrs = data;
	this.actions = new Array();
	this.owner = owner;
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
ability.prototype.Active = function(Target,targets){
	this.active = true;
	this.curTarget = Target;
	this.targets = targets;

	for(var i in this.actions)
	{
		this.actions[i].Active();
	}

	if(this.arrs.Animation != '')
		this.owner.agent.PlayAnimation(this.arrs.Animation,false);

	effectMgr.getEffect(this.arrs.Path,this.owner.agent.go.position,this.arrs.Effect);
}
///技能失效
ability.prototype.Exit = function(){
	this.owner.OnAbilityExit(this);
}

ability.prototype.Enable = function(target){

} 

ability.prototype.ActionExit = function(index){
	this.actions.slice(index,1);

	if(this.actions.length == 0)
		this.Exit();
}

//////////////////////// event ////////////////////////
ability.prototype.onDie = function(){
	
}

///使用卡牌监听
ability.prototype.onUsePile = function(){
	
}
////抽牌
ability.prototype.onDrawPile = function(){
	
}
ability.prototype.onDamage = function(){

}
ability.prototype.tick = function(dt){
	for(var i in this.actions)
	{
		this.actions[i].tick();
	}
}

ability.prototype.getTarget = function(){
	return CombatUtility.getTargets(this.actions[1].Objective,this.owner.curCombat);
}

module.exports = ability;