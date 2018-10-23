

// 全局通知
window.GlobalEvent = {
    _eventMap: [],

    on: function(type, callback, target) {
        if (this._eventMap[type] === undefined) {
            this._eventMap[type] = [];
        }
       
        this._eventMap[type].push({ callback: callback, target: target }); // 事件名为索引值
        console.log(this._eventMap[type], type);
    },

    emit: function(type, parameter) {
        var array = this._eventMap[type];  // 通过事件名type 检索到对应的事件
        if (array === undefined) 
        return;
        for (var i = 0; i < array.length; i++) {
            var element = array[i];
            if (element) element.callback.call(element.target, parameter); // element.target ----> this._eventMap[type].target
        }
    },

    off: function(type, callback) {
        var array = this._eventMap[type];
        if (array === undefined) return;
        for (var i = 0; i < array.length; i++) {
            var element = array[i];
            cc.log("关闭事件----------",element);
            if (element && element.callback === callback) {
                array[i] = undefined;
                break;
            }
        }
    },

    offType: function(type) {
        this._eventMap[type] = undefined;
    }
}
    // 尝试发射事件，传入参数字符串 “massage” ；  成功
        /*
            1. 通过参数 type = "sayHello" 检索到事件列表_eventMap["sayHello"]中的 sayHello 事件名对应的callback
            2. 执行 
                element.callback.call(element.target, parameter); 
            做了两件事
            ---> 将参数 parameter = "message" 传入callback 函数；

    offType: function(type) {
        this._eventMap[type] = undefined;
    }
    */
