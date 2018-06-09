var fight = {
    fightui : null,

    init : function(data){
        this.fightui = cc.find("Canvas/FightUI").getComponent('FightUI');
    },
    OnFreshPile : function(data)
    {
        if(this.fightui == null)
        this.fightui = cc.find("Canvas/FightUI").getComponent('FightUI');
        this.fightui.OnFresh(data);
    }
}

module.exports = fight;