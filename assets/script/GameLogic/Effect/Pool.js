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
            var zindex = this.sortSword(this.pools[name],pos);
            for(var i =0;i<this.pools[name].length;i++)
            {
                var pool = this.pools[name][i];
                
                if(!pool._active)
                {
                    pool._active = true;
                    pool.zIndex = zindex;
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
    },
    sortSword(noods,pos){
        ///收集被激活
        var list = new Array();
        for(var i =0;i<noods.length;i++)
        {
            if(noods[i]._active)
            {
                list.push(i);
            }
        }

        ///排序
        for(var i =0;i<list.length;i++)
        {
            for(var z =1;z<list.length;z++)
            {
                if(this.caputeCurPos(noods[list[i]]) < this.caputeCurPos(noods[list[z]]))
                {
                    var temp = list[i];
                    list[i] = list[z];
                    list[z] = temp;
                }
            }
        }

        var index = -1;
        //拆入位置
        for(var i =0;i<list.length;i++)
        {
            noods[list[i]].node.zIndex = i;
            if(this.caputeCurPos(noods[list[i]]) > pos.y && index == -1)
            {
                index = i;
            }

            if(index > -1)
            {
                noods[list[i]].node.zIndex = i + 1;
            }
        }

        return i;
    },
    caputeCurPos(Sword){
        var result = Sword.node.y;
        var value = Sword._left - Sword._right;

        if(Sword._left + Sword._right > 1)
        {
            result += Math.abs(value) / 2 * 110;
        }
        else if(Sword._left + Sword._right < 1)
        {
            result -= Math.abs(value) / 2 * 110;
        }

        return result;
    }
}

module.exports = pool;