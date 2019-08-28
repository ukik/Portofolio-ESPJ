<template>
<div>
    <Toolbar :judul="judul" slot="toolbar">
        <RefreshButton @onRefresh="onRefresh()" />   
        <ConfirmButton @onConfirm="onConfirm()" class="mr-2" />
        <CancelButton @onCancel="onCancel()" class="mr-2" />              
        <BackButton />
    </Toolbar>

    <!-- dipanggil jike error -->
    <div v-if="$root.error.status" class="alert alert-icon alert-danger" role="alert">
        <i class="fe fe-info mr-2" aria-hidden="true"></i> {{ $root.error.message }}
    </div>

    <!-- dipanggil saat terjadi request di component ini  -->
    <div v-if="$root.request" class="alert bg-primary alert-success text-center" role="alert">
        <components is="loader-spinner" style="zoom: 0.75;" />
    </div>    

    <TableView :items="undefined_detail(get_spk_rab)" :theads="theads">

        <div slot="pre-information">
            <div class="row">
                <div class="col">
                    <div class="card">
                        <div class="table-responsive">

                            <table class="table table-hover table-sm table-outline table-vcenter text-nowrap card-table">
                                <tr>
                                    <td width="150"><strong>Nomor SPT</strong></td>
                                    <td width="1">:</td>
                                    <td>{{ get_form.nomor_spk }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Uraian</strong></td>
                                    <td>:</td>
                                    <td>{{ get_form.nama_pekerjaan }}</td>
                                </tr>
                            </table>

                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <div class="table-responsive">

                            <table class="table table-hover table-sm table-outline table-vcenter text-nowrap card-table">
                                <tr>
                                    <td width="150"><strong>Nomor SPT</strong></td>
                                    <td width="1">:</td>
                                    <td>{{ get_form.rekanan_alamat }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Uraian</strong></td>
                                    <td>:</td>
                                    <td>{{ get_form.uraian }}</td>
                                </tr>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <template slot-scope="scope">
            <tr>
                <td class="align-middle text-center">{{ scope.index+1 }}</td>
                <td class="align-middle">{{ scope.item.tanggal }}</td>
                <td class="align-middle text-left">{{ scope.item.uraian }}</td>
                <td class="align-middle text-right">{{ scope.item.volume }}</td>
                <td class="align-middle text-right">{{ scope.item.satuan }}</td>
                <td class="align-middle text-right">{{ scope.item.harga | rupiah2 }}</td>
                <td class="align-middle text-right">{{ scope.item.jumlah | rupiah2 }}</td>
            </tr>
        </template>

        <template slot="tfoot">
            <tr class="bg-light">
                <th colspan="6" class="text-right">Subtotal :</th>
                <th class="text-right">{{ undefined_number(get_spk_rab, 'subtotal') | rupiah2}}</th>
            </tr>
            <tr class="bg-light">
                <th colspan="6" class="text-right">PPN :</th>
                <th class="text-right">{{ undefined_number(get_spk_rab, 'ppn') | rupiah2}}</th>
            </tr>
            <tr class="bg-light">
                <th :colspan="6" class="text-right">Total :</th>
                <th class="text-right">{{ undefined_number(get_spk_rab, 'total') | rupiah2}}</th>
            </tr>
        </template>

    </TableView>

</div>
</template>

<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            'get_spk_rab': 'getters/verifikasi/spk/spk_rab',
            'get_form': 'getters/verifikasi/spk/form',
        }),
        undefined_detail(){
            return (args) => {
                if(args == null || args == undefined) {
                    return []
                } else {
                    return args.detail
                }
            }
        },
        undefined_number(){
            return (args, element) => {
                if(args == null || args == undefined) {
                    return 0
                } else {
                    return args[element]
                }
            }
        }        
    },
    methods: {
        ...mapActions({
            'set_spk_rab': 'setters/api/verifikasi/spk/spk_rab',            
        }),    
        // CORE: untuk mengambil data init pada page ini
        onInitData(){
          // error handler reset
          this.$root.error.status = false
          this.$root.error.message = ""
          this.$root.request = true // membuka spinner ui

          const id = this.get_form.id

          // sesuaikan dengan kebutuhan bisnis page ini
          const request = new Promise((resolve, reject) => {
              axios.get('verifikasi/spk/'+id+'/review').then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }

                  resolve(this.set_spk_rab(response.data.data.spk_rab))
              }).catch((error) => {
                  reject(error);
              })
          })
          return request
        },  
        // CORE: untuk refresh data init pada page ini
        onRefresh(){
          // CORE: untuk mengambil data init pada page ini
          this.onInitData()
        },      
        onCancel(){
            // error handler reset
            this.$root.error.status = false
            this.$root.error.message = ""
            this.$root.request = true // membuka spinner ui

            const id = this.get_form.id

            const request = new Promise((resolve, reject) => {
                axios.post('verifikasi/spk/'+id+'/reject').then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error);
                })
            })               
        },
        onConfirm(){
            // error handler reset
            this.$root.error.status = false
            this.$root.error.message = ""
            this.$root.request = true // membuka spinner ui

            const id = this.get_form.id
            
            const request = new Promise((resolve, reject) => {
                axios.post('verifikasi/spk/'+id+'/approve').then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error);
                })
            })               
        },        
        CalculatorRAB(args){
            var data = 0
            args.forEach(element => {
            if(!isNaN(element.volume) && !isNaN(element.harga)) {
                data += element.volume * element.harga
            }            
            })
            return data
        }
    },  
    mounted() {
      // CORE: untuk mengambil data init pada page ini
      this.onInitData()

    },
    watch: {
        'get_spk_rab': function(val){
            // console.log(val)
        }
    },
    data() {
        return {
            judul: 'Data Detail Perjalanan Dinas',
            user: this.$root.level, // 'Super Admin',

            theads: [{
                    title: 'No',
                    width: '30',
                },
                {
                    title: 'Tanggal',
                    width: '',
                },
                {
                    title: 'Uraian',
                    width: '',
                },
                {
                    title: 'Volume',
                    width: '',
                },
                {
                    title: 'Satuan',
                    width: '',
                },
                {
                    title: 'Harga',
                    width: '',
                },
                {
                    title: 'Total',
                    width: '',
                },
            ]
        }
    },
}


</script>
