module.exports = {
    state: {
        // index
        "hotel": {
            "data": [],
        },
        'form': {
            "id": null,
            "jabatan": null,
            "nominal": 0,
        },
    },
    getters: {
        'getters/standar/hotel/dalam': (state) => {
            return state.hotel
        },
        'getters/standar/hotel/dalam/form': (state) => {
            return state.form
        }        
    },
    mutations: {
        'setters/api/standar/hotel/dalam': (state, payload) => {
            state.hotel = null
            state.hotel = payload
        },
        'setters/non-api/standar/hotel/dalam/form': (state, payload) => {
            state.form.id = payload.id // wajib
            state.form.jabatan = payload.jabatan
            state.form.nominal = payload.nominal
        }       
    },
    actions: {
        'setters/api/standar/hotel/dalam': (context, payload) => {
            context.commit('setters/api/standar/hotel/dalam', payload)
            return      
        },          
        'setters/non-api/standar/hotel/dalam/form': (context, payload) => {
            var filterObj = context.state.hotel.data.filter(function(e) {
                if(e.id === payload.id){
                    context.commit('setters/non-api/standar/hotel/dalam/form', e)
                    return
                }
            });
        },
        'setters/non-api/standar/hotel/dalam/splice': (context, payload) => {
            var myArray = context.state.hotel.data
            for (let index = 0; index < myArray.length; index++) {
                if(payload.id == myArray[index].id) {
                    myArray.splice(index, 1)
                }
            }
        },          
    }
}
