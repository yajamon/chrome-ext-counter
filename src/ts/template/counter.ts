/// <reference path="../core/template" />

namespace YJMCNT {
    /**
     * CounterTemplate
     */
    export class CounterTemplate extends Core.Template{
        constructor() {
            super();
        }

        id: string = "";
        count:number = 0;

        render() {
            var counter = document.createElement("div");
            counter.classList.add("counter");

            var countView = document.createElement("span");
            countView.classList.add("count");
            countView.textContent = "count: " + this.count.toString();

            var countId = document.createElement("input");
            countId.type = "hidden";
            countId.classList.add("id");
            countId.value = this.id;

            var manipulate = document.createElement("div");
            manipulate.classList.add("manipulate");

            var countUpButton = document.createElement("button");
            countUpButton.textContent = "Up";
            countUpButton.classList.add("countUp");
            manipulate.appendChild(countUpButton);

            var countDownButton = document.createElement("button");
            countDownButton.textContent = "Down";
            countDownButton.classList.add("countDown");
            manipulate.appendChild(countDownButton);

            var countResetButton = document.createElement("button");
            countResetButton.textContent = "Reset";
            countResetButton.classList.add("countReset");
            manipulate.appendChild(countResetButton);

            var counterDeleteButton = document.createElement("button");
            counterDeleteButton.textContent = "Delete";
            counterDeleteButton.classList.add("counterDelete");
            manipulate.appendChild(counterDeleteButton);

            counter.appendChild(countView);
            counter.appendChild(countId);
            counter.appendChild(manipulate);
            return counter;

        }
    }
}
