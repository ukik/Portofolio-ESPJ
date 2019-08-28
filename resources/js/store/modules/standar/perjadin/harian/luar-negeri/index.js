module.exports = {
    state: {
        "listLokasi": {
            "data": []
        },
        "harian": [],
        "nominal": {},
        
        "edit": {
            "listLokasi": [],
        },

        'form': {
            "id": null, // wajib
            "jabatan": null,
            "nominal": {},
        },
    },
    getters: {
        'getters/standar/harian/luar/listLokasi': (state) => {
            return state.listLokasi
        },
        'getters/standar/harian/luar/harian': (state) => {
            return state.harian.sort((a, b) => parseFloat(a.id) - parseFloat(b.id))
        },
        'getters/standar/harian/luar/edit/listLokasi': (state) => {
            return state.edit.listLokasi
        },
        'getters/standar/harian/luar/nominal': (state) => {
            return state.nominal
        },

        'getters/standar/harian/luar/form': (state) => {
            return state.form
        }        
    },
    mutations: {
        'setters/api/standar/harian/luar': (state, payload) => {
            state.listLokasi = null
            state.harian = null
            state.nominal = null

            state.listLokasi = payload.listLokasi
            state.harian = payload.harian
            // state.nomor = payload.nomor
            state.nominal = payload.nominal
        },

        'setters/api/standar/harian/luar/edit': (state, payload) => {
            state.edit.listLokasi = null

            state.edit.listLokasi = payload.listLokasi
        },

        'setters/non-api/standar/harian/luar/form': (state, payload) => {
            state.form.id = payload.id
            state.form.jabatan = payload.jabatan
            state.form.nominal = payload.nominal
        }       
    },
    actions: {
        'setters/api/standar/harian/luar': (context, payload) => {
            context.commit('setters/api/standar/harian/luar', payload)
            return      
        },          
        'setters/api/standar/harian/luar/edit': (context, payload) => {
            context.commit('setters/api/standar/harian/luar/edit', payload)
            return      
        },          
        'setters/non-api/standar/harian/luar/form': (context, payload) => {
            const nominal = context.state.nominal
            for (const key in nominal) {
                if (nominal.hasOwnProperty(key)) {
                    if(payload.id == key) {
                        context.commit('setters/non-api/standar/harian/luar/form', {
                            'id': payload.id,
                            'nominal': nominal[key],
                            'jabatan': payload.jabatan,
                        })
                    }
                }
            }
        },
        'setters/non-api/standar/harian/luar/splice': (context, payload) => {
            var myArray = context.state.harian
            for (let index = 0; index < myArray.length; index++) {
                if(payload.id == myArray[index].id) {
                    myArray.splice(index, 1)
                }
            }

            var myObject = context.state.nominal
            for (const key in myObject) {
                if (myObject.hasOwnProperty(key)) {
                    if(payload.id == key) {
                        delete myObject[key];
                    }
                }
            }       
        },        
    }
}
