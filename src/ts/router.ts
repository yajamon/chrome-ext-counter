/// <reference path="../../typings/jquery/jquery" />

window.addEventListener("load", function() {
    var dom: Element = document.querySelector('.yjmcnt-index');
    if (dom != null) {
        var counter = new YJMCNT.CounterController(dom);
        counter.show();
    }
});
