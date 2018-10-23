const constant = require('constants')
var combatMgr = require('CombatMgr')
var utility = require('utility')
var effectMgr = require('EffectMgr')
var EventEmitter = require('events').EventEmitter;

var SpawnSummoned = {
    summoneds : [],
    index : 0,
    type2Nums: {},
    seed: 0,
    event: new EventEmitter(),
    create : function(data){
        if (!this.type2Nums[data.type]) {
            this.type2Nums[data.type] = {};
        }
        this.type2Nums[data.type][data.area] = (this.type2Nums[data.type][data.area] || 0) + data.num;
        this.event.emit("spawnSummonChange");

        if(combatMgr.curCombat.summonedMgr == null)
            combatMgr.curCombat.summonedMgr = this;

        for(var i = 0;i<data.addList.length;i++)
        {
            var pos =  data.addList[i].area;
            var rangelist = null;
            var range = null;

            if(data.groupId == "groupA")
            {
                rangelist = combatMgr.curCombat.monsterMatrix.Range.groupA;
            }
            else if(data.groupId == "groupB")
            {
                rangelist = combatMgr.curCombat.monsterMatrix.Range.groupB;
            }

    
            if(pos == 1)
            {
                range = rangelist.Range1;
            }
            else if(pos == 2)
            {
                range = rangelist.Range2;
            }
            else if(pos == 3)
            {
                range = rangelist.Range3;
            }
    
            Math.seed = this.seed - this.getSummonNum(pos) * 7;
            var x = Math.seededRandomInt(range.x1, range.x2);
            var y = Math.seededRandomInt(range.y1, range.y2);
    
            if(data.type == constant.SummonedType.wSword)
            {
                effectMgr.geBezierEffect('chenjinchou',new cc.Vec2(1100,310),new cc.Vec2(x,y),5,'wsword_bounce',0,()=>{
                    this.summoneds.push(effectMgr.getWswordEffect('sword',new cc.Vec2(x,y),0));
                });
    
                combatMgr.curCombat.summoneds = this.summoneds;
            }
        }

        /*
            "onAddSpawnSummon": {
            "required string groupId": 1,
            "required string type": 2,
            "message AreaInfo": {
            "required uInt32 area": 1,
            "required uInt32 num": 2
            },
            "repeated AreaInfo addList": 3
        },
        
        //var area = null;

        //if(data.area == 1)
        //{
        //    area = combatMgr.curCombat.monsterMatrix.Area1;
        //}else if(data.area == 2)
        //{
        //    area = combatMgr.curCombat.monsterMatrix.Area2;
        //}else if(data.area == 3)
        //{
        //    area = combatMgr.curCombat.monsterMatrix.Area3;
        //}

        //var index = utility.RandomSeedInt(0,area.length-1);
        //// 最大只填了3
        //if(index > 3)
        //   index = 3;

        var pos =  data.area;
        var range = null;

        if(pos == 1)
        {
            range = combatMgr.curCombat.monsterMatrix.Range1;
        }
        else if(pos == 2)
        {
            range = combatMgr.curCombat.monsterMatrix.Range2;
        }
        else if(pos == 3)
        {
            range = combatMgr.curCombat.monsterMatrix.Range3;
        }

        // var x = utility.RandomSeedInt(range.x1,range.x2);
        // var y = utility.RandomSeedInt(range.y1,range.y1);
        Math.seed = this.seed - this.getSummonNum(data.type) * 7;
        var x = Math.seededRandomInt(range.x1, range.x2);
        var y = Math.seededRandomInt(range.y1, range.y2);

        if(data.type == constant.SummonedType.wSword)
        {
            effectMgr.geBezierEffect('chenjinchou',new cc.Vec2(1100,310),new cc.Vec2(x,y),5,'wsword_bounce',0,()=>{
                this.summoneds.push(effectMgr.getWswordEffect('sword',new cc.Vec2(x,y),0));
            });

            combatMgr.curCombat.summoneds = this.summoneds;
        }
        */
    },
    Reset(data){
        this.type2Nums[constant.SummonedType.wSword] = data;
        this.event.emit("spawnSummonChange");
        //cc.log('script debug data = ',data);

        var list = new Array();

        var first = data[1];
        var second = data[2];
        var thrid = data[3];

        var length = first + second + thrid;
        var min = 1;
        var max = 3;


        while(length > 0)
        {
            if(first == 0)
            {
                if(second == 0)
                {
                    min = 3;
                }
                else
                {
                    min = 2;
                }
            }

            if(thrid == 0)
            {
                if(second == 0)
                {
                    max = 1;
                }
                else
                {
                    max = 2;
                }
            }

            var index = 0;
            if(min == max)
                index = min;
            else
            {
                index = utility.RandomSeedInt((min-1)*100,(max)*100);
                //cc.log('script debug RandomSeedInt  min = ',min,' max = ',max,' index = ',index);
                index = index%3+1;
            }

            if(index == 1)
            {
                first--;
                list.push(1);
            }
            else if(index == 2)
            {
                second--;
                list.push(2);
            }
            else if(index == 3)
            {
                thrid--;
                list.push(3);
            }

            length = first + second + thrid;
        }

        //cc.log('script debug list = ',list);

        for(var i in list)
        {
            var range = null;
            if(list[i] == 1)
            {
                range = combatMgr.curCombat.monsterMatrix.Range1;
            }
            else if(list[i] == 2)
            {
                range = combatMgr.curCombat.monsterMatrix.Range2;
            }
            else if(list[i] == 3)
            {
                range = combatMgr.curCombat.monsterMatrix.Range3;
            }

            Math.seed = this.seed - i * 7;
            // var x = utility.RandomSeedInt(range.x1,range.x2);
            // var y = utility.RandomSeedInt(range.y1,range.y2);
            var x = Math.seededRandomInt(range.x1, range.x2);
            var y = Math.seededRandomInt(range.y1, range.y2);
    
           //cc.log('script debug cur num = ',list[i],' cur pos = x ',x,' y=',y,' range.x1 =',range.x1,' range.x2 =',range.x2,' range.y1 =',range.y1,' range.y2 =',range.y2);

            effectMgr.geBezierEffect('chenjinchou',new cc.Vec2(1100,310),new cc.Vec2(x,y),5,'wsword_bounce',0,(curPos)=>{
                this.summoneds.push(effectMgr.getWswordEffect('sword',curPos,0));

                //cc.log('script debug cur EffectMgr pos = ',curPos);
            });
        }
    },      //回收召唤物
    collect(damage){
        this.type2Nums[constant.SummonedType.wSword] = {};
        this.event.emit("spawnSummonChange");

        this.index = 0;
        ///当前一轮的伤害
        this.damage = damage;
        for(var i =0;i<this.summoneds.length;i++)
        {
            this.summoneds[i].showCollect(this.ShowDamage);
        }
        
    },   
    collectItem(){
        if(this.summoneds[a].node.position.y >= 300)
        {
            effectMgr.putEffect('swordf',this.summoneds[0]);
        }
        else{
            effectMgr.putEffect('swordb',this.summoneds[0]);
        }
        this.summoneds.splice(0,1);
        
        combatMgr.curCombat.summoneds = this.summoneds;
    },
    collectAll(){
        this.Release();
        combatMgr.curCombat.summoneds = this.summoneds;
    },
       //木刃回收跳伤害
    ShowDamage(){
        for(var i in this.damage) 
        {
            var target = combatMgr.curCombat.units[i];

            for(var z in this.damage[i])
            {
                if(z == this.index)
                {
                    var value = this.damage[i];

                    this.uimgr.loadDmg(target, value[z], true,this.damage['caster']);
                }
            }
        }
        
        this.index++;
    },
    Release(){
        for(var a =0;a<this.summoneds.length;a++)
        {
            if(this.summoneds[a] instanceof cc.Component)
            {
                var name = 'sword';
                if(this.summoneds[a].node.position.y >= 300)
                {
                    effectMgr.putEffect('swordf',this.summoneds[a]);
                }
                else{
                    effectMgr.putEffect('swordb',this.summoneds[a]);
                }
            }
                
        }
        this.summoneds.splice(0,this.summoneds.length);
    },
    getSummonNum (type) {
        var summons = this.type2Nums[type];
        if (!summons)
            return 0;
        var total = 0;
        for (var area in summons) {
            total += summons[area];
        }
        return total;
    },
    reset () {
        this.type2Nums = {};
    }
}
module.exports = SpawnSummoned;