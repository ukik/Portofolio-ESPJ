module.exports = {
    state: {
        "model": {
            data: []
        },
    },
    getters: {
        'getters/honor/model': (state) => {
            return state.model
        },
    },
    mutations: {
        'setters/honor/model': (state, payload) => {
            state.model = null
            state.model = payload
        }, 
    },
    actions: {
        'setters/honor/model': (context, payload) => {
            context.commit('setters/honor/model', payload)
            return      
        },                   
    }
}
