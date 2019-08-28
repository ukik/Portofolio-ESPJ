module.exports = {
  // router ACL & redirect
  watch: {
    '$route': function (val) {
      this.onRouterRoleAccess(val)
    }
  },
  methods: {
    onRouterRoleAccess(val) {
      // jika route bukan 'login'
      if (val.name != 'login') {
        // jika belum login maka harus login
        if (!this.$root.auth && this.$root.auth != null) {
          this.jump({
            name: 'login'
          })
          return
        }
        // jika punya ACL di route akan di check sesuai ACL
        if (val.meta.acl != undefined) {
          var available = false
          val.meta.acl.forEach(element => {
            if (this.$root.level == element) {
              available = true
            }
            // console.log(element)
          });
          // jika ACL tidak ditemukan maka 404
          // console.log('available ', val.name)
          if (!available) {
            this.jump({
              name: '404'
            })
            return
          }
        }
      }
    }
  },
  mounted() {
    const val = this.$route
    this.onRouterRoleAccess(val)
  }

}
