module.exports = {
    state: {
        "permohonan": {
            "data": [],
        },
        "kegiatan": {},
        'form': {}
    },
    getters: {
        'getters/verifikasi/ganti-uang/permohonan': (state) => {
            return state.permohonan
        },
        'getters/verifikasi/ganti-uang/kegiatan': (state) => {
            return state.kegiatan
        },
        'getters/verifikasi/ganti-uang/form': (state) => {
            return state.form
        },
    },
    mutations: {
        'setters/api/verifikasi/ganti-uang/permohonan': (state, payload) => {
            state.permohonan = null
            state.permohonan = payload
        },
        'setters/api/verifikasi/ganti-uang/kegiatan': (state, payload) => {
            state.kegiatan = null
            state.kegiatan = payload
        },        
        'setters/non-api/verifikasi/ganti-uang/form': (state, payload) => {
            state.form = payload
        }, 
    },
    actions: {
        'setters/api/verifikasi/ganti-uang/permohonan': (context, payload) => {
            context.commit('setters/api/verifikasi/ganti-uang/permohonan', payload)
            return      
        },     
        'setters/api/verifikasi/ganti-uang/kegiatan': (context, payload) => {
            context.commit('setters/api/verifikasi/ganti-uang/kegiatan', payload)
            return      
        },                 
        'setters/non-api/verifikasi/ganti-uang/form': (context, payload) => {
            var filterObj = context.state.permohonan.data.filter(function(e) {
                if(e.id === payload.id){
                    context.commit('setters/non-api/verifikasi/ganti-uang/form', e)
                    return
                }
            });
        },
        'setters/non-api/verifikasi/ganti-uang/splice': (context, payload) => {
            var myArray = context.state.permohonan.data
            for (let index = 0; index < myArray.length; index++) {
                if(payload.id == myArray[index].id) {
                    myArray.splice(index, 1)
                }
            }
        },         
    }
}
