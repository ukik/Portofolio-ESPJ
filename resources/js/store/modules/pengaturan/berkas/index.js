module.exports = {
    state: {
        "berkas": {
            "data": [],
        },
        'form': {
            "id": null, // wajib ada
            "nama": null,
            "path": null,
            "deskripsi": null,
            "aktif": null,
            "meta": null            
        }
    },
    getters: {
        'getters/pengaturan/berkas/berkas': (state) => {
            return state.berkas
        },
        'getters/pengaturan/berkas/form': (state) => {
            return state.form
        }        
    },
    mutations: {
        'setters/api/pengaturan/berkas/berkas': (state, payload) => {
            state.berkas = null
            state.berkas = payload
        },
        'setters/non-api/pengaturan/berkas/form': (state, payload) => {
            state.form.id = payload.id // wajib
            state.form.nama = payload.nama
            state.form.path = payload.path
            state.form.deskripsi = payload.deskripsi
            state.form.aktif = payload.aktif
            state.form.meta = payload.meta
        }                  
    },
    actions: {
        'setters/api/pengaturan/berkas/berkas': (context, payload) => {
            context.commit('setters/api/pengaturan/berkas/berkas', payload)
            return      
        },          
        'setters/non-api/pengaturan/berkas/form': (context, payload) => {
            var filterObj = context.state.berkas.data.filter(function(e) {
                if(e.id === payload.id){
                    context.commit('setters/non-api/pengaturan/berkas/form', e)
                    return
                }
            });
        },
        'setters/non-api/pengaturan/berkas/splice': (context, payload) => {
            var myArray = context.state.berkas.data
            for (let index = 0; index < myArray.length; index++) {
                if(payload.id == myArray[index].id) {
                    myArray.splice(index, 1)
                }
            }
        },              
    }
}
