module.exports = {
    methods: {
        onOpenDocument(args){
            const protocol = window.location.protocol
            const hostname = window.location.hostname
            var port = window.location.port == null ? '' : ':'+window.location.port

            var url = this.$root.domain+"/"+args.url            

            if(url.includes('?')) {
                url += '&signiture='+this.$root.signiture+'&token='+this.$root.token
            } else {
                url += '?signiture='+this.$root.signiture+'&token='+this.$root.token
            }

            this.$swal({
                html: `
                    <style> 
                        .swal2-modal.swal2-show { 
                            width: 100% !important; 
                            height: 95% !important; 
                            margin-top: 20px !important;
                        } 
                        
                        .swal2-popup .swal2-styled.swal2-cancel {
                            border: 0;
                            border-radius: .25em;
                            background: initial;
                            background-color: red;
                            color: #fff;
                            font-size: 1.0625em;
                            position: absolute;
                            top: 10px;
                            left: 10px;
                        }

                        iframe {
                            position: absolute;
                            background: white;
                            border: none;
                            top: 0; right: 0;
                            bottom: 0; left: 0;
                            width: 100%;
                            height: 100%;
                        }                
                    </style>

                    <iframe src="${url}" frameborder="0" ></iframe>
                    
                `,
                showConfirmButton: false,
                allowOutsideClick: false,
                showCancelButton: true,
                cancelButtonText: 'X',
            })
        }
    }
}