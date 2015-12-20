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

            for (var index = 0; index < this.counters.length; index++) {
                var counter = this.counters[index];
                var template = new CounterTemplate();
                template.count = counter.show();
                context.append(template.render());
            }

            return context;
        }
    }
}
