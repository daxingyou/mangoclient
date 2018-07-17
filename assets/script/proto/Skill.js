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
			Target: {"type":"single","team":1},
			Actions: {damage:{"dmg":60}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectiveTime: 0
		}
	},
	2: {
		1: {
			ID: 2,
			Index: 1,
			SkillName: '防御',
			Target: {"type":"single","team":0},
			Actions: {addBuff:{buffID:2, time:5}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectiveTime: 0
		}
	},
	1001: {
		1: {
			ID: 1001,
			Index: 1,
			SkillName: '桃木刃',
			Target: {"type":"single","team":1},
			Actions: {damage:{"dmg":45}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectiveTime: 0
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
			EffectiveTime: 0
		}
	},
	1002: {
		1: {
			ID: 1002,
			Index: 1,
			SkillName: '木藤刺',
			Target: {"type":"single","team":1},
			Actions: {damage:{"dmg":25}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectiveTime: 0
		},
		2: {
			ID: 1002,
			Index: 2,
			SkillName: '木藤刺',
			Target: {"type":"self","team":0},
			Actions: {addBuff:{buffID:1002, time:5}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectiveTime: 0
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
			EffectiveTime: 0
		}
	},
	1003: {
		1: {
			ID: 1003,
			Index: 1,
			SkillName: '木剑雨',
			Target: {"type":"all","team":1},
			Actions: {damage:{"dmg":45}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectiveTime: 0
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
			EffectiveTime: 0
		}
	},
	1004: {
		1: {
			ID: 1004,
			Index: 1,
			SkillName: '剑灵乱舞',
			Target: {"type":"self","team":0},
			Actions: {addBuff:{"buffID":1004}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectiveTime: 0
		}
	},
	1104: {
		1: {
			ID: 1104,
			Index: 1,
			SkillName: '剑灵乱舞',
			Target: {"type":"random","team":1},
			Actions: {damage:{"dmg":5}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectiveTime: 0
		}
	},
	1005: {
		1: {
			ID: 1005,
			Index: 1,
			SkillName: '横剑摆渡',
			Target: {"type":"self","team":0},
			Actions: {addBuff:{"buffID":1005}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectiveTime: 0
		}
	},
	1105: {
		1: {
			ID: 1105,
			Index: 1,
			SkillName: '横剑摆渡',
			Target: {"type":"self","team":0},
			Actions: {drawCard:{"num":1,"cardType":1,"cardQuality":1,"cardAttributes":1,"piletype":2}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectiveTime: 0
		}
	},
	1006: {
		1: {
			ID: 1006,
			Index: 1,
			SkillName: '桃木刃匣',
			Target: {"type":"self","team":0},
			Actions: {create:{"cardID":1001,"num":3}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectiveTime: 0
		}
	},
	1007: {
		1: {
			ID: 1007,
			Index: 1,
			SkillName: '枯木逢春',
			Target: {"type":"self","team":0},
			Actions: {drawCard:{"num":2,"cardType":1,"cardQuality":1,"cardAttributes":1,"piletype":2}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectiveTime: 0
		},
		2: {
			ID: 1007,
			Index: 2,
			SkillName: '枯木逢春',
			Target: {},
			Actions: {spawnSummoned:{"type":"wSword","num":1,"area":"random"}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectiveTime: 0
		}
	},
	1008: {
		1: {
			ID: 1008,
			Index: 1,
			SkillName: '取竹成剑',
			Target: {"type":"self","team":0},
			Actions: {drawCard:{"num":1,"cardType":1,"cardQuality":1,"cardAttributes":1,"piletype":2}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectiveTime: 0
		},
		2: {
			ID: 1008,
			Index: 2,
			SkillName: '取竹成剑',
			Target: {},
			Actions: {spawnSummoned:{"type":"wSword","num":3,"area":"random"}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectiveTime: 0
		}
	},
	1009: {
		1: {
			ID: 1009,
			Index: 1,
			SkillName: '秋镰游刃',
			Target: {"type":"all","team":1},
			Actions: {reverse:{"dmg":35,"consume":1}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectiveTime: 0
		}
	},
	1010: {
		1: {
			ID: 1010,
			Index: 1,
			SkillName: '映日剑轮',
			Target: {"type":"single","team":1},
			Actions: {swordWheel:{"dmg":15,"consume":0}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectiveTime: 0
		}
	},
	2001: {
		1: {
			ID: 2001,
			Index: 1,
			SkillName: '气疗术',
			Target: {"type":"single","team":0},
			Actions: {heal:{"heal":40}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectiveTime: 0
		}
	},
	2002: {
		1: {
			ID: 2002,
			Index: 1,
			SkillName: '风沙甘霖术',
			Target: {"type":"self","team":0},
			Actions: {heal:{"heal":60}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectiveTime: 0
		},
		2: {
			ID: 2002,
			Index: 2,
			SkillName: '风沙甘霖术',
			Target: {"type":"single","team":0},
			Actions: {heal:{"heal":60}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectiveTime: 0
		}
	},
	2003: {
		1: {
			ID: 2003,
			Index: 1,
			SkillName: '唤魂咒',
			Target: {"type":"single","team":0,"dead":1},
			Actions: {reliveTarget:{"heal":180}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectiveTime: 0
		}
	},
	2004: {
		1: {
			ID: 2004,
			Index: 1,
			SkillName: '万物复苏',
			Target: {"type":"all","team":0},
			Actions: {addBuff:{"buffID":2004}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectiveTime: 0
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
			EffectiveTime: 0
		}
	},
	2005: {
		1: {
			ID: 2005,
			Index: 1,
			SkillName: '女娲体质',
			Target: {"type":"self","team":0},
			Actions: {addBuff:{"buffID":2005}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectiveTime: 0
		}
	},
	2105: {
		1: {
			ID: 2105,
			Index: 1,
			SkillName: '女娲体质',
			Target: {"type":"self","team":0},
			Actions: {drawCard:{"num":1,"cardType":1,"cardQuality":1,"cardAttributes":1,"piletype":2}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectiveTime: 0
		}
	},
	2006: {
		1: {
			ID: 2006,
			Index: 1,
			SkillName: '释放灵力',
			Target: {"type":"self","team":0},
			Actions: {drawCard:{"num":3,"cardType":1,"cardQuality":1,"cardAttributes":1,"piletype":2}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectiveTime: 0
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
			EffectiveTime: 0
		}
	},
	2007: {
		1: {
			ID: 2007,
			Index: 1,
			SkillName: '地灵庇护',
			Target: {"type":"self","team":0},
			Actions: {addBuff:{"buffID":2007}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectiveTime: 0
		}
	},
	2107: {
		1: {
			ID: 2107,
			Index: 1,
			SkillName: '地灵庇护',
			Target: {},
			Actions: {reliveTarget:{"ownPercent":0.5}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectiveTime: 0
		}
	},
	2008: {
		1: {
			ID: 2008,
			Index: 1,
			SkillName: '女娲转世',
			Target: {"type":"self","team":0},
			Actions: {addBuff:{"buffID":2008}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectiveTime: 0
		}
	},
	2108: {
		1: {
			ID: 2108,
			Index: 1,
			SkillName: '女娲转世',
			Target: {"type":"self","team":0},
			Actions: {heal:{"heal":20}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectiveTime: 0
		}
	},
	2009: {
		1: {
			ID: 2009,
			Index: 1,
			SkillName: '涛澜动地',
			Target: {"type":"single","team":1},
			Actions: {damage:{"dmg":150}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectiveTime: 0
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
			EffectiveTime: 0
		}
	},
	2010: {
		1: {
			ID: 2010,
			Index: 1,
			SkillName: '石破惊天',
			Target: {"type":"single","team":1},
			Actions: {damage:{"dmg":100}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectiveTime: 0
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
			EffectiveTime: 0
		}
	},
	10001: {
		1: {
			ID: 10001,
			Index: 1,
			SkillName: '扫尾',
			Target: {"type":"single","team":1,"singing":0.5},
			Actions: {damage:{"dmg":270}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectiveTime: 0
		}
	},
	10002: {
		1: {
			ID: 10002,
			Index: 1,
			SkillName: '猛击',
			Target: {"type":"all","team":1,"singing":1},
			Actions: {damage:{"dmg":270}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectiveTime: 0
		},
		2: {
			ID: 10002,
			Index: 2,
			SkillName: '猛击',
			Target: {"type":"all","team":1},
			Actions: {vulnerable:{"takeMoreDmg":0.4,"time":8}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectiveTime: 0
		}
	},
	10003: {
		1: {
			ID: 10003,
			Index: 1,
			SkillName: '巨浪',
			Target: {"type":"all","team":1,"singing":1},
			Actions: {damage:{"dmg":270}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectiveTime: 0
		},
		2: {
			ID: 10003,
			Index: 2,
			SkillName: '巨浪',
			Target: {"type":"all","team":1},
			Actions: {getMPPct:{"MPPct":0,"time":5}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectiveTime: 0
		}
	},
	10004: {
		1: {
			ID: 10004,
			Index: 1,
			SkillName: '狂风',
			Target: {"type":"single","team":1,"singing":1},
			Actions: {damage:{"dmg":720}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectiveTime: 0
		},
		2: {
			ID: 10004,
			Index: 2,
			SkillName: '狂风',
			Target: {"type":"single","team":1},
			Actions: {dropCard:{"num":2,"cardType":1,"cardQuality":1,"cardAttributes":1,"piletype":3}},
			Animation: '',
			CriticalTime: 0,
			Effect: '',
			EffectiveTime: 0
		}
	},
};
