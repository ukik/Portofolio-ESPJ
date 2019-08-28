const idb = require('./libs/indexedDB');

// Using IndexedDB in the Service Worker
var posts = 'posts';
var sync_posts = 'sync-posts';

var dbPromise = idb.open('posts-store', 1, function (db) {
    if (!db.objectStoreNames.contains(posts)) {
        db.createObjectStore(posts, {
            keyPath: 'id'
        });
    }

    if(!db.objectStoreNames.contains(sync_posts)){
        db.createObjectStore(sync_posts, {
            keyPath: 'id'
        });
    }
});

function writeData(st, data) {
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
}

function readAllData(st) {
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

}

// Implementing the Clear Database Method
function clearAllData(st) {
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
}

// Deleting Single Items from the Database
// Optional
// offline untuk fetch akan blank datanya, karena data indexedDB terhapus
function deleteItemFromData(st, id) {
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
}


// function deleteItemFromData(st, id) {
//     console.log('deleteItemFromData ', id);
//     dbPromise
//       .then(function(db) {
//         var tx = db.transaction(st, 'readwrite');
//         var store = tx.objectStore(st);
//         store.delete(id);
//         return tx.complete;
//       })
//       .then(function() {
//         console.log('Item deleted!');
//       });
//   }

// Storing Subscriptions
function urlBase64ToUint8Array(base64String) {
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


