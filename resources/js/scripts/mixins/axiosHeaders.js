module.exports = {
    data() {
        return {
            axiosHeaders: {
                params  : {
                    signiture: localStorage.getItem('signiture')
                }, 
                headers : {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        }        
    }
}