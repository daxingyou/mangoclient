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
			Actions: {damage:{"dmg":(LvUp) => {return 60+LvUp;}}},
			ActionCount: 0,
			Animation: 'attack_01',
			CriticalTime: 66,
			Effect: 'wsword',
			EffectType: [{"type":"bullt","origin":"owner","delay":1.7}],
			EffectiveTime: 151,
			Path: 'chenjinchou',
			HitEffect: 'hiteffect',
			HitEffectPath: 'chenjinchou',
			HitTime: [],
			DmgFlag: ""
		}
	},
	2: {
		1: {
			ID: 2,
			Index: 1,
			SkillName: '防御',
			Target: {"type":"single","team":0,"singing":0.7},
			Actions: {addBuff:{buffID:2,"time":(LvUp) => {return 15+LvUp;}}},
			ActionCount: 0,
			Animation: 'skill_01',
			CriticalTime: 66,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: 'chenjinchou',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	3: {
		1: {
			ID: 3,
			Index: 1,
			SkillName: '攻击',
			Target: {"type":"single","team":1,"singing":0.57},
			Actions: {damage:{"dmg":(LvUp) => {return 60+LvUp;}}},
			ActionCount: 0,
			Animation: 'attack_01',
			CriticalTime: 66,
			Effect: 'attack',
			EffectType: [{"type":"bullt","origin":"owner","delay":1.7}],
			EffectiveTime: 151,
			Path: 'snow',
			HitEffect: 'hiteffect',
			HitEffectPath: 'chenjinchou',
			HitTime: [],
			DmgFlag: ""
		}
	},
	4: {
		1: {
			ID: 4,
			Index: 1,
			SkillName: '防御',
			Target: {"type":"single","team":0,"singing":0.7},
			Actions: {addBuff:{buffID:2,"time":(LvUp) => {return 15+LvUp;}}},
			ActionCount: 0,
			Animation: 'skill_01',
			CriticalTime: 66,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: 'snow',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	1001: {
		1: {
			ID: 1001,
			Index: 1,
			SkillName: '穿云指',
			Target: {"type":"single","team":1,"singing":0.7},
			Actions: {damage:{"dmg":(LvUp) => {return 100+LvUp;}},addBuff:{"buffID":1001,"count":(LvUp) => {return 1+LvUp;}}},
			ActionCount: 2,
			Animation: 'attack_02',
			CriticalTime: 66,
			Effect: 'wsword',
			EffectType: [{"type":"bullt","origin":"owner","delay":1.7}],
			EffectiveTime: 151,
			Path: 'chenjinchou',
			HitEffect: 'hiteffect',
			HitEffectPath: 'chenjinchou',
			HitTime: [],
			DmgFlag: ""
		},
		2: {
			ID: 1001,
			Index: 2,
			SkillName: '穿云指',
			Target: {},
			Actions: {spawnSummoned:{"type":"wSword","num":(LvUp) => {return 1+LvUp;},"area":"random"}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	1002: {
		1: {
			ID: 1002,
			Index: 1,
			SkillName: '冰刃锥',
			Target: {"type":"single","team":1,"singing":0.7},
			Actions: {damage:{"dmg":(LvUp) => {return 90+LvUp;}}},
			ActionCount: 0,
			Animation: 'attack_02',
			CriticalTime: 66,
			Effect: 'ice_shoot',
			EffectType: [{"type":"point","origin":"owner"}],
			EffectiveTime: 151,
			Path: 'chenjinchou',
			HitEffect: 'hiteffect',
			HitEffectPath: 'chenjinchou',
			HitTime: [],
			DmgFlag: ""
		},
		2: {
			ID: 1002,
			Index: 2,
			SkillName: '冰刃锥',
			Target: {"type":"self","team":0},
			Actions: {normalDrawCard:{"num":(LvUp) => {return 1+LvUp;}}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		},
		3: {
			ID: 1002,
			Index: 3,
			SkillName: '冰刃锥',
			Target: {},
			Actions: {spawnSummoned:{"type":"wSword","num":(LvUp) => {return 1+LvUp;},"area":"random"}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	1003: {
		1: {
			ID: 1003,
			Index: 1,
			SkillName: '冰雨霏霏',
			Target: {"type":"all","team":1,"singing":0.7},
			Actions: {damage:{"dmg":80},addBuff:{"buffID":1001,"count":(LvUp) => {return 1+LvUp;}}},
			ActionCount: 0,
			Animation: 'attack_04',
			CriticalTime: 66,
			Effect: 'frozenrain',
			EffectType: [{"type":"point","origin":"targetCenter"}],
			EffectiveTime: 151,
			Path: 'chenjinchou',
			HitEffect: 'hiteffect',
			HitEffectPath: 'chenjinchou',
			HitTime: [3.5,3.6,3.7,3.8,4.0,4.3,4.5],
			DmgFlag: ""
		},
		2: {
			ID: 1003,
			Index: 2,
			SkillName: '冰雨霏霏',
			Target: {},
			Actions: {spawnSummoned:{"type":"wSword","num":(LvUp) => {return 5+LvUp;},"area":"random"}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	1004: {
		1: {
			ID: 1004,
			Index: 1,
			SkillName: '冰石乱坠',
			Target: {"type":"single","team":1,"singing":0.7},
			Actions: {bounce:{dmg:(LvUp) => {return 70+LvUp;},"buffID":1001,"count":(LvUp) => {return 1+LvUp;},"bounce":(LvUp) => {return 2+LvUp;}}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: 'ricochet_ice,ws_ricochet_ice',
			EffectType: [{"type":"point","origin":"owner","offset":{"x":100,"y":300}},{"event":"onFinish","beforeName":"ricochet_ice","type":"bounce","origin":"owner","offset":{"x":100,"y":300}}],
			EffectiveTime: 0,
			Path: 'chenjinchou',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	1005: {
		1: {
			ID: 1005,
			Index: 1,
			SkillName: '纳灵诀',
			Target: {"type":"self","team":0,"singing":0.57},
			Actions: {addBuff:{"buffID":1005}},
			ActionCount: 0,
			Animation: 'talent_01',
			CriticalTime: 66,
			Effect: 'ghostcard',
			EffectType: [{"type":"point","origin":"owner"}],
			EffectiveTime: 0,
			Path: 'chenjinchou',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	1105: {
		1: {
			ID: 1105,
			Index: 1,
			SkillName: '纳灵诀',
			Target: {"type":"self","team":0},
			Actions: {getMP:{"MP":(LvUp) => {return 1+LvUp;}}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: 'healfog3,healflash',
			EffectType: [{"type":"bullt","origin":"owner"},{"type":"point","origin":"target"}],
			EffectiveTime: 0,
			Path: 'snow',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	1006: {
		1: {
			ID: 1006,
			Index: 1,
			SkillName: '符灵术',
			Target: {"type":"self","team":0,"singing":0.57},
			Actions: {normalDrawCard:{"num":(LvUp) => {return 1+LvUp;}}},
			ActionCount: 0,
			Animation: 'talent_01',
			CriticalTime: 66,
			Effect: 'ghostcard',
			EffectType: [{"type":"point","origin":"owner"}],
			EffectiveTime: 0,
			Path: 'chenjinchou',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		},
		2: {
			ID: 1006,
			Index: 2,
			SkillName: '符灵术',
			Target: {"type":"self","team":0},
			Actions: {getMP:{"MP":(LvUp) => {return 1+LvUp;}}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	1007: {
		1: {
			ID: 1007,
			Index: 1,
			SkillName: '乌雪之灵',
			Target: {"type":"self","team":0,"singing":0.57},
			Actions: {addBuff:{"buffID":1007}},
			ActionCount: 0,
			Animation: 'talent_01',
			CriticalTime: 66,
			Effect: 'soulofsnow',
			EffectType: [{"type":"point","origin":"owner"}],
			EffectiveTime: 0,
			Path: 'chenjinchou',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	1107: {
		1: {
			ID: 1107,
			Index: 1,
			SkillName: '乌雪之灵',
			Target: {"type":"self","team":0},
			Actions: {create:{"cardID":1001,"rate":0.02,"num":1}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	1008: {
		1: {
			ID: 1008,
			Index: 1,
			SkillName: '冰灵劲',
			Target: {"type":"self","team":0},
			Actions: {addBuff:{"buffID":1008}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: 'abi',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		},
		2: {
			ID: 1008,
			Index: 2,
			SkillName: '冰灵劲',
			Target: {},
			Actions: {costSummoned:{"costSummoned":(LvUp) => {return 5+LvUp;},"type":"wSword"}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	1009: {
		1: {
			ID: 1009,
			Index: 1,
			SkillName: '碎冰',
			Target: {"type":"all","team":1,"singing":0.7},
			Actions: {crushedIce:{"type":"wSword","buffID":1001,"time":(LvUp) => {return 5+LvUp;},"consume":1}},
			ActionCount: 0,
			Animation: 'attack_02',
			CriticalTime: 66,
			Effect: 'frag_ice',
			EffectType: [{"type":"point","origin":"owner"}],
			EffectiveTime: 33,
			Path: 'chenjinchou',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	1010: {
		1: {
			ID: 1010,
			Index: 1,
			SkillName: '乌雪焚天',
			Target: {"type":"all","team":1,"singing":0.7},
			Actions: {blackSnow:{buffID:1001,times:(LvUp) => {return 2+LvUp;}}},
			ActionCount: 0,
			Animation: 'attack_02',
			CriticalTime: 66,
			Effect: '',
			EffectType: [],
			EffectiveTime: 33,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	1011: {
		1: {
			ID: 1011,
			Index: 1,
			SkillName: '拨云见日',
			Target: {"type":"self","team":0,"singing":0.57},
			Actions: {addBuff:{"buffID":1011}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	1012: {
		1: {
			ID: 1012,
			Index: 1,
			SkillName: '探囊取物',
			Target: {"type":"single","team":1,"singing":0.7},
			Actions: {copy:{"num":(LvUp) => {return 1+LvUp;},"pileType":4,"reduceMP":"all","effectTimes":(LvUp) => {return 1+LvUp;}}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	1013: {
		1: {
			ID: 1013,
			Index: 1,
			SkillName: '碎石觅玉',
			Target: {"type":"self","team":0,"singing":0.57},
			Actions: {drawCard:{"num":(LvUp) => {return 2+LvUp;},"cardType":2,"piletype":2}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	1014: {
		1: {
			ID: 1014,
			Index: 1,
			SkillName: '窃玉留香',
			Target: {"type":"self","team":0,"singing":0.57},
			Actions: {addBuff:{"buffID":1014}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	1114: {
		1: {
			ID: 1114,
			Index: 1,
			SkillName: '窃玉留香',
			Target: {"type":"single","team":1},
			Actions: {create:{"cardID":1017,"rate":1,"num":(LvUp) => {return 1+LvUp;},"pileType":2}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	1015: {
		1: {
			ID: 1015,
			Index: 1,
			SkillName: '盗帅流芳',
			Target: {"type":"self","team":0,"singing":0.57},
			Actions: {powerUp:{"powerUp":(LvUp) => {return 0.25+LvUp;},"cardType":1,"pileType":4,"effectTimes":(LvUp) => {return 1+LvUp;}}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	1016: {
		1: {
			ID: 1016,
			Index: 1,
			SkillName: '抛金引玉',
			Target: {"type":"self","team":0,"singing":0.57},
			Actions: {dropCard:{"num":(LvUp) => {return 2+LvUp;},"piletype":2}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		},
		2: {
			ID: 1016,
			Index: 2,
			SkillName: '抛金引玉',
			Target: {"type":"self","team":0},
			Actions: {normalDrawCard:{"num":(LvUp) => {return 2+LvUp;}}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	1017: {
		1: {
			ID: 1017,
			Index: 1,
			SkillName: '郁金香',
			Target: {type:"self","team":0},
			Actions: {addBuff:{"buffID":1017,"time":(LvUp) => {return 0.5+LvUp;}}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	4001: {
		1: {
			ID: 4001,
			Index: 1,
			SkillName: '气疗术',
			Target: {"type":"single","team":0,"singing":1.3},
			Actions: {heal:{"heal":(LvUp) => {return 200+LvUp;}}},
			ActionCount: 0,
			Animation: 'skill_01',
			CriticalTime: 66,
			Effect: 'healflash,healfog',
			EffectType: [{"type":"point","origin":"target"},{"type":"point","origin":"owner"}],
			EffectiveTime: 434,
			Path: 'snow',
			HitEffect: 'hiteffect',
			HitEffectPath: 'chenjinchou',
			HitTime: [],
			DmgFlag: ""
		}
	},
	4002: {
		1: {
			ID: 4002,
			Index: 1,
			SkillName: '风沙甘霖术',
			Target: {"type":"single","team":0,"singing":1.3},
			Actions: {heal:{"heal":250}},
			ActionCount: 0,
			Animation: 'skill_02',
			CriticalTime: 66,
			Effect: 'healflash,healfog',
			EffectType: [{"type":"point","origin":"target"},{"type":"point","origin":"owner"}],
			EffectiveTime: 434,
			Path: 'snow',
			HitEffect: 'hiteffect',
			HitEffectPath: 'chenjinchou',
			HitTime: [],
			DmgFlag: ""
		},
		2: {
			ID: 4002,
			Index: 2,
			SkillName: '风沙甘霖术',
			Target: {"type":"self","team":0},
			Actions: {heal:{"heal":250}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	4003: {
		1: {
			ID: 4003,
			Index: 1,
			SkillName: '唤魂咒',
			Target: {"type":"single","team":0,"dead":1,"singing":1.3},
			Actions: {reliveTarget:{"heal":100}},
			ActionCount: 0,
			Animation: 'skill_02',
			CriticalTime: 66,
			Effect: 'heallight',
			EffectType: [{"type":"point","origin":"target"}],
			EffectiveTime: 434,
			Path: 'snow',
			HitEffect: 'hiteffect',
			HitEffectPath: 'chenjinchou',
			HitTime: [],
			DmgFlag: ""
		}
	},
	4004: {
		1: {
			ID: 4004,
			Index: 1,
			SkillName: '万物复苏',
			Target: {"type":"all","team":0,"singing":1.3},
			Actions: {addBuff:{"buffID":4004}},
			ActionCount: 0,
			Animation: 'skill_03',
			CriticalTime: 66,
			Effect: 'healrain',
			EffectType: [{"type":"point","origin":"ownerCenter"}],
			EffectiveTime: 434,
			Path: 'snow',
			HitEffect: 'hiteffect',
			HitEffectPath: 'chenjinchou',
			HitTime: [],
			DmgFlag: ""
		},
		2: {
			ID: 4004,
			Index: 2,
			SkillName: '万物复苏',
			Target: {"type":"lowHP","team":0},
			Actions: {addBuff:{"buffID":4004}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	4005: {
		1: {
			ID: 4005,
			Index: 1,
			SkillName: '女娲体质',
			Target: {"type":"self","team":0,"singing":1.3},
			Actions: {addBuff:{"buffID":4005}},
			ActionCount: 0,
			Animation: 'talent_01',
			CriticalTime: 66,
			Effect: 'ghostcard',
			EffectType: [{"type":"point","origin":"owner"}],
			EffectiveTime: 0,
			Path: 'chenjinchou',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	4105: {
		1: {
			ID: 4105,
			Index: 1,
			SkillName: '女娲体质',
			Target: {"type":"self","team":0},
			Actions: {getMP:{"MP":1}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: 'healfog3,healflash',
			EffectType: [{"type":"bullt","origin":"owner"},{"type":"point","origin":"target"}],
			EffectiveTime: 0,
			Path: 'snow',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	4006: {
		1: {
			ID: 4006,
			Index: 1,
			SkillName: '释放灵力',
			Target: {"type":"self","team":0,"singing":1.3},
			Actions: {normalDrawCard:{"num":2}},
			ActionCount: 0,
			Animation: 'skill_04',
			CriticalTime: 66,
			Effect: 'ghostcard',
			EffectType: [{"type":"point","origin":"owner"}],
			EffectiveTime: 0,
			Path: 'chenjinchou',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		},
		2: {
			ID: 4006,
			Index: 2,
			SkillName: '释放灵力',
			Target: {"type":"self","team":0},
			Actions: {damage:{"dmg":120}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	4007: {
		1: {
			ID: 4007,
			Index: 1,
			SkillName: '地灵庇护',
			Target: {"type":"self","team":0,"singing":1.3},
			Actions: {addBuff:{"buffID":4007,"time":10}},
			ActionCount: 0,
			Animation: 'talent_01',
			CriticalTime: 66,
			Effect: 'ghostcard',
			EffectType: [{"type":"point","origin":"owner"}],
			EffectiveTime: 0,
			Path: 'chenjinchou',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	4107: {
		1: {
			ID: 4107,
			Index: 1,
			SkillName: '地灵庇护',
			Target: {"type":"single","team":0},
			Actions: {reliveTarget:{"ownPercent":0.5}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: 'healfog3,healflash',
			EffectType: [{"type":"bullt","origin":"owner"},{"type":"point","origin":"target"}],
			EffectiveTime: 0,
			Path: 'snow',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	4008: {
		1: {
			ID: 4008,
			Index: 1,
			SkillName: '女娲转世',
			Target: {"type":"self","team":0,"singing":1.3},
			Actions: {addBuff:{"buffID":4008}},
			ActionCount: 0,
			Animation: 'talent_01',
			CriticalTime: 66,
			Effect: 'ghostcard',
			EffectType: [{"type":"point","origin":"owner"}],
			EffectiveTime: 0,
			Path: 'chenjinchou',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	4108: {
		1: {
			ID: 4108,
			Index: 1,
			SkillName: '女娲转世',
			Target: {"type":"self","team":0},
			Actions: {getMP:{"MP":2}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	4009: {
		1: {
			ID: 4009,
			Index: 1,
			SkillName: '涛澜动地',
			Target: {"type":"single","team":1,"singing":1.3},
			Actions: {damage:{"dmg":150}},
			ActionCount: 0,
			Animation: 'attack_02',
			CriticalTime: 66,
			Effect: 'groundfire',
			EffectType: [{"type":"bullt","origin":"target"}],
			EffectiveTime: 66,
			Path: 'snow',
			HitEffect: 'hiteffect',
			HitEffectPath: 'chenjinchou',
			HitTime: [],
			DmgFlag: ""
		},
		2: {
			ID: 4009,
			Index: 2,
			SkillName: '涛澜动地',
			Target: {"type":"self","team":0},
			Actions: {damage:{"dmg":30}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	4010: {
		1: {
			ID: 4010,
			Index: 1,
			SkillName: '石破天惊',
			Target: {"type":"single","team":1,"singing":1.3},
			Actions: {damage:{"dmg":300}},
			ActionCount: 0,
			Animation: 'attack_02',
			CriticalTime: 66,
			Effect: 'aerolite,healfog',
			EffectType: [{"type":"point","origin":"target"},{"type":"point","origin":"owner"}],
			EffectiveTime: 333,
			Path: 'snow',
			HitEffect: 'hiteffect',
			HitEffectPath: 'chenjinchou',
			HitTime: [],
			DmgFlag: ""
		},
		2: {
			ID: 4010,
			Index: 2,
			SkillName: '石破天惊',
			Target: {"type":"single","team":1},
			Actions: {addBuff:{"buffID":4010,"time":8}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	4011: {
		1: {
			ID: 4011,
			Index: 1,
			SkillName: '烈火术',
			Target: {"type":"single","team":1,"singing":1.3},
			Actions: {damage:{"dmg":50}},
			ActionCount: 0,
			Animation: 'attack_02',
			CriticalTime: 66,
			Effect: 'aerolite,healfog',
			EffectType: [{"type":"point","origin":"target"},{"type":"point","origin":"owner"}],
			EffectiveTime: 333,
			Path: 'snow',
			HitEffect: 'hiteffect',
			HitEffectPath: 'chenjinchou',
			HitTime: [],
			DmgFlag: ""
		},
		2: {
			ID: 4011,
			Index: 2,
			SkillName: '烈火术',
			Target: {"type":"single","team":1},
			Actions: {addBuff:{"buffID":4011,"time":15}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	4012: {
		1: {
			ID: 4012,
			Index: 1,
			SkillName: '日薄西山入',
			Target: {"type":"single","team":1,"singing":1.3},
			Actions: {bounce:{dmg:30,"buffID":4011,"count":1,"time":15,"bounce":2}},
			ActionCount: 0,
			Animation: 'attack_02',
			CriticalTime: 66,
			Effect: 'aerolite,healfog',
			EffectType: [{"type":"point","origin":"target"},{"type":"point","origin":"owner"}],
			EffectiveTime: 333,
			Path: 'snow',
			HitEffect: 'hiteffect',
			HitEffectPath: 'chenjinchou',
			HitTime: [],
			DmgFlag: ""
		}
	},
	4013: {
		1: {
			ID: 4013,
			Index: 1,
			SkillName: '火凤落霞',
			Target: {"type":"single","team":1,"singing":1.3},
			Actions: {bounce:{dmg:20,"buffID":4011,"count":1,"time":15,"bounce":4}},
			ActionCount: 0,
			Animation: 'attack_02',
			CriticalTime: 66,
			Effect: 'aerolite,healfog',
			EffectType: [{"type":"point","origin":"target"},{"type":"point","origin":"owner"}],
			EffectiveTime: 333,
			Path: 'snow',
			HitEffect: 'hiteffect',
			HitEffectPath: 'chenjinchou',
			HitTime: [],
			DmgFlag: ""
		}
	},
	4014: {
		1: {
			ID: 4014,
			Index: 1,
			SkillName: '火焰外衣',
			Target: {"type":"self","team":0,"singing":1.3},
			Actions: {addBuff:{"buffID":4014}},
			ActionCount: 0,
			Animation: 'talent_01',
			CriticalTime: 66,
			Effect: 'ghostcard',
			EffectType: [{"type":"point","origin":"owner"}],
			EffectiveTime: 0,
			Path: 'chenjinchou',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	4114: {
		1: {
			ID: 4114,
			Index: 1,
			SkillName: '火焰外衣',
			Target: {"type":"random","team":1},
			Actions: {damage:{"dmg":20}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	4015: {
		1: {
			ID: 4015,
			Index: 1,
			SkillName: '烈焰共鸣',
			Target: {"type":"self","team":0,"singing":1.3},
			Actions: {addBuff:{"buffID":2015}},
			ActionCount: 0,
			Animation: 'talent_01',
			CriticalTime: 66,
			Effect: 'ghostcard',
			EffectType: [{"type":"point","origin":"owner"}],
			EffectiveTime: 0,
			Path: 'chenjinchou',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	4115: {
		1: {
			ID: 4115,
			Index: 1,
			SkillName: '烈焰共鸣',
			Target: {"type":"random","team":1},
			Actions: {addBuff:{"buffID":4011,"time":15}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	4016: {
		1: {
			ID: 4016,
			Index: 1,
			SkillName: '星火燎原',
			Target: {"type":"self","team":0,"singing":1.3},
			Actions: {drawCard:{"num":2,"cardType":1,"piletype":2}},
			ActionCount: 0,
			Animation: 'talent_01',
			CriticalTime: 66,
			Effect: 'ghostcard',
			EffectType: [{"type":"point","origin":"owner"}],
			EffectiveTime: 0,
			Path: 'chenjinchou',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	4017: {
		1: {
			ID: 4017,
			Index: 1,
			SkillName: '火中取栗',
			Target: {"type":"self","team":0,"singing":1.3},
			Actions: {normalDrawCard:{"num":2}},
			ActionCount: 0,
			Animation: 'skill_04',
			CriticalTime: 66,
			Effect: 'ghostcard',
			EffectType: [{"type":"point","origin":"owner"}],
			EffectiveTime: 0,
			Path: 'chenjinchou',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	4018: {
		1: {
			ID: 4018,
			Index: 1,
			SkillName: '凤鸣法阵',
			Target: {"type":"random","team":1},
			Actions: {addBuff:{"buffID":4011,"time":15}},
			ActionCount: 5,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	4019: {
		1: {
			ID: 4019,
			Index: 1,
			SkillName: '化灵天炎',
			Target: {"type":"all","team":1,"singing":1.3},
			Actions: {buffTime:{buffID:4011,addTime:10}},
			ActionCount: 0,
			Animation: 'attack_02',
			CriticalTime: 66,
			Effect: 'aerolite,healfog',
			EffectType: [{"type":"point","origin":"target"},{"type":"point","origin":"owner"}],
			EffectiveTime: 333,
			Path: 'snow',
			HitEffect: 'hiteffect',
			HitEffectPath: 'chenjinchou',
			HitTime: [],
			DmgFlag: ""
		}
	},
	4020: {
		1: {
			ID: 4020,
			Index: 1,
			SkillName: '朱雀展翅',
			Target: {"type":"all","team":1,"singing":1.3},
			Actions: {addBuff:{"buffID":4011,"time":15}},
			ActionCount: 3,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	18001: {
		1: {
			ID: 18001,
			Index: 1,
			SkillName: '桃木刃',
			Target: {"type":"single","team":1,"singing":0.7},
			Actions: {damage:{"dmg":25}},
			ActionCount: 0,
			Animation: 'attack_02',
			CriticalTime: 66,
			Effect: 'wsword',
			EffectType: [{"type":"bullt","origin":"owner","delay":1.7}],
			EffectiveTime: 151,
			Path: 'chenjinchou',
			HitEffect: 'hiteffect',
			HitEffectPath: 'chenjinchou',
			HitTime: [],
			DmgFlag: ""
		},
		2: {
			ID: 18001,
			Index: 2,
			SkillName: '桃木刃',
			Target: {},
			Actions: {spawnSummoned:{"type":"wSword","num":1,"area":"random"}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	18002: {
		1: {
			ID: 18002,
			Index: 1,
			SkillName: '木藤刺',
			Target: {"type":"single","team":1,"singing":0.7},
			Actions: {damage:{"dmg":60}},
			ActionCount: 0,
			Animation: 'attack_02',
			CriticalTime: 66,
			Effect: 'wsword',
			EffectType: [{"type":"bullt","origin":"owner","delay":1.7}],
			EffectiveTime: 151,
			Path: 'chenjinchou',
			HitEffect: 'hiteffect',
			HitEffectPath: 'chenjinchou',
			HitTime: [],
			DmgFlag: ""
		},
		2: {
			ID: 18002,
			Index: 2,
			SkillName: '木藤刺',
			Target: {},
			Actions: {spawnSummoned:{"type":"wSword","num":2,"area":"random"}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	18003: {
		1: {
			ID: 18003,
			Index: 1,
			SkillName: '木剑雨',
			Target: {"type":"all","team":1,"singing":0.7},
			Actions: {damage:{"dmg":60}},
			ActionCount: 0,
			Animation: 'attack_04',
			CriticalTime: 66,
			Effect: 'rainofsword',
			EffectType: [{"type":"point","origin":"target"}],
			EffectiveTime: 151,
			Path: 'chenjinchou',
			HitEffect: 'hiteffect',
			HitEffectPath: 'chenjinchou',
			HitTime: [3.5,3.6,3.7,3.8,4.0,4.3,4.5],
			DmgFlag: ""
		},
		2: {
			ID: 18003,
			Index: 2,
			SkillName: '木剑雨',
			Target: {},
			Actions: {spawnSummoned:{"type":"wSword","numType":"hit","area":"random"}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	18004: {
		1: {
			ID: 18004,
			Index: 1,
			SkillName: '剑灵乱舞',
			Target: {"type":"self","team":0,"singing":0.57},
			Actions: {addBuff:{"buffID":18004}},
			ActionCount: 0,
			Animation: 'talent_01',
			CriticalTime: 66,
			Effect: 'ghostcard',
			EffectType: [{"type":"point","origin":"owner"}],
			EffectiveTime: 0,
			Path: 'chenjinchou',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	18104: {
		1: {
			ID: 18104,
			Index: 1,
			SkillName: '剑灵乱舞',
			Target: {"type":"random","team":1},
			Actions: {damage:{"dmg":20}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	18005: {
		1: {
			ID: 18005,
			Index: 1,
			SkillName: '横剑摆渡',
			Target: {"type":"self","team":0,"singing":0.57},
			Actions: {addBuff:{"buffID":18005}},
			ActionCount: 0,
			Animation: 'talent_01',
			CriticalTime: 66,
			Effect: 'ghostcard',
			EffectType: [{"type":"point","origin":"owner"}],
			EffectiveTime: 0,
			Path: 'chenjinchou',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	18105: {
		1: {
			ID: 18105,
			Index: 1,
			SkillName: '横剑摆渡',
			Target: {"type":"self","team":0},
			Actions: {normalDrawCard:{"num":1}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	18006: {
		1: {
			ID: 18006,
			Index: 1,
			SkillName: '桃木刃匣',
			Target: {"type":"self","team":0,"singing":0.7},
			Actions: {create:{"cardID":1001,"num":3}},
			ActionCount: 0,
			Animation: 'skill_01',
			CriticalTime: 66,
			Effect: 'ghostcard',
			EffectType: [{"type":"point","origin":"owner"}],
			EffectiveTime: 0,
			Path: 'chenjinchou',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	18007: {
		1: {
			ID: 18007,
			Index: 1,
			SkillName: '枯木逢春',
			Target: {"type":"self","team":0,"singing":0.7},
			Actions: {normalDrawCard:{"num":2}},
			ActionCount: 0,
			Animation: 'skill_01',
			CriticalTime: 66,
			Effect: 'ghostcard',
			EffectType: [{"type":"point","origin":"owner"}],
			EffectiveTime: 0,
			Path: 'chenjinchou',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	18008: {
		1: {
			ID: 18008,
			Index: 1,
			SkillName: '取竹成剑',
			Target: {"type":"self","team":0,"singing":0.7},
			Actions: {normalDrawCard:{"num":1}},
			ActionCount: 0,
			Animation: 'skill_01',
			CriticalTime: 66,
			Effect: 'ghostcard',
			EffectType: [{"type":"point","origin":"owner"}],
			EffectiveTime: 0,
			Path: 'chenjinchou',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		},
		2: {
			ID: 18008,
			Index: 2,
			SkillName: '取竹成剑',
			Target: {"type":"self","team":0},
			Actions: {create:{"cardID":18002,"num":1}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	18009: {
		1: {
			ID: 18009,
			Index: 1,
			SkillName: '秋镰游刃',
			Target: {"type":"all","team":1,"singing":0.7},
			Actions: {reverse:{"type":"wSword","dmg":45,"consume":1}},
			ActionCount: 0,
			Animation: 'attack_02',
			CriticalTime: 66,
			Effect: '',
			EffectType: [],
			EffectiveTime: 33,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	18010: {
		1: {
			ID: 18010,
			Index: 1,
			SkillName: '映日剑轮',
			Target: {"type":"single","team":1,"singing":1.17},
			Actions: {swordWheel:{"type":"wSword","dmg":25,"consume":0}},
			ActionCount: 0,
			Animation: 'attack_03',
			CriticalTime: 66,
			Effect: 'swordwheel',
			EffectType: [{"type":"point","origin":"owner"}],
			EffectiveTime: 484,
			Path: 'chenjinchou',
			HitEffect: 'hiteffect',
			HitEffectPath: 'chenjinchou',
			HitTime: [4.4,4.5,4.6,4.7,4.9,5.1,5.3],
			DmgFlag: 1
		}
	},
	100001: {
		1: {
			ID: 100001,
			Index: 1,
			SkillName: '蛟精普攻',
			Target: {"type":"single","team":1,"singing":0.4},
			Actions: {damage:{"dmg":90}},
			ActionCount: 0,
			Animation: 'attack_01',
			CriticalTime: 66,
			Effect: 'atk_ice',
			EffectType: [{"type":"point","origin":"target"}],
			EffectiveTime: 0,
			Path: 'shark',
			HitEffect: 'hit_ice',
			HitEffectPath: 'hit_ice',
			HitTime: [],
			DmgFlag: ""
		}
	},
	100002: {
		1: {
			ID: 100002,
			Index: 1,
			SkillName: '蛟精猛击',
			Target: {"type":"single","team":1,"singing":1},
			Actions: {damage:{"dmg":250}},
			ActionCount: 0,
			Animation: 'skill_01',
			CriticalTime: 66,
			Effect: 'skill_01',
			EffectType: [{"type":"point","origin":"owner"}],
			EffectiveTime: 0,
			Path: 'shark',
			HitEffect: 'hit_ice',
			HitEffectPath: 'hit_ice',
			HitTime: [],
			DmgFlag: ""
		},
		2: {
			ID: 100002,
			Index: 2,
			SkillName: '蛟精猛击',
			Target: {"type":"single","team":1},
			Actions: {addBuff:{"buffID":100002,"time":8}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	100003: {
		1: {
			ID: 100003,
			Index: 1,
			SkillName: '蛟精巨浪',
			Target: {"type":"all","team":1,"singing":0.83},
			Actions: {damage:{"dmg":300}},
			ActionCount: 0,
			Animation: 'skill_02',
			CriticalTime: 66,
			Effect: 'billow,mouth_splash',
			EffectType: [{"type":"point","origin":"targetCenter"},{"type":"point","origin":"owner"}],
			EffectiveTime: 0,
			Path: 'shark',
			HitEffect: 'hit_ice',
			HitEffectPath: 'hit_ice',
			HitTime: [],
			DmgFlag: ""
		},
		2: {
			ID: 100003,
			Index: 2,
			SkillName: '蛟精巨浪',
			Target: {"type":"all","team":1},
			Actions: {addBuff:{"buffID":100003,"time":5}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	100004: {
		1: {
			ID: 100004,
			Index: 1,
			SkillName: '蛟精狂风',
			Target: {"type":"single","team":1,"singing":0.2},
			Actions: {damage:{"dmg":360}},
			ActionCount: 0,
			Animation: 'skill_03',
			CriticalTime: 66,
			Effect: 'wind',
			EffectType: [{"type":"point","origin":"target"}],
			EffectiveTime: 0,
			Path: 'shark',
			HitEffect: 'hiteffect',
			HitEffectPath: 'chenjinchou',
			HitTime: [],
			DmgFlag: ""
		},
		2: {
			ID: 100004,
			Index: 2,
			SkillName: '蛟精狂风',
			Target: {"type":"single","team":1},
			Actions: {dropCard:{"num":2,"cardType":1,"cardQuality":1,"cardAttributes":1,"piletype":2}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	100005: {
		1: {
			ID: 100005,
			Index: 1,
			SkillName: '蛟精幻象',
			Target: {"type":"self","team":0,"singing":1.1},
			Actions: {monsterSummoned:{"monsterID":"100002","num":1,"matrixType":"random","time":12}},
			ActionCount: 0,
			Animation: 'skill_04',
			CriticalTime: 0,
			Effect: 'phantom',
			EffectType: [{"type":"point","origin":"owner"}],
			EffectiveTime: 0,
			Path: 'shark',
			HitEffect: 'hiteffect',
			HitEffectPath: 'chenjinchou',
			HitTime: [],
			DmgFlag: ""
		},
		2: {
			ID: 100005,
			Index: 2,
			SkillName: '蛟精幻象',
			Target: {"type":"self","team":0},
			Actions: {addBuff:{"buffID":100105,"time":12}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	100101: {
		1: {
			ID: 100101,
			Index: 1,
			SkillName: '鳄鱼普攻',
			Target: {"type":"single","team":1,"singing":1},
			Actions: {damage:{"dmg":60}},
			ActionCount: 0,
			Animation: 'attack_01',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	100102: {
		1: {
			ID: 100102,
			Index: 1,
			SkillName: '鳄鱼撕咬',
			Target: {"type":"single","team":1,"singing":1},
			Actions: {damage:{"dmg":90}},
			ActionCount: 0,
			Animation: 'attack_02',
			CriticalTime: 0,
			Effect: 'bitehitbleed',
			EffectType: [{"type":"point","origin":"target"}],
			EffectiveTime: 0,
			Path: 'crocodile_effect',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		},
		2: {
			ID: 100102,
			Index: 2,
			SkillName: '鳄鱼撕咬',
			Target: {"type":"single","team":1},
			Actions: {addBuff:{"buffID":100102}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	100201: {
		1: {
			ID: 100201,
			Index: 1,
			SkillName: '飞颅攻击',
			Target: {"type":"single","team":1},
			Actions: {damage:{"dmg":180}},
			ActionCount: 0,
			Animation: 'attack_01',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	100202: {
		1: {
			ID: 100202,
			Index: 1,
			SkillName: '飞颅地震',
			Target: {"type":"all","team":1},
			Actions: {damage:{"dmg":150}},
			ActionCount: 0,
			Animation: 'attack_02',
			CriticalTime: 0,
			Effect: 'trailingshakeDust',
			EffectType: [{"type":"point","origin":"target"}],
			EffectiveTime: 0,
			Path: 'head_effect',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	100301: {
		1: {
			ID: 100301,
			Index: 1,
			SkillName: '怨鬼攻击',
			Target: {"type":"single","team":1,"singing":1},
			Actions: {damage:{"dmg":150}},
			ActionCount: 0,
			Animation: 'attack_01',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	100302: {
		1: {
			ID: 100302,
			Index: 1,
			SkillName: '怨鬼诅咒',
			Target: {"type":"single","team":1,"singing":1},
			Actions: {damage:{"dmg":50}},
			ActionCount: 0,
			Animation: 'skill_01',
			CriticalTime: 0,
			Effect: 'curse',
			EffectType: [{"type":"bullt","origin":"owner"}],
			EffectiveTime: 0,
			Path: 'spectre_effect',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		},
		2: {
			ID: 100302,
			Index: 2,
			SkillName: '怨鬼诅咒',
			Target: {"type":"single","team":1},
			Actions: {create:{"cardID":100303,"num":1}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
	100303: {
		1: {
			ID: 100303,
			Index: 1,
			SkillName: '怨鬼诅咒',
			Target: {"type":"self","team":0},
			Actions: {damage:{"dmg":300}},
			ActionCount: 0,
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectType: [],
			EffectiveTime: 0,
			Path: '',
			HitEffect: '',
			HitEffectPath: '',
			HitTime: [],
			DmgFlag: ""
		}
	},
};
