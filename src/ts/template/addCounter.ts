/// <reference path="../core/template" />

namespace YJMCNT {
    /**
     * CounterTemplate
     */
    export class AddCounterTemplate extends Core.Template{
        constructor() {
            super();
        }

        render() {
            var counter = document.createElement("div");
            counter.classList.add("addCounter");

            var manipulate = document.createElement("div");
            manipulate.classList.add("manipulate");

            var addCounterButton = document.createElement("button");
            addCounterButton.textContent = "addCounter";
            addCounterButton.classList.add("addCounter");
            manipulate.appendChild(addCounterButton);

            counter.appendChild(manipulate);
            return counter;
        }
    }
}
