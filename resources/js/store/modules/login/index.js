module.exports = {
    state: {
        "listAnggaran": {},
        "listTahun": [],
        "listBerkas": [],
        'user': {
            "id": null, // wajib ada
            "nama": null,
            "username": null,
            "level": null,
            "pegawai_id": null,
            "password_lama": null,
            "password": null,
            "password_confirmation": null,
            "bidang_id": null,
        }        
    },
    getters: {
        'getters/login/listAnggaran': (state) => {
            return state.listAnggaran
        },
        'getters/login/listTahun': (state) => {
            return state.listTahun
        },
        'getters/login/listBerkas': (state) => {
            return state.listBerkas
        },        
        'getters/login/user': (state) => {
            return state.user 
        }          
    },
    mutations: {
        'setters/api/login': (state, payload) => {
            state.listAnggaran = null
            state.listTahun = null
            state.listBerkas = null

            state.listAnggaran = payload.listAnggaran
            state.listTahun = payload.listTahun
            state.listBerkas = payload.listBerkas
            state.user = payload.user
        },    
    },
    actions: {
        'setters/api/login': (context, payload) => {
            context.commit('setters/api/login', payload)
            return      
        },          
    }
}
