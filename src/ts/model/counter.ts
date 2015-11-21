/// <reference path="../core/model" />

namespace YJMCNT {
    /**
     * Counter
     */
    export class Counter extends Core.Model {
        private _value:number;
        
        constructor() {
            super();
            this._value = 0;
        }
        
        up (val:number){
            this.value += val;
            this.notifyObservers();
        }
        
        down (val:number){
            this.value -= val;
            this.notifyObservers();
        }
        
        show (){
            return this._value;
        }
        
        private set value(v : number) {
            this._value = Math.ceil(v);
        }
        
        private get value() : number {
            return this._value;
        }

    }
}
