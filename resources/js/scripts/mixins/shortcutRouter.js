module.exports = {
  methods: {
    jump(args) {
      if (this.$router) {
        // console.log(args)
        this.$router.push(args)
      }
    }
  }
}
