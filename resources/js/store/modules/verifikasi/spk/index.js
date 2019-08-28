module.exports = {
    state: {
        "spk": {
            "data": [],
        },
        "spk_rab": {
            "id": null,
            "spk_id": null,
            "subtotal": 0,
            "ppn": 0,
            "total": 0,
            "detail": [
                {
                    "id": 1,
                    "spk_rab_id": 3,
                    "tanggal": null,
                    "uraian": null,
                    "volume": null,
                    "satuan": null,
                    "harga": 0,
                    "jumlah": 0,
                },
            ]
        },
        'form': {}
    },
    getters: {
        'getters/verifikasi/spk/spk': (state) => {
            return state.spk
        },
        'getters/verifikasi/spk/spk_rab': (state) => {
            return state.spk_rab
        },
        'getters/verifikasi/spk/form': (state) => {
            return state.form
        },
    },
    mutations: {
        'setters/api/verifikasi/spk/spk': (state, payload) => {
            state.spk = null
            state.spk = payload
        },
        'setters/api/verifikasi/spk/spk_rab': (state, payload) => {
            state.spk_rab = null
            state.spk_rab = payload
        },
        'setters/non-api/verifikasi/spk/form': (state, payload) => {
            state.form = payload
        }, 
    },
    actions: {
        'setters/api/verifikasi/spk/spk': (context, payload) => {
            context.commit('setters/api/verifikasi/spk/spk', payload)
            return      
        },          
        'setters/api/verifikasi/spk/spk_rab': (context, payload) => {
            context.commit('setters/api/verifikasi/spk/spk_rab', payload)
            return      
        },          
        'setters/non-api/verifikasi/spk/form': (context, payload) => {
            var filterObj = context.state.spk.data.filter(function(e) {
                if(e.id === payload.id){
                    context.commit('setters/non-api/verifikasi/spk/form', e)
                    return
                }
            });
        },
        'setters/non-api/verifikasi/spk/splice': (context, payload) => {
            var myArray = context.state.spk.data
            for (let index = 0; index < myArray.length; index++) {
                if(payload.id == myArray[index].id) {
                    myArray.splice(index, 1)
                }
            }
        },          
    }
}
