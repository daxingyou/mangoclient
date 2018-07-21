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
        skill:'data/Skill',
        hero:'data/Hero',
        card:'data/Card',
        heroAttributes:'data/HeroAttributes',
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
        SINGEL: "single",
        LowHP:"lowHP",
        SELF:"self",
        None:"",
    },
    ///技能触发条件
    SkillActiveType :{
        ////被击监控
        OnDamage : "onDamage",
        ///死亡监控
        OnDie:"onDie",
        ///抽牌监控
        OnDrawPile:"onDrawPile",
        ///用牌监控
        OnUsePile:"onUsePile"
    },
    Team : {
        own : 0,
        enemy : 1,
    },
    UI : {
        DMG : {"id":3,"path":"UI/dmg/dmg","type":4,"script":"showDamge"},
        Login : {"id":1,"path":'UI/login/login',"type":1,"script":"loginUI"},
        Match : {"id":2,"path":'UI/match/match',"type":1,"script":"match"},
        Tips : {"id":4,"path":'UI/tips/Tips','type':3,"script":'tips'},
        Fight : {"id":5,"path":"UI/fightUI/FightUI",'type':1,'script':'FightUI'},
        FightCard : {"id":6,"path":'UI/fightUI/Card','type':2,'script':'CardItem'},
        SelectServer : {"id":7,"path":'UI/selectServer/selectServer','type':1,'script':'selectServer'}
    },
    SummonedType : {
        wSword : 'wSword',
    },
    EffectPath : 'Effect/',
    mixTime : 0.1,
};