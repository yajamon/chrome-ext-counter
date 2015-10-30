/// <reference path="../core/controller" />

namespace YJMCNT {
    /**
     * CounterController
     */
    export class CounterController extends Core.Controller {
        constructor(private dom:Element) {
            super();
        }
        
        show(){
            var view = new CounterView();
            view.addObserver(this);
            
            this.dom.appendChild(view.render());
        }
        
        update(){
            var view = new CounterView();
            
            while (this.dom.firstChild) {
                this.dom.removeChild(this.dom.firstChild);
            }
            this.dom.appendChild(view.render());
        }
    }
}