var actionFactory = require('./ActionFactory')

var TATest = function(data,ability,owner){
    this.ID = data.ID;// Int16Array  编号
	this.Index = data.Index;//// 子编号
    this.SkillName = data.SkillName;// String  技能名 
    
    //this.Objective =JSON.parse(data.Objective) data.Target;
	this.Objective = data.Target == '' ? null : JSON.parse(data.Target);// String  目标
    ///this.Conditions = data.Conditions;// String  条件

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
    if(actionFactory.actions.hasOwnProperty(this.actionName))
    {
        var func = actionFactory.actions[this.actionName];
    
        this.action = new func(this.attrs,this.ability,this.owner,this);
        this.action.enter();
    }
}

TATest.prototype.tick = function(dt){
    if(this.action != null)
        this.action.tick(dt);
}

module.exports = TATest;