module.exports = {
    state: {
        "berkas": [],
        "listKodeRekening": [], 
        "listJenis": [],            
    },
    getters: {
        'getters/spj/berkas': (state) => {
            return state.berkas
        },
        'getters/spj/berkas/listKodeRekening': (state) => {
            return state.listKodeRekening
        },
        'getters/spj/berkas/listJenis': (state) => {
            return state.listJenis
        },
    },
    mutations: {
        'setters/api/spj/berkas': (state, payload) => {
            state.berkas = null
            state.berkas = payload
        },
        'setters/api/spj/berkas/create': (state, payload) => {
            state.listKodeRekening = null
            state.listJenis = null
            state.listKodeRekening = payload.listKodeRekening
            state.listJenis = payload.listJenis
        },  
    },
    actions: {
        'setters/api/spj/berkas': (context, payload) => {
            context.commit('setters/api/spj/berkas', payload)
            return      
        },          
        'setters/api/spj/berkas/create': (context, payload) => {
            context.commit('setters/api/spj/berkas/create', payload)
            return      
        },        
        'setters/non-api/spj/berkas/splice': (context, payload) => {
            var myArray = context.state.berkas
            for (let index = 0; index < myArray.length; index++) {
                if(payload.id == myArray[index].id) {
                    myArray.splice(index, 1)
                }
            }
        },            
    }
}
