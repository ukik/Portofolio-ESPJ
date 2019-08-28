module.exports = {
    state: {
        "spj": {
            "data": [],
        },
        'form': {
            "id": null,
            "jenis_anggaran": null,
            "tahun": null,
            "permohonan_jenis": null,
            "permohonan_id": null,
            "kode_dpa": null,
            "kegiatan": null,
            "tanggal": null,
            "nominal_diajukan": null,
            "nominal_disetujui": null,
            "nominal_spj": null,
            "nominal_sisa": 0,
            "permohonan": {},
            "status": null,
            "catatan": null,
            "created_by": null,
            "updated_by": null,
            "verified_by": null,
            "verified_at": null,            
        }        
    },
    getters: {
        'getters/spj': (state) => {
            return state.spj
        },
        'getters/spj/form': (state) => {
            return state.form
        },
    },
    mutations: {
        'setters/api/spj': (state, payload) => {
            state.spj = null
            state.spj = payload
        },
        'setters/non-api/spj/form': (state, payload) => {
            state.form.id = payload.id
            state.form.jenis_anggaran = payload.jenis_anggaran
            state.form.tahun = payload.tahun
            state.form.permohonan_jenis = payload.permohonan_jenis
            state.form.permohonan_id = payload.permohonan_id
            state.form.permohonan = payload.permohonan
            state.form.kode_dpa = payload.kode_dpa
            state.form.kegiatan = payload.kegiatan
            state.form.tanggal = payload.tanggal
            state.form.nominal_diajukan = payload.nominal_diajukan
            state.form.nominal_disetujui = payload.nominal_disetujui
            state.form.nominal_spj = payload.nominal_spj
            state.form.nominal_sisa = payload.nominal_sisa
            state.form.status = payload.status
            state.form.catatan = payload.catatan
        },         
    },
    actions: {
        'setters/api/spj': (context, payload) => {
            context.commit('setters/api/spj', payload)
            return      
        },               
        'setters/non-api/spj/form': (context, payload) => {
            var filterObj = context.state.spj.data.filter(function(e) {
                if(e.id === payload.id){
                    context.commit('setters/non-api/spj/form', e)
                    return
                }
            });
        },
        'setters/non-api/spj/splice': (context, payload) => {
            var myArray = context.state.spj.data
            for (let index = 0; index < myArray.length; index++) {
                if(payload.id == myArray[index].id) {
                    myArray.splice(index, 1)
                }
            }
        },           
        'setters/non-api/spj/replace': (context, payload) => {
            var myArray = context.state.spj.data
            for (let index = 0; index < myArray.length; index++) {
                if(payload.id == myArray[index].id) {
                    myArray[index].status = payload.status
                }
            }
        },                 
    }
}
