/// <reference path="../core/model" />

namespace YJMCNT {
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
        public add() {
            var transaction = this.db.transaction([this.storeName], Config.DB.READWRITE);
            var store = transaction.objectStore(this.storeName);
            var request = store.add(this.createDefaultData());
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
