//
// Auto Generated Code
//

// Generate From Tutorial.xlsx
module.exports = {
	1000: {
		ID: 1000,
		Value: '拖拽攻击牌到目标身上释放技能',
		Position: {"x":0,"y":-20},
		Scale: {"x":350,'y':180},
		Event: {"finish":{"target":"owner","action":"useCard","cardID":1}},
		Direction: 2,
		LeastAppear: 3
	},
	1001: {
		ID: 1001,
		Value: '敌方气血为0，战斗胜利。',
		Position: {"x":170,'y':270},
		Scale: {"x":350,'y':180},
		Event: {},
		Direction: 2,
		LeastAppear: 3
	},
	1002: {
		ID: 1002,
		Value: '每7秒获得一张新卡牌。',
		Position: {"x":0,"y":-20},
		Scale: {"x":350,'y':180},
		Event: {},
		Direction: 2,
		LeastAppear: 3
	},
	1003: {
		ID: 1003,
		Value: '通常情况下，每3秒获得一点灵力。',
		Position: {"x":-322,"y":-200},
		Scale: {"x":350,'y':180},
		Event: {},
		Direction: 3,
		LeastAppear: 3
	},
	1004: {
		ID: 1004,
		Value: '敌方使用蓄力攻击技能时，使用防御卡牌，向上拖拽松开对自身使用。',
		Position: {"x":0,"y":-20},
		Scale: {"x":350,'y':180},
		Event: {"trigger":{"target":"target","action":"useCard","cardID":101102},"finish":{"target":"owner","action":"useCard","cardID":2}},
		Direction: 2,
		LeastAppear: 3
	},
	1005: {
		ID: 1005,
		Value: '受到伤害时，先扣除防御，然后才是气血。',
		Position: {"x":-215,"y":250},
		Scale: {"x":350,'y':180},
		Event: {},
		Direction: 2,
		LeastAppear: 3
	},
	1006: {
		ID: 1006,
		Value: '自身气血为0，战斗失败。',
		Position: {"x":-150,"y":245},
		Scale: {"x":350,'y':180},
		Event: {},
		Direction: 2,
		LeastAppear: 3
	},
	1007: {
		ID: 1007,
		Value: '法术卡牌有不同的效果，在战斗中灵活运用才能击败对手。',
		Position: {},
		Scale: {},
		Event: {},
		Direction: 0,
		LeastAppear: 6
	},
	1008: {
		ID: 1008,
		Value: '消耗牌在一场战斗中只能使用一次，使用后进入消耗牌堆。',
		Position: {},
		Scale: {},
		Event: {},
		Direction: 0,
		LeastAppear: 6
	},
	1009: {
		ID: 1009,
		Value: '抽牌堆为空时，弃牌堆所有卡牌洗牌后重新进入抽牌堆。',
		Position: {},
		Scale: {},
		Event: {},
		Direction: 0,
		LeastAppear: 6
	},
	1010: {
		ID: 1010,
		Value: '点击此处，查看玩家自身状态。',
		Position: {},
		Scale: {},
		Event: {},
		Direction: 0,
		LeastAppear: 3
	},
	1011: {
		ID: 1011,
		Value: '敌方角色使用疗伤法术，恢复大量气血。',
		Position: {},
		Scale: {},
		Event: {},
		Direction: 0,
		LeastAppear: 4
	},
	1012: {
		ID: 1012,
		Value: '当前自身状态下，使用{CardName}卡牌，对敌方造成大量伤害。',
		Position: {},
		Scale: {},
		Event: {},
		Direction: 0,
		LeastAppear: 6
	},
	1013: {
		ID: 1013,
		Value: '使用一招制胜卡牌。',
		Position: {},
		Scale: {},
		Event: {},
		Direction: 0,
		LeastAppear: 3
	},
};
