/*
 * @Author: liuguolai 
 * @Date: 2018-11-19 19:46:53 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-11-20 09:43:45
 * 新手引导进入副本
 */
function tutorialEnterDungeonProto(dgId) {
    this.head = "connector.tutorialHandler.tutorialEnterDungeon";
    this.data = new tutorialEnterDungeonData(dgId);
}

function tutorialEnterDungeonData(dgId){
    this.dgId = dgId;
}

module.exports = tutorialEnterDungeonProto;