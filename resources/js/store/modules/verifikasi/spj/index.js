module.exports = {
    state: {
        "spj": {
            "data": [],
        },
        'form': {}
    },
    getters: {
        'getters/verifikasi/spj/spj': (state) => {
            return state.spj
        },
        'getters/verifikasi/spj/form': (state) => {
            return state.form
        },
    },
    mutations: {
        'setters/api/verifikasi/spj/spj': (state, payload) => {
            state.spj = null
            state.spj = payload
        },
        'setters/non-api/verifikasi/spj/form': (state, payload) => {
            state.form = payload
        }, 
    },
    actions: {
        'setters/api/verifikasi/spj/spj': (context, payload) => {
            context.commit('setters/api/verifikasi/spj/spj', payload)
            return      
        },          
        'setters/non-api/verifikasi/spj/form': (context, payload) => {
            var filterObj = context.state.spj.data.filter(function(e) {
                if(e.id === payload.id){
                    context.commit('setters/non-api/verifikasi/spj/form', e)
                    return
                }
            });
        },
        'setters/non-api/verifikasi/spj/splice': (context, payload) => {
            var myArray = context.state.spj.data
            for (let index = 0; index < myArray.length; index++) {
                if(payload.id == myArray[index].id) {
                    myArray.splice(index, 1)
                }
            }
        },            
    }
}
