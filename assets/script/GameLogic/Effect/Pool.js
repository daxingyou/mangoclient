var pool = {
    pools : null,
    swordlist : null,
    init(){
        this.pools = new Array();
        this.swordlist = new Array();
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
            return this.sortSword(name,pos);
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
        this.swordlist.splice(0,this.swordlist.length);
    },
    sortSword(name,pos){
        var index = 0;
        ///排序
        for(var i =0;i<this.swordlist.length;i++)
        {
            this.caputeCurPos(this.swordlist[i]);
            if(this.swordlist[i].node.y > pos.y)
            {
                index = i;
            }
            else{
                index = i;
                break;
            }
        }

        for(var i =0;i<this.pools[name].length;i++)
        {
            var pool = this.pools[name][i];
            
            if(!pool._active)
            {
                pool._active = true;
                pool.node.zIndex = index;
                
                cc.log('script debug for index = ',index);

                this.swordlist.splice(index,0,pool);

                for(var i =0;i<this.swordlist.length;i++)
                {
                    cc.log('script debug cur noodes i = ',i,' pos =',this.swordlist[i].node.y);
                }

                return pool;
            }
        }

        for(var i =0;i<this.swordlist.length;i++)
        {
            this.swordlist[i].node.zIndex = i;
        }
    },
    caputeCurPos(Sword){
        var result = Sword.node.y;
        var value = Sword._left - Sword._right;

        if(Sword._left + Sword._right > 10)
        {
            result += Math.abs(value) * 74 / 10;
        }
        else if(Sword._left + Sword._right < 10)
        {
            result -= Math.abs(value)  * 74 / 10;
        }

        return result;
    }
}

module.exports = pool;