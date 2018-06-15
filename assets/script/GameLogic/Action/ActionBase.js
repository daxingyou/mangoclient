
var ActionBase = function(attrs,ability,owner,action){
    this.ability = ability;
    this.owner = owner;
    this.action = action;

    var str = attrs.split(';');
    for(var i = 1;i<str.length;i++)
    {
        var item = str[i].split(':');
        this.attrs[item[0]] = item[1];
    }
}

ActionBase.prototype.enter = function(){

};

ActionBase.prototype.tick = function(dt){

};

ActionBase.prototype.exit = function(){
    this.ability.ActionExit(this.action.Index);
};


module.exports = ActionBase;