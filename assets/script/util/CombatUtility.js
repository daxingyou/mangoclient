var constant = require('constants');

/*
ALL : "all",
RANDOM : "random",
SINGEL: "singel",
LowHP:"lowHP",
SELF:"self",
None:"",

    Team : {
        own : 0,
        enemy : 1,
    },
*/

var CombatUtility = {
    ////当前玩家操作，获取显示目标
     getTargets : function(targetData,combat){
         if(targetData.type == constant.SkillTargetType.SINGEL)
         {
             if(targetData.team == constant.Team.own)
             {
                 return combat.own;
             }
             else if(targetData.team == constant.Team.enemy)
             {
                return combat.enemy;
             }
         }
         else if(targetData.type == constant.SkillTargetType.ALL)
         {
             if(targetData.team == constant.Team.own)
             {
                 return combat.own;
             }
             else if(targetData.team == constant.Team.enemy)
             {
                return combat.enemy;
             }
         }
         else if(targetData.type == constant.SkillTargetType.SELF)
         {
            return combat.getSelf();
         }
         else if(targetData.type == constant.SkillTargetType.LowHP)
         {
            var result = null;
            var temp = 99999999999;
            if(targetData.team == constant.Team.own)
            {
                for(var i in combat.own)
                {
                    if(combat.own[i].HP < temp)
                    {
                        temp = combat.own[i].HP;
                        result = temp;
                    }
                }
            }
            else if(targetData.team == constant.Team.enemy)
            {
                for(var i in combat.enemy)
                {
                    if(combat.enemy[i].HP < temp)
                    {
                        temp = combat.enemy[i].HP;
                        result = temp;
                    }
                }
            }

            return result;
         }
     },
     getEnemys : function(target){
        if(target.teamid == target.curCombat.getSelf().teamid)
        {
            return target.curCombat.enemy;
        }
        else{
            return target.curCombat.own;
        }
     }
}

module.exports = CombatUtility;