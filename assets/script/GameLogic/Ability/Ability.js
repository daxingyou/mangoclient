/**
 *    技能基类
 *    返回构造函数 
 *    by pwh  
 */

var CombatUtility = require('CombatUtility')
var effectMgr = require('EffectMgr')
var constant = require('constants')
var utility = require('utility')
var gamedata = require('DataCenter')
var FSMEvent = require('FSMEvent')

var ability = function(data,owner){
	this.arrs = data;
	this.owner = owner;
	this.ID = data.ID;	// Int16Array  编号
	this.effectType = data.EffectType;
	this.effects = this.arrs.Effect.split(',');

	this.singing = data.Target.singing;
	this.effectFrame = 0;
	this.effectTime = 0;
	this.hitEffectTime = this.arrs.HitTime;
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
	this.targets = targets;
	this.curTarget = Target;
	this.effectTime = 0;
	this.hurtEffectIndex = 0;

	if(Target == null && targets != null)
		this.curTarget = targets[0];

	if(this.arrs.Animation != '')
		this.owner.fsm.handleEvent(FSMEvent.SING, this.arrs.Animation);
		// this.owner.agent.PlayAnimation(this.arrs.Animation,false);

	this.delay = 0;
	if(this.arrs.EffectType.hasOwnProperty('delay'))
	{
		this.delay = this.arrs.EffectType.delay;
	}
	else
	{
		for(var i =0;i<this.effects.length;i++)
		{
			this.ShowEffect(this.effects[i]);
		}
	}
}

ability.prototype.ShowEffect = function(effect){
	///特效播放
	if(this.effectType.type == constant.EffectType.Bullt)
	{
		cc.log('origin = ',this.effectType.origin ,',  onwer = ',constant.EffectOrigin.onwer);
		cc.log('true result = ',this.effectType.origin == constant.EffectOrigin.onwer);
			
		if(this.effectType.origin == constant.EffectOrigin.target)
		{
			effectMgr.getMoveEffect(this.arrs.Path,this.owner.agent.go.position.add(new cc.Vec2(3,0)),new cc.Vec2(1010,310),5,effect,this.owner.teamid);
			//effectMgr.getPosEffect(this.arrs.Path,this.curTarget.agent.go.position,effect,this.owner.teamid,()=>{
			//	effectMgr.getMoveEffect(this.arrs.Path,this.owner.agent.go.position.add(new cc.Vec2(10,0)),new cc.Vec2(1100,310),5,'sword',this.owner.teamid);
			//});
		}
		else if(this.effectType.origin == constant.EffectOrigin.onwer)
		{
			effectMgr.getMoveEffect(this.arrs.Path,this.owner.agent.go.position.add(new cc.Vec2(3,0)),new cc.Vec2(1010,310),5,effect,this.owner.teamid);
			//effectMgr.getPosEffect(this.arrs.Path,this.owner.agent.go.position,effect,this.owner.teamid,()=>{
			//	effectMgr.getMoveEffect(this.arrs.Path,this.owner.agent.go.position.add(new cc.Vec2(10,0)),new cc.Vec2(1100,310),5,'wsword',this.owner.teamid);
			//});
		}
	}
	else if(this.effectType.type == constant.EffectType.Point)
	{
		if(this.effectType.origin == constant.EffectOrigin.target)
		{
			effectMgr.getPosEffect(this.arrs.Path,this.curTarget.agent.go.position,effect,this.owner.teamid);
		}
		else if(this.effectType.origin == constant.EffectOrigin.onwer)
		{
			effectMgr.getPosEffect(this.arrs.Path,this.owner.agent.go.position,effect,this.owner.teamid);
		}
	}
	else if(this.effectType.type == constant.EffectType.SwordWheel)
	{
		effectMgr.getSwordWheel(this.arrs.Path,this.owner.agent.go.position,effect,this.owner.teamid);
	}
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

ability.prototype.SwordIndex = 0;

ability.prototype.tick = function(dt){
	
	this.effectTime += dt;

	if(this.delay > 0)
	{
		if(this.effectTime >= this.delay)
		{
			this.delay = 999999999;
			for(var i =0;i<this.effects.length;i++)
			{
				this.ShowEffect(this.effects[i]);
			}
		}
	}

	if(this.hurtEffectIndex < this.hitEffectTime.length)
	{
		if(this.hitEffectTime[this.hurtEffectIndex] <= this.effectTime)
		{
			cc.log('cur frame =',this.effectTime);
	
			var x = utility.RandomInt(0,50);
			var y = utility.RandomInt(0,50);
			effectMgr.getPosEffect(this.arrs.HitEffectPath,new cc.Vec2(1000+x,310+y),this.arrs.HitEffect,this.owner.teamid);
			this.hurtEffectIndex++;

			
			if(gamedata.fightDamage.hasOwnProperty(this.owner.uid))
			{
				if(gamedata.fightDamage[this.owner.uid].hasOwnProperty(this.ID))
				{
					var damagelist = gamedata.fightDamage[this.owner.uid][this.ID];
					if(damagelist.length > 0)
					{
						this.owner.curCombat.UIMgr.loadDmg(this.curTarget,damagelist[0], true);
						this.curTarget, gamedata.fightDamage[this.owner.uid][this.ID].splice(0,1);
					}
				}
			}
		}
	}
	
	if(this.ID == 1010)
	{
		var frame = new Array(6,9,13,16,18,21,25);

		if(this.effectFrame == frame[this.index])
		{
			this.index++;
			this.owner.curCombat.summonedMgr.collectItem();
		}
		else if(this.effectFrame >frame[frame.length - 1])
		{
			this.owner.curCombat.summonedMgr.collectAll();
			return;
		}
	}

	///当前特效执行帧
	this.effectFrame ++;
}

ability.prototype.getTarget = function(){
	return CombatUtility.getTargets(this.arrs.Target,this.owner.curCombat);
}

module.exports = ability;