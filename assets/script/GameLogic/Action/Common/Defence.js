var Defence = function(attrs,ability,owner)
{
    ActionBase.call(this);
}

Defence.prototype.constructor = Defence; // 需要修复下构造函数
Defence.prototype.time = 0;

Defence.prototype.enter = function(){
    this.owner.addtional_Physical_arm += util.GetValue('physical_arm');
    this.time = util.GetValue('time');

    if(this.time > 0)
        exit();
}

Defence.prototype.tick = function(dt){
    this.time -= dt;
    if(this.time <= 0)
        exit();
}

module.exports = Defence;