module.exports = {
    state: {
        "pegawai": {
            "current_page": null,
            "data": [],
            "first_page_url": null,
            "from": null,
            "last_page": 0,
            "last_page_url": null,
            "next_page_url": null,
            "path": null,
            "per_page": null,
            "prev_page_url": null,
            "to": null,
            "total": null
        },
        "listBidang": [], 
        "listPerjadinHarianDalamWilayah": [],
        "listPerjadinHarianLuarWilayah": [],
        "listPerjadinRepresentatif": [],
        "listPerjadinHotelDalamWilayah": [],
        "listPerjadinHotelLuarWilayah": [],
        "listHonor": [],
        'form': {
            "id": null, // wajib ada
        }
    },
    getters: {
        'getters/data-dasar/pegawai/pegawai': (state) => {
            return state.pegawai
        },
        'getters/data-dasar/pegawai/listBidang': (state) => {
            return state.listBidang
        },
        'getters/data-dasar/pegawai/listPerjadinHarianDalamWilayah': (state) => {
            return state.listPerjadinHarianDalamWilayah
        },
        'getters/data-dasar/pegawai/listPerjadinHarianLuarWilayah': (state) => {
            return state.listPerjadinHarianLuarWilayah
        },
        'getters/data-dasar/pegawai/listPerjadinRepresentatif': (state) => {
            return state.listPerjadinRepresentatif
        },
        'getters/data-dasar/pegawai/listPerjadinHotelDalamWilayah': (state) => {
            return state.listPerjadinHotelDalamWilayah
        },
        'getters/data-dasar/pegawai/listPerjadinHotelLuarWilayah': (state) => {
            return state.listPerjadinHotelLuarWilayah
        },
        'getters/data-dasar/pegawai/listHonor': (state) => {
            return state.listHonor
        },
        'getters/data-dasar/pegawai/form': (state) => {
            return state.form
        }        
    },
    mutations: {
        'setters/api/data-dasar/pegawai/pegawai': (state, payload) => {
            state.pegawai = null
            state.listBidang = null

            state.pegawai = payload.pegawai
            state.listBidang = payload.listBidang
                        
        },
        'setters/api/data-dasar/pegawai/list': (state, payload) => {
            state.listBidang = null
            state.listPerjadinHarianDalamWilayah = null
            state.listPerjadinHarianLuarWilayah = null
            state.listPerjadinRepresentatif = null
            state.listPerjadinHotelDalamWilayah = null
            state.listPerjadinHotelLuarWilayah = null
            state.listHonor = null

            state.listBidang = payload.listBidang
            state.listPerjadinHarianDalamWilayah = payload.listPerjadinHarianDalamWilayah
            state.listPerjadinHarianLuarWilayah = payload.listPerjadinHarianLuarWilayah
            state.listPerjadinRepresentatif = payload.listPerjadinRepresentatif
            state.listPerjadinHotelDalamWilayah = payload.listPerjadinHotelDalamWilayah
            state.listPerjadinHotelLuarWilayah = payload.listPerjadinHotelLuarWilayah
            state.listHonor = payload.listHonor
        }, 
        'setters/non-api/data-dasar/pegawai/form': (state, payload) => {
            state.form = payload
        }       
    },
    actions: {
        'setters/api/data-dasar/pegawai/pegawai': (context, payload) => {
            context.commit('setters/api/data-dasar/pegawai/pegawai', payload)
            return      
        },          
        'setters/api/data-dasar/pegawai/list': (context, payload) => {
            context.commit('setters/api/data-dasar/pegawai/list', payload)
            return      
        },          
        'setters/non-api/data-dasar/pegawai/form': (context, payload) => {
            var filterObj = context.state.pegawai.data.filter(function(e) {
                if(e.id === payload.id){
                    context.commit('setters/non-api/data-dasar/pegawai/form', e)
                    return
                }
            });
        },
        'setters/non-api/data-dasar/pegawai/splice': (context, payload) => {
            var myArray = context.state.pegawai.data
            for (let index = 0; index < myArray.length; index++) {
                if(payload.id == myArray[index].id) {
                    myArray.splice(index, 1)
                }
            }
        },         
    }
}
