module.exports = {
    ///战斗类型
    CombatType :{
        PVECombat :1,
    },
    ///数据资源路径
    DataResPath : {
        dungeon:'data/Dungeon',
        scene:'data/Scene',
        monster:'data/Monster',
        group:'data/Group',
        matrix:'data/Matrix',
        action:'data/Action',
        skill:'data/Skill',
        hero:'data/Hero',
        card:'data/Card',
    },
    ///技能类型
    AbilityType :{
        Attack : 1,
        sing : 2,
        passive : 3,
    },
    ///技能目标类型
    SkillTargetType : {
        ALL : "all",
        RANDOM : "random",
        SINGEL: "singel",
        CONDITION:"condition",
        SELF:"self",
    },
    Team : {
        own : 0,
        enemy : 1,
    },
    mixTime : 0.1,
};