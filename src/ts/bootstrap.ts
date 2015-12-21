/// <reference path="config/db" />
/// <reference path="core/indexeddbAdapter" />
/// <reference path="router" />

$(function() {
    var config = YJMCNT.Config;

    var adapter = YJMCNT.Core.IndexedDBAdapter.getInstance();
    var p = Promise.resolve();
    p.then(() => {
        return new Promise((resolve) => {
            adapter.openDatabase(config.DB, resolve);
        });
    }).then(() => {
        return routing();
    });
});
