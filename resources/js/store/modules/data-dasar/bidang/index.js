module.exports = {
    state: {
        "bidang": [],
        'form': {
            "id": null, // wajib ada
            "nama": null,
            "singkatan": null,
            "kode_surat": null,
        },
        'create': {
            "induk": null,
            "nama": null,
        }
    },
    getters: {
        'getters/data-dasar/bidang/bidang': (state) => {
            return state.bidang
        },
        'getters/data-dasar/bidang/form': (state) => {
            return state.form
        },        
        'getters/data-dasar/bidang/create': (state) => {
            return state.create
        }        
    },
    mutations: {
        'setters/api/data-dasar/bidang/bidang': (state, payload) => {
            state.bidang = null
            state.bidang = payload
        },
        'setters/non-api/data-dasar/bidang/form': (state, payload) => {
            state.form.id = payload.id
            state.form.nama = payload.nama
            state.form.singkatan = payload.singkatan
            state.form.kode_surat = payload.kode_surat
        },       
        'setters/non-api/data-dasar/bidang/create': (state, payload) => {
            state.create.induk = payload.induk
            state.create.nama = payload.nama
        }          
    },
    actions: {
        'setters/api/data-dasar/bidang/bidang': (context, payload) => {
            context.commit('setters/api/data-dasar/bidang/bidang', payload)
            return      
        },          
        'setters/non-api/data-dasar/bidang/form': (context, payload) => {
            var filterObj = context.state.bidang.filter(function(e) {
                if(payload.child_id != undefined) {
                    e.sub.filter(function(f) {
                        if(f.id === payload.child_id){
                            context.commit('setters/non-api/data-dasar/bidang/create', payload)
                            context.commit('setters/non-api/data-dasar/bidang/form', f)
                            return
                        }
                    })
                } else {               
                    if(e.id === payload.id){
                        context.commit('setters/non-api/data-dasar/bidang/form', e)
                    }
                }
            });
        },
        'setters/non-api/data-dasar/bidang/create': (context, payload) => {
            context.commit('setters/non-api/data-dasar/bidang/create', payload)
            return
        },
        'setters/non-api/data-dasar/bidang/splice': (context, payload) => {
            var myArray = context.state.bidang
            for (let index = 0; index < myArray.length; index++) {

                if(payload.child_id != undefined) {

                    myArray[index].sub.forEach((element, i) => {
                        if(element.id === payload.child_id){
                            myArray[index].sub.splice(i, 1)
                            return
                        }
                    });

                } else {               

                    if(payload.id == myArray[index].id) {
                        myArray.splice(index, 1)
                    }

                }   
            }
        },                
    }
}
