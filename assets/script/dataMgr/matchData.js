/*
 * @Author: liuguolai 
 * @Date: 2018-12-14 11:10:09 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-12-14 11:26:04
 * 匹配管理
 */
let consts = require('consts');

module.exports = {
    bInit: false,
    init: function (info) {
        this.alreadyConfirm = info.alreadyConfirm;
        this.confirmList = info.confirmList;
        this.dgId = info.dgId;
        this.hadMatchTime = info.hadMatchTime;
        this.inMatching = info.inMatching;
        this.predictTime = info.predictTime;
        this.punishBeginTime = info.punishBeginTime;
        if (this.bInited)
            return this;
        this.bInited = true;

        let self = this;
        pomelo.on('onPunishBeginTimeUpdate', function (data) {
            cc.log("超时惩罚开始时间更新", data);
            self.punishBeginTime = data.PunishBeginTime;
        });
        return this;
    },

    isInPunish() {
        if (this.punishBeginTime &&
            (new Date().getTime() - this.punishBeginTime < consts.Match.PUNISH_TIME * 1000)) {
            return true;
        }
        return false;
    },
};
