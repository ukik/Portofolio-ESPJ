module.exports = {
    methods: {
        onAjukanConfirmation(args) {

            const id = args.id
            const url = args.url

            const swalWithBootstrapButtons = this.$swal.mixin({
                confirmButtonClass: 'btn btn-success ml-2',
                cancelButtonClass: 'btn btn-danger',
                buttonsStyling: false,
            })
              
            swalWithBootstrapButtons({
                title: 'Ajukan Data',
                html: `Apa anda yakin untuk mengajukan data <strong>id: ${id}</strong>?`,
                type: 'question',
                showCancelButton: true,
                confirmButtonText: 'Ya, Ajukan',
                cancelButtonText: 'Tidak',
                reverseButtons: true
                }).then((result) => {

                    if (result.value) {

                        this.$swal({
                            title: 'Mohon Tunggu',
                            type: 'info',
                            html: `Data <strong>id: ${id}</strong> sedang diajukan`,
                            allowOutsideClick: false,
                            onBeforeOpen: () => {

                                this.$swal.showLoading()

                                axios.post(url, {}, {
                                    headers: {
                                        'identitas': 'ajukan'
                                    }
                                }).then((response) => {
                                    
                                    this.set_replace(args.bundle)

                                    this.$swal.close()   

                                    if(this.onRefresh() != undefined) {
                                        this.onRefresh()
                                    }

                                    return
                           
                                }).catch((error) => {
                                    this.$swal({
                                        // position: 'top-end',
                                        type: 'error',
                                        title: 'Gagal',
                                        showConfirmButton: false,
                                        allowOutsideClick: false,
                                        timer: 1500
                                    })
                                })

                                return
                                
                            },
                        }).then((result) => {
                            if (
                            // Read more about handling dismissals
                            result.dismiss === this.$swal.DismissReason.timer
                            ) {
                                // console.log('I was closed by the timer')
                            }
                        })
                    } else if (
                        // Read more about handling dismissals
                        result.dismiss === this.$swal.DismissReason.cancel
                    ) {
                        
                    }

            })
        }
    }
}