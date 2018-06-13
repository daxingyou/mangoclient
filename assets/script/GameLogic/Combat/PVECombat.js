var Combat = require('Combat')
var Combatunit = require('Combatunit')

var PVECombat = function(){

} 

PVECombat.prototype = new Combat();
////初始化怪物
PVECombat.prototype.init = function(data){

    this.super().init();

    var matrix = dataMgr.matrix[data.Matrix];
    
    var monsters = new dict(data.MonsterGroup);
    var matrix_pos = new dict(matrix.MatrixPos);

    if(monsters.length > matrix_pos.length){
        cc.error('PVE matrix data error !');
        return;
    }

    ////怪物数据 暂是本地数据
    for(var i =1;i < monsters.length + 1; i++){
        var item = new Hero(dataMgr.monster[monsters[i]]);

        var enem = new Combatunit(item);

        enemy[i] = enem;
    }

    
}

module.exports = PVECombat;