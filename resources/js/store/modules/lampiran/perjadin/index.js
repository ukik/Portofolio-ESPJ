module.exports = {
    state: {
        // index
        "perjadin": {
            "data": [],
        },

        // edit
        "dpa": null, // edit
        "bendahara": {
            "nama": null,
        }, // edit
        "pimpinan": {
            "nama": null,
        }, // edit
        "listProgramKegiatan": [], // edit
        "listKodeRekening": [], // edit
        "listJenis": [], // edit
        "listPerjadin": [], // edit
        "listLokasi": [], // edit

        'form': {
            "id": null,
            "jenis_anggaran": null,
            "tahun": null,
            "kode_dpa": null,
            "kode_rekening": null,
            "kegiatan": null,
            "rincian": null,
            "nomor_urut": null,
            "nomor_spt": null,
            "tanggal": null,
            "uraian": null,
            "lokasi_id": null,
            "lokasi_nama": null,
            "tempat_tujuan": null,
            "nominal": null,
            "tanggal_berangkat": null,
            "tanggal_kembali": null,
            "lama_perjalanan": null,
            "keterangan": null,
            "kpa_id": null,
            "pptk_id": null,
            "bendahara_id": null,
            "pimpinan_id": null,
            "status": null,
            "created_by": null,
            "updated_by": null,
            "verified_by": null,
            "printed_by": null,
            "verified_at": null,
            "printed_at": null,
            "perubahan_baru": null,
            "kpa": {
                "nama": null,
            },
            "pptk": {
                "nama": null,
            }
        },
    },
    getters: {
        'getters/lampiran/perjadin': (state) => {
            return state.perjadin
        },
        'getters/lampiran/perjadin/dpa': (state) => {
            return state.dpa
        },
        'getters/lampiran/perjadin/bendahara': (state) => {
            return state.bendahara
        },
        'getters/lampiran/perjadin/pimpinan': (state) => {
            return state.pimpinan
        },
        'getters/lampiran/perjadin/listProgramKegiatan': (state) => {
            return state.listProgramKegiatan
        },
        'getters/lampiran/perjadin/listKodeRekening': (state) => {
            return state.listKodeRekening
        },
        'getters/lampiran/perjadin/listJenis': (state) => {
            return state.listJenis
        },
        'getters/lampiran/perjadin/listPerjadin': (state) => {
            return state.listPerjadin
        },
        'getters/lampiran/perjadin/listLokasi': (state) => {
            return state.listLokasi
        },
        
        'getters/lampiran/perjadin/form': (state) => {
            return state.form
        }        
    },
    mutations: {
        'setters/api/lampiran/perjadin': (state, payload) => {
            state.perjadin = null
            state.perjadin = payload
        },
        'setters/api/lampiran/perjadin/edit': (state, payload) => {
            state.dpa = null
            state.bendahara = null
            state.pimpinan = null
            state.listProgramKegiatan = null
            state.listKodeRekening = null
            state.listPerjadin = null
            state.listLokasi = null

            state.dpa = payload.dpa
            state.bendahara = payload.bendahara
            state.pimpinan = payload.pimpinan
            state.listProgramKegiatan = payload.listProgramKegiatan
            state.listKodeRekening = payload.listKodeRekening
            state.listPerjadin = payload.listPerjadin
            state.listLokasi = payload.listLokasi  
        },

        'setters/non-api/lampiran/perjadin/form': (state, payload) => {
            state.form = payload
        },       
  
        'setters/non-api/lampiran/perjadin/form_clean': (state, payload) => {
            state.form = {
                "id": null,
                "jenis_anggaran": null,
                "tahun": null,
                "kode_dpa": null,
                "kode_rekening": null,
                "kegiatan": null,
                "rincian": null,
                "nomor_urut": null,
                "nomor_spt": null,
                "tanggal": null,
                "uraian": null,
                "lokasi_id": null,
                "lokasi_nama": null,
                "tempat_tujuan": null,
                "nominal": null,
                "tanggal_berangkat": null,
                "tanggal_kembali": null,
                "lama_perjalanan": null,
                "keterangan": null,
                "kpa_id": null,
                "pptk_id": null,
                "bendahara_id": null,
                "pimpinan_id": null,
                "status": null,
                "created_by": null,
                "updated_by": null,
                "verified_by": null,
                "printed_by": null,
                "verified_at": null,
                "printed_at": null,
                "perubahan_baru": null,
                "kpa": {
                    "nama": null,
                },
                "pptk": {
                    "nama": null,
                }
            }
        }               
    },
    actions: {
        'setters/api/lampiran/perjadin': (context, payload) => {
            context.state.perjadin = {}
            context.commit('setters/api/lampiran/perjadin', payload)
            return      
        },          
        'setters/non-api/lampiran/perjadin/form_clean': (context) => {
            context.commit('setters/non-api/lampiran/perjadin/form_clean')
            return      
        },          

        'setters/api/lampiran/perjadin/edit': (context, payload) => {
            context.commit('setters/api/lampiran/perjadin/edit', payload)
            return      
        },          
        'setters/non-api/lampiran/perjadin/form': (context, payload) => {
            var filterObj = context.state.perjadin.data.filter(function(e) {
                if(e.id === payload.id){
                    context.commit('setters/non-api/lampiran/perjadin/form', e)
                    return
                }
            });
        },
        'setters/non-api/lampiran/perjadin/splice': (context, payload) => {
            var myArray = context.state.perjadin.data
            for (let index = 0; index < myArray.length; index++) {
                if(payload.id == myArray[index].id) {
                    myArray.splice(index, 1)
                }
            }
        },
        'setters/non-api/lampiran/perjadin/replace': (context, payload) => {
            var myArray = context.state.perjadin.data
            for (let index = 0; index < myArray.length; index++) {
                if(payload.id == myArray[index].id) {
                    myArray[index].status = payload.status
                }
            }
        },          
    }
}

