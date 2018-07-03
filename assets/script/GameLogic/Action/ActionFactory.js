var Damage = require('Damage')
var Defence = require('Defence')
var PhysicalArm = require('PhysicalArm')
var SpawnSummoned = require('SpawnSummoned')
var heal = require('heal')

var factory ={
    actions : [],

    init : function()
    {
        this.actions['damage'] = Damage;
        this.actions['defence'] = Defence;
        this.actions['physicalArm'] = PhysicalArm;
        this.actions['spawnSummoned'] = SpawnSummoned;
        this.actions['heal'] = heal;
        
    }
}

module.exports = factory;