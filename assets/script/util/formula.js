/*
 * @Author: liuguolai 
 * @Date: 2018-11-12 17:45:47 
 * @Last Modified by: liuguolai
 * @Last Modified time: 2018-11-12 19:29:48
 */
module.exports = {
    triangleArea: function (p1, p2, p3) {
        // S=(1/2)*(x1y2+x2y3+x3y1-x1y3-x2y1-x3y2)
        return Math.abs(0.5 * (p1.x * p2.y + p2.x * p3.y + p3.x * p1.y - p1.x * p3.y - p2.x * p1.y - p3.x * p2.y));
    }
};