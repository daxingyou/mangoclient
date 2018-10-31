//
// Auto Generated Code
//

// Generate From Mail.xlsx
module.exports = {
	1: {
		ID: 1,
		Type: 1,
		Title: '{PlayName}',
		Describe: '您的好友赠送了银两给您，快快收下TA的心意吧',
		Reward: {100:10},
		UseLogic: ''
	},
	2: {
		ID: 2,
		Type: 1,
		Title: '{PlayName}',
		Describe: '您的好友赠送了银两给您，快快收下TA的心意吧',
		Reward: {},
		UseLogic: ''
	},
	3: {
		ID: 3,
		Type: 2,
		Title: '信誉积分奖励失效通知',
		Describe: '截至{DataTime}，您的信誉积分小于100，失去对战获取银两上限增加奖励，信誉积分=100将可以重新获得对战获取银两上限+100的奖励',
		Reward: {},
		UseLogic: ''
	},
	4: {
		ID: 4,
		Type: 2,
		Title: '信誉积分奖励通知',
		Describe: '截至{DataTime}，您的信誉积分等于100，作为奖励，本周您通过对战获取的银两上限增加100，每天都会获得对战获取银两上限+100的奖励',
		Reward: {},
		UseLogic: ''
	},
	5: {
		ID: 5,
		Type: 3,
		Title: '组队邀请',
		Describe: '{PlayerName}邀请您挑战海中建木',
		Reward: {},
		UseLogic: 'openConstructWoodView'
	},
	6: {
		ID: 6,
		Type: 3,
		Title: '组队邀请',
		Describe: '{PlayerName}邀请您挑战副本',
		Reward: {},
		UseLogic: 'openRaidView'
	},
	7: {
		ID: 7,
		Type: 3,
		Title: '怪物死亡奖励',
		Describe: '{MonsterName}已被击杀，可领取奖励',
		Reward: {},
		UseLogic: 'openConstructWoodView'
	},
	8: {
		ID: 8,
		Type: 3,
		Title: '怪物已逃亡',
		Describe: '{MonsterName}已逃亡',
		Reward: {},
		UseLogic: ''
	},
	9: {
		ID: 9,
		Type: 3,
		Title: '踢出公会',
		Describe: '{PlayName}将您踢出了公会！',
		Reward: {},
		UseLogic: ''
	},
};
