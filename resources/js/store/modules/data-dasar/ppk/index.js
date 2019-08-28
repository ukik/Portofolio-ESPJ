module.exports = {
    state: {
        "ppk": {
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
        'getters/data-dasar/ppk/ppk': (state) => {
            return state.ppk
        },
        'getters/data-dasar/ppk/listPegawai': (state) => {
            return state.listPegawai
        },
        'getters/data-dasar/ppk/form': (state) => {
            return state.form
        }        
    },
    mutations: {
        'setters/api/data-dasar/ppk/ppk': (state, payload) => {
            state.ppk = null
            state.ppk = payload
        },
        'setters/api/data-dasar/ppk/listPegawai': (state, payload) => {
            state.listPegawai = null
            state.listPegawai = payload
        }, 
        'setters/non-api/data-dasar/ppk/form': (state, payload) => {
            state.form.id = payload.id // wajib
            state.form.pegawai_id = payload.pegawai_id
            state.form.nomor_sk = payload.nomor_sk
            state.form.tanggal_sk = payload.tanggal_sk
            state.form.aktif = payload.aktif
        }       
    },
    actions: {
        'setters/api/data-dasar/ppk/ppk': (context, payload) => {
            context.commit('setters/api/data-dasar/ppk/ppk', payload)
            return      
        },          
        'setters/api/data-dasar/ppk/listPegawai': (context, payload) => {
            context.commit('setters/api/data-dasar/ppk/listPegawai', payload)
            return      
        },          
        'setters/non-api/data-dasar/ppk/form': (context, payload) => {
            var filterObj = context.state.ppk.data.filter(function(e) {
                if(e.id === payload.id){
                    context.commit('setters/non-api/data-dasar/ppk/form', e)
                    return
                }
            });
        },
        'setters/non-api/data-dasar/ppk/splice': (context, payload) => {
            var myArray = context.state.ppk.data
            for (let index = 0; index < myArray.length; index++) {
                if(payload.id == myArray[index].id) {
                    myArray.splice(index, 1)
                }
            }
        },          
    }
}
