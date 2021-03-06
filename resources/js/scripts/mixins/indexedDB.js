

// const idb = require('../declaratives/indexedDB');
const idb = require('../../pwa/libs/indexedDB')

// Using IndexedDB in the Service Worker
var database = 'db-espj'
var store_table = 'store-espj';
var sync_table = 'sync-espj';

var dbPromise = idb.open(database, 1, function (db) {
    if (!db.objectStoreNames.contains(store_table)) {
        db.createObjectStore(store_table, {
            keyPath: 'id'
        });
    }

    if(!db.objectStoreNames.contains(sync_table)){
        db.createObjectStore(sync_table, {
            keyPath: 'id'
        });
    }
});

module.exports = {
    methods: {
        writeDataIndexedDB(st, data) {
            return dbPromise
                .then(function (db) {
        
                    console.log('writeData ', db);
                    try {
                        var tx = db.transaction(st, 'readwrite');
                        var store = tx.objectStore(st);
                        store.put(data);
                        return tx.complete;
                    } catch (error) {
                        console.log(error)
                    }
                })
        },
        readAllDataIndexedDB(st) {
            return dbPromise
                .then(function (db) {
        
                    console.log('readAllData ', db);
                    try {
                        var tx = db.transaction(st, 'readonly');
                        var store = tx.objectStore(st);
                        return store.getAll();
                    } catch (error) {
                        console.log(error)
                    }
                })
        
        },
        getDataIndexedDB(st, key) {
            return dbPromise
              .then(function (db) {
          
                console.log('getData ', db);
                try {
                  var tx = db.transaction(st, 'readonly');
                  var store = tx.objectStore(st);
                  return store.get(key);
                } catch (error) {
                  console.log(error)
                }
              })
        },        
        // Implementing the Clear Database Method
        clearAllDataIndexedDB(st) {
            return dbPromise
                .then(function (db) {
        
                    console.log('clearAllData ', db);
                    try {
                        var tx = db.transaction(st, 'readwrite');
                        var store = tx.objectStore(st);
                        store.clear();
                        return tx.complete;
                    } catch (error) {
                        console.log(error)
                    }
                });
        },
        // Deleting Single Items from the Database
        // Optional
        // offline untuk fetch akan blank datanya, karena data indexedDB terhapus
        deleteItemFromDataIndexedDB(st, id) {
            dbPromise
                .then(function (db) {
                    console.log('deleteItemFromData ', db);
                    try {
                        var tx = db.transaction(st, 'readwrite');
                        var store = tx.objectStore(st);
                        store.delete(id)
                        return tx.complete
                    } catch (error) {
                        console.log(error)
                    }
                })
                .then(function () {
                    console.log('Item deleted!');
                })
        },
        // Storing Subscriptions
        urlBase64ToUint8Array(base64String) {
            var padding = '='.repeat((4 - base64String.length % 4) % 4);
            var base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');
        
            var rawData = window.atob(base64);
            var outputArray = new Uint8Array(rawData.length);
        
            for (var i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
            }
            return outputArray;
        }
    }
}


