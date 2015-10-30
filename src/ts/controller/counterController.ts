namespace YJMCNT {
    /**
     * CounterController
     */
    export class CounterController extends Core.Controller {
        constructor(private dom:Element) {
            super();
        }
        
        show(){
            var view = new IndexView();
            this.dom.appendChild(view.render());
        }
        
        update(){
            this.show();
        }
    }
}