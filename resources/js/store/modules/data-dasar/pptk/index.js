module.exports = {
    state: {
        "pptk": {
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
        'getters/data-dasar/pptk/pptk': (state) => {
            return state.pptk
        },
        'getters/data-dasar/pptk/listPegawai': (state) => {
            return state.listPegawai
        },
        'getters/data-dasar/pptk/form': (state) => {
            return state.form
        }        
    },
    mutations: {
        'setters/api/data-dasar/pptk/pptk': (state, payload) => {
            state.pptk = null
            state.pptk = payload
        },
        'setters/api/data-dasar/pptk/listPegawai': (state, payload) => {
            state.listPegawai = null
            state.listPegawai = payload
        }, 
        'setters/non-api/data-dasar/pptk/form': (state, payload) => {
            state.form.id = payload.id // wajib
            state.form.pegawai_id = payload.pegawai_id
            state.form.nomor_sk = payload.nomor_sk
            state.form.tanggal_sk = payload.tanggal_sk
            state.form.aktif = payload.aktif
        }       
    },
    actions: {
        'setters/api/data-dasar/pptk/pptk': (context, payload) => {
            context.commit('setters/api/data-dasar/pptk/pptk', payload)
            return      
        },          
        'setters/api/data-dasar/pptk/listPegawai': (context, payload) => {
            context.commit('setters/api/data-dasar/pptk/listPegawai', payload)
            return      
        },          
        'setters/non-api/data-dasar/pptk/form': (context, payload) => {
            var filterObj = context.state.pptk.data.filter(function(e) {
                if(e.id === payload.id){
                    context.commit('setters/non-api/data-dasar/pptk/form', e)
                    return
                }
            });
        },
        'setters/non-api/data-dasar/pptk/splice': (context, payload) => {
            var myArray = context.state.pptk.data
            for (let index = 0; index < myArray.length; index++) {
                if(payload.id == myArray[index].id) {
                    myArray.splice(index, 1)
                }
            }
        },          
    }
}
