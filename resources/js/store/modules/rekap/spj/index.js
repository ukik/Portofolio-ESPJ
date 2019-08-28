module.exports = {
    state: {
        "model": {
            data: []
        },
    },
    getters: {
        'getters/spj/model': (state) => {
            return state.model
        },
    },
    mutations: {
        'setters/spj/model': (state, payload) => {
            state.model = null
            state.model = payload
        }, 
    },
    actions: {
        'setters/spj/model': (context, payload) => {
            context.commit('setters/spj/model', payload)
            return      
        },                   
    }
}
