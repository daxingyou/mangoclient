/**
 *    技能基类
 *    返回构造函数 
 *    by pwh  
 */

var CombatUtility = require('CombatUtility')
var effectMgr = require('EffectMgr')
var constant = require('constants')

var ability = function(data,owner){
	
	this.arrs = data;
	this.owner = owner;
	this.ID = data.ID;	// Int16Array  编号
	this.effectType = data.EffectType;

	this.singing = data.Target.singing;
	//this.effectFrame = 5;
	this.effectTime = this.arrs.CriticalTime / 1000;
	this.attackEffect = this.arrs.CriticalTime / 1000 + 2;
	this.hitEffectTime = new Array();
	this.hitEffectFrame = 2.2;
	//this.attackFrame = 0.9;

	for(var i in this.arrs.EffectiveTime)
	{
		this.hitEffectTime.push(this.arrs.EffectiveTime[i] / 1000 + this.singing + this.effectTime );
	}

	//this.actions = new Array();
	//for(var i in data)
	//{
	//	
	//	this.actions[i] = new Action(data,this,owner);
	//}
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

	//for(var i in this.actions)
	//{
	//	this.actions[i].Active();
	//}

	if(this.arrs.Animation != '')
		this.owner.agent.PlayAnimation(this.arrs.Animation,false);

	
}
///技能失效
ability.prototype.Exit = function(){
	this.owner.OnAbilityExit(this);
}

ability.prototype.Enable = function(target){

} 

ability.prototype.ActionExit = function(index){
	//this.actions.slice(index,1);

	//if(this.actions.length == 0)
	//	this.Exit();
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
	
	this.effectTime -= dt;

	if(this.effectTime <= 0)
	{
		this.effectTime = 999999;
	
		//cc.log('arrs getEffect name = ',this.arrs.Path,' effect =',this.arrs.Effect);
		effectMgr.getPosEffect(this.arrs.Path,this.owner.agent.go.position,this.arrs.Effect,this.owner.teamid);

		if(this.hitEffectTime.length == 0)
		{
			this.Exit();
		}
	}

	/*
	this.effectFrame --;

	//cc.log('effectTime = ',this.effectTime);

	if(this.effectFrame <= 0)
	{
		this.effectFrame = 999999;
	
		//cc.log('arrs getEffect name = ',this.arrs.Path,' effect =',this.arrs.Effect);
		effectMgr.getPosEffect(this.arrs.Path,this.owner.agent.go.position,this.arrs.Effect,this.owner.teamid);

		if(this.hitEffectTime.length == 0)
		{
			this.Exit();
		}
	}*/
	
	this.attackEffect -=dt;

	if(this.attackEffect <= 0)
	{
		this.attackEffect = 9999999999;

		if(this.effectType.type == constant.EffectType.Bullt)
		{
			if(this.effectType.origin == constant.EffectOrigin.target)
			{
				effectMgr.getMoveEffect(this.arrs.Path,this.owner.agent.go.position.add(new cc.Vec2(10,0)),new cc.Vec2(1100,310),5,'wsword',this.owner.teamid);
			}
			else if(this.effectType.origin == constant.EffectOrigin.onwer)
			{
				if(this.ID == 1009)
				{
					
				}

				effectMgr.getMoveEffect(this.arrs.Path,this.owner.agent.go.position.add(new cc.Vec2(10,0)),new cc.Vec2(1100,310),5,'wsword',this.owner.teamid);
			}
		}
		else if(this.effectType.type == constant.EffectType.Point)
		{
			if(this.effectType.origin == constant.EffectOrigin.target)
			{
				effectMgr.getPosEffect(this.arrs.Path,this.curTarget.agent.go.position,this.Effect,this.owner.teamid);
			}
			else if(this.effectType.origin == constant.EffectOrigin.onwer)
			{
				effectMgr.getPosEffect(this.arrs.Path,this.owner.agent.go.position,this.Effect,this.owner.teamid);
			}
		}
		else if(this.effectType.type == constant.EffectType.SwordWheel)
		{
			effectMgr.getSwordWheel(this.arrs.Path,this.owner.agent.go.position,this.Effect,this.owner.teamid);
		}
	}

	this.hitEffectFrame -=dt;

	if(this.hitEffectFrame <= 0)
	{
		this.hitEffectFrame = 999999;

		effectMgr.getPosEffect(this.arrs.HitEffectPath,new cc.Vec2(1100,310),this.arrs.HitEffect,this.owner.teamid);

		this.Exit();
	}
/*
	for(var i in this.hitEffectTime)
	{
		this.hitEffectTime[i] -= dt;

		//cc.log('i =',i,'time = ',this.hitEffectTime[i]);

		if(this.hitEffectTime[i] <= 0)
		{
			this.hitEffectTime[i] = 999999;

			for(var j in this.targets)
			{
				if(this.targets[j] != null){
					effectMgr.getPosEffect(this.arrs.HitEffectPath,this.targets[j].agent.go.position,this.arrs.HitEffect,this.owner.teamid);
				}
			}

			if(i == this.hitEffectTime.length - 1)
				this.Exit();
		}
	}
	*/
}

ability.prototype.getTarget = function(){
	return CombatUtility.getTargets(this.arrs.Target,this.owner.curCombat);
}

module.exports = ability;