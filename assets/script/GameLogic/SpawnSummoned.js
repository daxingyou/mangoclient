const constant = require('constants')
var combatMgr = require('CombatMgr')
var utility = require('utility')

var SpawnSummoned = {
    create : function(data){
        var area = null;

        if(data.area == 1)
        {
            area = combatMgr.curCombat.matrix.Area1;
        }else if(data.area == 2)
        {
            area = combatMgr.curCombat.matrix.Area2;
        }else if(data.area == 3)
        {
            area = combatMgr.curCombat.matrix.Area3;
        }

        var index = utility.RandomInt(0,area.length-1);
        //// 最大只填了3
        if(index > 3)
            index = 3;

        var pos =  area[index];
        var range = null;

        if(pos == 1)
        {
            range = combatMgr.curCombat.matrix.Range1;
        }
        else if(pos == 2)
        {
            range = combatMgr.curCombat.matrix.Range2;
        }
        else if(pos == 3)
        {
            range = combatMgr.curCombat.matrix.Range3;
        }

        var x = utility.RandomInt(range.x1,range.x2);
        var y = utility.RandomInt(range.y1,range.y2);

        if(data.type == constant.SummonedType.wSword)
        {

        }
    }
}
module.exports = SpawnSummoned;