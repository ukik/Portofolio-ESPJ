module.exports = {
    state: {
        "listLokasi": {
            "data": []
        }, 
        "hotel": [], 
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
        'getters/standar/hotel/luar/listLokasi': (state) => {
            return state.listLokasi
        },
        'getters/standar/hotel/luar/hotel': (state) => {
            return state.hotel.sort((a, b) => parseFloat(a.id) - parseFloat(b.id))
        },
        'getters/standar/hotel/luar/edit/listLokasi': (state) => {
            return state.edit.listLokasi
        },
        'getters/standar/hotel/luar/nominal': (state) => {
            return state.nominal
        },

        'getters/standar/hotel/luar/form': (state) => {
            return state.form
        }        
    },
    mutations: {
        'setters/api/standar/hotel/luar': (state, payload) => {
            state.listLokasi = null
            state.hotel = null
            state.nominal = null

            state.listLokasi = payload.listLokasi
            state.hotel = payload.hotel
            state.nominal = payload.nominal
        },
        'setters/api/standar/hotel/luar/edit': (state, payload) => {
            state.edit.listLokasi = null
            state.edit.listLokasi = payload.listLokasi
        },

        'setters/non-api/standar/hotel/luar/form': (state, payload) => {
            state.form.id = payload.id
            state.form.jabatan = payload.jabatan
            state.form.nominal = payload.nominal
        }       
    },
    actions: {
        'setters/api/standar/hotel/luar': (context, payload) => {
            context.commit('setters/api/standar/hotel/luar', payload)
            return      
        },          
        'setters/api/standar/hotel/luar/edit': (context, payload) => {
            context.commit('setters/api/standar/hotel/luar/edit', payload)
            return      
        },  
        'setters/non-api/standar/hotel/luar/form': (context, payload) => {
            const nominal = context.state.nominal

            for (const key in nominal) {
                if (nominal.hasOwnProperty(key)) {
                    if(payload.id == key) {
                        context.commit('setters/non-api/standar/hotel/luar/form', {
                            'id': payload.id,
                            'nominal': nominal[key],
                            'jabatan': payload.jabatan,
                        })
                    }
                }
            }
        },              
        'setters/non-api/standar/hotel/luar/splice': (context, payload) => {

            var myArray = context.state.hotel
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
