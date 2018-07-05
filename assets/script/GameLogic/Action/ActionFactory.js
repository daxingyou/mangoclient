var Damage = require('./Common/Damage')
var Defence = require('./Common/Defence')
var PhysicalArm = require('./Common/PhysicalArm')
var SpawnSummoned = require('./Common/SpawnSummoned')
var heal = require('./Common/heal')

var actionFactory = {
    actions : [],

    init : function()
    {
        this.actions['damage'] = Damage;
        this.actions['defence'] = Defence;
        this.actions['physicalArm'] = PhysicalArm;
        this.actions['spawnSummoned'] = SpawnSummoned;
        this.actions['heal'] = heal;
    }
};

module.exports = actionFactory;
