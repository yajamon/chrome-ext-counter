/// <reference path="../core/view" />

namespace YJMCNT {
    /**
     * CounterView
     */
    export class AddCounterView extends Core.View {
        
        constructor() {
            super();
        }
        render() {
            var counter = $("<div>");
            counter.addClass("addCounter");
            
            var manipulate = $("<div>");
            manipulate.addClass("manipulate");
            
            var addCounterButton = $("<button>");
            addCounterButton.html("AddCounter");
            addCounterButton.addClass("AddCounter");
            addCounterButton.appendTo(manipulate);
            
            counter.append(manipulate);
            return counter;
        }
        update() {
            this.notifyObservers();
        }
    }
}
