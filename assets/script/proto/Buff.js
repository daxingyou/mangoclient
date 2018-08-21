//
// Auto Generated Code
//

// Generate From Buff.xlsx
module.exports = {
	2: {
		ID: 2,
		BuffName: '护甲',
		Description: '增加80点护甲，持续15秒',
		Type: 'addArm',
		Logic: {arm:80},
		SkillID: 0,
		IsHide: 0,
		Image: 'buff1',
		Effect: ''
	},
	1002: {
		ID: 1002,
		BuffName: '护甲',
		Description: '增加15点护甲，持续15秒',
		Type: 'addArm',
		Logic: {arm:15},
		SkillID: 0,
		IsHide: 0,
		Image: 'buff2',
		Effect: ''
	},
	1004: {
		ID: 1004,
		BuffName: '剑灵乱舞',
		Description: '每使用1张卡牌，对随机一个敌方单位造成20点伤害',
		Type: 'useCardListener',
		Logic: {"num":1,"cardType":1},
		SkillID: 1104,
		IsHide: 0,
		Image: 'buff3',
		Effect: ''
	},
	1005: {
		ID: 1005,
		BuffName: '横剑摆渡',
		Description: '每使用5张攻击牌，则抽取1张牌',
		Type: 'useCardListener',
		Logic: {"num":5,"cardType":1},
		SkillID: 1105,
		IsHide: 0,
		Image: 'buff1',
		Effect: ''
	},
	2004: {
		ID: 2004,
		BuffName: '万物复苏',
		Description: '每秒恢复60点生命，持续4秒',
		Type: 'heal',
		Logic: {"heal":60,"count":4,"time":1},
		SkillID: 0,
		IsHide: 0,
		Image: 'buff2',
		Effect: ''
	},
	2005: {
		ID: 2005,
		BuffName: '女娲体质',
		Description: '受到单次超过150点伤害的攻击，则抽1张卡牌',
		Type: 'damageListener',
		Logic: {dmg:150},
		SkillID: 2105,
		IsHide: 0,
		Image: 'buff3',
		Effect: ''
	},
	2007: {
		ID: 2007,
		BuffName: '地灵庇护',
		Description: '如果有友方死亡，把自身一半的血量给予对方，此效果存在10秒消失',
		Type: 'dieListener',
		Logic: {target:"friend","count":1},
		SkillID: 2107,
		IsHide: 0,
		Image: 'buff1',
		Effect: ''
	},
	2008: {
		ID: 2008,
		BuffName: '女娲转世',
		Description: '每使用5张技能卡牌，为自己恢复2点灵力',
		Type: 'useCardListener',
		Logic: {"num":5,"cardType":2},
		SkillID: 2108,
		IsHide: 0,
		Image: 'buff2',
		Effect: ''
	},
	10002: {
		ID: 10002,
		BuffName: '猛击',
		Description: '增加40%受到的伤害',
		Type: 'modProp',
		Logic: {vulnerable:0.4},
		SkillID: 0,
		IsHide: 0,
		Image: 'buff3',
		Effect: ''
	},
	10003: {
		ID: 10003,
		BuffName: '巨浪',
		Description: '无法获取灵力，持续5秒',
		Type: 'recoverMpRate',
		Logic: {rate:0},
		SkillID: 0,
		IsHide: 0,
		Image: 'buff1',
		Effect: ''
	},
	10005: {
		ID: 10005,
		BuffName: '幻象',
		Description: '增加400%受到的伤害',
		Type: 'modProp',
		Logic: {vulnerable:4},
		SkillID: 0,
		IsHide: 0,
		Image: 'buff3',
		Effect: ''
	},
	10105: {
		ID: 10105,
		BuffName: '模型缩小',
		Description: '',
		Type: 'modPropPct',
		Logic: {scale:0.6},
		SkillID: 0,
		IsHide: 1,
		Image: '',
		Effect: ''
	},
};
