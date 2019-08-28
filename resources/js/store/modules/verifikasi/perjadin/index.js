module.exports = {
    state: {
        "perjadin": {
            "data": [],
        },
        "perjadin_detail": [],
        'form': {}
    },
    getters: {
        'getters/verifikasi/perjadin/perjadin': (state) => {
            return state.perjadin
        },
        'getters/verifikasi/perjadin/perjadin_detail': (state) => {
            return state.perjadin_detail
        },
        'getters/verifikasi/perjadin/form': (state) => {
            return state.form
        },
    },
    mutations: {
        'setters/api/verifikasi/perjadin/perjadin': (state, payload) => {
            state.perjadin = null
            state.perjadin = payload
        },
        'setters/api/verifikasi/perjadin/perjadin_detail': (state, payload) => {
            state.perjadin_detail = null
            state.perjadin_detail = payload
        },
        'setters/non-api/verifikasi/perjadin/form': (state, payload) => {
            state.form = payload
        }, 
    },
    actions: {
        'setters/api/verifikasi/perjadin/perjadin': (context, payload) => {
            context.commit('setters/api/verifikasi/perjadin/perjadin', payload)
            return      
        },          
        'setters/api/verifikasi/perjadin/perjadin_detail': (context, payload) => {
            context.commit('setters/api/verifikasi/perjadin/perjadin_detail', payload)
            return      
        },          
        'setters/non-api/verifikasi/perjadin/form': (context, payload) => {
            var filterObj = context.state.perjadin.data.filter(function(e) {
                if(e.id === payload.id){
                    context.commit('setters/non-api/verifikasi/perjadin/form', e)
                    return
                }
            });
        },
        'setters/non-api/verifikasi/perjadin/splice': (context, payload) => {
            var myArray = context.state.perjadin.data
            for (let index = 0; index < myArray.length; index++) {
                if(payload.id == myArray[index].id) {
                    myArray.splice(index, 1)
                }
            }
        },        
    }
}
