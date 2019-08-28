const {  mapGetters, mapActions } = require('vuex');

//-----------------------------------------------------------------------------
/**
 * digunakan untuk mengontrol notifikasi setelah melakukan Edit/Create/Delete 
 */
//-----------------------------------------------------------------------------
module.exports = {
    computed: {
        ...mapGetters({
            'get_callback_status': 'getters/global/callback_status',            
            'get_callback_message': 'getters/global/callback_message',            
        }),
    },
    methods: {
        ...mapActions({
            'set_callback': 'setters/non-api/global/callback',            
            'set_callback_reset': 'setters/non-api/global/callback_reset',            
        }),
    },
}
