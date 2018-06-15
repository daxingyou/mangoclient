var MatrixPos = function(data){
    this.Matrixs = [];
    //this.test = JSON.parse(data);

    var indexs = [];
    var result = 0;

    ////拆分数据
    while(result > -1)
    {
        result = data.indexOf(',',result + 1);

        if(result > -1)
            indexs.push(result);
        
    }

    var item = [];
    var temp = 0;
    for(var i = 0;i<indexs.length/2;i++)
    {
        var idex = i * 2 +1;
        var end = indexs[idex];

        item.push(data.substring(temp,end));
        temp = end + 1;
    }

    for(var i=0;i<item.length;i++)
    {
        var mitem = new Matrixitem(item[i]);
        this.Matrixs[mitem.index] = mitem;
    }
    
}

var Matrixitem = function(data){
    this.index = data[1];
    var text = data.substring(4);
    this.pos = JSON.parse(text);
}

module.exports = MatrixPos;