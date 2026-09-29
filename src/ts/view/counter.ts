/// <reference path="../core/view" />
/// <reference path="../model/countersStore" />
/// <reference path="../model/counter" />
/// <reference path="../template/counterList" />
/// <reference path="../template/addCounter" />

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
        render(callback:(context:DocumentFragment)=>void) {
            var renderingAddCounter = Promise.resolve().then(() => {
                var template = new AddCounterTemplate();
                return template.render();
            });

            var renderingCounterList = Promise.resolve().then(() => {
                return new Promise<Counter[]>((resolve) => {
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
            ]).then((values: [HTMLElement, HTMLElement]) => {
                var context = document.createDocumentFragment();
                values.forEach((value) => {
                    context.appendChild(value);
                });
                callback(context);
            });
        }

        update() {
            this.notifyObservers();
        }
    }
}
