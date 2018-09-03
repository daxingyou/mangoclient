var dataCenter = require('DataCenter')

String.prototype.format = function(args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if(args[key]!=undefined){
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg= new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
};

Math.seed = 0;
Math.seededRandom = function(min, max) { 
    max = max || 1; 
    min = min || 0; 
    Math.seed = (Math.seed * 9301 + 49297) % 233280; 
    var rnd = Math.seed / 233280.0; 
    return min + rnd * (max - min); 
};
Math.seededRandomInt = function(min, max) { 
    return Math.floor(Math.seededRandom(min, max + 1));
}

var utility ={
    uiMgr : null,

    computeDamage : function(owner,target,dmg){
        if(this.uiMgr == null)
            this.uiMgr = cc.find('Canvas').getComponent('UIMgr');

        target.onDamage(dmg,owner);
        this.uiMgr.loadDmg(target,dmg);
    },
    /* cp 在此是四个元素的数组: 
    cp[0] 为起点，或上图中的 P0 
    cp[1] 为第一控制点，或上图中的 P1 
    cp[2] 为第二控制点，或上图中的 P2 
    cp[3] 为结束点，或上图中的 P3 
    t 为参数值，0 <= t <= 1 */
    PointOnCubicBezier : function(cp,t ) 
    { 
        var ax, bx, cx , ay, by, cy; 
        var tSquared, tCubed;
        var result = new cc.Vec2(0,0); 
        /* 计算多项式系数 */ 
        cx = 3.0 * (cp[1].x - cp[0].x); 
        bx = 3.0 * (cp[2].x - cp[1].x) - cx; 
        ax = cp[3].x - cp[0].x - cx - bx; 
        cy = 3.0 * (cp[1].y - cp[0].y); 
        by = 3.0 * (cp[2].y - cp[1].y) - cy; 
        ay = cp[3].y - cp[0].y - cy - by; 
        /* 计算t位置的点值 */ 
        tSquared = t * t; 
        tCubed = tSquared * t; 

        result.x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x; 
        result.y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y; 

        //result.x = (ax * tSquared) + (bx * t) + (cx) + cp[0].x; 
        //result.y = (ay * tSquared) + (by * t) + (cy) + cp[0].y; 

        return result; 
    },
    
    /* ComputeBezier 以控制点 cp 所产生的曲线点*/ 
    ComputeBezier : function(start,end)
    {
        //const width = 40;
        var dis = cc.pDistance(start,end);
        //var numberOfPoints = Math.ceil(dis / width);
        var numberOfPoints = 16;
        
        var cp = new Array(cc.Vec2);
        cp[0] = start;
        cp[1] = new cc.Vec2(start.x,end.y);
        cp[2] = new cc.Vec2(start.x,end.y);
        cp[3] = end;

        var result = new Array();
        var dt = 1.0 / ( numberOfPoints - 1 ); 
        for(var i = 0; i < numberOfPoints; i++) 
            result[i] = this.PointOnCubicBezier( cp, i*dt ); 

        return result;
    },
    ComputeCardsBezier : function(start,end,num,point){
        var cp = new Array(cc.Vec2);
        cp[0] = start;
        cp[1] = new cc.Vec2(point.x,point.y);
        cp[2] = new cc.Vec2(point.x,point.y);
        cp[3] = end;

        var result = new Array();
        var dt = 1.0 / ( num - 1 ); 
        for(var i = 0; i < num; i++) 
            result[i] = this.PointOnCubicBezier( cp, i*dt ); 

        return result;
    },
    RandomInt : function(n, m){
        var random = Math.floor(Math.random()*(m-n+1)+n);
        return random;
    },
    RandomSeedInt : function(n, m){
        var value = this.randfloat(1);
        //cc.log('cur value == ',value);
        var random = Math.floor(value*(m-n+1)+n);
        //cc.log('cur random == ',random);
        return random;
    },
    rnd : function ( seed ){
        seed = ( seed * 9301 + 49297 ) % 233280; //为何使用这三个数?
        return seed / ( 233280.0 );
    },
    randint : function (number){
        var today = new Date(); 
        var seed = today.getTime()/100;
        seed =Math.floor(seed)+dataCenter.swordNum;
        dataCenter.swordNum++;
        return Math.ceil(this.rnd( seed ) * number );
    },
    randfloat : function (number){
        var today = new Date(); 
        var seed = today.getTime()/100;
        seed =Math.floor(seed)+dataCenter.swordNum;
        dataCenter.swordNum++;
        //cc.log('cur dataCenter.swordNum == ',dataCenter.swordNum);
        return this.rnd( seed ) * number;
    }
}

module.exports = utility;