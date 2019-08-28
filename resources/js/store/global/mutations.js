module.exports = {
  mutations: {
    //-----------------------------------------------------------------------------
    /**
     * digunakan untuk mengontrol notifikasi setelah melakukan Edit/Create/Delete 
     */
    //-----------------------------------------------------------------------------
    'setters/non-api/global/callback': (state, payload) => {
      state.callback.callback_status = payload.status
      state.callback.callback_message = payload.message
    },

    'setters/non-api/global/callback_reset': (state, payload) => {
        state.callback.callback_status = payload
    }
    //-----------------------------------------------------------------------------
}
}
