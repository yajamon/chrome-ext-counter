/// <reference path="migraterList" />

namespace YJMCNT.Core {
    /**
     * IndexedDBAdapter
     */
    export class IndexedDBAdapter {
        private static _instance:IndexedDBAdapter = null;
        public db:IDBDatabase = null;
        constructor() {
            if (IndexedDBAdapter._instance) {
                throw new Error("must use the getInstance.");
            }
            IndexedDBAdapter._instance = this;
        }
        
        /**
         * getInstance
         */
        public static getInstance() {
            if(IndexedDBAdapter._instance === null) {
                new IndexedDBAdapter();
            }
            return IndexedDBAdapter._instance;
        }
        
        /**
         * open
         */
        public openDatabase(name: string, version?: number, migraterList?:MigraterList) {
            if (this.db){
                return;
            }
            
            var openRequest = indexedDB.open(name, version);
            openRequest.onsuccess = (event)=>{
                this.db = openRequest.result;
            };
            openRequest.onupgradeneeded = (event:IDBVersionChangeEvent)=>{
                migraterList.migration(event);
            };
        }
        
        /**
         * closeDatabase
         */
        public closeDatabase() {
            if (!this.db){
                return;
            }
            this.db.close();
        }
        
        /**
         * deleteDatabase
         */
        public deleteDatabase(name:string) {
            indexedDB.deleteDatabase(name);
        }
    }
}