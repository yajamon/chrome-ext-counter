/// <reference path="../core/model" />

namespace YJMCNT {

    export interface CountersSchema {
        id: string,
        value: number,
        defaltValue: number,
    }

    /**
     * Counter
     */
    export class CountersStore extends Core.Model {
        storeName = "counters";

        constructor() {
            super();
        }

        /**
         * add
         */
        public add(counter: CountersSchema) {
            var transaction = this.db.transaction([this.storeName], Config.DB.READWRITE);
            var store = transaction.objectStore(this.storeName);
            var request = store.add(counter);
            request.onsuccess = (event) => {
                this.notifyObservers();
            };
        }

        /**
         * getById
         */
        public getById(id: string, callback: (counter: Counter) => void) {
            var counter: Counter = null;
            var transaction = this.db.transaction([this.storeName], Config.DB.READWRITE);
            var store = transaction.objectStore(this.storeName);
            var request = store.get(id);
            request.onsuccess = (event) => {
                var target = <IDBRequest>event.target;
                var data: CountersSchema = target.result;
                callback(Counter.deserialize(data));
            }
        }

        /**
         * getAll
         */
        public getAll(callback: (counterList: Counter[]) => void) {
            var counters: Counter[] = [];
            var transaction = this.db.transaction([this.storeName], Config.DB.READWRITE);
            var store = transaction.objectStore(this.storeName);
            var request = store.openCursor();
            request.onsuccess = (event) => {
                var target = <IDBRequest>event.target;
                var cursor: IDBCursorWithValue = target.result;

                if (!!cursor == false) {
                    callback(counters);
                    return;
                }
                var data:CountersSchema = cursor.value;
                counters.push(Counter.deserialize(data));
                cursor.continue();
            }

        }
    }
}
