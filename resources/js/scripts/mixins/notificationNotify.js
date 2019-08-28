module.exports = {
  methods: {
    onNotify() {
      this.$notify({
        // (optional)
        // Name of the notification holder
        group: 'foo',

        // (optional)
        // Class that will be assigned to the notification
        // success, warn, error
        type: 'warn',

        // (optional)
        // Title (will be wrapped in div.notification-title)
        title: 'Perhatian',

        // Content (will be wrapped in div.notification-content)
        text: `<b>Terjadi kesalahan, koneksi terputus</b>`,

        // (optional)
        // Overrides default/provided duration
        duration: 10000,

        // (optional)
        // Overrides default/provided animation speed
        speed: 1000

        // (optional)
        // Data object that can be used in your template
        // data: {}
      })
    }
  }
}
