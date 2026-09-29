/// <reference path="controller/counterController" />

function routing() {
    var dom = document.querySelector('.yjmcnt-index');
    if (dom instanceof HTMLElement) {
        var counter = new YJMCNT.CounterController(dom);
        counter.show();
    }
}
