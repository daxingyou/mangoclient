/**
 * Date: 2018/6/11
 * Author: liuguolai
 * Description: 常量文件
 */
module.exports = {
    Code: {
        OK: 1,
        FAIL: 0
    },

    Login: {
        OK: 200,
        RELAY: 201,
        FAIL: 500
    },

    CheckInResult: {
        SUCCESS: 0,  // 成功
        ALREADY_ONLINE: 1,  // 已经在线
    },

    // 匹配类型
    MatchType: {
        PVE_1: "PVE_1",  // 单人PVE
        PVE_2: "PVE_2",
        PVE_3: "PVE_3",
        PVP: "PVP"
    },

    // 匹配错误码
    MatchCode: {
        OK: 1,
        IN_QUEUE: 2,
    },

    // 选择英雄错误码
    SelectHeroCode: {
        OK: 1,
        BE_SELECEED: 2,  // 已被选
        NOT_EXIST: 3,  // 没有该英雄
        ALREADY_CONFIRMED: 4  // 已经确认了
    },

    // 战斗常量
    Fight: {
        CARDS_IN_HAND_MAX: 8,  // 手牌上限
        MP_MAX: 10,  // 灵力上限
    },

    // 战斗错误码
    FightCode: {
        OK: 1,
        PLAY_CARD_INFO_ERR: -1,  // 卡牌信息错误
        MP_NOT_ENOUGH: -2,  // 灵力不足
        THEW_NOT_ENOUGH: -3,  // 体力不足
        ALREADY_DEAD: -4,  // 已经死亡
        // 技能
        SKILL_NOT_FOUND: -10,  // 技能不存在
        SKILL_TARGET_ERR: -11,  // 对象错误
        SKILL_IN_PREPARE: -12,  // 吟唱和抬手准备中
    },

    // 卡牌属性定义
    CardAttri: {
        NORMAL_CARD: 1,  // 非消耗
        CONSUME_CARD: 2, // 消耗卡牌
        PERMANENT_CONSUME_CARD: 3,  // 永久消耗卡牌
        INHERENT_CARD: 4,  // 固有
    },

    // 技能常量
    Skill: {
        TYPE_All: "all",  // 全体目标
        TYPE_RANDOM: "random",  // 随机目标
        TYPE_SINGLE: "single",  // 单体
        TYPE_SELF:  "self",  // 自身
        TYPE_LOWHP: "lowHP",  // 血量最低
        TYPE_OUTSIDE_ITSELF: "outsideItself",  // 除自身外的其他单位

        TEAM_FRIEND: 0,  // 友方
        TEAM_ENEMY: 1,  // 敌方
    },

    // buff
    Buff: {
        BUFF_PERMANENT: -1,  // 永久buff的endTime
    },

    // 牌堆
    PileType: {
        CARDS: 1,  // 抽牌堆
        DISCARDS: 2,  // 弃牌堆
        EXHAUSTS: 3,  // 消耗牌堆

        MAX: 3
    },

    // 对象状态
    State: {
        ALIVE: 1,  // 存活
        DIE: 2,  // 死亡
    },

    // 战斗结果
    FightResult: {
        WIN: 1,  // 胜
        LOSE: 2,  // 负
        DRAW: 3  // 平
    },

    // 副本状态
    DungeonStatus: {
        END: 1,  // 已经完结
        IN_SELECT_HERO: 2,  // 选角中
        IN_BEFORE_LOAD_CD: 3,  // 加载前倒计时
        IN_LOAD: 4,  // 加载中
        IN_FIGHT: 5,  // 战斗中
    }
}