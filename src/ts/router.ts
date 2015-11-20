/// <reference path="../../typings/jquery/jquery" />

$(function(){
    var dom = $('.yjmcnt-index');
    if (dom != null) {
        var counter = new YJMCNT.CounterController(dom);
        counter.show();
    }
});
