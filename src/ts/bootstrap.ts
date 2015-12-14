/// <reference path="config/db" />
/// <reference path="router" />

$(function() {
    var config = YJMCNT.Config;
    
    var adapter = YJMCNT.Core.IndexedDBAdapter.getInstance();
    adapter.openDatabase(
        config.DB.name,
        config.DB.version,
        config.DB.migraters
    );
    
    routing();
});
