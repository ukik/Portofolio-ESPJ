// render akan dilakukan seperti biasa kecuali
// jika render gagal maka akan fallback ke 404
// render gagal berlaku saat offline / online

var cooldown = 3 // represent of twice rendering each proccess
var firstRender = false
var secondRender = false

var waiting

function StopRenderWaiting() {
    clearTimeout(waiting)
}

module.exports = function renderElement (label, component) {
    return {
        name: `${label}-view`,
        render (createElement) {
            // console.log(this.$route.name, label)
            const element = createElement(component)

            if(cooldown >= 3) {
                cooldown -= 1
                // one time fallback render failed
                // dipakai untuk monitoring fallback 1x render

                waiting = setTimeout(() => {
                    // console.log(firstRender, secondRender)
                    if(firstRender && !secondRender) {

                        if(this.$route.name == label) {

                            // --------------------------------------------------------
                            // optional parameters
                            this.onWarningSnotify({ message: "Halaman ini belum pernah diakses secara online, sehingga tidak tersedia saat offline", title: 'Peringatan'})                  
                            this.$root.error.status = true // membuka bootstrap error notification ui
                            this.$root.error.message = "Halaman ini belum pernah diakses secara online, sehingga tidak tersedia saat offline"                               
                            this.$root.offline = true
                            // --------------------------------------------------------

                            if(this.$root.offline) {
                                // optional parameters
                                this.$swal({
                                    title: 'Mohon Tunggu',
                                    html: 'Maaf sedang ada proses singkronisasi component oleh sistem. Jika component tidak muncul dalam beberapa saat, disarankan untuk melakukan "Penyegaran Halaman".\n Terimakasih',
                                    type: 'warning',
                                    showCancelButton: true,
                                    cancelButtonText: 'Tutup',
                                    confirmButtonText: 'Segarkan Halaman',
                                    showCloseButton: false,
                                    allowOutsideClick: false,
                                    }).then((result) => {
                                    // console.log(result)
                                    if(result.value) {
                                        this.$root.offline = false
                                        location.reload();
                                        return
                                    } else {
                                        this.$root.offline = false
                                        return
                                    }
                                })   
                            }                          
                        }   

                        cooldown = 3
                        firstRender = false
                        secondRender = false     

                    }
                }, 1500);
            }

            if(cooldown <= 2) {
                if(element.data == undefined) {
                    firstRender = true
                    secondRender = false
                } else {
                    firstRender = true
                    secondRender = true
                }
                cooldown -= 1
            }

            if(cooldown <= 0){

                // dipakai untuk monitoring 2x render fallback
                if(!secondRender && element.data != undefined) {
                    // alert('No Page 2 Render')
                    StopRenderWaiting()

                    // --------------------------------------------------------
                    // optional parameters
                    this.onWarningSnotify({ message: "Halaman ini belum pernah diakses secara online, sehingga tidak tersedia saat offline", title: 'Peringatan'})                  
                    this.$root.error.status = true // membuka bootstrap error notification ui
                    this.$root.error.message = "Halaman ini belum pernah diakses secara online, sehingga tidak tersedia saat offline"        
                    this.$root.offline = true
                    // --------------------------------------------------------
                
                    if(this.$root.offline) {
                        // optional parameters
                        this.$swal({
                            title: 'Mohon Tunggu',
                            html: 'Maaf sedang ada proses singkronisasi component oleh sistem. Jika component tidak muncul dalam beberapa saat, disarankan untuk melakukan "Penyegaran Halaman".\n Terimakasih',
                            type: 'warning',
                            showCancelButton: true,
                            cancelButtonText: 'Tutup',
                            confirmButtonText: 'Segarkan Halaman',
                            showCloseButton: false,
                            allowOutsideClick: false,
                            }).then((result) => {
                            // console.log(result)
                            if(result.value) {
                                this.$root.offline = false
                                location.reload();
                                return
                            } else {
                                this.$root.offline = false
                                return
                            }
                        })   
                    }                   
                }

                cooldown = 3
                firstRender = false
                secondRender = false
            }

            return element
        }
    }
}
