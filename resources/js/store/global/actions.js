module.exports = {
  actions: {
    'index/data-dasar/bendahara': function () {
      return 123;
    },

    //-----------------------------------------------------------------------------
    /**
     * digunakan untuk mengontrol notifikasi setelah melakukan Edit/Create/Delete 
     */
    //-----------------------------------------------------------------------------
    'setters/non-api/global/callback': (context, payload) => {
      context.commit('setters/non-api/global/callback', payload)
      return
    },
    'setters/non-api/global/callback_reset': (context) => {
        context.commit('setters/non-api/global/callback_reset', false)
        return
    }
    //-----------------------------------------------------------------------------
  }
}
