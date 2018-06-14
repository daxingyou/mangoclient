var Attack = require('Attack');

var factory ={
    actions : [],

    init : function()
    {
        actions['attack'] = Attack;
    }
}

module.exports = factory;