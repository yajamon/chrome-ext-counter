namespace YJMCNT.Core {
    /**
     * Migrater
     */
    export class Migrater {
        constructor(private upLogic:(db:IDBDatabase)=>void) {
        }
        /**
         * up
         */
        public up(db:IDBDatabase) {
            this.upLogic(db);
        }
    }
}
