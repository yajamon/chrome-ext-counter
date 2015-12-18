/// <reference path="migrater" />

namespace YJMCNT.Core {
    /**
     * MigraterList
     */
    export class MigraterList {
        constructor(private migraters:Migrater[]) {
        }
        /**
         * migration
         */
        public migration(event:IDBVersionChangeEvent) {
            var target = <IDBOpenDBRequest>event.target;
            var db = <IDBDatabase>target.result;
            var oldVersion = event.oldVersion || 0;
            var newVersion = event.newVersion;

            for (var index = (oldVersion+1); index <= newVersion; index++) {
                var element = this.migraters[index];
                element.up(db);
            }
        }
    }
}
