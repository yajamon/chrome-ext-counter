/// <reference path="../../typings/jquery/jquery" />
/// <reference path="controller/counterController" />


$(function(){
    var dom = $('.yjmcnt-index');
    if (dom != null) {
        var counter = new YJMCNT.CounterController(dom);
        counter.show();
    }
});
