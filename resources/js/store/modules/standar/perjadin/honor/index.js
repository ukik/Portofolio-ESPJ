module.exports = {
    state: {
        "honor": {
            "data": [],
        },
        'form': {
            "id": null,
            "golongan": null,
            "nominal": null
        },
    },
    getters: {
        'getters/standar/honor/honor': (state) => {
            return state.honor
        },
        'getters/standar/honor/form': (state) => {
            return state.form
        }        
    },
    mutations: {
        'setters/api/standar/honor/honor': (state, payload) => {
            state.honor = null

            state.honor = payload
        },
        'setters/non-api/standar/honor/form': (state, payload) => {
            state.form.id = payload.id // wajib
            state.form.golongan = payload.golongan
            state.form.nominal = payload.nominal
        }       
    },
    actions: {
        'setters/api/standar/honor/honor': (context, payload) => {
            context.commit('setters/api/standar/honor/honor', payload)
            return      
        },          
        'setters/non-api/standar/honor/form': (context, payload) => {
            var filterObj = context.state.honor.data.filter(function(e) {
                if(e.id === payload.id){
                    context.commit('setters/non-api/standar/honor/form', e)
                    return
                }
            });
        },
        'setters/non-api/standar/honor/splice': (context, payload) => {
            var myArray = context.state.honor.data
            for (let index = 0; index < myArray.length; index++) {
                if(payload.id == myArray[index].id) {
                    myArray.splice(index, 1)
                }
            }
        },              
    }
}
