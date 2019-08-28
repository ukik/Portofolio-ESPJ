module.exports = {
    state: {
        "tahun": {
            "data": [],
        },
    },
    getters: {
        'getters/pengaturan/tahun': (state) => {
            return state.tahun
        },
    },
    mutations: {
        'setters/api/pengaturan/tahun': (state, payload) => {
            state.tahun = null
            state.tahun = payload
        },
    },
    actions: {
        'setters/api/pengaturan/tahun': (context, payload) => {
            context.commit('setters/api/pengaturan/tahun', payload)
            return      
        },       
        'setters/non-api/pengaturan/tahun/splice': (context, payload) => {
            var myArray = context.state.tahun.data
            for (let index = 0; index < myArray.length; index++) {
                if(payload.id == myArray[index].id) {
                    myArray.splice(index, 1)
                }
            }
        },             
    }
}
