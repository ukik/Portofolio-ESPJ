module.exports = {
    state: {
        "user": {
            "data": [],
        },
        "listPegawai": [],
        "listBidang": [], // index/edit/create
        'form': {
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
        'getters/pengaturan/user/user': (state) => {
            return state.user
        },
        'getters/pengaturan/user/listPegawai': (state) => {
            return state.listPegawai
        },
        'getters/pengaturan/user/listBidang': (state) => {
            return state.listBidang
        },        
        'getters/pengaturan/user/form': (state) => {
            return state.form
        }        
    },
    mutations: {
        'setters/api/pengaturan/user/user': (state, payload) => {
            state.user = null

            state.user = payload
        },
        'setters/api/pengaturan/user/listPegawai': (state, payload) => {
            state.listPegawai = null
            state.listBidang = null

            state.listPegawai = payload.listPegawai
            state.listBidang = payload.listBidang
        }, 
        'setters/non-api/pengaturan/user/form': (state, payload) => {
            state.form.id = payload.id // wajib
            state.form.nama = payload.nama
            state.form.username = payload.username
            state.form.level = payload.level
            state.form.pegawai_id = payload.pegawai_id
            state.form.password_lama = payload.password_lama
            state.form.password = payload.password
            state.form.password_confirmation = payload.password_confirmation
            state.form.bidang_id = payload.bidang_id
        }       
    },
    actions: {
        'setters/api/pengaturan/user/user': (context, payload) => {
            context.commit('setters/api/pengaturan/user/user', payload)
            return      
        },          
        'setters/api/pengaturan/user/listPegawai': (context, payload) => {
            context.commit('setters/api/pengaturan/user/listPegawai', payload)
            return      
        },          
        'setters/non-api/pengaturan/user/form': (context, payload) => {
            var filterObj = context.state.user.data.filter(function(e) {
                if(e.id === payload.id){
                    context.commit('setters/non-api/pengaturan/user/form', e)
                    return
                }
            });
        },
        'setters/non-api/pengaturan/user/splice': (context, payload) => {
            var myArray = context.state.user.data
            for (let index = 0; index < myArray.length; index++) {
                if(payload.id == myArray[index].id) {
                    myArray.splice(index, 1)
                }
            }
        },        
    }
}
