module.exports = {
    state: {
        // index
        dpa: [],
        total: 0,
        // index/edit
        "tahun": null,
        "jenis_anggaran": null,
        // edit
        "program": {
            "id": null,
            "jenis_anggaran": null,
            "tahun": null,
            "kode_dpa": null,
            "kode_rekening": null,
            "kode_surat": null,
            "jenis": null,
            "level": null,
            "nama": null,
            "pagu": null,
            "kpa_id": null,
            "kpa_singkatan": null,
            "pptk_id": null,
            "pptk_singkatan": null
        },            
        "kegiatan": {
            "id": null,
            "jenis_anggaran": null,
            "tahun": null,
            "kode_dpa": null,
            "kode_rekening": null,
            "kode_surat": null,
            "jenis": null,
            "level": null,
            "nama": null,
            "pagu": null,
            "kpa_id": null,
            "kpa_singkatan": null,
            "pptk_id": null,
            "pptk_singkatan": null,
        },
        "rincian": [],
        // upload
        listTahun: [],
        listAnggaran: {},
    },
    getters: {
        'getters/pengaturan/aliran-kas/dpa': (state) => {
            return state.dpa
        },
        'getters/pengaturan/aliran-kas/total': (state) => {
            return state.total
        },
        'getters/pengaturan/aliran-kas/tahun': (state) => {
            return state.tahun
        },
        'getters/pengaturan/aliran-kas/jenis_anggaran': (state) => {
            return state.jenis_anggaran
        },
        'getters/pengaturan/aliran-kas/program': (state) => {
            return state.program
        },
        'getters/pengaturan/aliran-kas/kegiatan': (state) => {
            return state.kegiatan
        },
        'getters/pengaturan/aliran-kas/rincian': (state) => {
            return state.rincian
        },

        'getters/pengaturan/aliran-kas/listTahun': (state) => {
            return state.listTahun
        },
        'getters/pengaturan/aliran-kas/listAnggaran': (state) => {
            return state.listAnggaran
        },
    },
    mutations: {
        'setters/api/pengaturan/aliran-kas/index': (state, payload) => {
            state.total = null
            state.tahun = null
            state.jenis_anggaran = null
            state.dpa = null
                        
            state.total = payload.total
            state.tahun = payload.tahun
            state.jenis_anggaran = payload.jenis_anggaran
            state.dpa = payload.dpa
        },
        'setters/api/pengaturan/aliran-kas/edit': (state, payload) => {
            state.tahun = null
            state.jenis_anggaran = null
            state.program = null
            state.kegiatan = null
            state.rincian = null

            state.tahun = payload.tahun
            state.jenis_anggaran = payload.jenis_anggaran
            state.program = payload.program
            state.kegiatan = payload.kegiatan
            state.rincian = payload.rincian       
        },
        'setters/api/pengaturan/aliran-kas/upload': (state, payload) => {
            state.listTahun = null
            state.listAnggaran = null

            state.listTahun = payload.listTahun
            state.listAnggaran = payload.listAnggaran
        },
    },
    actions: {
        'setters/api/pengaturan/aliran-kas/index': (context, payload) => {
            context.commit('setters/api/pengaturan/aliran-kas/index', payload)
            return      
        },          
        'setters/api/pengaturan/aliran-kas/edit': (context, payload) => {
            context.commit('setters/api/pengaturan/aliran-kas/edit', payload)
            return      
        },          
        'setters/api/pengaturan/aliran-kas/upload': (context, payload) => {
            context.commit('setters/api/pengaturan/aliran-kas/upload', payload)
            return
        },
        'setters/non-api/pengaturan/aliran-kas//splice': (context, payload) => {
            var myArray = context.state.dpa
            for (let index = 0; index < myArray.length; index++) {
                if(payload.id == myArray[index].id) {
                    myArray.splice(index, 1)
                }
            }
        },  
    }
}
