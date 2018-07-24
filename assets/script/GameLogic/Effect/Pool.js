

var pool = {
    pools : null,
    init(){
        this.pools = new Array();
    },
    create : function(name){
        this.pools[name] = new Array();
    },
    hasOwnProperty : function(name){
        return this.pools.hasOwnProperty(name);
    },
    get : function(name){
        if(this.pools.hasOwnProperty(name))
        {
            for(var i =0;i<this.pools[name].length;i++)
            {
                if(!this.pools[name][i]._active)
                {
                    this.pools[name][i]._active = true;
                    return this.pools[name][i];
                }
            }
            return null;
        }
        else
        {
            cc.error('putEffect not found effect name = ',name);
        }
    },
    put : function(name,item){
        if(this.pools.hasOwnProperty(name))
        {
            this.pools[name].push(item);
        }
        else
        {
            cc.error('putEffect not found effect name = ',name);
        }
    },
    clear : function(){
        for(var i in this.pools)
        {

        }
    }
}

module.exports = pool;