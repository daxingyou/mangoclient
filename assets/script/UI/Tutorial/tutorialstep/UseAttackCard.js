var TutorialStep = require("tutorialstep")

function UseAttackCard(){

}

(function () {
    // 创建一个没有实例方法的类
    var Super = function () { };
    Super.prototype = TutorialStep.prototype;
    //将实例作为子类的原型
    UseAttackCard.prototype = new Super();
})();

UseAttackCard.prototype.constructor = UseAttackCard;

module.exports = UseAttackCard;