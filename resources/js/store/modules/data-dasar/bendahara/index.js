module.exports = {
    state: {
        "bendahara": {
            "data": [],
        },
        "listPegawai": {
            "data": [],
        },
        'form': {
            "id": null, // wajib ada
            "tahun": null,
            "pegawai_id": null,
            "nama": null,
            "singkatan": null,
            "nip": null,
            "bidang": null,
            "nomor_sk": null,
            "tanggal_sk": null,
            "aktif": null,
        }
    },
    getters: {
        'getters/data-dasar/bendahara/bendahara': (state) => {
            return state.bendahara
        },
        'getters/data-dasar/bendahara/listPegawai': (state) => {
            return state.listPegawai
        },
        'getters/data-dasar/bendahara/form': (state) => {
            return state.form
        }        
    },
    mutations: {
        'setters/api/data-dasar/bendahara/bendahara': (state, payload) => {
            state.bendahara = null
            state.bendahara = payload
        },
        'setters/api/data-dasar/bendahara/listPegawai': (state, payload) => {
            state.listPegawai = null
            state.listPegawai = payload
        }, 
        'setters/non-api/data-dasar/bendahara/form': (state, payload) => {
            state.form.id = payload.id // wajib
            state.form.tahun = payload.tahun
            state.form.pegawai_id = payload.pegawai_id
            state.form.nama = payload.nama
            state.form.singkatan = payload.singkatan
            state.form.nip = payload.nip
            state.form.bidang = payload.bidang
            state.form.nomor_sk = payload.nomor_sk
            state.form.tanggal_sk = payload.tanggal_sk
            state.form.aktif = payload.aktif
        }       
    },
    actions: {
        'setters/api/data-dasar/bendahara/bendahara': (context, payload) => {
            context.commit('setters/api/data-dasar/bendahara/bendahara', payload)
            return      
        },          
        'setters/api/data-dasar/bendahara/listPegawai': (context, payload) => {
            context.commit('setters/api/data-dasar/bendahara/listPegawai', payload)
            return      
        },          
        'setters/non-api/data-dasar/bendahara/form': (context, payload) => {
            var filterObj = context.state.bendahara.data.filter(function(e) {
                if(e.id === payload.id){
                    context.commit('setters/non-api/data-dasar/bendahara/form', e)
                    return
                }
            });
        },
        'setters/non-api/data-dasar/bendahara/splice': (context, payload) => {
            var myArray = context.state.bendahara.data
            for (let index = 0; index < myArray.length; index++) {
                if(payload.id == myArray[index].id) {
                    myArray.splice(index, 1)
                }
            }
        },          
    }
}
