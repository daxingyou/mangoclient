var Ability = require('Ability');
var dataMgr = require('DataMgr');

var Card_ = function(id){
    this.ability = new Ability(dataMgr.skill[id]);
    this.id = id;
    
}

Card_.prototype.Active = function(Target){
    this.ability.Active(Target,owner);

    return this.ability;
}

module.exports = Card_;