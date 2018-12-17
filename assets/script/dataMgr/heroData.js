/*
 * @Author: liuguolai 
 * @Date: 2018-12-12 15:00:25 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-12-12 15:03:40
 * 英雄数据管理
 */

module.exports = {
    bInit: false,
    init: function (info) {
        this.ownHeros = info.ownHeros;
        if (this.bInited)
            return this;
        this.bInited = true;
        return this;
    }
};
