module.exports = {
    state: {
        // index
        "honor": {
            "data": [],
        },
        // edit
        "dpa": null,
        "bendahara": {},
        "pimpinan": {},
        "listProgramKegiatan": [],
        "listKodeRekening": [],
        "listJenis": [],

        // detail
        "honor_detail": [],
        "listPegawai": [],

        'form': {
            "id": null,
            "jenis_anggaran": null,
            "tahun": null,
            "bulan": null,
            "jenis": null,
            "uraian": null,
            "kode_dpa": null,
            "kode_rekening": null,
            "kegiatan": null,
            "rincian": null,
            "tanggal": null,
            "subtotal": 0,
            "pph_21": 0,
            "pph_22": 0,
            "pph_23": 0,
            "total": 0,
            "kpa_id": 0,
            "pptk_id": 0,
            "bendahara_id": null,
            "pimpinan_id": null,
            "status": 0,
            "created_by": null,
            "updated_by": null,
            "verified_by": null,
            "printed_by": null,
            "verified_at": null,
            "printed_at": null
        },

        'form_detail': {
            "id": null,
            "honor_id": null,
            "pegawai_id": null,
            "pegawai_nama": null,
            "jabatan_id": null,
            "jabatan_nama": null,
            "jabatan_struktural": null,
            "volume": null,
            "satuan": null,
            "jumlah": null,
            "subtotal": null,
            "pph_21_persen": null,
            "pph_21_nilai": null,
            "pph_22_persen": null,
            "pph_22_nilai": null,
            "pph_23_persen": null,
            "pph_23_nilai": null,
            "total": null,
            "created_by": null,
            "updated_by": null,
            "verified_by": null,
            "printed_by": null,
            "verified_at": null,
            "printed_at": null
        },
    },
    getters: {
        'getters/lampiran/honor': (state) => {
            return state.honor
        },
        'getters/lampiran/honor/dpa': (state) => {
            return state.dpa
        },
        'getters/lampiran/honor/bendahara': (state) => {
            return state.bendahara
        },
        'getters/lampiran/honor/pimpinan': (state) => {
            return state.pimpinan
        },
        'getters/lampiran/honor/listProgramKegiatan': (state) => {
            return state.listProgramKegiatan
        },
        'getters/lampiran/honor/listKodeRekening': (state) => {
            return state.listKodeRekening
        },
        'getters/lampiran/honor/listJenis': (state) => {
            return state.listJenis
        },
        'getters/lampiran/honor/detail': (state) => {
            return state.honor_detail
        },
        'getters/lampiran/honor/detail/listPegawai': (state) => {
            return state.listPegawai
        },
        

        'getters/lampiran/honor/form': (state) => {
            return state.form
        },        
        'getters/lampiran/honor/form_detail': (state) => {
            return state.form_detail
        }          
    },
    mutations: {
        'setters/api/lampiran/honor': (state, payload) => {
            state.honor = null
            state.honor = payload
        },

        'setters/api/lampiran/honor/edit': (state, payload) => {
            state.dpa = null
            state.bendahara = null
            state.pimpinan = null
            state.listProgramKegiatan = null
            state.listKodeRekening = null
            state.listJenis = null

            state.dpa = payload.dpa
            state.bendahara = payload.bendahara
            state.pimpinan = payload.pimpinan
            state.listProgramKegiatan = payload.listProgramKegiatan
            state.listKodeRekening = payload.listKodeRekening
            state.listJenis = payload.listJenis   
        },

        'setters/api/lampiran/honor/detail': (state, payload) => {
            state.honor_detail = null
            state.honor_detail = payload.honor_detail
        },
        'setters/api/lampiran/honor/detail/edit': (state, payload) => {
            state.listPegawai = null
            state.listPegawai = payload.listPegawai
        },


        'setters/non-api/lampiran/honor/form': (state, payload) => {
            state.form = payload
        },       
        'setters/non-api/lampiran/honor/form_detail': (state, payload) => {
            state.form_detail = payload
        }       
    },
    actions: {
        'setters/api/lampiran/honor': (context, payload) => {
            context.commit('setters/api/lampiran/honor', payload)
            return      
        },          
        'setters/api/lampiran/honor/detail': (context, payload) => {
            context.commit('setters/api/lampiran/honor/detail', payload)
            return      
        },          
        'setters/api/lampiran/honor/detail/edit': (context, payload) => {
            context.commit('setters/api/lampiran/honor/detail/edit', payload)
            return      
        },          
        'setters/api/lampiran/honor/edit': (context, payload) => {
            context.commit('setters/api/lampiran/honor/edit', payload)
            return      
        },          
        'setters/non-api/lampiran/honor/form': (context, payload) => {
            var filterObj = context.state.honor.data.filter(function(e) {
                if(e.id === payload.id){
                    context.commit('setters/non-api/lampiran/honor/form', e)
                    return
                }
            });
        },
        'setters/non-api/lampiran/honor/form_detail': (context, payload) => {
            var filterObj = context.state.honor_detail.filter(function(e) {
                if(e.id === payload.id){
                    context.commit('setters/non-api/lampiran/honor/form_detail', e)
                    return
                }
            });
        },        
        'setters/non-api/lampiran/honor/splice': (context, payload) => {
            var myArray = context.state.honor.data
            for (let index = 0; index < myArray.length; index++) {
                if(payload.id == myArray[index].id) {
                    myArray.splice(index, 1)
                }
            }
        },       
        'setters/non-api/lampiran/honor/replace': (context, payload) => {
            var myArray = context.state.honor.data
            for (let index = 0; index < myArray.length; index++) {
                if(payload.id == myArray[index].id) {
                    myArray[index].status = payload.status
                }
            }
        },            
    }
}
