module.exports = {
    state: {
        // index
        "spk": {
            "data": [],
        },
        // edit
        "dpa": null,
        "bendahara": {},
        "pimpinan": {},
        "listProgramKegiatan": [],
        "listKodeRekening": [],
        "listJenis": [],
        "listRekanan": [],
        "listPelaksanaanSatuan": [],
        "listSpk": [],
        "listLokasi": [],

        // rab
        "detail": [],
        
        'form': {
            "id": null,
            "jenis_anggaran": null,
            "tahun": null,
            "nomor_urut": null,
            "nomor_spk": null,
            "tanggal": null,
            "kode_dpa": null,
            "kode_rekening": null,
            "kegiatan": null,
            "rincian": null,
            "jenis": null,
            "nama_pekerjaan": null,
            "uraian": null,
            "kpa_id": null,
            "pptk_id": null,
            "bendahara_id": null,
            "pimpinan_id": null,
            "rekanan_id": null,
            "rekanan_nama_perusahaan": null,
            "rekanan_nama_pimpinan": null,
            "rekanan_jabatan": null,
            "rekanan_alamat": null,
            "pelaksanaan_jumlah": null,
            "pelaksanaan_satuan": null,
            "terbit_lokasi": null,
            "terbit_tanggal": null,
            "status": null,
            "created_by": null,
            "updated_by": null,
            "verified_by": null,
            "printed_by": null,
            "verified_at": null,
            "printed_at": null
        },
    },
    getters: {
        'getters/lampiran/spk/spk': (state) => {
            return state.spk
        },
        'getters/lampiran/spk/dpa': (state) => {
            return state.dpa
        },
        'getters/lampiran/spk/bendahara': (state) => {
            return state.bendahara
        },
        'getters/lampiran/spk/pimpinan': (state) => {
            return state.pimpinan
        },
        'getters/lampiran/spk/listProgramKegiatan': (state) => {
            return state.listProgramKegiatan
        },
        'getters/lampiran/spk/listKodeRekening': (state) => {
            return state.listKodeRekening
        },
        'getters/lampiran/spk/listSpk': (state) => {
            return state.listSpk
        },
        'getters/lampiran/spk/listJenis': (state) => {
            return state.listJenis
        },
        'getters/lampiran/spk/listLokasi': (state) => {
            return state.listLokasi
        },
        'getters/lampiran/spk/listRekanan': (state) => {
            return state.listRekanan
        },
        'getters/lampiran/spk/listPelaksanaanSatuan': (state) => {
            return state.listPelaksanaanSatuan
        },   
        'getters/lampiran/spk/detail': (state) => {
            return state.detail
        },

        'getters/lampiran/spk/form': (state) => {
            return state.form
        }        
    },
    mutations: {
        'setters/api/lampiran/spk/spk': (state, payload) => {
            state.spk = null
            state.spk = payload
        },
        'setters/api/lampiran/spk/detail': (state, payload) => {
            state.detail = null
            state.detail = payload
        },
        'setters/api/lampiran/spk/edit': (state, payload) => {
            state.dpa = null
            state.bendahara = null
            state.pimpinan = null
            state.listProgramKegiatan = null
            state.listKodeRekening = null
            state.listJenis = null
            state.listRekanan = null
            state.listPelaksanaanSatuan = null
            state.listSpk = null
            state.listLokasi = null

            state.dpa = payload.dpa
            state.bendahara = payload.bendahara
            state.pimpinan = payload.pimpinan
            state.listProgramKegiatan = payload.listProgramKegiatan
            state.listKodeRekening = payload.listKodeRekening
            state.listJenis = payload.listJenis
            state.listRekanan = payload.listRekanan
            state.listPelaksanaanSatuan = payload.listPelaksanaanSatuan
            state.listSpk = payload.listSpk
            state.listLokasi = payload.listLokasi
        },

        'setters/non-api/lampiran/spk/form': (state, payload) => {
            state.form = payload
        }       
    },
    actions: {
        'setters/api/lampiran/spk/spk': (context, payload) => {
            context.commit('setters/api/lampiran/spk/spk', payload)
            return      
        },          
        'setters/api/lampiran/spk/edit': (context, payload) => {
            context.commit('setters/api/lampiran/spk/edit', payload)
            return      
        },   
        'setters/api/lampiran/spk/detail': (context, payload) => {
            context.commit('setters/api/lampiran/spk/detail', payload)
            return      
        },                
        'setters/non-api/lampiran/spk/form': (context, payload) => {
            var filterObj = context.state.spk.data.filter(function(e) {
                if(e.id === payload.id){
                    context.commit('setters/non-api/lampiran/spk/form', e)
                    return
                }
            });
        },
        'setters/non-api/lampiran/spk/splice': (context, payload) => {
            var myArray = context.state.spk.data
            for (let index = 0; index < myArray.length; index++) {
                if(payload.id == myArray[index].id) {
                    myArray.splice(index, 1)
                }
            }
        },           
        'setters/non-api/lampiran/spk/replace': (context, payload) => {
            var myArray = context.state.spk.data
            for (let index = 0; index < myArray.length; index++) {
                if(payload.id == myArray[index].id) {
                    myArray[index].status = payload.status
                }
            }
        },        
    }
}
