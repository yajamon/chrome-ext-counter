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
            var counter = document.createElement("div");
            var countView = document.createElement("span");
            countView.classList.add("count");
            countView.innerText = "count: "+this.counter.show().toString();
            
            var countUpButton:HTMLButtonElement = document.createElement("button");
            countUpButton.innerHTML = "Up";
            countUpButton.classList.add("countUp");
            
            counter.appendChild(countView);
            counter.appendChild(countUpButton);
            return counter;
        }
        update() {
            this.notifyObservers();
        }
    }
}
