//
// Auto Generated Code By pwh
//

// Generate From Card.xlsx
function Card(data)
{
	 this.ID = data.ID;// Int16Array  编号
	 this.CardName = data.CardName;// String  卡牌名字
	 this.CardDescription = data.CardDescription;// String  卡牌描述
	 this.HeroID = data.HeroID;// Int16Array  所属英雄
	 this.SkillID = data.SkillID;// Int16Array  技能ID
	 this.CardType = data.CardType;// Int16Array  卡牌类型
	 this.CardQuality = data.CardQuality;// Int16Array  卡牌品质
	 this.CardAttributes = data.CardAttributes;// Int16Array  卡牌属性
	 this.CardImage = data.CardImage;// String  卡牌图素
}

 module.exports = Card; 
// End of Auto Generated Code
