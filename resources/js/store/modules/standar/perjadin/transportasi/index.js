module.exports = {
    state: {
        // index
        "transportasi": { 
            "data": [],
        },
        "listLokasi": [], // edit
        
        'form': {
            "id": null,
            "golongan": null,
            "lokasi_berangkat_id":null,
            "lokasi_tujuan_id": null,
            "nominal": null
        },
    },
    getters: {
        'getters/standar/perjadin/transportasi': (state) => {
            return state.transportasi
        },
        'getters/standar/perjadin/transportasi/listLokasi': (state) => {
            return state.listLokasi
        },
        'getters/standar/perjadin/transportasi/form': (state) => {
            return state.form
        }        
    },
    mutations: {
        'setters/api/standar/perjadin/transportasi': (state, payload) => {
            state.transportasi = null
            state.transportasi = payload
        },
        'setters/api/standar/perjadin/transportasi/listLokasi': (state, payload) => {
            state.listLokasi = null
            state.listLokasi = payload
        },
        'setters/non-api/standar/perjadin/transportasi/form': (state, payload) => {
            state.form.id = payload.id // wajib
            state.form.golongan = payload.golongan
            state.form.lokasi_berangkat_id = payload.lokasi_berangkat_id
            state.form.lokasi_tujuan_id = payload.lokasi_tujuan_id
            state.form.nominal = payload.nominal
        }       
    },
    actions: {
        'setters/api/standar/perjadin/transportasi': (context, payload) => {
            context.commit('setters/api/standar/perjadin/transportasi', payload)
            return      
        },          
        'setters/api/standar/perjadin/transportasi/listLokasi': (context, payload) => {
            context.commit('setters/api/standar/perjadin/transportasi/listLokasi', payload)
            return      
        },          
        'setters/non-api/standar/perjadin/transportasi/form': (context, payload) => {
            var filterObj = context.state.transportasi.data.filter(function(e) {
                if(e.id === payload.id){
                    context.commit('setters/non-api/standar/perjadin/transportasi/form', e)
                    return
                }
            });
        },
        'setters/non-api/standar/perjadin/transportasi/splice': (context, payload) => {
            var myArray = context.state.transportasi.data
            for (let index = 0; index < myArray.length; index++) {
                if(payload.id == myArray[index].id) {
                    myArray.splice(index, 1)
                }
            }
        },           
    }
}
