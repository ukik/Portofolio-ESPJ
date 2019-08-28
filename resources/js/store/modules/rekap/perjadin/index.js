module.exports = {
    state: {
        "model": {
            data: []
        },
    },
    getters: {
        'getters/perjadin/model': (state) => {
            return state.model
        },
    },
    mutations: {
        'setters/perjadin/model': (state, payload) => {
            state.model = null
            state.model = payload
        }, 
    },
    actions: {
        'setters/perjadin/model': (context, payload) => {
            context.commit('setters/perjadin/model', payload)
            return      
        },                   
    }
}
