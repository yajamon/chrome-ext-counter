/// <reference path="../core/model" />

namespace YJMCNT {
    /**
     * Counter
     */
    export class Counter extends Core.Model {
        private _id:string;
        private _value:number;
        private _defaltValue:number;

        constructor(id:string) {
            super();
            this.value = 0;
            this.defaltValue = 0;
            this._id = id;
        }

        up (val:number){
            this.value += val;
            this.notifyObservers();
        }

        down (val:number){
            this.value -= val;
            this.notifyObservers();
        }

        reset (){
            this.value = this.defaltValue;
            this.notifyObservers();
        }

        show (){
            return this._value;
        }

        public get id() : string {
            return this._id;
        }

        private set value(v : number) {
            this._value = Math.ceil(v);
        }

        private get value() : number {
            return this._value;
        }

        private set defaltValue(v : number) {
            this._defaltValue = Math.ceil(v);
        }

        private get defaltValue() : number {
            return this._defaltValue;
        }

    }
}
