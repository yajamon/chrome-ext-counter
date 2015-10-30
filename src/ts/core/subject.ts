namespace YJMCNT.Core {
    export interface Subject {
        observerList: Observer[],
        addObserver(observer:Observer):void,
        notifyObservers():void, 
    }
}
