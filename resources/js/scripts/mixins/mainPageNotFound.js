module.exports = {
  methods: {
    onSwitchPage(args) {
      if (args.name == "404") {

        this.$root.component = "NotFound"
        
      } else if (args.name == "Login") { 

        this.$root.component = "Login"

      } else {

        this.$root.component = "Layout"

      }
    }
  },
  mounted() {
    this.$nextTick(function () {
      if (this.$route.name == "not-found") {
        this.$root.component = "NotFound"
      }
    })
  }
}
