var Attack = require('Attack');

var factory ={
    actions : [],

    init : function()
    {
        this.actions['attack'] = Attack;
    }
}

module.exports = factory;