module.exports = {
    state: {
        "honor": {
            "data": [],
        },
        "honor_detail": [],
        'form': {}
    },
    getters: {
        'getters/verifikasi/honor/honor': (state) => {
            return state.honor
        },
        'getters/verifikasi/honor/honor_detail': (state) => {
            return state.honor_detail
        },
        'getters/verifikasi/honor/form': (state) => {
            return state.form
        },
    },
    mutations: {
        'setters/api/verifikasi/honor/honor': (state, payload) => {
            state.honor = null
            state.honor = payload
        },
        'setters/api/verifikasi/honor/honor_detail': (state, payload) => {
            state.honor_detail = null
            state.honor_detail = payload
        },
        'setters/non-api/verifikasi/honor/form': (state, payload) => {
            state.form = payload
        }, 
    },
    actions: {
        'setters/api/verifikasi/honor/honor': (context, payload) => {
            context.commit('setters/api/verifikasi/honor/honor', payload)
            return      
        },          
        'setters/api/verifikasi/honor/honor_detail': (context, payload) => {
            context.commit('setters/api/verifikasi/honor/honor_detail', payload)
            return      
        },          
        'setters/non-api/verifikasi/honor/form': (context, payload) => {
            var filterObj = context.state.honor.data.filter(function(e) {
                if(e.id === payload.id){
                    context.commit('setters/non-api/verifikasi/honor/form', e)
                    return
                }
            });
        },
        'setters/non-api/verifikasi/honor/splice': (context, payload) => {
            var myArray = context.state.honor.data
            for (let index = 0; index < myArray.length; index++) {
                if(payload.id == myArray[index].id) {
                    myArray.splice(index, 1)
                }
            }
        },            
    }
}
