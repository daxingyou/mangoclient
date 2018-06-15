var actionFactory = require('ActionFactory');
var util = require('util');

var Action = function(){
    this.ID = data.ID;// Int16Array  编号
	this.Index = data.Index;//// 子编号
	this.SkillName = data.SkillName;// String  技能名
	this.Objective = data.Objective;// String  目标
    this.Conditions = data.Conditions;// String  条件
    
    var str =  util.excelToArray(edata.Actions);

    this.actionName = str[0];// String  行为
    this.attrs = str;

}

Action.prototype.active = false;
Action.prototype.action = null;

Action.prototype.Active = function(ability,owner){
    this.ability = ability;
    this.owner = owner;

    this.active = true;
    
    this.action = new actionFactory.actions[this.actionName](this.attrs,ability,owner,this);
    this.action.enter();
}

Action.prototype.tick = function(dt){
    this.action.tick(dt);
}


module.exprots = Action;