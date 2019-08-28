module.exports = {
    state: {
        "rekap": [], 
        "listKodeRekening": [],
        "pajak": {},
        "form": {
            "id": null,
        }
    },
    getters: {
        'getters/spj/rekap': (state) => {
            return state.rekap
        },
        'getters/spj/rekap/permohonan': (state) => {
            return state.permohonan
        },
        'getters/spj/rekap/listKodeRekening': (state) => {
            return state.listKodeRekening
        },
        'getters/spj/rekap/pajak': (state) => {
            return state.pajak
        },
        'getters/spj/rekap/form': (state) => {
            return state.form
        },
    },
    mutations: {
        'setters/api/spj/rekap': (state, payload) => {
            state.rekap = null
            
            state.rekap = payload
        },
        'setters/api/spj/rekap/edit': (state, payload) => {
            state.pajak = null
            state.listKodeRekening = null

            state.pajak = payload.pajak
            state.listKodeRekening = payload.listKodeRekening
        },
        'setters/non-api/spj/rekap/form': (state, payload) => {
            state.form = payload
            // state.form.id = payload.id
            // state.form.bukti_tanggal = payload.bukti_tanggal
            // state.form.permohonan_detail_id = payload.permohonan_detail_id
            // state.form.penerima = payload.penerima
            // state.form.nominal = payload.nominal
            // state.form.ppn = payload.ppn
            // state.form.pph21 = payload.pph21
            // state.form.pph22 = payload.pph22
            // state.form.pph23 = payload.pph23
        },
    },
    actions: {
        'setters/api/spj/rekap': (context, payload) => {
            context.commit('setters/api/spj/rekap', payload)
            return       
        },      
        'setters/api/spj/rekap/edit': (context, payload) => {
            context.commit('setters/api/spj/rekap/edit', payload)
            return       
        },      
        'setters/non-api/spj/rekap/form': (context, payload) => {
            var filterObj = context.state.rekap.filter(function(e) {
                if(e.id === payload.id){
                    context.commit('setters/non-api/spj/rekap/form', e)
                    return
                }
            });
        },            
        'setters/non-api/spj/rekap/splice': (context, payload) => {
            var myArray = context.state.rekap
            for (let index = 0; index < myArray.length; index++) {
                if(payload.id == myArray[index].id) {
                    myArray.splice(index, 1)
                }
            }
        },           
    }
}
