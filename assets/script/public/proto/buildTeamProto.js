/*
 * @Author: liuguolai 
 * @Date: 2018-09-21 19:18:54 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-09-21 19:21:58
 * 创建队伍
 */
function buildTeamProto(teamType) {
    this.head = "connector.teamHandler.buildTeam";
    this.data = new buildTeamData(teamType);
}

function buildTeamData(teamType){
    this.teamType = teamType;
}

module.exports = buildTeamProto;