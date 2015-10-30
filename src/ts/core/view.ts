namespace YJMCNT.Core {
    /**
     * View
     */
    export class View implements Observer, Subject {
        observerList:Observer[]; 

        constructor() {
            this.observerList = [];
        }
        
        update():void {
        }
        
        addObserver(observer:Observer):void {
            this.observerList.push(observer);
        }
        notifyObservers():void {
            for (var index = 0; index < this.observerList.length; index++) {
                var observer = this.observerList[index];
                observer.update();
            }
        }
        
        render():Element {
            return document.createElement("div");
        }
    }
}
