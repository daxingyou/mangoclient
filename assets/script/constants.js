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
        Main: {"id":10,"path":'UI/mainUI/mainUI','type':1,'script':'main'},
        CommonTop: {"id":12,"path":'UI/common/top','type':2,'script':'top'},
        ShowList: {"id":13,"path":'UI/showList/showList','type':1,'script':'showList'},
        BuildTeam: {"id":14,"path":'UI/buildTeam/buildTeam','type':1,'script':'buildTeam'},
        MatchSucess: {"id":15,"path":'UI/matchSucceed/matchSucess','type':1,'script':'matchSucess'},
        
        Treasure: {"id":20,"path":'UI/treasure/treasure','type':1,'script':'treasure'},
        PopupTips: {"id":22,"path":'UI/tips/popupTips','type':3,"script":'popupTips'},
        RaidUI: {"id":24,"path":'UI/raidUI/raidUI','type':1,"script":'raidUI'},
        EnterSelectRaid: {"id":26,"path":'UI/soloRaid/enterSelectRaid','type':1,"script":'enterSelectRaid'},
        TeamSelectRaid: {"id":27,"path":'UI/teamRaid/teamSelectRaid','type':1,"script":'teamRaidSelectRaid'},
        TeamAwardCard: {"id":29,"path":'UI/teamRaid/awardCard','type':1,"script":'awardCard'},
        BagUI : {"id":30,"path":'UI/bag/BagUI','type':1,'script':'BagUI'},
        EmailUI :  {"id":31,"path":'UI/emailUI/emailUI','type':1,"script":'emailUI'},
        Shop :  {"id":33,"path":'UI/shop/ShopUI','type':1,"script":'ShopUI'},
        Hero :  {"id":34,"path":'UI/HeroUI/HeroUI','type':1,"script":'HeroUI', blurBg: true},
        CardGroup :  {"id":35,"path":'UI/cardGroup/cardGroup','type':1,"script":'cardGroup'},
        Tutorial : {"id":36,"path":'UI/tutorial/Tutorial','type':2,"script":'TutorialUI'},
        TutorialOver : {"id":37,"path":'UI/FightOver/TutorialFightOverUI','type':1,"script":'TutorialFightOver'},
        SelectCard : {"id":38,"path":'UI/cardGroup/selectCard','type':1,"script":'selectCard'},
        RecommendFriend : {"id":39,"path":'UI/Friend/recommendFriend','type':1,"script":'recommendFriend'},
        HotTips :{"id":40,"path":'UI/tips/hotTips','type':2,"script":'hotTips'},
        DropCard: {id: 41, path: 'UI/fightUI/dropCard', type: 2, script: 'dropCard'},
        Bubbling: {id: 42, path: 'UI/tutorial/bubbling', type: 2, script: 'Bubbling'},
        
        Friend: {"id":101,"path":'UI/Friend/Friend','type':1,'script':'FriendUI'},
        ApplyListPanel: {id: 102, path: 'UI/Friend/applyListPanel', type: 2, script: 'applyListPanel'},
        
        CombatLoading: {id: 110, path: 'UI/combatLoading/combatLoading', type: 5, script: 'combatLoading', blurBg: true},

        PickHero: {"id":120,"path":'UI/selectHero/pickHero','type':1,'script':'pickHero'},
        SinglePickHero: {id: 121, path: 'UI/selectHero/singlePickHero', type: 1, script: 'singlePickHero'},

        DpsPanel: {"id":999,"path":'UI/Debug/dpsPanel','type':3,'script':'dpsPanel'},
    },
    // Prefab: {
    //     selectServerItem: "UI/"
    // },
    SummonedType : {
        wSword : 'wSword',
    },
    EffectPath : 'Effect/',
    EffectType : {
        Bullt:'bullt',
        Point:'point',
        SwordWheel:'swordwheel',
        Bounce:'Bounce'
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
        GetName : 'GetName',

       // teamPattern:
    },
    debug: {
        autoDpsExport: false,
    },
    tutorialEvent :{
        begin :'begin',
        animation : 'animation',
        fightOver : 'fightOver',
    },
    tutorialState : {
        begin : 'begin',                            //战斗前开始
        fightting : 'fightting',                    //战斗中开始
        finish : 'finish',                          //战斗结束开始
    }
};