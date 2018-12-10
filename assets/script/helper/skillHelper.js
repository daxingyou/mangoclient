/*
 * @Author: liuguolai 
 * @Date: 2018-12-04 20:56:41 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-12-04 20:57:56
 */
let skillTpl = require('Skill');
let skillUpTpl = require('SkillUp');

let skillHelper = module.exports;

skillHelper.actionsCache = {};

let getSkillUpValue = function (actionName, paramName, lv) {
    if (!skillUpTpl.hasOwnProperty(actionName))
        return 0;
    if (!skillUpTpl[actionName].hasOwnProperty(paramName))
        return 0;
    return skillUpTpl[actionName][paramName][lv - 1];
};

// 获取由经过等级转换的行为数据
skillHelper.getSkillAction = function (skillID, index, lv) {
    let cacheKey = skillID + "_" + index + "_" + lv;
    if (this.actionsCache.hasOwnProperty(cacheKey))
        return this.actionsCache[cacheKey];
    let res = {}, action = skillTpl[skillID][index].Actions;
    for (let actionName in action) {
        res[actionName] = {};
        let data = action[actionName];
        for (let key in data) {
            if (typeof data[key] === 'function') {
                res[actionName][key] = data[key](getSkillUpValue(actionName, key, lv));
            }
            else {
                res[actionName][key] = data[key];
            }
        }
    }
    this.actionsCache[cacheKey] = res;
    return res;
};
