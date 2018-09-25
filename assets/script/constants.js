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
        Match : {"id":2,"path":'UI/match/match',"type":5,"script":"match"},
        Tips : {"id":4,"path":'UI/tips/Tips','type':3,"script":'tips'},
        Fight : {"id":5,"path":"UI/fightUI/FightUI",'type':1,'script':'FightUI'},
        FightCard : {"id":6,"path":'UI/fightUI/Card','type':2,'script':'CardItem'},
        SelectServer : {"id":7,"path":'UI/selectServer/selectServer','type':1,'script':'selectServer'},
        FightOver : {"id":8,"path":'UI/FightOver/FightOverUI','type':1,'script':'FightOver'},
        loadProjess: {"id":9,"path":'UI/loadProjess/loadProjess','type':5,'script':'loadProjess'},
        Main: {"id":10,"path":'UI/mainUI/mainUI','type':1,'script':'main'},
        Friend : {"id":11,"path":'UI/Friend/Friend','type':1,'script':'FriendUI'},
        FightPavTop: {"id":12,"path":'UI/fightPav/top','type':2,'script':'top'},
        ShowList: {"id":13,"path":'UI/fightPav/showList','type':1,'script':'showList'},
        TeamPattern: {"id":14,"path":'UI/fightPav/teamPattern','type':1,'script':'teamPattern'},
        MatchSucess: {"id":15,"path":'UI/fightPav/matchSucess','type':1,'script':'matchSucess'},
        PickHero: {"id":16,"path":'UI/fightPav/pickHero','type':1,'script':'pickHero'},
        Load: {"id":17,"path":'UI/fightPav/load','type':1,'script':'load'},
        PileKu: {"id":18,"path":'UI/fightPav/pileKu','type':1,'script':'pileKu'},
        Store: {"id":19,"path":'UI/fightPav/store','type':1,'script':'store'},
        Treasure: {"id":20,"path":'UI/fightPav/treasure','type':1,'script':'treasure'},
        ComfirmCard: {"id":21,"path":'UI/fightPav/comfirmCard','type':1,'script':'comfirmCard'},

        PopupTips: {"id":22,"path":'UI/tips/popupTips','type':3,"script":'popupTips'},
    },
    SummonedType : {
        wSword : 'wSword',
    },
    EffectPath : 'Effect/',
    EffectType : {
        Bullt:'bullt',
        Point:'point',
        SwordWheel:'swordwheel',
    },
    EffectOrigin : {
        target:'target',
        onwer:'owner',
        onwerAll:'onwerAll',
        enemyAll:'enemyAll',
        ownerCenter:'ownerCenter',
        targetCenter:'targetCenter',
    },
    mixTime : 0.1,
    FightCode : {
        1 : '卡牌信息错误',
        2 : '灵力不足',
        3 : '体力不足',
        4 : '已经死亡',
        10 : '技能不存在',
        11 : '已经死亡',
        12 : '已经死亡',
    },
    dmg : {
        dmgGreen: 'dmgGreen',
        dmgRed: 'dmgRed',
        dmgWhite: 'dmgWhite'
    },
    // 战斗飘字类型
    CombatWordType: {
        CAUSE_DAMAGE: 1,  // 造成伤害
        GET_DAMAGE: 2,  // 受到伤害
        CAUSE_HEAL: 3,  // 造成治疗
        GET_HEAL: 4,  // 受到治疗
    },
    MessageType : {
        Show : 'Show',
        Hide : 'Hide',
        Clear : 'Clear',
        GetIcon : 'GetIcon',
        GetName : 'GetName'
    }
};