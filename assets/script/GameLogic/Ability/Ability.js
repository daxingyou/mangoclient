/**
 *    行为基类
 *    返回构造函数 
 *    by pwh  
 */

function Ability(data){
    this.ID = data.ID;// Int16Array  编号
	this.SkillName = data.SkillName;// String  技能名
	this.Objective = data.Objective;// String  目标
	this.Conditions = data.Conditions;// String  条件
	this.Actions = data.Actions;// String  行为
}

///当前目标
Ability.prototype.curTarget = Int16Array;

Ability.prototype.Active = function(){

}

module.exports = Ability;