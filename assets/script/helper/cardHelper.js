/*
 * @Author: liuguolai 
 * @Date: 2018-11-26 19:51:46 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-11-26 20:19:20
 * 卡牌帮助类
 */
let cardTpl = require('Card');

let cardHelper = {};
module.exports = cardHelper;

let cardDescCache = {};
cardHelper.getCardDescription = function (cid, lv) {
    let cacheKey = cid + "_" + lv;
    if (cardDescCache.hasOwnProperty(cacheKey)) {
        return cardDescCache[cacheKey];
    }
    let cardConfig = cardTpl[cid];
    let paramFunc = function (func) {
        if (func) {
            return func(lv);
        }
        return func;
    }
    let desc = cardTpl[cid].CardDescription.format(
        paramFunc(cardConfig.Param0),
        paramFunc(cardConfig.Param1),
        paramFunc(cardConfig.Param2),
        paramFunc(cardConfig.Param3));
    cardDescCache[cacheKey] = desc;
    return desc;
};
