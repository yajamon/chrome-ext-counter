/// <reference path="../core/view" />
/// <reference path="../model/counter" />
/// <reference path="../template/counter" />

namespace YJMCNT {
    /**
     * CounterView
     */
    export class CounterView extends Core.View {
        counter:Counter;
        
        constructor() {
            super();
            this.counter = new Counter();
            this.counter.addObserver(this);
        }
        render() {
            var counterTenplate = new CounterTemplate();
            counterTenplate.count = this.counter.show();
            
            return counterTenplate.render();
        }
        update() {
            this.notifyObservers();
        }
    }
}
