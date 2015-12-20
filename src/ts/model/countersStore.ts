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
        public add(counter :CountersSchema) {
            var transaction = this.db.transaction([this.storeName], Config.DB.READWRITE);
            var store = transaction.objectStore(this.storeName);
            var request = store.add(counter);
            request.onsuccess = (event)=>{
                this.notifyObservers();
            };
        }

        private createDefaultData() {
            return {
                id : '1234567890',
                value : 0,
            }
        }
    }
}
