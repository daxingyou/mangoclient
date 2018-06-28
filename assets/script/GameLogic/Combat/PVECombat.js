var Combat = require('Combat')
var Hero_ = require('Hero_')
var Monster_ = require('Monster_')
var dataMgr = require('DataMgr')
var dict = require('dict')
var MatrixPos = require('MatrixPos') 
var constant = require('constant') 

var PVECombat = function(){
    Combat.call(this);
} 

PVECombat.prototype = new Combat();

////初始化怪物
PVECombat.prototype.init = function(data){
    Combat.prototype.init.call(this,data);

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