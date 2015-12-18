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
    }
}
