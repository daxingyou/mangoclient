/*
 * @Author: liuguolai 
 * @Date: 2018-08-13 11:25:23 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-08-13 20:46:22
 */
var FSMStateID = {
    NULL: 0,
    DIE: 1,  // 死亡
    SWOON: 2,  // 眩晕
    SING: 3,  // 吟唱
    HIT: 4,  // 被击
    STANDBY: 5,  // 待机
    RELIVE: 6,  // 复活
};

module.exports = FSMStateID;
