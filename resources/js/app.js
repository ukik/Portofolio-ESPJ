require('vue-datetime/dist/vue-datetime.css')
require("vue-snotify/styles/material.css")

require('./sw.js');

require('./bootstrap')
require('./directives/index')
require('./filters/index')
require('./mixins/index')

const last_route = localStorage.getItem("last_route")

window.Vue = require('vue');

import App from './pages/Index'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import Notifications from 'vue-notification'
Vue.use(Notifications)

import Snotify, { SnotifyPosition } from 'vue-snotify'
const options = {
  toast: {
    position: SnotifyPosition.rightBottom
  }
}
Vue.use(Snotify, options)

import Vue from 'vue'
import VuePaginateAl from 'vue-paginate-al'
Vue.component('Paginator', VuePaginateAl)

import { Datetime } from 'vue-datetime';
Vue.component('datetime', Datetime);

import VueSweetalert2 from 'vue-sweetalert2';
Vue.use(VueSweetalert2);

import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage, {
  name: 'memory',
  bind: true //created computed members from your variable declarations
})

import VueSelect from 'vue-cool-select'

Vue.use(VueSelect, {
  theme: 'bootstrap' // or 'material-design'
})

const store = require('./store')

const {
  routes
} = require('./routers/index')

const router = new VueRouter({
  routes,
  //mode: 'history', // remove # from default url
})

const app = new Vue({
  el: '#app',
  data() {
    return {
      // DEFAULT
      // dirubah ke true setelah melakukan initial request
      // digunakan untuk mengontrol component Welcome
      // jika true makan Welcome alive, jika false maka Welcome destroyed
      welcome: true,

      // tema dari main page
      // Layout, Welcome, Login
      component: 'Layout',

      // FROM SERVER 
      // --------------------------------------------------------------
      // Super Admin: All Fitur (Full CRUD)
      // Penghubung: Permohonan, Proses Lampiran, Perubahan Lampiran, SPJ
      // Verifikasi: Verifikasi
      // Supervisor: All Fitur (tidak ada POST/PUT/DELETE)

      auth: false, // default is false, true = logged, false = logout
      level: null, // default is null, Super Admin, Verifikator, Penghubung, Supervisor
      username: null, // default is null,
      bidang: null,

      // digunakan security
      // Header => Authorized: Bearer YOUR TOKEN 
      token: null, // default is null,
      signiture: null, // default is null, url?signiture="YOUR SIGNITURE"      

      // tahun untuk mengontrol akses ke server
      year: null, // default is null,
      jenis_anggaran: null, // default is null,
      // --------------------------------------------------------------

      // HARD CODE 
      // --------------------------------------------------------------
      // Super Admin = data-dasar
      // Verifikator = verifikasi
      // Penghubung = spj
      // Supervisor = data-dasar
      beranda_url: '',

      // jika digunakan untuk external access (isikan nama domain)
      // jika digunakan untuk internal access (kosongkan)
      domain: 'http://localhost:8000', // ,'http://e-spj.deka-app.com', //  

      // digunakan untuk mendeteksi ada halaman yang gagal dirender saat online/offline
      // paramenter default untuk component cache adalah false
      // jika menjadi true makan component cache direset
      offline: false, 
      // --------------------------------------------------------------

      // DYNAMIC BY CLIENT 
      // --------------------------------------------------------------
      // digunakan untuk mengontrol spinner/notifikasi ui pada response
      request: false, // untuk mengontrol spinner ui saat request
      request_submit: false, // untuk mengontrol fullpage-loading saat submit request
      error: { // untuk mengontrol error notifikasi ui saat request
        status: false,
        message: '',
      },
    }
  },
  router,
  store: store.store,
  watch: {
    level: function(val) {
      switch (val) {
        case 'Super Admin':
          this.beranda_url = 'data-dasar'
          break;
        case 'Supervisor':
          this.beranda_url = 'data-dasar'
          break;
        case 'Verifikator':
          this.beranda_url = 'verifikasi'
          break;
        case 'Penghubung':
          this.beranda_url = 'spj'
          break;
      }
    }
  },
  mounted() {

    this.welcome = true

    this.auth = this.$memory.get('auth')
    this.level = this.$memory.get('level')
    this.token = this.$memory.get('token')
    this.signiture = this.$memory.get('signiture')
    this.year = this.$memory.get('year')
    this.jenis_anggaran = this.$memory.get('jenis_anggaran')
    this.username = this.$memory.get('username')

    axios.get(this.domain+'/api/init', {
            params  : {
                signiture: this.signiture
            }, 
            headers : {
                'Authorization': `Bearer ${this.token}`
            }
      })
      .then(response => {
        setTimeout(() => {
          this.welcome = false
        }, 500);

        if(response.data.data != undefined) {
          // token check
          switch(response.data.data.token) {
            case "token_not_provided":
            case "invalid_credentials":
            case "could_not_create_token":
            case "token_expired":
            case "token_invalid":
            case "token_absent":

              this.component = "Login" 
      
              this.auth = false
              this.level = null
              this.username = null
              this.token = null
              this.signiture = null
              this.year = null
              this.jenis_anggaran = null
      
              return router.push({ name: 'login' })
          }

          // signiture check
          switch(response.data.data.signiture) {
            case "signiture_invalid":
            case "signiture_not_provided":

              this.component = "Login" 
      
              this.auth = false
              this.level = null
              this.username = null
              this.token = null
              this.signiture = null
              this.year = null
              this.jenis_anggaran = null
      
              return router.push({ name: 'login' })
          }
        }

        // when init data = 'complete'
        if(response.data.security != undefined){

          // untuk edit profil
          this.$store.dispatch('setters/api/login', response.data)

          this.auth = true 

          app.$memory.remove('auth')
          app.$memory.remove('level')
          app.$memory.remove('token')
          app.$memory.remove('signiture')
          app.$memory.remove('year')
          app.$memory.remove('jenis_anggaran')
          app.$memory.remove('username') 

          this.level = response.data.security.scopes
          this.token = response.data.security.token
          this.signiture = response.data.security.signiture
          this.year = response.data.security.tahun
          this.jenis_anggaran = response.data.security.jenis_anggaran
          this.username = response.data.security.username

          if(response.data.security == undefined) {
            this.bidang = ""
          } else {
            this.bidang = response.data.security.bidang            
          }

          this.$memory.set('auth', this.auth)
          this.$memory.set('level', this.level)
          this.$memory.set('token', this.token)
          this.$memory.set('signiture', this.signiture)
          this.$memory.set('year', this.year)
          this.$memory.set('jenis_anggaran', this.jenis_anggaran)            
          this.$memory.set('username', this.username)

          return router.push({ name: this.beranda_url })

        }        
              
        // console.log(response)
      }, error => {
        // console.log(error)
      })
  },
  render: h => h(App)
});


router.afterEach((to, from) => {
  if(app.$data.offline) {
    app.$swal({
      title: 'Peringatan',
      text: 'Maaf sedang proses singkronisasi component. Jika component tidak muncul di halaman ini, maka proses singkronisasi tidak berhasil. Di sarankan untuk melakukan "Penyegaran Halaman".\n Terimakasih',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Segarkan Halaman',
      showCloseButton: false,
      allowOutsideClick: false,
    }).then((result) => {

      if(result.value) {
        app.$data.offline = false
        location.reload();
        return
      } else {
        app.$data.offline = false
        return
      }
    })    
  }
})

// Register an Error Handler:
router.onError(err => {
  return
  app.$swal({
    title: 'Error',
    text: 'Maaf sedang proses singkronisasi component. Jika component tidak muncul di halaman ini, maka proses singkronisasi tidak berhasil. Di sarankan untuk melakukan "Penyegaran Halaman".\n Terimakasih',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Segarkan Halaman',
    showCloseButton: false,
    allowOutsideClick: false,
  }).then((result) => {
    // console.log(result)
    if(result.value) {
      app.$data.offline = false
      location.reload();
      return
    } else {
      app.$data.offline = false
      return
    }
  })
  // console.error('Handling this error:', err.message)
})

// below is GUARD Router
router.beforeEach((to, from, next) => {
  if(app.$data.auth) {
    next();
  } 

  if(!app.$data.auth) {
    if(to.path !== "/login") {
      next({ path: '/login' })
    }
    next()
  } 

})

router.replace('/rekap')

// status reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
// once init
Vue.axios.defaults.baseURL = app.$data.domain+'/api/';

Vue.axios.interceptors.request.use(function(config) {

  // override init every request
  config.params = {};
  config.params['signiture'] = app.$data.signiture;
  config.headers.common['Authorization'] = 'Bearer ' + app.$data.token;
  config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

  switch (config.method) {
    case "post":
    case "put":
      app.$data.request = false 
      if(config.headers.identitas != undefined) {
        switch (config.headers.identitas) {
          case "ajukan":
          case "cancel":
            
            app.$data.request_submit = false    
            return config;
        }        
      }

      app.$data.request_submit = true    

      break;
    case "delete":
      app.$data.request = false   
      app.$data.request_submit = false 

      return config; 

    default:
      app.$data.request = false 
      app.$data.request_submit = true    
  
      break;
  }

  return config;

}, function(err) {

  return Promise.reject(err);

});

Vue.axios.interceptors.response.use((response) => { // intercept the global error

  app.$data.request = false // menutup spinner ui
  app.$data.request_submit = false // menutup fullpage-loading

  // console.log('interceptors success', response.data.security)
  if(response.data.security == undefined) {
    app.$data.bidang = ""
  } else {
    app.$data.bidang = response.data.security.bidang
  }

  //   // di server version gagal validation dihitung 200
  if(response.data.security == "unauthorized") {

      app.$data.auth = false
      app.$data.level = null
      app.$data.username = null
      app.$data.token = null
      app.$data.signiture = null
      app.$data.year = null
      app.$data.jenis_anggaran = null

      app.$memory.remove('auth')
      app.$memory.remove('level')
      app.$memory.remove('token')
      app.$memory.remove('signiture')
      app.$memory.remove('year')
      app.$memory.remove('jenis_anggaran')
      app.$memory.remove('username') 

      app.jump({ name: 'login' })

  }


  if(response.data.data != undefined) {
    // token check
    switch(response.data.data.token) {
      case "token_not_provided":
      case "invalid_credentials":
      case "could_not_create_token":
      case "token_expired":
      case "token_invalid":
      case "token_absent":

        this.component = "Login" 

        this.auth = false
        this.level = null
        this.username = null
        this.token = null
        this.signiture = null
        this.year = null
        this.jenis_anggaran = null

        return router.push({ name: 'login' })

    }

    // signiture check
    switch(response.data.data.signiture) {
      case "signiture_invalid":
      case "signiture_not_provided":

        this.component = "Login" 

        this.auth = false
        this.level = null
        this.username = null
        this.token = null
        this.signiture = null
        this.year = null
        this.jenis_anggaran = null

        return router.push({ name: 'login' })

    }
  }

  // each request after login
  // update data
  if (response.data.security != undefined && response.data != "init" && response.data.security != "unauthorized") {
      
        app.$data.auth = true
        app.$data.level = response.data.security.scopes
        app.$data.year = response.data.security.tahun
        app.$data.jenis_anggaran = response.data.security.jenis_anggaran
        app.$data.username = response.data.security.username
  
        app.$memory.set('auth', app.$data.auth)
        app.$memory.set('level', app.$data.level)
        app.$memory.set('year', app.$data.year)
        app.$memory.set('jenis_anggaran', app.$data.jenis_anggaran)
        app.$memory.set('username', app.$data.username)

  }

  const res = response.data.data

  // di server version gagal validation dihitung 200
  if(response.data.message == 'The given data was invalid.') {
    const error = JSON.stringify(response.data.errors)
    var object = response.data.errors
    var errors = ""
    for (const key in object) {
      errors += object[key][0]+" ";
    }
    app.onWarningSnotify({ message: "Validasi data gagal: "+errors, title: 'Peringatan'}) 
    app.$data.error.status = true  // membuka bootstrap error notification ui
    app.$data.error.message = "Validasi data gagal: "+errors     
    return
  }

  switch (response.config.method) {
    case "get":

      break;
    case "post":
      // validate
      try {
        switch (res.status) {
          case 'validation':
            app.onWarningSnotify({ message: "Validasi data gagal: "+res.message, title: 'Peringatan'}) 
            app.$data.error.status = true  // membuka bootstrap error notification ui
            app.$data.error.message = "Validasi data gagal: "+res.message      
            
            return response
            break;
          default:
            if(res.back == false) {
              app.set_callback({status: true, message: 'Data baru berhasil ditambahkan oleh klien ke server'})
              app.onSuccessSnotify({ message: 'Data baru berhasil ditambahkan oleh klien ke server', title: 'Sukses'})
              return response
            } 
            if(res.back == undefined){
              app.set_callback({status: true, message: 'Data baru berhasil ditambahkan oleh klien ke server'})
              app.onSuccessSnotify({ message: 'Data baru berhasil ditambahkan oleh klien ke server', title: 'Sukses'})
              if(res != "complete without back"){
                router.back()
              }  
              return response
            }
            break;
        }              
      } catch (error) {
        
        app.onWarningSnotify({ message: "Response informasi dari server tidak lengkap", title: 'Peringatan'})                          
        app.$data.error.status = true // membuka bootstrap error notification ui
        app.$data.error.message = "Response informasi dari server tidak lengkap"   

        return response
      }
      break;
    case "put":
      // validate
      try {
        switch (res.status) {
          case 'validation':
            app.onWarningSnotify({ message: "Validasi data gagal: "+res.message, title: 'Peringatan'})                  
            app.$data.error.status = true // membuka bootstrap error notification ui
            app.$data.error.message = "Validasi data gagal: "+res.message       
            
            return response
          default:
            if(res.back == false) {
              app.set_callback({status: true, message: 'Data di server berhasil diperbarui oleh klien'})
              app.onSuccessSnotify({ message: 'Data di server berhasil diperbarui oleh klien', title: 'Sukses'})
              return response
            } 
            if(res.back == undefined){
              app.set_callback({status: true, message: 'Data di server berhasil diperbarui oleh klien'})
              app.onSuccessSnotify({ message: 'Data di server berhasil diperbarui oleh klien', title: 'Sukses'})
              if(res != "complete without back"){
                router.back()
              }
              return response
            }
            break;
        }              
      } catch (error) {

        app.onWarningSnotify({ message: "Response informasi dari server tidak lengkap", title: 'Peringatan'})
        app.$data.error.status = true // membuka bootstrap error notification ui
        app.$data.error.message = "Response informasi dari server tidak lengkap"    

        return response        
      }
      break;
    case "delete":
      app.onSuccessSnotify({ message: 'Data di server berhasil dihapus oleh klien', title: 'Sukses'})     

      return response
  }

  return response

}, function (error) {

  app.$data.request = false // menutup spinner ui
  app.$data.request_submit = false // menutup fullpage-loading

  app.$data.error.status = true // membuka bootstrap error notification ui
  app.$data.error.message = "Terjadi kesalahan, koneksi database di server putus" 

  let originalRequest = error.config

  try {

    // SERVER: 500 Internal Server Error
    if (error.response.status === 500) {
      app.onErrorSnotify({ message: 'Terjadi kesalahan, koneksi database di server putus', title: 'Fatal'})
      return Promise.reject(error)
    }

    // CLIENT: 422 Unprocessable Entity (WebDAV)
    if (error.response.status === 422) {

      const object = error.response.data.errors
      let info = ""
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          info += object[key].toString()+" "
        }
      }

      app.$data.error.message = "Validasi data gagal: "+info
      app.onWarningSnotify({ message: "Validasi data gagal: "+info, title: 'Peringatan'})                  
      return Promise.reject(error)
    }

    // CLIENT: 400 Bad Request
    if (error.response.status === 400) {
      app.onWarningSnotify({ message: 'Data gagal diakses oleh klien', title: 'Peringatan'})
      return Promise.reject(error)
    }

    // CLIENT: 405 Method Not Allowed
    if (error.response.status === 405) {
      app.onWarningSnotify({ message: 'Data gagal diakses oleh klien', title: 'Peringatan'})
      return Promise.reject(error)
    }

  } catch (error) {

    if(app.$route.name != 'login') {
      // SERVER: Network Error
      app.onErrorSnotify({ message: 'Terjadi kesalahan, koneksi database di server putus', title: 'Fatal'})
      return Promise.reject(error)
    }    
  }

  return Promise.reject(error)

})

// if ('serviceWorker' in navigator ) {
//     window.addEventListener('load', function() {
//         navigator.serviceWorker.register('/sw.js').then(function(registration) {
//             // Registration was successful
//             console.log('ServiceWorker registration successful with scope: ', registration.scope);
//         }, function(err) {
//             // registration failed :(
//             console.log('ServiceWorker registration failed: ', err);
//         });
//     });
// }

