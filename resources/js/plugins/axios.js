import Vue from 'vue'

import axios from 'axios'

const Axios = {
    install: function(Vue) {
      Object.defineProperty(Vue.prototype, '$axios', { value: axios });
    }
}

Vue.use(Axios)
