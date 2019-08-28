module.exports = {
    state: {
        "permohonan": {
            "data": [],
        },
        'form':   {
            "id": null, // wajib ada 
            "jenis_anggaran": null,
            "tahun": null,
            "uraian": null,
            "tanggal": null,
            "nominal_sebelum": null,
            "nominal_pemakaian": null,
            "nominal_persediaan": null,
            "nominal_saldo": null,
            "created_by": null,
            "updated_by": null,            
        },
    },
    getters: {
        'getters/permohonan/uang-persediaan': (state) => {
            return state.permohonan
        },
        'getters/permohonan/uang-persediaan/form': (state) => {
            return state.form
        }        
    },
    mutations: {
        'setters/api/permohonan/uang-persediaan': (state, payload) => {
            state.permohonan = null
            state.permohonan = payload
        },
        'setters/non-api/permohonan/uang-persediaan/form': (state, payload) => {
            state.form.id = payload.id // wajib
            state.form.jenis_anggaran = payload.jenis_anggaran
            state.form.tahun = payload.tahun
            state.form.uraian = payload.uraian
            state.form.tanggal = payload.tanggal
            state.form.nominal_sebelum = payload.nominal_sebelum
            state.form.nominal_pemakaian = payload.nominal_pemakaian
            state.form.nominal_persediaan = payload.nominal_persediaan
            state.form.nominal_saldo = payload.nominal_saldo
            state.form.created_by = payload.created_by
            state.form.updated_by = payload.updated_by
            
        }       
    },
    actions: {
        'setters/api/permohonan/uang-persediaan': (context, payload) => {
            context.commit('setters/api/permohonan/uang-persediaan', payload)
            return      
        },           
        'setters/non-api/permohonan/uang-persediaan/form': (context, payload) => {
            var filterObj = context.state.permohonan.data.filter(function(e) {
                if(e.id === payload.id){
                    context.commit('setters/non-api/permohonan/uang-persediaan/form', e)
                    return
                }
            });
        },
        'setters/non-api/permohonan/uang-persediaan/splice': (context, payload) => {
            var myArray = context.state.permohonan.data
            for (let index = 0; index < myArray.length; index++) {
                if(payload.id == myArray[index].id) {
                    myArray.splice(index, 1)
                }
            }
        },         
    }
}
