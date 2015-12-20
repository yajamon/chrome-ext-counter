/// <reference path="../core/model" />
/// <reference path="countersStore" />

namespace YJMCNT {
    /**
     * Counter
     */
    export class Counter extends Core.Model {
        private _id: string;
        private _value: number;
        private _defaltValue: number;

        static observerList: Core.Observer[] = [];

        storeName = "counters";

        constructor() {
            super();
            this.observerList = Counter.observerList;
            this._id = this.generateUUID();
            this.value = 0;
            this.defaltValue = 0;
        }

        static make(): Counter {
            var c = new Counter();
            return c;
        }

        private generateUUID(): string {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

        serialize(): CountersSchema {
            var data: CountersSchema = {
                id: this._id,
                value: this.value,
                defaltValue: this.defaltValue,
            };
            return data;
        }

        static deserialize(data: CountersSchema): Counter {
            var counter = this.make();
            counter._id = data.id;
            counter.value = data.value;
            counter.defaltValue = data.defaltValue;
            return counter;
        }

        up(val: number) {
            this.value += val;
            this.saveToStore();
        }

        down(val: number) {
            this.value -= val;
            this.saveToStore();
        }

        reset() {
            this.value = this.defaltValue;
            this.saveToStore();
        }

        saveToStore() {
            var transaction = this.db.transaction([this.storeName], Config.DB.READWRITE);
            var store = transaction.objectStore(this.storeName);
            var request = store.put(this.serialize());
            request.onsuccess = (event) => {
                this.notifyObservers();
            }
        }

        show() {
            return this._value;
        }

        public get id(): string {
            return this._id;
        }

        private set value(v: number) {
            this._value = Math.ceil(v);
        }

        private get value(): number {
            return this._value;
        }

        private set defaltValue(v: number) {
            this._defaltValue = Math.ceil(v);
        }

        private get defaltValue(): number {
            return this._defaltValue;
        }

    }
}
