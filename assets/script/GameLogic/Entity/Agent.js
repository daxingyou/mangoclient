/**
 *      角色实体类
 *      by pwh         
 */

var loadRes = require('LoadRes')
var constant = require('constants')

var Agent = function (path, position, bInLeft, owner, loadok) {
    this.owner = owner;
    this.go = null;
    this.hpbar = null;
    this.spData = null;
    this.width = 0;
    this.height = 0;
    this.contentSize = null;
    this.aniMgr = null;
    this.bInLeft = bInLeft;  // 在左边
    var that = this;

    loadRes.load('UI/hero/hpBar', false, (data) => {
        that.hpbar = cc.instantiate(data).getComponent('hpBar');
        that.hpbar.node.parent = cc.find('Canvas/visibleArea/hp');
        that.hpbar.freshen(owner.hp, owner.maxHp, owner.armor);
        that.hpbar.freshenBuff(owner.buffs);
        //cc.log(owner.buffs,"-------------owner.buffs");
        loadRes.load(path, false, (data) => {
            that.go = cc.instantiate(data);
            that.go.parent = cc.find('Canvas/visibleArea/pool');
            that.go.position = cc.v2(position.x, position.y);

            var index  = 0, pos = owner.pos;
            if(pos == 1 || pos == 2)
            {
                index = 1;
            }
            else if(pos == 3 || pos == 4)
            {
                index = 2;
            }

            that.go.zIndex = index;

            let scale = owner.scale;
            if (this.bInLeft)
                this.go.scaleX = scale;
            else
                this.go.scaleX = -scale;

            that.go.scaleY = scale;
            var spData = that.go.getChildByName('body').getComponent(sp.Skeleton);
            that.height = Math.ceil(spData.skeletonData.skeletonJson.skeleton.height);
            that.width = Math.ceil(spData.skeletonData.skeletonJson.skeleton.width);
            var worldPos = that.go.parent.convertToWorldSpaceAR(position);
            that.contentSize = new cc.Rect(worldPos.x - that.width / 2, worldPos.y, that.width, that.height);
            that.aniMgr = that.go.getChildByName('body').getComponent('AnimationMgr');

            if(that.go.name == 'head')
            {
                that.hpbar.node.position = cc.v2(position.x - 667, position.y + that.height + 80 - 375);
            }
            else
            {
                that.hpbar.node.position = cc.v2(position.x - 667, position.y + that.height + 20 - 375);
            }

            loadok();
        })
    })
}

Agent.prototype.PlayAnimation = function (ani, loop) {
    return this.aniMgr.playAnimation(ani, loop)
}

Agent.prototype.setCompleteCallback = function (name, cb) {
    this.aniMgr.setCompleteCallback(name, cb);
};

Agent.prototype.getContentSize = function () {
    return this.contentSize;
}

Agent.prototype.setPos = function (pos) {
    this.go.position = cc.v2(pos.x, pos.y);
    this.hpbar.node.position = cc.v2(pos.x - 667, pos.y + this.height + 20 - 375);

    pos = this.go.parent.convertToWorldSpaceAR(pos);
    this.contentSize = new cc.Rect(pos.x - this.width / 2, pos.y, this.width, this.height);
}

Agent.prototype.setScale = function (scale) {
    if (this.bInLeft)
        this.go.scaleX = scale;
    else
        this.go.scaleX = -scale;
    this.go.scaleY = scale;
    
    this.contentSize = new cc.Rect(this.go.position.x - this.width / 2, this.go.position.y, this.width * scale, this.height * scale);
}

Agent.prototype.Release = function () {
    this.go.destroy();
    this.hpbar.node.destroy();
    this.go = null;
    this.hpbar = null;
    this.spData = null;
    this.width = 0;
    this.height = 0;
    this.contentSize = null;
    this.aniMgr = null;
}

module.exports = Agent;