module.exports = {
    state: {
        "lokasi": {
            "data": []
        },
        "listJenis": [],
        'form': {
            "id": null, // wajib ada
            "nama": null,
            "singkatan": null,
            "nama_ibu_kota": null,
            "jenis": "Negara",
        },
        'create': {
            "induk": null,
            "nama": null,
        }
    },
    getters: {
        'getters/data-dasar/lokasi/luar-negeri/lokasi': (state) => {
            return state.lokasi
        },
        'getters/data-dasar/lokasi/luar-negeri/listJenis': (state) => {
            return state.listJenis
        },        
        'getters/data-dasar/lokasi/luar-negeri/form': (state) => {
            return state.form
        },        
        'getters/data-dasar/lokasi/luar-negeri/create': (state) => {
            return state.create
        }        
    },
    mutations: {
        'setters/api/data-dasar/lokasi/luar-negeri/lokasi': (state, payload) => {
            state.lokasi = null
            state.lokasi = payload
        },
        'setters/api/data-dasar/lokasi/luar-negeri/listJenis': (state, payload) => {
            state.listJenis = null
            state.listJenis = payload
        },
        'setters/non-api/data-dasar/lokasi/luar-negeri/form': (state, payload) => {
            state.form.id = payload.id
            state.form.nama = payload.nama
            state.form.singkatan = payload.singkatan
            state.form.nama_ibu_kota = payload.nama_ibu_kota
            state.form.jenis = payload.jenis
        },
        'setters/non-api/data-dasar/lokasi/luar-negeri/create': (state, payload) => {
            state.create.induk = payload.induk
            state.create.nama = payload.nama
        }                
    },
    actions: {
        'setters/api/data-dasar/lokasi/luar-negeri/lokasi': (context, payload) => {
            context.commit('setters/api/data-dasar/lokasi/luar-negeri/lokasi', payload)
            return      
        },          
        'setters/api/data-dasar/lokasi/luar-negeri/listJenis': (context, payload) => {
            context.commit('setters/api/data-dasar/lokasi/luar-negeri/listJenis', payload)
            return      
        },          
        'setters/non-api/data-dasar/lokasi/luar-negeri/form': (context, payload) => {
            var filterObj = context.state.lokasi.data.filter(function(e) {
                if(payload.child_id != undefined) {
                    e.sub.filter(function(f) {
                        if(f.id === payload.child_id){
                            context.commit('setters/non-api/data-dasar/lokasi/luar-negeri/form', f)
                            return
                        }
                    })
                } else {               
                    if(e.id === payload.id){
                        context.commit('setters/non-api/data-dasar/lokasi/luar-negeri/form', e)
                    }
                }
            });
        },
        'setters/non-api/data-dasar/lokasi/luar-negeri/create': (context, payload) => {
            context.commit('setters/non-api/data-dasar/lokasi/luar-negeri/create', payload)
            return
        },
        'setters/non-api/data-dasar/lokasi/luar-negeri/splice': (context, payload) => {
            var myArray = context.state.lokasi.data
            for (let index = 0; index < myArray.length; index++) {

                if(payload.child_id != undefined) {

                    myArray[index].sub.forEach((element, i) => {
                        if(element.id === payload.child_id){
                            myArray[index].sub.splice(i, 1)
                            return
                        }
                    });

                } else {               

                    if(payload.id == myArray[index].id) {
                        myArray.splice(index, 1)
                    }

                }   
            }  
        },               
    }
}
