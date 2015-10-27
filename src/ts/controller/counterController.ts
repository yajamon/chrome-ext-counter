namespace YJMCNT {
    /**
     * CounterController
     */
    export class CounterController {
        constructor(private dom:Element) {
        }
        
        show(){
            var view = new IndexView();
            this.dom.appendChild(view.render());
        }
    }
}