var actionFactory = require('./ActionFactory')
//import {actions} from "./ActionFactory"


var TATest = function(data,ability,owner){
    this.ID = data.ID;// Int16Array  编号
	this.Index = data.Index;//// 子编号
    this.SkillName = data.SkillName;// String  技能名 
    
	this.Objective = data.Objective== '' ? null : JSON.parse(data.Objective);// String  目标
    this.Conditions = data.Conditions;// String  条件

    this.actionName = data.Actions.split(':')[0];// String  行为
    var sub = data.Actions.substring(this.actionName.length+1);

    this.attrs = sub == '' ? null :JSON.parse(sub);  ///参数

    this.ability = ability;
    this.owner = owner;
    this.active = false;
    this.action = null;
}

TATest.prototype.Active = function(){
    this.active = true;
    var func = actionFactory.actions[this.actionName];
    //var func = actions[this.actionName];
    if(func == null)
        console.error('this action name is not found !'+this.actionName);
    this.action = new func(this.attrs,this.ability,this.owner,this);
    this.action.enter();
}

TATest.prototype.tick = function(dt){
    if(this.action != null)
        this.action.tick(dt);
}

module.exports = TATest;