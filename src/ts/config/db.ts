/// <reference path="../core/migraterList" />

namespace YJMCNT.Config.DB {
    export const name = 'counter';
    export const version = 1;
    export const READONLY = "readonry";
    export const READWRITE = "readwrite";

    var Migrater = YJMCNT.Core.Migrater;
    export const migraterList = new YJMCNT.Core.MigraterList([
        new Migrater((db: IDBDatabase) => {
        }),
        new Migrater((db: IDBDatabase) => {
            db.createObjectStore('counters', { keyPath: "id" });
        }),
    ]);
}
