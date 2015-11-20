/// <reference path="../core/controller" />

namespace YJMCNT {
    /**
     * CounterController
     */
    export class CounterController extends Core.Controller {
        counter:Counter;
        countView:CounterView;
        
        constructor(private dom:Element) {
            super();
            this.countView = new CounterView();
            this.countView.addObserver(this);
            this.counter = this.countView.counter;
        }
        
        show(){
            var view = this.countView;
            
            var content = view.render();
            this.bindCountUp(content);
            this.bindCountDown(content);
            
            this.dom.appendChild(content);
        }
        
        update(){
            var view = this.countView;
            
            while (this.dom.firstChild) {
                this.dom.removeChild(this.dom.firstChild);
            }

            var content = view.render();
            this.bindCountUp(content);
            this.bindCountDown(content);

            this.dom.appendChild(content);
        }
        
        bindCountUp(hasButtonDom:Element){
            var upButton = hasButtonDom.querySelector(".countUp");
            upButton.addEventListener("click",(e)=>{
                e.preventDefault();
                this.counter.up(1);
            });
        }
        
        bindCountDown(hasButtonDom:Element){
            var downButton = hasButtonDom.querySelector(".countDown");
            downButton.addEventListener("click",(e)=>{
                e.preventDefault();
                this.counter.down(1);
            });
        }
        
    }
}