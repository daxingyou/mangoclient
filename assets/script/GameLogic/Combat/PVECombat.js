var Combat = require('Combat')

var PVECombat = function(){
    Combat.call(this);//调用一个对象的方法，用另外一个对象去替换它
} 

PVECombat.prototype = new Combat();

////初始化怪物
PVECombat.prototype.init = function(data){
 //  cc.log(data,"------------------data,初始化怪物");
    Combat.prototype.init.call(this,data);//PVECombat脚本

    //var matrix = dataMgr.matrix[data.Matrix];
    
    //var monsters = new dict(data.MonsterGroup);
    //var matrix_pos = new MatrixPos(matrix.MatrixPos);

    //if(monsters.length > matrix_pos.length){
    //    cc.error('PVE matrix data error !');
    //    return;
    //}
/*
    ////怪物数据 暂是本地数据
    for(var i =0;i < monsters.length; i++){
        var pos =  matrix_pos.Matrixs[parseInt(monsters[i].key)];
        var enem = new Monster_(dataMgr.monster[monsters[i].value],pos,constant.Team.enemy);
        this.enemy[i] = enem;
    }
*/
}

module.exports = PVECombat;