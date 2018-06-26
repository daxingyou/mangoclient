var Attack = require('Attack')
var Defence = require('Defence')

var factory ={
    actions : [],

    init : function()
    {
        this.actions['attack'] = Attack;
        this.actions['defence'] = Defence;
    }
}

module.exports = factory;