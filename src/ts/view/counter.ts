/// <reference path="../core/view" />
/// <reference path="../model/countersStore" />
/// <reference path="../model/counter" />
/// <reference path="../template/counterList" />
/// <reference path="../template/addCounter" />
/// <reference path="../../../typings/es6-promise/es6-promise" />

namespace YJMCNT {
    /**
     * CounterView
     */
    export class CounterView extends Core.View {
        counter:Counter;
        countersStore:CountersStore;

        constructor() {
            super();
            this.counter = new Counter();
            this.counter.addObserver(this);
            this.countersStore = new CountersStore();
            this.countersStore.addObserver(this);
        }
        render(callback:(context:JQuery)=>void) {
            var renderingAddCounter = Promise.resolve();
            renderingAddCounter.then(() => {
                var template = new AddCounterTemplate();
                return template.render();
            });

            var renderingCounterList = Promise.resolve();
            renderingCounterList.then(() => {
                return new Promise((resolve) => {
                    this.countersStore.getAll(resolve);
                });
            }).then((counters: Counter[]) => {
                var template = new CounterListTemplate();
                template.counters = counters;
                return template.render();
            });

            Promise.all([
                renderingAddCounter,
                renderingCounterList,
            ]).then((values: JQuery[]) => {
                var context = $();
                values.forEach((value) => {
                    context = context.add(value);
                });
                callback(context);
            });
        }

        update() {
            this.notifyObservers();
        }
    }
}
