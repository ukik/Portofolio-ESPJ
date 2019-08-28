module.exports = {
    state: {
        "harian": {
            "data": [],
        },
        'form': {
            "id": null,
            "tahun": null,
            "jabatan": null,
            "nominal_dalam_wilayah": null,
            "nominal_luar_wilayah": null,
            "nominal_dalam_kota": null
        },
    },
    getters: {
        'getters/standar/harian/dalam': (state) => {
            return state.harian
        },
        'getters/standar/harian/dalam/form': (state) => {
            return state.form
        }        
    },
    mutations: {
        'setters/api/standar/harian/dalam': (state, payload) => {
            state.harian = null
            state.harian = payload
        },
        'setters/non-api/standar/harian/dalam/form': (state, payload) => {
            state.form.id = payload.id // wajib
            state.form.tahun = payload.tahun
            state.form.jabatan = payload.jabatan
            state.form.nominal_dalam_wilayah = payload.nominal_dalam_wilayah
            state.form.nominal_luar_wilayah = payload.nominal_luar_wilayah
            state.form.nominal_dalam_kota = payload.nominal_dalam_kota
        }       
    },
    actions: {
        'setters/api/standar/harian/dalam': (context, payload) => {
            context.commit('setters/api/standar/harian/dalam', payload)
            return      
        },          
        'setters/non-api/standar/harian/dalam/form': (context, payload) => {
            var filterObj = context.state.harian.data.filter(function(e) {
                if(e.id === payload.id){
                    context.commit('setters/non-api/standar/harian/dalam/form', e)
                    return
                }
            });
        },
        'setters/non-api/standar/harian/dalam/splice': (context, payload) => {
            var myArray = context.state.harian.data
            for (let index = 0; index < myArray.length; index++) {
                if(payload.id == myArray[index].id) {
                    myArray.splice(index, 1)
                }
            }
        },              
    }
}
