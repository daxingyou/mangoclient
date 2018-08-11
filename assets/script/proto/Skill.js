//
// Auto Generated Code
//

// Generate From Skill.xlsx
module.exports = {
	1: {
		1: {
			ID: 1,
			Index: 1,
			SkillName: '攻击',
			Target: {"type":"single","team":1,"singing":0.57},
			Actions: {damage:{"dmg":60}},
			Animation: 'attack_01',
			CriticalTime: 66,
			Effect: 'attack',
			EffectType: {"type":"bullt","origin":"target"},
			EffectiveTime: [151],
			Path: 'chenjinchou',
			HitEffect: 'hiteffect',
			HitEffectPath: 'chenjinchou'
		}
	},
	2: {
		1: {
			ID: 2,
			Index: 1,
			SkillName: '防御',
			Target: {"type":"single","team":0,"singing":0.7},
			Actions: {addBuff:{buffID:2,"time":15}},
			Animation: 'skill_01',
			CriticalTime: 66,
			Effect: '',
			EffectType: {},
			EffectiveTime: [],
			Path: 'chenjinchou',
			HitEffect: '',
			HitEffectPath: ''
		}
	},
	3: {
		1: {
			ID: 3,
			Index: 1,
			SkillName: '攻击',
			Target: {"type":"single","team":1,"singing":0.57},
			Actions: {damage:{"dmg":60}},
			Animation: 'attack_01',
			CriticalTime: 66,
			Effect: 'attack',
			EffectType: {"type":"bullt","origin":"target"},
			EffectiveTime: [151],
			Path: 'yuxiaoxue',
			HitEffect: 'hiteffect',
			HitEffectPath: 'yuxiaoxue'
		}
	},
	4: {
		1: {
			ID: 4,
			Index: 1,
			SkillName: '防御',
			Target: {"type":"single","team":0,"singing":0.7},
			Actions: {addBuff:{buffID:2,"time":15}},
			Animation: 'skill_01',
			CriticalTime: 66,
			Effect: '',
			EffectType: {},
			EffectiveTime: [],
			Path: 'yuxiaoxue',
			HitEffect: '',
			HitEffectPath: ''
		}
	},
	1001: {
		1: {
			ID: 1001,
			Index: 1,
			SkillName: '桃木刃',
			Target: {"type":"single","team":1,"singing":0.7},
			Actions: {damage:{"dmg":25}},
			Animation: 'attack_02',
			CriticalTime: 66,
			Effect: 'wthorn',
			EffectType: {"type":"bullt","origin":"target"},
			EffectiveTime: [151],
			Path: 'chenjinchou',
			HitEffect: 'hiteffect',
			HitEffectPath: 'chenjinchou'
		},
		2: {
			ID: 1001,
			Index: 2,
			SkillName: '桃木刃',
			Target: {},
			Actions: {spawnSummoned:{"type":"wSword","num":1,"area":"random"}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: {},
			EffectiveTime: [],
			Path: '',
			HitEffect: '',
			HitEffectPath: ''
		}
	},
	1002: {
		1: {
			ID: 1002,
			Index: 1,
			SkillName: '木藤刺',
			Target: {"type":"single","team":1,"singing":0.7},
			Actions: {damage:{"dmg":60}},
			Animation: 'attack_02',
			CriticalTime: 66,
			Effect: 'wthorn',
			EffectType: {"type":"bullt","origin":"target"},
			EffectiveTime: [151],
			Path: 'chenjinchou',
			HitEffect: 'hiteffect',
			HitEffectPath: 'chenjinchou'
		},
		2: {
			ID: 1002,
			Index: 2,
			SkillName: '木藤刺',
			Target: {"type":"self","team":0},
			Actions: {addBuff:{buffID:1002,"time":15}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: {},
			EffectiveTime: [],
			Path: '',
			HitEffect: '',
			HitEffectPath: ''
		},
		3: {
			ID: 1002,
			Index: 3,
			SkillName: '木藤刺',
			Target: {},
			Actions: {spawnSummoned:{"type":"wSword","num":1,"area":"random"}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: {},
			EffectiveTime: [],
			Path: '',
			HitEffect: '',
			HitEffectPath: ''
		}
	},
	1003: {
		1: {
			ID: 1003,
			Index: 1,
			SkillName: '木剑雨',
			Target: {"type":"all","team":1,"singing":0.7},
			Actions: {damage:{"dmg":60}},
			Animation: 'attack_04',
			CriticalTime: 66,
			Effect: 'rainofsword',
			EffectType: {"type":"point","origin":"target"},
			EffectiveTime: [151],
			Path: 'chenjinchou',
			HitEffect: 'hiteffect',
			HitEffectPath: 'chenjinchou'
		},
		2: {
			ID: 1003,
			Index: 2,
			SkillName: '木剑雨',
			Target: {},
			Actions: {spawnSummoned:{"type":"wSword","numType":"hit","area":"random"}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: {},
			EffectiveTime: [],
			Path: '',
			HitEffect: '',
			HitEffectPath: ''
		}
	},
	1004: {
		1: {
			ID: 1004,
			Index: 1,
			SkillName: '剑灵乱舞',
			Target: {"type":"self","team":0,"singing":0.57},
			Actions: {addBuff:{"buffID":1004}},
			Animation: 'talent_01',
			CriticalTime: 66,
			Effect: 'ghostcard',
			EffectType: {"type":"point","origin":"owner"},
			EffectiveTime: [],
			Path: 'chenjinchou',
			HitEffect: '',
			HitEffectPath: ''
		}
	},
	1104: {
		1: {
			ID: 1104,
			Index: 1,
			SkillName: '剑灵乱舞',
			Target: {"type":"random","team":1},
			Actions: {damage:{"dmg":20}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: {},
			EffectiveTime: [],
			Path: '',
			HitEffect: '',
			HitEffectPath: ''
		}
	},
	1005: {
		1: {
			ID: 1005,
			Index: 1,
			SkillName: '横剑摆渡',
			Target: {"type":"self","team":0,"singing":0.57},
			Actions: {addBuff:{"buffID":1005}},
			Animation: 'talent_01',
			CriticalTime: 66,
			Effect: 'ghostcard',
			EffectType: {"type":"point","origin":"owner"},
			EffectiveTime: [],
			Path: 'chenjinchou',
			HitEffect: '',
			HitEffectPath: ''
		}
	},
	1105: {
		1: {
			ID: 1105,
			Index: 1,
			SkillName: '横剑摆渡',
			Target: {"type":"self","team":0},
			Actions: {normalDrawCard:{"num":1}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: {},
			EffectiveTime: [],
			Path: '',
			HitEffect: '',
			HitEffectPath: ''
		}
	},
	1006: {
		1: {
			ID: 1006,
			Index: 1,
			SkillName: '桃木刃匣',
			Target: {"type":"self","team":0,"singing":0.7},
			Actions: {create:{"cardID":1001,"num":3}},
			Animation: 'skill_01',
			CriticalTime: 66,
			Effect: 'ghostcard',
			EffectType: {"type":"point","origin":"owner"},
			EffectiveTime: [],
			Path: 'chenjinchou',
			HitEffect: '',
			HitEffectPath: ''
		}
	},
	1007: {
		1: {
			ID: 1007,
			Index: 1,
			SkillName: '枯木逢春',
			Target: {"type":"self","team":0,"singing":0.7},
			Actions: {normalDrawCard:{"num":2}},
			Animation: 'skill_01',
			CriticalTime: 66,
			Effect: 'ghostcard',
			EffectType: {"type":"point","origin":"owner"},
			EffectiveTime: [],
			Path: 'chenjinchou',
			HitEffect: '',
			HitEffectPath: ''
		},
		2: {
			ID: 1007,
			Index: 2,
			SkillName: '枯木逢春',
			Target: {},
			Actions: {spawnSummoned:{"type":"wSword","num":1,"area":"random","team":1}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: {},
			EffectiveTime: [],
			Path: '',
			HitEffect: '',
			HitEffectPath: ''
		}
	},
	1008: {
		1: {
			ID: 1008,
			Index: 1,
			SkillName: '取竹成剑',
			Target: {"type":"self","team":0,"singing":0.7},
			Actions: {normalDrawCard:{"num":1}},
			Animation: 'skill_01',
			CriticalTime: 66,
			Effect: 'ghostcard',
			EffectType: {"type":"point","origin":"owner"},
			EffectiveTime: [],
			Path: 'chenjinchou',
			HitEffect: '',
			HitEffectPath: ''
		},
		2: {
			ID: 1008,
			Index: 2,
			SkillName: '取竹成剑',
			Target: {},
			Actions: {spawnSummoned:{"type":"wSword","num":3,"area":"random","team":1}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: {},
			EffectiveTime: [],
			Path: '',
			HitEffect: '',
			HitEffectPath: ''
		}
	},
	1009: {
		1: {
			ID: 1009,
			Index: 1,
			SkillName: '秋镰游刃',
			Target: {"type":"all","team":1,"singing":0.7},
			Actions: {reverse:{"type":"wSword","dmg":45,"consume":1}},
			Animation: 'attack_02',
			CriticalTime: 66,
			Effect: '',
			EffectType: {},
			EffectiveTime: [33],
			Path: '',
			HitEffect: '',
			HitEffectPath: ''
		}
	},
	1010: {
		1: {
			ID: 1010,
			Index: 1,
			SkillName: '映日剑轮',
			Target: {"type":"single","team":1,"singing":1.17},
			Actions: {swordWheel:{"type":"wSword","dmg":25,"consume":0}},
			Animation: 'attack_03',
			CriticalTime: 66,
			Effect: 'swordwheel',
			EffectType: {"type":"bullt","origin":"target"},
			EffectiveTime: [212,45,45,46,45,45,46],
			Path: 'chenjinchou',
			HitEffect: 'hiteffect',
			HitEffectPath: 'chenjinchou'
		}
	},
	2001: {
		1: {
			ID: 2001,
			Index: 1,
			SkillName: '气疗术',
			Target: {"type":"single","team":0,"singing":1.3},
			Actions: {heal:{"heal":240}},
			Animation: 'skill_01',
			CriticalTime: 66,
			Effect: 'healrain',
			EffectType: {"type":"point","origin":"target"},
			EffectiveTime: [434],
			Path: 'snow',
			HitEffect: 'hiteffect',
			HitEffectPath: 'snow'
		}
	},
	2002: {
		1: {
			ID: 2002,
			Index: 1,
			SkillName: '风沙甘霖术',
			Target: {"type":"single","team":0,"singing":1.3},
			Actions: {heal:{"heal":200}},
			Animation: 'skill_02',
			CriticalTime: 66,
			Effect: 'healrain',
			EffectType: {"type":"point","origin":"target"},
			EffectiveTime: [434],
			Path: 'snow',
			HitEffect: 'hiteffect',
			HitEffectPath: 'snow'
		},
		2: {
			ID: 2002,
			Index: 2,
			SkillName: '风沙甘霖术',
			Target: {"type":"self","team":0},
			Actions: {heal:{"heal":200}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: {},
			EffectiveTime: [],
			Path: '',
			HitEffect: '',
			HitEffectPath: ''
		}
	},
	2003: {
		1: {
			ID: 2003,
			Index: 1,
			SkillName: '唤魂咒',
			Target: {"type":"single","team":0,"dead":1,"singing":1.3},
			Actions: {reliveTarget:{"heal":100}},
			Animation: 'skill_02',
			CriticalTime: 66,
			Effect: 'heallight',
			EffectType: {"type":"point","origin":"target"},
			EffectiveTime: [434],
			Path: 'snow',
			HitEffect: 'hiteffect',
			HitEffectPath: 'snow'
		}
	},
	2004: {
		1: {
			ID: 2004,
			Index: 1,
			SkillName: '万物复苏',
			Target: {"type":"all","team":0,"singing":1.3},
			Actions: {addBuff:{"buffID":2004}},
			Animation: 'skill_03',
			CriticalTime: 66,
			Effect: 'healrain',
			EffectType: {"type":"point","origin":"target"},
			EffectiveTime: [434],
			Path: 'snow',
			HitEffect: 'hiteffect',
			HitEffectPath: 'snow'
		},
		2: {
			ID: 2004,
			Index: 2,
			SkillName: '万物复苏',
			Target: {"type":"lowHP","team":0},
			Actions: {addBuff:{"buffID":2004}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: {},
			EffectiveTime: [],
			Path: '',
			HitEffect: '',
			HitEffectPath: ''
		}
	},
	2005: {
		1: {
			ID: 2005,
			Index: 1,
			SkillName: '女娲体质',
			Target: {"type":"self","team":0,"singing":1.3},
			Actions: {addBuff:{"buffID":2005}},
			Animation: 'talent_01',
			CriticalTime: 66,
			Effect: '',
			EffectType: {},
			EffectiveTime: [],
			Path: '',
			HitEffect: '',
			HitEffectPath: ''
		}
	},
	2105: {
		1: {
			ID: 2105,
			Index: 1,
			SkillName: '女娲体质',
			Target: {"type":"self","team":0},
			Actions: {getMP:{"MP":1}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: {},
			EffectiveTime: [],
			Path: '',
			HitEffect: '',
			HitEffectPath: ''
		}
	},
	2006: {
		1: {
			ID: 2006,
			Index: 1,
			SkillName: '释放灵力',
			Target: {"type":"self","team":0,"singing":1.3},
			Actions: {normalDrawCard:{"num":2}},
			Animation: 'skill_04',
			CriticalTime: 66,
			Effect: '',
			EffectType: {},
			EffectiveTime: [],
			Path: '',
			HitEffect: '',
			HitEffectPath: ''
		},
		2: {
			ID: 2006,
			Index: 2,
			SkillName: '释放灵力',
			Target: {"type":"self","team":0},
			Actions: {damage:{"dmg":120}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: {},
			EffectiveTime: [],
			Path: '',
			HitEffect: '',
			HitEffectPath: ''
		}
	},
	2007: {
		1: {
			ID: 2007,
			Index: 1,
			SkillName: '地灵庇护',
			Target: {"type":"self","team":0,"singing":1.3},
			Actions: {addBuff:{"buffID":2007,"time":10}},
			Animation: 'talent_01',
			CriticalTime: 66,
			Effect: '',
			EffectType: {},
			EffectiveTime: [],
			Path: '',
			HitEffect: '',
			HitEffectPath: ''
		}
	},
	2107: {
		1: {
			ID: 2107,
			Index: 1,
			SkillName: '地灵庇护',
			Target: {"type":"single","team":0},
			Actions: {reliveTarget:{"ownPercent":0.5}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: {},
			EffectiveTime: [],
			Path: '',
			HitEffect: '',
			HitEffectPath: ''
		}
	},
	2008: {
		1: {
			ID: 2008,
			Index: 1,
			SkillName: '女娲转世',
			Target: {"type":"self","team":0,"singing":1.3},
			Actions: {addBuff:{"buffID":2008}},
			Animation: 'talent_01',
			CriticalTime: 66,
			Effect: '',
			EffectType: {},
			EffectiveTime: [],
			Path: '',
			HitEffect: '',
			HitEffectPath: ''
		}
	},
	2108: {
		1: {
			ID: 2108,
			Index: 1,
			SkillName: '女娲转世',
			Target: {"type":"self","team":0},
			Actions: {getMP:{"MP":2}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: {},
			EffectiveTime: [],
			Path: '',
			HitEffect: '',
			HitEffectPath: ''
		}
	},
	2009: {
		1: {
			ID: 2009,
			Index: 1,
			SkillName: '涛澜动地',
			Target: {"type":"single","team":1,"singing":1.3},
			Actions: {damage:{"dmg":150}},
			Animation: 'attack_02',
			CriticalTime: 66,
			Effect: 'groundfire',
			EffectType: {"type":"bullt","origin":"target"},
			EffectiveTime: [66],
			Path: 'snow',
			HitEffect: 'hiteffect',
			HitEffectPath: 'snow'
		},
		2: {
			ID: 2009,
			Index: 2,
			SkillName: '涛澜动地',
			Target: {"type":"self","team":0},
			Actions: {damage:{"dmg":30}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: {},
			EffectiveTime: [],
			Path: '',
			HitEffect: '',
			HitEffectPath: ''
		}
	},
	2010: {
		1: {
			ID: 2010,
			Index: 1,
			SkillName: '石破惊天',
			Target: {"type":"single","team":1,"singing":1.3},
			Actions: {damage:{"dmg":100}},
			Animation: 'attack_02',
			CriticalTime: 66,
			Effect: 'aerolite',
			EffectType: {"type":"bullt","origin":"target"},
			EffectiveTime: [333],
			Path: 'snow',
			HitEffect: 'hiteffect',
			HitEffectPath: 'snow'
		},
		2: {
			ID: 2010,
			Index: 2,
			SkillName: '石破惊天',
			Target: {"type":"single","team":1},
			Actions: {damage:{"dmg":100}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: {},
			EffectiveTime: [],
			Path: '',
			HitEffect: '',
			HitEffectPath: ''
		}
	},
	10001: {
		1: {
			ID: 10001,
			Index: 1,
			SkillName: '扫尾',
			Target: {"type":"single","team":1,"singing":0.4},
			Actions: {damage:{"dmg":90}},
			Animation: 'attack_01',
			CriticalTime: 66,
			Effect: '',
			EffectType: {},
			EffectiveTime: [],
			Path: '',
			HitEffect: '',
			HitEffectPath: ''
		}
	},
	10002: {
		1: {
			ID: 10002,
			Index: 1,
			SkillName: '猛击',
			Target: {"type":"single","team":1,"singing":1},
			Actions: {damage:{"dmg":270}},
			Animation: 'skill_01',
			CriticalTime: 66,
			Effect: 'skill_01',
			EffectType: {"type":"point","origin":"owner"},
			EffectiveTime: [],
			Path: 'shark',
			HitEffect: '',
			HitEffectPath: ''
		},
		2: {
			ID: 10002,
			Index: 2,
			SkillName: '猛击',
			Target: {"type":"single","team":1},
			Actions: {addBuff:{"buffID":10002,"time":8}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: {},
			EffectiveTime: [],
			Path: '',
			HitEffect: '',
			HitEffectPath: ''
		}
	},
	10003: {
		1: {
			ID: 10003,
			Index: 1,
			SkillName: '巨浪',
			Target: {"type":"all","team":1,"singing":0.83},
			Actions: {damage:{"dmg":300}},
			Animation: 'skill_02',
			CriticalTime: 66,
			Effect: 'billow',
			EffectType: {"type":"point","origin":"owner"},
			EffectiveTime: [],
			Path: 'shark',
			HitEffect: '',
			HitEffectPath: ''
		},
		2: {
			ID: 10003,
			Index: 2,
			SkillName: '巨浪',
			Target: {"type":"all","team":1},
			Actions: {addBuff:{"buffID":10003,"time":5}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: {},
			EffectiveTime: [],
			Path: '',
			HitEffect: '',
			HitEffectPath: ''
		}
	},
	10004: {
		1: {
			ID: 10004,
			Index: 1,
			SkillName: '狂风',
			Target: {"type":"single","team":1,"singing":0.2},
			Actions: {damage:{"dmg":360}},
			Animation: 'skill_03',
			CriticalTime: 66,
			Effect: 'wind',
			EffectType: {"type":"point","origin":"owner"},
			EffectiveTime: [],
			Path: 'shark',
			HitEffect: '',
			HitEffectPath: ''
		},
		2: {
			ID: 10004,
			Index: 2,
			SkillName: '狂风',
			Target: {"type":"single","team":1},
			Actions: {dropCard:{"num":2,"cardType":1,"cardQuality":1,"cardAttributes":1,"piletype":2}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: {},
			EffectiveTime: [],
			Path: '',
			HitEffect: '',
			HitEffectPath: ''
		}
	},
	10005: {
		1: {
			ID: 10005,
			Index: 1,
			SkillName: '幻象',
			Target: {"type":"self","team":0},
			Actions: {monsterSummoned:{"monsterID":"10002","num":2,"matrixType":"random","time":12}},
			Animation: 'skill_04',
			CriticalTime: 0,
			Effect: 'phantom',
			EffectType: {"type":"point","origin":"owner"},
			EffectiveTime: [],
			Path: 'shark',
			HitEffect: '',
			HitEffectPath: ''
		},
		2: {
			ID: 10005,
			Index: 2,
			SkillName: '幻象',
			Target: {"type":"self","team":0},
			Actions: {addBuff:{"buffID":10105,"time":12}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: {},
			EffectiveTime: [],
			Path: '',
			HitEffect: '',
			HitEffectPath: ''
		}
	},
};
