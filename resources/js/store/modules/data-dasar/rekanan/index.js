module.exports = {
    state: {
        "rekanan": {
            "data": [],
        },
        'form': {
            "id": null, // wajib ada
            "nama_perusahaan": null,
            "nama_pimpinan": null,
            "npwp": null,
            "telp": null,
            "fax": null,
            "email": null,
            "website": null,
            "alamat": null,
        }
    },
    getters: {
        'getters/data-dasar/rekanan/rekanan': (state) => {
            return state.rekanan
        },
        'getters/data-dasar/rekanan/form': (state) => {
            return state.form
        }        
    },
    mutations: {
        'setters/api/data-dasar/rekanan/rekanan': (state, payload) => {
            state.rekanan = null
            state.rekanan = payload
        },
        'setters/non-api/data-dasar/rekanan/form': (state, payload) => {
            state.form.id = payload.id // wajib
            state.form.nama_perusahaan = payload.nama_perusahaan
            state.form.nama_pimpinan = payload.nama_pimpinan
            state.form.npwp = payload.npwp
            state.form.telp = payload.telp
            state.form.fax = payload.fax
            state.form.email = payload.email
            state.form.website = payload.website
            state.form.alamat = payload.alamat
        }       
    },
    actions: {
        'setters/api/data-dasar/rekanan/rekanan': (context, payload) => {
            context.commit('setters/api/data-dasar/rekanan/rekanan', payload)
            return      
        },          
        'setters/non-api/data-dasar/rekanan/form': (context, payload) => {
            var filterObj = context.state.rekanan.data.filter(function(e) {
                if(e.id === payload.id){
                    context.commit('setters/non-api/data-dasar/rekanan/form', e)
                    return
                }
            });
        },
        'setters/non-api/data-dasar/rekanan/splice': (context, payload) => {
            var myArray = context.state.rekanan.data
            for (let index = 0; index < myArray.length; index++) {
                if(payload.id == myArray[index].id) {
                    myArray.splice(index, 1)
                }
            }
        },            
    }
}
