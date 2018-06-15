// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var dict = function(str){
    var items = new Array();

    var datas = str.split(',');

    for(var i =0;i<datas.length;i++)
    {
        var datass = datas[i].split(':');
        var it = {};
        it.key = parseInt(datass[0][1]);
        it.value = datass[1];
        
        items[i] = it;
    }

    return items;
}

module.exports = dict;

