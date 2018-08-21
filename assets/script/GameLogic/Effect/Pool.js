var pool = {
    pools : null,
    init(){
        this.pools = new Array();
    },
    create : function(name){
        if(!this.pools.hasOwnProperty(name))
            this.pools[name] = new Array();
    },
    hasOwnProperty : function(name){
        return this.pools.hasOwnProperty(name);
    },
    get : function(name){
        if(this.pools.hasOwnProperty(name))
        {
            if(name == '')
            {
                cc.log('asdasdad');
            }

            for(var i =0;i<this.pools[name].length;i++)
            {
                var pool = this.pools[name][i];
                
                if(!pool._active)
                {
                    pool._active = true;
                    return pool;
                }
            }

            return null;
        }
        else
        {
            cc.error('putEffect not found effect name = ',name);
        }
    },      //木刃层级专属
    getPos : function(value,pos)
    {
        var name = value;

        if(pos.y > 300)
        {
            name = name + 'f';
        }
        else {
            name = name + 'b';
        }

        if(this.pools.hasOwnProperty(name))
        {
            for(var i =0;i<this.pools[name].length;i++)
            {
                var pool = this.pools[name][i];
                
                if(!pool._active)
                {
                    pool._active = true;
                    return pool;
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
            for(var z in this.pools[i])
            {
                this.pools[i][z].node.destroy();
                delete this.pools[i][z];
            }
            delete this.pools[i];
        }
    }
}

module.exports = pool;