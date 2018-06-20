var ability = require('Ability');
var dataMgr = require('DataMgr');

var HandCard = function(id,owner){
    var skill = dataMgr.skill[id];
    this.ability = new ability(skill,owner);
    this.id = id;
    
}

HandCard.prototype.Active = function(Target){
    this.ability.Active(Target);

    return this.ability;
}

module.exports = HandCard;