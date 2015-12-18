/// <reference path="../core/template" />

namespace YJMCNT {
    /**
     * CounterTemplate
     */
    export class CounterTemplate extends Core.Template{
        constructor() {
            super();
        }
        
        count:number = 0;
        
        render() {
            var counter = $("<div>");
            counter.addClass("counter");

            var countView = $("<span>");
            countView.addClass("count");
            countView.html( "count: "+this.count.toString() );
            
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
    }
}
