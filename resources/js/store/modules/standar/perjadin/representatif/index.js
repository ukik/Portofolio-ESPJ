module.exports = {
    state: {
        // index
        "representatif": {
            "data": [],
        },
        'form': {
            "id": null,
            "jabatan": null,
            "nominal_luar_wilayah": 0,
            "nominal_dalam_wilayah": 0,
        },
    },
    getters: {
        'getters/standar/perjadin/representatif': (state) => {
            return state.representatif
        },
        'getters/standar/perjadin/representatif/form': (state) => {
            return state.form
        }        
    },
    mutations: {
        'setters/api/standar/perjadin/representatif': (state, payload) => {
            state.representatif = null
            state.representatif = payload
        },
        'setters/non-api/standar/perjadin/representatif/form': (state, payload) => {
            state.form.id = payload.id // wajib
            state.form.jabatan = payload.jabatan
            state.form.nominal_luar_wilayah = payload.nominal_luar_wilayah
            state.form.nominal_dalam_wilayah = payload.nominal_dalam_wilayah
        }       
    },
    actions: {
        'setters/api/standar/perjadin/representatif': (context, payload) => {
            context.commit('setters/api/standar/perjadin/representatif', payload)
            return      
        },          
        'setters/non-api/standar/perjadin/representatif/form': (context, payload) => {
            var filterObj = context.state.representatif.data.filter(function(e) {
                if(e.id === payload.id){
                    context.commit('setters/non-api/standar/perjadin/representatif/form', e)
                    return
                }
            });
        },
        'setters/non-api/standar/perjadin/representatif/splice': (context, payload) => {
            var myArray = context.state.representatif.data
            for (let index = 0; index < myArray.length; index++) {
                if(payload.id == myArray[index].id) {
                    myArray.splice(index, 1)
                }
            }
        },           
    }
}
