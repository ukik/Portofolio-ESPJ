module.exports = {
  getters: {
    onAuth(state) {
      return state.auth
    },

    //-----------------------------------------------------------------------------
    /**
     * digunakan untuk mengontrol notifikasi setelah melakukan Edit/Create/Delete 
     */
    //-----------------------------------------------------------------------------
    'getters/global/callback_status': (state) => {
      return state.callback.callback_status
    },
    'getters/global/callback_message': (state) => {
        return state.callback.callback_message
      }
    }
    //-----------------------------------------------------------------------------
}
