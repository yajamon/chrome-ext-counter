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
            var counter = $("<div>");
            var countView = $("<span>");
            countView.addClass("count");
            countView.html( "count: "+this.counter.show().toString() );
            
            var countUpButton = $("<button>");
            countUpButton.html("Up");
            countUpButton.addClass("countUp");
            
            var countDownButton = $("<button>");
            countDownButton.html("Down");
            countDownButton.addClass("countDown");
            
            counter.append(countView);
            counter.append(countUpButton);
            counter.append(countDownButton);
            return counter;
        }
        update() {
            this.notifyObservers();
        }
    }
}
