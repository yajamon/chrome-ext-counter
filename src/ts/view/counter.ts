/// <reference path="../core/view" />
/// <reference path="../model/counter" />
/// <reference path="../template/counter" />
/// <reference path="../template/addCounter" />

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
            var context = $();
            
            var addCounterTemplate = new AddCounterTemplate();
            context = addCounterTemplate.render();
            
            var counterTemplate = new CounterTemplate();
            counterTemplate.count = this.counter.show();
            context = context.add(counterTemplate.render());
            
            return context;
        }
        update() {
            this.notifyObservers();
        }
    }
}
