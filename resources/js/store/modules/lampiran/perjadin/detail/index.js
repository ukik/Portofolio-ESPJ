module.exports = {
    state: {
        // index
        "perjadin_detail": [],

        // edit/create
        "listPegawai": [],
        "perjadin_id": null,

        // biaya
        biaya: [],  
        perjadin: {}, 

        'form': {
            "id": null, // wajib ada
            "perjadin_id": null,
            "pegawai_id": null,
            "pegawai_nip": null,
            "pegawai_singkatan": null,
            "pegawai_nama": null,
            "nominal": null
        }
    },
    getters: {
        'getters/lampiran/perjadin/detail': (state) => {
            return state.perjadin_detail
        },
        'getters/lampiran/perjadin/detail/perjadin': (state) => {
            return state.perjadin
        },        
        'getters/lampiran/perjadin/detail/listPegawai': (state) => {
            return state.listPegawai
        },
        'getters/lampiran/perjadin/detail/perjadin_id': (state) => {
            return state.perjadin_id
        },
        'getters/lampiran/perjadin/detail/biaya': (state) => {
            return state.biaya
        },
        'getters/lampiran/perjadin/detail/form': (state) => {
            return state.form
        }        
    },
    mutations: {
        'setters/api/lampiran/perjadin/detail': (state, payload) => {
            state.perjadin_detail = null
            state.perjadin_detail = payload
        },   
        'setters/api/lampiran/perjadin/detail/biaya': (state, payload) => {
            state.biaya = null
            state.perjadin = null
            
            state.biaya = payload.biaya
            state.perjadin = payload.perjadin
        },        
        'setters/api/lampiran/perjadin/detail/edit': (state, payload) => {
            state.listPegawai = null
            state.perjadin_id = null

            state.listPegawai = payload.listPegawai
            state.perjadin_id = payload.perjadin_id
        }, 
        'setters/non-api/lampiran/perjadin/detail/form': (state, payload) => {
            state.form.id = payload.id // wajib
            state.form.perjadin_id = payload.perjadin_id
            state.form.pegawai_id = payload.pegawai_id
            state.form.pegawai_nip = payload.pegawai_nip
            state.form.pegawai_singkatan = payload.pegawai_singkatan
            state.form.pegawai_nama = payload.pegawai_nama
            state.form.nominal = payload.nominal
        }       
    },
    actions: {
        'setters/api/lampiran/perjadin/detail': (context, payload) => {
            context.commit('setters/api/lampiran/perjadin/detail', payload)
            return      
        },               
        'setters/api/lampiran/perjadin/detail/biaya': (context, payload) => {
            context.commit('setters/api/lampiran/perjadin/detail/biaya', payload)
            return      
        },             
        'setters/api/lampiran/perjadin/detail/edit': (context, payload) => {
            context.commit('setters/api/lampiran/perjadin/detail/edit', payload)
            return      
        },          
        'setters/non-api/lampiran/perjadin/detail/form': (context, payload) => {
            var filterObj = context.state.perjadin_detail.filter(function(e) {
                if(e.id === payload.id){
                    context.commit('setters/non-api/lampiran/perjadin/detail/form', e)
                    return
                }
            });
        },
        'setters/non-api/lampiran/perjadin/detail/splice': (context, payload) => {
            var myArray = context.state.perjadin_detail
            for (let index = 0; index < myArray.length; index++) {
                if(payload.id == myArray[index].id) {
                    myArray.splice(index, 1)
                }
            }
        },        
    }
}
