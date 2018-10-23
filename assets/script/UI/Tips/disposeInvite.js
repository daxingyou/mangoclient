var constant = require('constants')
var net = require("NetPomelo")
var acceptInviteProto = require('acceptInviteProto')
var ignoreTeamInviteProto = require('ignoreTeamInviteProto')
var dataCenter = require('DataCenter')

var disposeInvite = {
     comfirm: function (eid) {
        var uimgr = cc.find('Canvas').getComponent('UIMgr');
        uimgr.loadUI(constant.UI.BuildTeam,function(data){
            data.laodFriendList();//加载可以邀请的好友信息
            data.loadMebers(dataCenter.members);//加载已经在队伍里的成员
        });
        net.Request(new acceptInviteProto(eid), (data) => {
            cc.log("同意组队邀请",data);
        });
    },
    
     ingore:function (eid) {
        net.Request(new ignoreTeamInviteProto(eid), (data) => {
            cc.log("忽略请求",data);
        });
    },
}


module.exports = disposeInvite;
