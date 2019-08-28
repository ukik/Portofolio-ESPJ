module.exports = {
    state: {
        "kpa": {
            "data": [],
        },
        'form': {
            "id": null, // wajib ada
            "pegawai_id": null,
            "nomor_sk": null,
            "tanggal_sk": null,
            "aktif": "on"
        },
        "listPegawai": [],
    },
    getters: {
        'getters/data-dasar/kpa/kpa': (state) => {
            return state.kpa
        },
        'getters/data-dasar/kpa/form': (state) => {
            return state.form
        },        
        'getters/data-dasar/kpa/listPegawai': (state) => {
            return state.listPegawai
        },
    },
    mutations: {
        'setters/api/data-dasar/kpa/kpa': (state, payload) => {
            state.kpa = null
            state.kpa = payload
        },
        'setters/api/data-dasar/kpa/listPegawai': (state, payload) => {
            state.listPegawai = null
            state.listPegawai = payload
        },        
        'setters/non-api/data-dasar/kpa/form': (state, payload) => {
            state.form.id = payload.id
            state.form.pegawai_id = payload.pegawai_id
            state.form.nomor_sk = payload.nomor_sk
            state.form.tanggal_sk = payload.tanggal_sk
            state.form.aktif = payload.aktif
        }       
    },
    actions: {
        'setters/api/data-dasar/kpa/kpa': (context, payload) => {
            context.commit('setters/api/data-dasar/kpa/kpa', payload)
            return      
        },          
        'setters/api/data-dasar/kpa/listPegawai': (context, payload) => {
            context.commit('setters/api/data-dasar/kpa/listPegawai', payload)
            return      
        },         
        'setters/non-api/data-dasar/kpa/form': (context, payload) => {
            var filterObj = context.state.kpa.data.filter(function(e) {
                if(e.id === payload.id){
                    context.commit('setters/non-api/data-dasar/kpa/form', e)
                    return
                }
            });
        },
        'setters/non-api/data-dasar/kpa/splice': (context, payload) => {
            var myArray = context.state.kpa.data
            for (let index = 0; index < myArray.length; index++) {
                if(payload.id == myArray[index].id) {
                    myArray.splice(index, 1)
                }
            }
        },           
    }
}
