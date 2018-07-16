//
// Auto Generated Code
//

// Generate From Buff.xlsx
module.exports = {
	2: {
		ID: 2,
		BuffName: '护甲',
		Description: '增加60点护甲，持续5秒',
		Type: 'addArm',
		Logic: {arm:60},
		SkillID: 0,
		Image: '',
		Effect: ''
	},
	1002: {
		ID: 1002,
		BuffName: '护甲',
		Description: '增加15点护甲，持续5秒',
		Type: 'addArm',
		Logic: {arm:15},
		SkillID: 0,
		Image: '',
		Effect: ''
	},
	1004: {
		ID: 1004,
		BuffName: '剑灵乱舞',
		Description: '每使用1张卡牌，对随机一个敌方单位造成5点伤害',
		Type: 'listener',
		Logic: {event:"onUseCard","num":1,"cardType":1,"cardQuality":1,"cardAttributes":1},
		SkillID: 1104,
		Image: '',
		Effect: ''
	},
	1005: {
		ID: 1005,
		BuffName: '横剑摆渡',
		Description: '每使用5张攻击牌，则抽取1张牌',
		Type: 'listener',
		Logic: {event:"onUseCard","num":5,"cardType":2,"cardQuality":1,"cardAttributes":1},
		SkillID: 1105,
		Image: '',
		Effect: ''
	},
	2004: {
		ID: 2004,
		BuffName: '万物复苏',
		Description: '在4秒内恢复160点生命值',
		Type: 'poison',
		Logic: {event:"hot","heal":40,"count":4,"time":1},
		SkillID: 0,
		Image: '',
		Effect: ''
	},
	2005: {
		ID: 2005,
		BuffName: '女娲体质',
		Description: '受到单次超过150点伤害的攻击，则抽1张卡牌',
		Type: 'listener',
		Logic: {event:"onDamage","dmg":150},
		SkillID: 2105,
		Image: '',
		Effect: ''
	},
	2007: {
		ID: 2007,
		BuffName: '地灵庇护',
		Description: '如果有友方死亡，把自身一半的血量给予对方，此效果存在10秒消失',
		Type: 'listener',
		Logic: {event:"onDie","target":"friend","time":10},
		SkillID: 2107,
		Image: '',
		Effect: ''
	},
	2008: {
		ID: 2008,
		BuffName: '女娲转世',
		Description: '每当抽取1张卡牌，为自己恢复20点生命值',
		Type: 'listener',
		Logic: {event:"onDrawCard","num":1,"cardType":1,"cardQuality":1,"cardAttributes":1,"piletype":1},
		SkillID: 2108,
		Image: '',
		Effect: ''
	},
};
