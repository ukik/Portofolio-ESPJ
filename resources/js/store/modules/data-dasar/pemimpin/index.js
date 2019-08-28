module.exports = {
    state: {
        "pimpinan": {
            "data": [],
        },
        "listPegawai": [],
        'form': {
            "id": null, // wajib ada
            "pegawai_id": null,
            "nomor_sk": null,
            "tanggal_sk": null,
            "aktif": null,
        }
    },
    getters: {
        'getters/data-dasar/pimpinan/pimpinan': (state) => {
            return state.pimpinan
        },
        'getters/data-dasar/pimpinan/listPegawai': (state) => {
            return state.listPegawai
        },
        'getters/data-dasar/pimpinan/form': (state) => {
            return state.form
        }        
    },
    mutations: {
        'setters/api/data-dasar/pimpinan/pimpinan': (state, payload) => {
            state.pimpinan = null
            state.pimpinan = payload
        },
        'setters/api/data-dasar/pimpinan/listPegawai': (state, payload) => {
            state.listPegawai = null
            state.listPegawai = payload
        }, 
        'setters/non-api/data-dasar/pimpinan/form': (state, payload) => {
            state.form.id = payload.id // wajib
            state.form.pegawai_id = payload.pegawai_id
            state.form.nomor_sk = payload.nomor_sk
            state.form.tanggal_sk = payload.tanggal_sk
            state.form.aktif = payload.aktif
        }       
    },
    actions: {
        'setters/api/data-dasar/pimpinan/pimpinan': (context, payload) => {
            context.commit('setters/api/data-dasar/pimpinan/pimpinan', payload)
            return      
        },          
        'setters/api/data-dasar/pimpinan/listPegawai': (context, payload) => {
            context.commit('setters/api/data-dasar/pimpinan/listPegawai', payload)
            return      
        },          
        'setters/non-api/data-dasar/pimpinan/form': (context, payload) => {
            var filterObj = context.state.pimpinan.data.filter(function(e) {
                if(e.id === payload.id){
                    context.commit('setters/non-api/data-dasar/pimpinan/form', e)
                    return
                }
            });
        },
        'setters/non-api/data-dasar/pimpinan/splice': (context, payload) => {
            var myArray = context.state.pimpinan.data
            for (let index = 0; index < myArray.length; index++) {
                if(payload.id == myArray[index].id) {
                    myArray.splice(index, 1)
                }
            }
        },          
    }
}
