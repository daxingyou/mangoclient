
var ActionBase = function(attrs,ability,owner){
    this.ability = ability;
    this.owner = owner;
    
    var str = attrs.split(';');
    for(var i = 1;i<str.length;i++)
    {
        var item = str[i].split(':');
        this.attrs[item[0]] = item[1];
    }
}

ActionBase.prototype.enter = function(){

};

ActionBase.prototype.tick = function(){

};

ActionBase.prototype.exit = function(){
    this.ability
};


module.exports = ActionBase;