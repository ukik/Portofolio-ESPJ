// Storing Fetched Posts in IndexedDB
// require('./pwa/indexedDBResource');
const idb = require('./pwa/libs/indexedDB');

console.log('SW')

var CACHE_STATIC_NAME = 'espj-static-v100';
var CACHE_DYNAMIC_NAME = 'espj-dynamic-v100';

// ----------------------------------------------------------------------------
// Async IndexedDB
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

  if (!db.objectStoreNames.contains(sync_table)) {
    db.createObjectStore(sync_table, {
      keyPath: 'id'
    });
  }
});

function writeDataIndexedDB(st, data) {
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


function readAllDataIndexedDB(st) {
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

function getDataIndexedDB(st, key) {
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
}


// Implementing the Clear Database Method
function clearAllDataIndexedDB(st) {
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
function deleteItemFromDataIndexedDB(st, id) {
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

// ----------------------------------------------------------------------------


const STATIC_FILES = [
    'vue/js/pages/login.js',
    'vue/js/pages/404.js',
    'vue/js/pages/permohonan/ganti-uang.js',
    'vue/js/pages/permohonan/uang-persediaan.js',

    'vue/js/layouts/layouts-header.js',
    'vue/js/layouts/layouts-navigation.js',
    'vue/js/layouts/layouts-content.js',
    'vue/js/layouts/layouts-footer.js',
    'vue/js/layouts/layouts.js',

    'vue/js/pages/data-dasar/dpa.js',
    'vue/js/pages/data-dasar/dpa/rincian.js',
    'vue/js/pages/data-dasar/dpa/edit.js',
    'vue/js/pages/data-dasar/bidang.js',
    'vue/js/pages/data-dasar/bidang/create.js',
    'vue/js/pages/data-dasar/bidang/edit.js',
    'vue/js/pages/data-dasar/pegawai.js',
    'vue/js/pages/data-dasar/pegawai/create.js',
    'vue/js/pages/data-dasar/pegawai/edit.js',
    'vue/js/pages/data-dasar/pemimpin.js',
    'vue/js/pages/data-dasar/pemimpin/create.js',
    'vue/js/pages/data-dasar/pemimpin/edit.js',
    'vue/js/pages/data-dasar/kpa.js',
    'vue/js/pages/data-dasar/kpa/create.js',
    'vue/js/pages/data-dasar/kpa/edit.js',
    'vue/js/pages/data-dasar/pptk.js',
    'vue/js/pages/data-dasar/pptk/create.js',
    'vue/js/pages/data-dasar/pptk/edit.js',
    'vue/js/pages/data-dasar/ppk.js',
    'vue/js/pages/data-dasar/ppk/create.js',
    'vue/js/pages/data-dasar/ppk/edit.js',
    'vue/js/pages/data-dasar/bendahara.js',
    'vue/js/pages/data-dasar/bendahara/create.js',
    'vue/js/pages/data-dasar/bendahara/edit.js',
    'vue/js/pages/data-dasar/penghubung.js',
    'vue/js/pages/data-dasar/penghubung/create.js',
    'vue/js/pages/data-dasar/penghubung/edit.js',
    'vue/js/pages/data-dasar/rekanan.js',
    'vue/js/pages/data-dasar/rekanan/create.js',
    'vue/js/pages/data-dasar/rekanan/edit.js',
    'vue/js/pages/data-dasar/lokasi/dalam-negeri.js',
    'vue/js/pages/data-dasar/lokasi/dalam-negeri/create.js',
    'vue/js/pages/data-dasar/lokasi/dalam-negeri/edit.js',
    'vue/js/pages/data-dasar/lokasi/luar-negeri.js',
    'vue/js/pages/data-dasar/lokasi/luar-negeri/create.js',
    'vue/js/pages/data-dasar/lokasi/luar-negeri/edit.js',

    'vue/js/pages/lampiran/perjadin.js',
    'vue/js/pages/lampiran/honor.js',
    'vue/js/pages/lampiran/honor/create.js',
    'vue/js/pages/lampiran/honor/edit.js',
    'vue/js/pages/lampiran/honor/detail.js',
    'vue/js/pages/lampiran/honor/detail/create.js',
    'vue/js/pages/lampiran/honor/detail/edit.js',
    'vue/js/pages/lampiran/spk.js',
    'vue/js/pages/lampiran/spk/create.js',
    'vue/js/pages/lampiran/spk/edit.js',
    'vue/js/pages/lampiran/spk/rab.js',
    'vue/js/pages/lampiran/perjadin/perubahan.js',
    'vue/js/pages/lampiran/perjadin/perubahan/create.js',
    'vue/js/pages/lampiran/perjadin/perubahan/edit.js',
    'vue/js/pages/lampiran/perjadin/perubahan/detail.js',
    'vue/js/pages/lampiran/perjadin/perubahan/detail/biaya.js',
    'vue/js/pages/lampiran/perjadin/create.js',

    'vue/js/pages/pengaturan.js',
    'vue/js/pages/pengaturan/honor.js',
    'vue/js/pages/pengaturan/nomor-surat.js',
    'vue/js/pages/pengaturan/pajak.js',
    'vue/js/pages/pengaturan/sppd.js',
    'vue/js/pages/pengaturan/user.js',
    'vue/js/pages/pengaturan/user/create.js',
    'vue/js/pages/pengaturan/user/edit.js',
    'vue/js/pages/pengaturan/tahun.js',
    'vue/js/pages/pengaturan/tahun/create.js',
    'vue/js/pages/pengaturan/aliran-kas.js',
    'vue/js/pages/pengaturan/aliran-kas/rincian.js',
    'vue/js/pages/pengaturan/aliran-kas/upload.js',
    'vue/js/pages/pengaturan/berkas.js',
    'vue/js/pages/pengaturan/berkas/create.js',
    'vue/js/pages/pengaturan/berkas/edit.js',

    'vue/js/pages/spj/rekap.js',
    'vue/js/pages/spj/read.js',
    'vue/js/pages/spj/rekap/edit.js',
    'vue/js/pages/spj/rekap/create.js',
    'vue/js/pages/spj/berkas.js',
    'vue/js/pages/spj/berkas/create.js',

    'vue/js/pages/standar/perjadin/harian/dalam-negeri.js',
    'vue/js/pages/standar/perjadin/harian/dalam-negeri/create.js',
    'vue/js/pages/standar/perjadin/harian/dalam-negeri/edit.js',
    'vue/js/pages/standar/perjadin/harian/luar-negeri.js',
    'vue/js/pages/standar/perjadin/harian/luar-negeri/create.js',
    'vue/js/pages/standar/perjadin/harian/luar-negeri/edit.js',
    'vue/js/pages/standar/perjadin/hotel/dalam-wilayah.js',
    'vue/js/pages/standar/perjadin/hotel/dalam-wilayah/create.js',
    'vue/js/pages/standar/perjadin/hotel/dalam-wilayah/edit.js',
    'vue/js/pages/standar/perjadin/hotel/luar-wilayah.js',
    'vue/js/pages/standar/perjadin/hotel/luar-wilayah/create.js',
    'vue/js/pages/standar/perjadin/hotel/luar-wilayah/edit.js',
    'vue/js/pages/standar/perjadin/representatif.js',
    'vue/js/pages/standar/perjadin/representatif/create.js',
    'vue/js/pages/standar/perjadin/representatif/edit.js',
    'vue/js/pages/standar/perjadin/transportasi.js',
    'vue/js/pages/standar/perjadin/transportasi/create.js',
    'vue/js/pages/standar/perjadin/transportasi/edit.js',
    'vue/js/pages/standar/perjadin/honor.js',
    'vue/js/pages/standar/perjadin/honor/create.js',
    'vue/js/pages/standar/perjadin/honor/edit.js',        

	'vue/js/pages/verifikasi.js',
	'vue/js/pages/verifikasi/ganti-uang.js',
	'vue/js/pages/verifikasi/ganti-uang/review.js',
	'vue/js/pages/verifikasi/honor.js',
	'vue/js/pages/verifikasi/honor/review.js',
	'vue/js/pages/verifikasi/perjadin.js',
	'vue/js/pages/verifikasi/perjadin/perubahan.js',
	'vue/js/pages/verifikasi/perjadin/review.js',
	'vue/js/pages/verifikasi/spj.js',
	'vue/js/pages/verifikasi/spj/review.js',
	'vue/js/pages/verifikasi/spk.js',
	'vue/js/pages/verifikasi/spk/perubahan.js',
	'vue/js/pages/verifikasi/spk/review.js',

    'vue/js/widgets/modal.js',
    'vue/js/widgets/alerts/error.js',
    'vue/js/widgets/commons/thumbnails.js',
    'vue/js/widgets/commons/back-button.js',
    'vue/js/widgets/commons/add-button.js',
    'vue/js/widgets/commons/confirm-button.js',
    'vue/js/widgets/commons/cancel-button.js',
    'vue/js/widgets/commons/upload-button.js',
    'vue/js/widgets/commons/formulir-title.js',
    'vue/js/widgets/commons/refresh-button.js',
    'vue/js/widgets/commons/reset-button.js',

    'vue/js/widgets/scopes/table-data-view.js',
    'vue/js/widgets/scopes/table-data-dropdown.js',
    'vue/js/widgets/scopes/table-data-keyword.js',

    'vue/js/widgets/slots/toolbar.js',
    'vue/js/widgets/slots/navitem.js',

    'vue/js/widgets/slots/navitem-right.js',
    'vue/js/widgets/slots/dropdown-button.js',
    'vue/js/widgets/slots/formulir.js',
    'vue/js/widgets/slots/formulir-button.js',
    'vue/js/widgets/slots/formulir-input.js',
    'vue/js/widgets/slots/formulir-input-honor.js',
    'vue/js/widgets/slots/formulir-input-pajak.js',
    'vue/js/widgets/slots/formulir-dropdown.js',
    'vue/js/widgets/slots/formulir-file.js',
    'vue/js/widgets/slots/formulir-textarea.js',
    'vue/js/widgets/slots/formulir-switch.js',
    'vue/js/widgets/slots/formulir-picker.js',

    'vue/js/widgets/spinners/lds-default.js',
    'vue/js/widgets/spinners/lds-dual-ring.js',
    'vue/js/widgets/spinners/lds-ellipsis.js',
    'vue/js/widgets/spinners/lds-facebook.js',
    'vue/js/widgets/spinners/lds-grid.js',
    'vue/js/widgets/spinners/lds-hourglass.js',
    'vue/js/widgets/spinners/lds-heart.js',
    'vue/js/widgets/spinners/lds-ring.js',
    'vue/js/widgets/spinners/lds-ripple.js',
    'vue/js/widgets/spinners/lds-roller.js',
    'vue/js/widgets/spinners/lds-spinner.js',
    'vue/js/widgets/spinners/lds-circle.js',
    'vue/js/widgets/spinners/lds-spinner.js',

    'pwa/libs/indexedDB.js',
    'pwa/entry.js',
    'pwa/indexedDBResource.js',
	
    'vue/css/app.css',
    'vue/css/index.css',
    'vue/js/app.js',      

    '/',
    'favicon.ico',
    // 'offline.html',
]



// Cleaning Trimming the Cache
// kalau tidak salah, membatasi jumlah dynamic caching
// Fitur Optional
function trimCache(cacheName, maxItems) {
    caches.open(cacheName)
        .then(function(cache) {
            return cache.keys().then(function(keys) {
                if(keys.length > maxItems) {
                    cache.delete(keys[0])
                        .then(trimCache(cacheName, maxItems));
                }
            });
        });        
}

self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker...', event);
    // The promise that skipWaiting() returns can be safely ignored.
    self.skipWaiting();

    // Perform any other actions required for your
    // service worker to install, potentially inside
    // of event.waitUntil();    
    // event.waitUntil( // jika ingin waiting
    event.waitUntil(
        caches.open(CACHE_STATIC_NAME) // 'static' nama bebas 
            .then(function(cache) {
                console.log('[Service Worker] Precaching App Shell');
                // cache.addAll(STATIC_FILES);

                // cache.add('vue/js/widgets/spinners/lds-spinner.js'); // sync 

                // cache.add('favicon.ico');
                cache.add("fonts/vendor/tabler-ui/src/feather/feather-webfont.ttf?b8e9cbc7ac23b572497cd2115bcf71c6");
                cache.add('pwa/libs/indexedDB.js');
                cache.add('vue/css/app.css');
                cache.add('vue/css/index.css');
                cache.add('vue/js/app.js');      
                cache.add('vue/assets/404.svg');
                cache.add('vue/js/pages/404.js');                
            })
    );
});

self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating Service Worker...', event);
    event.waitUntil(
        caches.keys()
            .then(function(keyList) {
                return Promise.all(keyList.map(function(key) {
                    if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
                        console.log('[Service Worker] Removing old cache.', key);
                        return caches.delete(key);
                    } 
                }));
            })
    );
    return self.clients.claim();
});

// A Better Way Of Parsing Static Cache URLs
// MODE 2
function isInArray(string, array) {
    var cachePath;
    if (string.indexOf(self.origin) === 0) { // request targets domain where we serve the page from (i.e. NOT a CDN)
      console.log('matched ', string);
      cachePath = string.substring(self.origin.length); // take the part of the URL AFTER the domain (e.g. after localhost:8080)
    } else {
      cachePath = string; // store the full request (for CDNs)
    }
    return array.indexOf(cachePath) > -1;
  }

// Strategy - Cache then Network with Offline Support (bisa kombinasi dengan Strategy - Network with Cache Fallback)
// with IndexedDB
// Implementing the Clear Database Method
self.addEventListener('fetch', function(event) {

    // console.log('[Service Worker] Fetching Service Worker...', event);

    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            if(response) {
                return response;
            } else {
                return fetch(event.request)
                    .then(function(res) {
                        return caches.open(CACHE_DYNAMIC_NAME)
                            .then(function(cache) {
                                // Cleaning Trimming the Cache
                                // Fitur Optional
                                // trimCache(CACHE_DYNAMIC_NAME, 3);

                                cache.put(event.request.url, res.clone());
                                return res;
                            })
                    }).catch(function(err) {
                        console.log(err);
                        return caches.open(CACHE_STATIC_NAME)
                            .then(function(cache) {
                                // Cache Strategies Routing
                                if(event.request.url.indexOf('/spa')) {
                                    console.log('spa')
                                    return cache.match('/404');
                                }

                                // Cache Strategies Routing
                                // A Better Way Of Serving Fallback Files
                                if(event.request.headers.get('accept').includes('text/html')) {
                                    console.log('accept')
                                    return cache.match('/404');
                                }                            
                            })
                    });
            }
        })
    )
});


// Reacting to Notification Interaction - Clicks
self.addEventListener('notificationclick', function(event) {
    var notification = event.notification;
    var action = event.action;

    console.log(notification);

    if(action === 'confirm') {
        console.log('Confirm was choosen');
        notification.close();
    } else {
        console.log(action);
        // Opening a Page upon User Interaction
        event.waitUntil(
            clients.matchAll()
                .then(function(clis) {
                    var client = clis.find(function(c) {
                        return c.visibilityState === 'visible';
                    });

                    if(client !== undefined) {
                        // client.navigate('http://localhost:8080');
                        client.navigate(notification.data.url);
                        client.focus();
                    } else {
                        // clients.openWindow('http://localhost:8080');
                        clients.openWindow(notification.data.url);
                    }
                    notification.close();
                })
        );
    }
});

// Reacting to Notification Interaction - Closing
self.addEventListener('notificationclose', function(event) {
    console.log('Notification was closed', event);    
});

// Listening to Push Messages
self.addEventListener('push', function(event) { // tidak mau ter trigger event x

    console.log('Push Notification received', event);
    
    var data = {
        title: 'New!',
        content: 'Something new happened!',
        openUrl: '/',
    };

    if(event.data) {
        data = JSON.parse(event.data.text());
    }

    var options = {
        body: data.content,
        icon: '/pwa/icons/app-icon-96x96.png',
        badge: '/pwa/icons/app-icon-96x96.png',
        data: {
            url: data.openUrl
        }
    }

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});










