/*
 * @Author: liuguolai 
 * @Date: 2018-12-04 14:37:24 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-12-06 14:40:07
 */
let cardTpl = require('Card');
let LoadRes = require('LoadRes');
let consts = require('consts');

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
    if (state == consts.UserState.PLAYING) {
        return "游戏中";
    }
};
