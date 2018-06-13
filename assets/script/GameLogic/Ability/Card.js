var Ability = require('Ability');
var dataMgr = require('DataMgr');

var Card = function(id){
    this.ability = new Ability(dataMgr.skill[id]);

    
}

module.exports = Card;