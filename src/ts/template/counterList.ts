/// <reference path="../core/template" />
/// <reference path="../model/counter" />
/// <reference path="counter" />

namespace YJMCNT {
    /**
     * CounterTemplate
     */
    export class CounterListTemplate extends Core.Template{
        constructor() {
            super();
        }

        counters: Counter[];

        render() {
            var context = $("<div>");



            return context;
        }
    }
}
