//
// Auto Generated Code By pwh
//

// Generate From Monster.xlsx
function Monster(data)
{
	 this.ID = data.ID;// Int16Array  编号
	 this.Name = data.Name;// String  名称
	 this.Type = data.Type;// String  类型
	 this.Model = data.Model;// Int16Array  模型
	 this.Level = data.Level;// Int16Array  等级
	 this.MaxHP = data.MaxHP;// Int16Array  最大气血
	 this.MaxMP = data.MaxMP;// Int16Array  最大灵力
	 this.MaxThew = data.MaxThew;// Int16Array  最大体力
	 this.BaseArmor = data.BaseArmor;// Int16Array  基础护甲
	 this.BaseStrength = data.BaseStrength;// Int16Array  力量
	 this.BaseStamina = data.BaseStamina;// Int16Array  耐力
	 this.BaseIntellect = data.BaseIntellect;// Int16Array  智慧
	 this.BaseAgile = data.BaseAgile;// Int16Array  敏捷
	 this.InitialCard = data.InitialCard;// Int16Array  初始手牌
	 this.InitialMP = data.InitialMP;// Int16Array  初始灵力
	 this.InitialDrawPile = data.InitialDrawPile;// list  牌库初始卡牌
}

 module.exports = Monster; 
// End of Auto Generated Code
