/**
 *    行为基类
 *    返回构造函数 
 *    by pwh  
 */

var constant = require('constant');
var Action = require('Action');


function Ability(data){
	this.ID = data[0].ID;// Int16Array  编号

	for(var i =0;i<data.length;i++)
	{
		var item = new Action(data[i]);
		this.actions[i] = item;
	}

}
Ability.prototype.owner = null;
///当前目标
Ability.prototype.curTarget = null;
///技能是否生效
Ability.prototype.active = false;
///行为列表
Ability.prototype.actions = [];
///技能生效
Ability.prototype.Active = function(Target,owner){
	this.active = true;
	this.curTarget = Target;
	this.owner = owner;
}
///技能失效
Ability.prototype.Exit = function(){

}

Ability.prototype.ActionExit = function(index){
	this.actions.slice(index,1);

	if(this.actions.length == 0)
		Exit();
}

//////////////////////// event ////////////////////////
Ability.prototype.onDie = function(){
	for(var i=0;i<actions.length;i++)
	{
		if(this.actions[i].Conditions == constant.SkillActiveType.OnDie){
			this.actions[i].Active();
			break;
		}
	}
}

///使用卡牌监听
Ability.prototype.onUsePile = function(){
	for(var i=0;i<actions.length;i++)
	{
		if(this.actions[i].Conditions == constant.SkillActiveType.OnUsePile){
			this.actions[i].Active();
			break;
		}
	}
}
////抽牌
Ability.prototype.onDrawPile = function(){
	for(var i=0;i<actions.length;i++)
	{
		if(this.actions[i].Conditions == constant.SkillActiveType.onDrawPile){
			this.actions[i].Active();
			break;
		}
	}
}
Ability.prototype.onDamage = function(){
	for(var i=0;i<actions.length;i++)
	{
		if(this.actions[i].Conditions == constant.SkillActiveType.onDamage){
			this.actions[i].Active();
			break;
		}
	}
}
Ability.prototype.tick = function(dt){
	for(var i=0;i<actions.length;i++)
	{
		this.actions[i].tick(dt);
	}
}
module.exports = Ability;