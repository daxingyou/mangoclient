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

ability.prototype.swordShow = false;
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

	this.delay = 0;
	if(this.arrs.EffectType.hasOwnProperty('delay'))
	{
		this.delay = this.arrs.EffectType.delay;
	}
	else
	{
		for(var i =0;i<this.effects.length;i++)
		{
			this.ShowEffect(this.effects[i],(this.effectType.hasOwnProperty('type2') && i > 0 ));
		}
	}

	this.swordShow = true;
}

ability.prototype.ShowEffect = function(effect,type2){

	if(type2)
	{
		if(this.effectType.type2 == constant.EffectType.Point)
		{
			if(this.effectType.origin2 == constant.EffectOrigin.onwer)
			{
				var go = effectMgr.getPosEffect(this.arrs.Path,this.owner.agent.go.position,effect,this.owner.teamid);
				go.node.scale = Math.abs(this.owner.agent.go.scale);
			}
			else if(this.effectType.origin2 == constant.EffectOrigin.target)
			{
				var go = effectMgr.getPosEffect(this.arrs.Path,this.curTarget.agent.go.position,effect,this.owner.teamid);
				go.node.scale = Math.abs(this.owner.agent.go.scale);
			}
			return;
		}
	}

	///特效播放
	if(this.effectType.type == constant.EffectType.Bullt)
	{
		if(this.effectType.origin == constant.EffectOrigin.target)
		{
			effectMgr.getMoveEffect(this.arrs.Path,this.owner.agent.go.position.add(new cc.Vec2(3,0)),new cc.Vec2(1010,310),8,effect,this.owner.teamid);
		}
		else if(this.effectType.origin == constant.EffectOrigin.onwer)
		{
			if(this.ID == 2105 || this.ID == 2107)
			{
				effectMgr.getMoveEffect(this.arrs.Path,this.owner.agent.go.position.add(new cc.v2(-50,0)),this.curTarget.agent.go.position.add(new cc.Vec2(-30,-30)),100,effect,this.owner.teamid);
			}
			else
			{
				effectMgr.getMoveEffect(this.arrs.Path,this.owner.agent.go.position.add(new cc.Vec2(3,0)),new cc.Vec2(1010,310),8,effect,this.owner.teamid);
			}
		}
	}
	else if(this.effectType.type == constant.EffectType.Point)
	{
		if(this.effectType.origin == constant.EffectOrigin.target)
		{
			if(this.targets != null)
			{
				if(this.targets.length > 1)
				{
					for(var i in this.targets)
					{
						effectMgr.getPosEffect(this.arrs.Path,this.targets[i].agent.go.position,effect,this.owner.teamid);
					}
				}
				else
				{
					effectMgr.getPosEffect(this.arrs.Path,this.curTarget.agent.go.position,effect,this.owner.teamid);
				}
			}
			else
			{
				effectMgr.getPosEffect(this.arrs.Path,this.curTarget.agent.go.position,effect,this.owner.teamid);
			}
			
		}
		else if(this.effectType.origin == constant.EffectOrigin.onwer)
		{
			var go = effectMgr.getPosEffect(this.arrs.Path,this.owner.agent.go.position,effect,this.owner.teamid);
			go.node.scale = Math.abs(this.owner.agent.go.scale);
		}
		else if(this.effectType.origin == constant.EffectOrigin.onwerAll)
		{
			for(var i in this.owner.curCombat.units)
			{
				if(this.owner.curCombat.units[i].teamid == this.owner.teamid)
				{
					effectMgr.getPosEffect(this.arrs.Path,this.owner.curCombat.units[i].agent.go.position,effect,this.owner.teamid);
				}
			}
		}
		else if(this.effectType.origin == constant.EffectOrigin.enemyAll)
		{
			for(var i in this.owner.curCombat.units)
			{
				if(this.owner.curCombat.units[i].teamid != this.owner.teamid)
				{
					effectMgr.getPosEffect(this.arrs.Path,this.owner.curCombat.units[i].agent.go.position,effect,this.owner.curCombat.units[i].teamid);
				}
			}
		}
		else if(this.effectType.origin == constant.EffectOrigin.ownerCenter)
		{
			var length = 0;
			for(var i in this.owner.curCombat.own)
			{
				length++;
			}

			if(length == 1)
			{
				effectMgr.getPosEffect(this.arrs.Path,this.owner.curCombat.own[1].agent.go.position,effect,0);
			}
			else if(length == 2)
			{
				effectMgr.getPosEffect(this.arrs.Path,cc.v2((this.owner.curCombat.own[1].agent.go.position.x + this.owner.curCombat.own[2].agent.go.position.x)/2,
				(this.owner.curCombat.own[1].agent.go.position.y + this.owner.curCombat.own[2].agent.go.position.y)/2),effect,0);
			}
			else if(length == 3)
			{
				effectMgr.getPosEffect(this.arrs.Path,this.owner.curCombat.own[2].agent.go.position,effect,0);
			}
		}
		else if(this.effectType.origin == constant.EffectOrigin.targetCenter)
		{
			var length = 0;
			for(var i in this.owner.curCombat.own)
			{
				length++;
			}

			if(length == 1)
			{
				effectMgr.getPosEffect(this.arrs.Path,this.owner.curCombat.own[1].agent.go.position,effect,0);
			}
			else if(length == 2)
			{
				effectMgr.getPosEffect(this.arrs.Path,cc.v2((this.owner.curCombat.own[1].agent.go.position.x + this.owner.curCombat.own[2].agent.go.position.x)/2,
				(this.owner.curCombat.own[1].agent.go.position.y + this.owner.curCombat.own[2].agent.go.position.y)/2),effect,0);
			}
			else if(length == 3)
			{
				effectMgr.getPosEffect(this.arrs.Path,this.owner.curCombat.own[2].agent.go.position,effect,0);
			}
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

			if(this.hitEffectTime.length == 0)
			{
				this.Exit();
			}
		}
	}
	else if(this.hitEffectTime.length)
	{
		if(this.ID == 1010 && this.swordShow)
		{
			var frame = new Array(6,9,13,16,18,21,25);
	
			if(this.effectFrame == frame[this.index])
			{
				this.index++;
				this.owner.curCombat.summonedMgr.collectItem();
			}
			else if(this.effectFrame >frame[frame.length - 1])
			{
				if(this.owner.curCombat.summonedMgr != null)
					this.owner.curCombat.summonedMgr.collectAll();
				this.swordShow = false;
				//this.Exit();
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
	
				if(gamedata.fightDamage != null)
				{
					if(gamedata.fightDamage.hasOwnProperty(this.owner.uid))
					{
						if(gamedata.fightDamage[this.owner.uid].hasOwnProperty(this.ID))
						{
							var damagelist = gamedata.fightDamage[this.owner.uid][this.ID];
							if(damagelist.length > 0)
							{
								this.owner.curCombat.UIMgr.loadDmg(this.curTarget, damagelist[0], true, this.owner.uid);
								this.curTarget, gamedata.fightDamage[this.owner.uid][this.ID].splice(0,1);
							}
						}
					}
				}
	
			}
		}
	}
	else
	{
		this.Exit();
	}

	///当前特效执行帧
	this.effectFrame ++;
}

ability.prototype.getTarget = function(){
	return CombatUtility.getTargets(this.arrs.Target,this.owner.curCombat);
}

module.exports = ability;