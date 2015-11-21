/// <reference path="../core/controller" />
/// <reference path="../view/counter" />


namespace YJMCNT {
    /**
     * CounterController
     */
    export class CounterController extends Core.Controller {
        counter:Counter;
        countView:CounterView;
        
        constructor(private $element:JQuery) {
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
            
            this.$element.append(content);
        }
        
        update(){
            var view = this.countView;
            
            this.$element.empty();

            var content = view.render();
            this.bindCountUp(content);
            this.bindCountDown(content);

            this.$element.append(content);
        }
        
        bindCountUp(hasButtonDom:JQuery){
            var upButton = hasButtonDom.find(".countUp");
            upButton.on("click",(e)=>{
                e.preventDefault();
                this.counter.up(1);
            });
        }
        
        bindCountDown(hasButtonDom:JQuery){
            var downButton = hasButtonDom.find(".countDown");
            downButton.on("click",(e)=>{
                e.preventDefault();
                this.counter.down(1);
            });
        }
        
    }
}