/**
 *    技能基类
 *    返回构造函数 
 *    by pwh  
 */

var CombatUtility = require('CombatUtility')
var effectMgr = require('EffectMgr')

var ability = function(data,owner){
	
	this.arrs = data;
	this.owner = owner;
	this.ID = data.ID;	// Int16Array  编号

	this.singing = data.Target.singing;
	this.effectTime = this.arrs.CriticalTime / 1000 + this.singing;
	this.hitEffectTime = new Array();
	
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
	
		cc.log('arrs getEffect name = ',this.arrs.Path,' effect =',this.arrs.Effect);
		var go = effectMgr.getEffect(this.arrs.Path,this.owner.agent.go.position,this.arrs.Effect);

		if(this.hitEffectTime.length == 0)
		{
			this.Exit();
		}
	}

	for(var i in this.hitEffectTime)
	{
		this.hitEffectTime[i] -= dt;

		if(this.hitEffectTime[i] <= 0)
		{
			this.hitEffectTime[i] = 999999;

			for(var j in this.targets)
			{
				if(this.targets[j] != null){
					var go = effectMgr.getEffect(this.arrs.HitEffectPath,this.targets[j].agent.go.position,this.arrs.HitEffect);
					//cc.log('arrs getEffect go = ',go);
				}
			}

			if(i == this.hitEffectTime.length - 1)
				this.Exit();
		}
	}
}

ability.prototype.getTarget = function(){
	return CombatUtility.getTargets(this.arrs.Target,this.owner.curCombat);
}

module.exports = ability;