/*
 * @Author: liuguolai 
 * @Date: 2018-12-04 14:37:24 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-12-08 17:03:58
 */
let cardTpl = require('Card');
let LoadRes = require('LoadRes');
let consts = require('consts');
let UIConsts= require('UIConsts');

let UIHelper = module.exports;

UIHelper.cardSpriteAtlasCache = {};
UIHelper.getCardIcon = function (cardID, cb) {
    let atlasPath = 'cardIcons/' + cardTpl[cardID].CardDir, img = cardTpl[cardID].CardImage;
    if (atlasPath in this.cardSpriteAtlasCache) {
        return cb(this.cardSpriteAtlasCache[atlasPath].getSpriteFrame(img));
    }
    LoadRes.loadSpriteAtlas(atlasPath, false, function (atlas) {
        this.cardSpriteAtlasCache[atlasPath] = atlas;
        cb(this.cardSpriteAtlasCache[atlasPath].getSpriteFrame(img));
    }.bind(this));
};

UIHelper.getUserStateStr = function (state) {
    if (state == consts.UserState.ONLINE) {
        return "在线";
    }
    else if (state == consts.UserState.OFFLINE) {
        return "离线";
    }
    else if (state == consts.UserState.TEAM) {
        return "组队中";
    }
    else if (state == consts.UserState.PLAYING) {
        return "游戏中";
    }
    else {
        return "离线";
    }
};

UIHelper.getUserStateColor = function (state) {
    if (state == consts.UserState.ONLINE) {
        return UIConsts.Color.green;
    }
    else if (state == consts.UserState.TEAM) {
        return UIConsts.Color.yellow;
    }
    else if (state == consts.UserState.PLAYING) {
        return UIConsts.Color.yellow;
    }
    else {
        return UIConsts.Color.gray;
    }
};

UIHelper.getOfflineStr = function (logoutTime) {
    let timeNow = new Date().getTime();
    if (!logoutTime || timeNow < logoutTime) {
        return '7天前';
    }
    logoutTime = timeNow - logoutTime;
    let sec = Math.floor(logoutTime / 1000);
    if (sec < 60)
        return '1分钟';
    let min = Math.floor(sec / 60);
    if (min < 60)
        return min + '分钟';
    let hour = Math.floor(min / 60);
    if (hour < 24)
        return hour + '小时';
    let day = Math.floor(hour / 24);
    if (day < 7)
        return day + '天';
    return '7天前'
};
