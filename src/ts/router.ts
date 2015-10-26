/// <reference path="view/index" />

window.addEventListener("load", function() {
    var dom: Element = document.querySelector('.yjmcnt-index');
    if (dom != null) {
        dom.appendChild(new YJMCNT.IndexView().render());
    }
});
