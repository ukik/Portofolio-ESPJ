module.exports = {
    state: {
        "permohonan": {
            "data": [],
        },
        "aliran_kas": {
            "permohonan": {},
            "kegiatan": {},
            "bendahara": {},
            "bulan": null,
            "dpa": [],
            "jenis": null,
        },
        "create": {
            "listProgramKegiatan": [],
            "listBendahara": [],
            "listPimpinan": [],
            "jenis": {},
        },
        'form': {
            "id": null, // wajib ada
        }
    },
    getters: {
        'getters/permohonan/ganti-uang': (state) => {
            return state.permohonan
        },

        'getters/permohonan/ganti-uang/aliran-kas/permohonan': (state) => {
            return state.aliran_kas.permohonan
        },
        'getters/permohonan/ganti-uang/aliran-kas/kegiatan': (state) => {
            return state.aliran_kas.kegiatan
        },
        'getters/permohonan/ganti-uang/aliran-kas/bendahara': (state) => {
            return state.aliran_kas.bendahara
        },
        'getters/permohonan/ganti-uang/aliran-kas/bulan': (state) => {
            return state.aliran_kas.bulan
        },
        'getters/permohonan/ganti-uang/aliran-kas/dpa': (state) => {
            return state.aliran_kas.dpa
        },
        'getters/permohonan/ganti-uang/aliran-kas/jenis': (state) => {
            return state.aliran_kas.jenis
        },

        'getters/permohonan/ganti-uang/create/listProgramKegiatan': (state) => {
            return state.create.listProgramKegiatan
        },
        'getters/permohonan/ganti-uang/create/listBendahara': (state) => {
            return state.create.listBendahara
        },
        'getters/permohonan/ganti-uang/create/listPimpinan': (state) => {
            return state.create.listPimpinan
        },
        'getters/permohonan/ganti-uang/create/jenis': (state) => {
            return state.create.jenis
        },

        'getters/permohonan/ganti-uang/form': (state) => {
            return state.form
        }        
    },
    mutations: {
        'setters/api/permohonan/ganti-uang': (state, payload) => {
            state.permohonan = null
            state.permohonan = payload
        },
        'setters/api/permohonan/ganti-uang/aliran-kas': (state, payload) => {
            state.aliran_kas = null
            state.aliran_kas = payload
        }, 
        'setters/api/permohonan/ganti-uang/create': (state, payload) => {
            state.create = null
            state.create = payload
        },         
        'setters/non-api/permohonan/ganti-uang/form': (state, payload) => {
            state.form = payload
        }       
    },
    actions: {
        'setters/api/permohonan/ganti-uang': (context, payload) => {
            context.commit('setters/api/permohonan/ganti-uang', payload)
            return      
        },          
        'setters/api/permohonan/ganti-uang/aliran-kas': (context, payload) => {
            context.commit('setters/api/permohonan/ganti-uang/aliran-kas', payload)
            return      
        }, 
        'setters/api/permohonan/ganti-uang/create': (context, payload) => {
            context.commit('setters/api/permohonan/ganti-uang/create', payload)
            return      
        },                      
        'setters/non-api/permohonan/ganti-uang/form': (context, payload) => {
            var filterObj = context.state.permohonan.data.filter(function(e) {
                if(e.id === payload.id){
                    context.commit('setters/non-api/permohonan/ganti-uang/form', e)
                    return
                }
            });
        },
        'setters/non-api/permohonan/ganti-uang/splice': (context, payload) => {
            var myArray = context.state.permohonan.data
            for (let index = 0; index < myArray.length; index++) {
                if(payload.id == myArray[index].id) {
                    myArray.splice(index, 1)
                }
            }
        },        
    }
}
