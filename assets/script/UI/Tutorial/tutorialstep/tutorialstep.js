var tutorialstep = function(cb){
    this.callback = cb;
}

tutorialstep.prototype.listen = function(){
    this.callback();
}

module.exports = tutorialstep;