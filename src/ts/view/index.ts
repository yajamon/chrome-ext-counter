namespace YJMCNT {
    /**
     * IndexView
     */
    export class IndexView {
        constructor() {
        }
        render() {
            var span: HTMLSpanElement = document.createElement("span");
            span.innerText = "Hello typescript world";
            return span;
        }
    }
}
