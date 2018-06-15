var util = {
    excelToArray : function(str){
        return str.split(';');
    },
    GetValue(attrs,key)
    {
        if(attrs.indexOf(key) > -1)
        {
            return attrs[key];
        }
        else{
            return 0;
        }
    },
    computeDamage : function(from,to,dmg){
        to.onDamage(dmg);
    }
}

module.eports = util;