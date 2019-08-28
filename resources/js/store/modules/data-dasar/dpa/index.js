module.exports = {
    state: {
        "dpa": [],
        'form': {
            "id": null, // wajib ada
            "kode_dpa": null,
            "nama": null,
            "pagu": null,
            "kode_surat": null,
            "kpa_id": null,
            "pptk_id": null,
        },
        'list': {
            listKpa: [],
            listPptk: [],
        },
        "rincian": {
            "dpa": {
              "id": 1,
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
              "kpa": {
              },
              "pptk": {
              }
            },
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
            "rincian": [],
        }
    },
    getters: {
        'getters/data-dasar/dpa/dpa': (state) => {
            return state.dpa
        },
        'getters/data-dasar/dpa/form': (state) => {
            return state.form
        },        
        'getters/data-dasar/dpa/list': (state) => {
            return state.list
        },        
        'getters/data-dasar/dpa/rincian': (state) => {
            return state.rincian
        },        
        'getters/data-dasar/dpa/rincian/length': (state) => {
            return state.rincian.rincian
        },        
    },
    mutations: {
        'setters/api/data-dasar/dpa/dpa': (state, payload) => {
            state.dpa = null
            state.dpa = payload
        },
        'setters/api/data-dasar/dpa/list': (state, payload) => {
            state.list.listKpa = null
            state.list.listPptk = null
            state.list.listKpa = payload.listKpa
            state.list.listPptk = payload.listPptk
        },
        'setters/non-api/data-dasar/dpa/form': (state, payload) => {
            state.form.id = payload.id
            state.form.kode_dpa = payload.kode_dpa
            state.form.nama = payload.nama
            state.form.pagu = payload.pagu
            state.form.kode_surat = payload.kode_surat
            state.form.kpa_id = payload.kpa_id
            state.form.pptk_id = payload.pptk_id
        },       
        'setters/api/data-dasar/dpa/rincian': (state, payload) => {
            state.rincian.dpa = payload.dpa
            state.rincian.program = payload.program
            state.rincian.rincian = payload.rincian
        },
    },
    actions: {
        'setters/api/data-dasar/dpa/dpa': (context, payload) => {
            context.commit('setters/api/data-dasar/dpa/dpa', payload)
            return      
        },  
        'setters/api/data-dasar/dpa/list': (context, payload) => {
            context.commit('setters/api/data-dasar/dpa/list', payload)
            return      
        },  
        'setters/api/data-dasar/dpa/rincian': (context, payload) => {
            context.commit('setters/api/data-dasar/dpa/rincian', payload)
            return      
        },          
        'setters/non-api/data-dasar/dpa/form': (context, payload) => {
            var filterObj = context.state.dpa.filter(function(e) {
                if(e.id === payload.id){
                    context.commit('setters/non-api/data-dasar/dpa/form', e)
                    return
                }
            });
        },    
        'setters/non-api/data-dasar/dpa/splice': (context, payload) => {
            var myArray = context.state.dpa
            for (let index = 0; index < myArray.length; index++) {
                if(payload.id == myArray[index].id) {
                    myArray.splice(index, 1)
                }
            }
        },                        
    }
}
