
var ActionBase = function(attrs,ability,owner,action){
    this.ability = ability;
    this.owner = owner;
    this.action = action;

    this.attrs = attrs;
    
}

ActionBase.prototype.enter = function(){
    this.time = util.GetValue('time');

    if(this.time > 0)
        this.exit();
};

ActionBase.prototype.tick = function(dt){
    this.time -= dt;
    if(this.time <= 0)
        this.exit();
};

ActionBase.prototype.time = 0;

ActionBase.prototype.exit = function(){
    this.ability.ActionExit(this.action.Index);
};


module.exports = ActionBase;