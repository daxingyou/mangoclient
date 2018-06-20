
var ActionBase = function(attrs,ability,owner,action){
    this.ability = ability;
    this.owner = owner;
    this.action = action;

    this.attrs = attrs;
    
}

ActionBase.prototype.enter = function(){

};

ActionBase.prototype.tick = function(dt){

};

ActionBase.prototype.exit = function(){
    this.ability.ActionExit(this.action.Index);
};


module.exports = ActionBase;