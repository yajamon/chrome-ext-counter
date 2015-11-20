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
            
            var manipulate = $("<div>");
            manipulate.addClass("manipulate");
            
            var countUpButton = $("<button>");
            countUpButton.html("Up");
            countUpButton.addClass("countUp");
            countUpButton.appendTo(manipulate);
            
            var countDownButton = $("<button>");
            countDownButton.html("Down");
            countDownButton.addClass("countDown");
            countDownButton.appendTo(manipulate);
            
            var countResetButton = $("<button>");
            countResetButton.html("Reset");
            countResetButton.addClass("countReset");
            countResetButton.appendTo(manipulate);
            
            counter.append(countView);
            counter.append(manipulate);
            return counter;
        }
        update() {
            this.notifyObservers();
        }
    }
}
