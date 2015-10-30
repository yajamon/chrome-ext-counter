namespace YJMCNT.Core {
    /**
     * View
     */
    export class View implements Observer {
        constructor() {
        }
        
        update():void {
        }
        
        render():Element {
            return document.createElement("div");
        }
    }
}
