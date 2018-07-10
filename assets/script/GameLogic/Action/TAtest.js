var actionFactory = require('./ActionFactory')

var TATest = function(data,ability,owner){
    this.ID = data.ID;// Int16Array  编号
	this.Index = data.Index;//// 子编号
    this.SkillName = data.SkillName;// String  技能名 
    
    this.Objective = data.Target;// String  目标
    
    this.aniName = data.Animation;
    this.aniFrame = data.CriticalTime;
    this.effect = data.Effect;
    this.EffectiveTime = data.EffectiveTime;

    for(var name in data.Actions)
    {
        this.actionName = name;
        this.attrs = data.Actions[name];
    }
    //.keys();// String  行为
    //var sub = data.Actions.value();

    //this.attrs = sub == '' ? null :JSON.parse(sub);  ///参数

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