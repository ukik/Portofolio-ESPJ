module.exports = {
    state: {
        "penghubung": {
            "data": [],
        },
        "listPegawai": [],
        'form': {
            "id": null, // wajib ada
            "pegawai_id": null,
            "nomor_sk": null,
            "tanggal_sk": null,
            "aktif": null
        }
    },
    getters: {
        'getters/data-dasar/penghubung/penghubung': (state) => {
            return state.penghubung
        },
        'getters/data-dasar/penghubung/listPegawai': (state) => {
            return state.listPegawai
        },
        'getters/data-dasar/penghubung/form': (state) => {
            return state.form
        }        
    },
    mutations: {
        'setters/api/data-dasar/penghubung/penghubung': (state, payload) => {
            state.penghubung = null
            state.penghubung = payload
        },
        'setters/api/data-dasar/penghubung/listPegawai': (state, payload) => {
            state.listPegawai = null
            state.listPegawai = payload
        }, 
        'setters/non-api/data-dasar/penghubung/form': (state, payload) => {
            state.form.id = payload.id // wajib
            state.form.pegawai_id = payload.pegawai_id
            state.form.nomor_sk = payload.nomor_sk
            state.form.tanggal_sk = payload.tanggal_sk
            state.form.aktif = payload.aktif
        }       
    },
    actions: {
        'setters/api/data-dasar/penghubung/penghubung': (context, payload) => {
            context.commit('setters/api/data-dasar/penghubung/penghubung', payload)
            return      
        },          
        'setters/api/data-dasar/penghubung/listPegawai': (context, payload) => {
            context.commit('setters/api/data-dasar/penghubung/listPegawai', payload)
            return      
        },          
        'setters/non-api/data-dasar/penghubung/form': (context, payload) => {
            var filterObj = context.state.penghubung.data.filter(function(e) {
                if(e.id === payload.id){
                    context.commit('setters/non-api/data-dasar/penghubung/form', e)
                    return
                }
            });
        },
        'setters/non-api/data-dasar/penghubung/splice': (context, payload) => {
            var myArray = context.state.penghubung.data
            for (let index = 0; index < myArray.length; index++) {
                if(payload.id == myArray[index].id) {
                    myArray.splice(index, 1)
                }
            }
        },          
    }
}
