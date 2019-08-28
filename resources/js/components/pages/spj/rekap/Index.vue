<template>
<div>
    <Toolbar :judul="judul" slot="toolbar">
        <RefreshButton @onRefresh="onRefresh()" />          
        <AddButton route="spj-rekap-create" name="Rincian" class="mr-2" /> 
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

    <TableView :items="get_rekap" :theads="theads">
        <div slot="pre-information">
            <div class="row">
                <div class="col">
                    <div class="card">
                        <div class="table-responsive">                            
                            <table class="table table-hover table-sm table-outline table-vcenter text-nowrap card-table">
                                <tr>
                                    <th width="200">Tanggal</th>
                                    <td width="10">:</td>
                                    <td>{{ get_form.tanggal ? get_form.tanggal : '[Belum diajukan]' }}</td>
                                </tr>
                                <tr>
                                    <th>Nomor Permohonan</th>
                                    <td>:</td>
                                    <td>{{ undefined_checker(get_form.permohonan) }}</td>
                                </tr>
                                <tr>
                                    <th>Kegiatan</th>
                                    <td>:</td>
                                    <td>[{{ get_form.kode_dpa }}] {{ get_form.kegiatan }}</td>
                                </tr>
                                <tr>
                                    <th>Diajukan</th>
                                    <td>:</td>
                                    <td>{{ get_form.nominal_diajukan | rupiah2 }}</td>
                                </tr>
                                <tr>
                                    <th>Disetujui</th>
                                    <td>:</td>
                                    <td>{{ get_form.nominal_disetujui | rupiah2 }}</td>
                                </tr>
                                <tr>
                                    <th>Nominal SPJ</th>
                                    <td>:</td>
                                    <td>{{ get_form.nominal_spj | rupiah2 }}</td>
                                </tr>
                                <tr>
                                    <th>Sisa SPJ</th>
                                    <td>:</td>
                                    <td>{{ get_form.nominal_sisa | rupiah2 }}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <template slot-scope="scope">

            <tr>
              <td class="align-middle text-center">{{ scope.index + 1 }}</td>
              <td class="align-middle text-center">{{ scope.item.kode_dpa }}.{{ scope.item.kode_rekening }}</td>
              <td class="align-middle text-center">{{ scope.item.penerima }}</td>
              <td class="align-middle">{{ scope.item.uraian }}</td>
              <td class="align-middle text-center">{{ scope.item.tanggal }}</td>
              <td class="align-middle text-right">{{ scope.item.nominal | rupiah2 }}</td>

              <td class="text-center">
                <a v-if="user != 'Supervisor'" @click="set_form({ id: scope.item.id }); jump({ name:'spj-rekap-edit' })" class="icon"><i class="fe fe-edit"></i></a>

                <a v-if="user != 'Supervisor'" @click="onDelete({ id: scope.item.id })" class="icon"><i class="fe fe-trash-2 text-danger"></i></a>
              </td>
            </tr>
        </template>

        <tr slot="tfoot" class="bg-gray">
            <th colspan="5" class="text-right text-white">Jumlah</th>
            <th class="text-right text-white">{{ total_nominal | rupiah2 }}</th>
            <th></th>
        </tr>     

    </TableView>
    <p />

</div>
</template>


<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
          'get_rekap': 'getters/spj/rekap',
          'get_form': 'getters/spj/form', // parent
        }),
        items_length() {
            return this.get_rekap == undefined ? 0 : this.get_rekap.length
        },
        total_nominal(){
            var total = 0
            this.get_rekap.forEach(element => {
                total += Number(element.nominal)
            }); 
            return total
        },
        undefined_checker() {
            return function(args) {
                if(args == undefined) {
                    return ""
                } else {
                    return args.nomor_permohonan
                }
            }
        }
    },
    methods: {
        ...mapActions({
            'set_rekap': 'setters/api/spj/rekap',
            'set_form': 'setters/non-api/spj/rekap/form',
            'set_splice': 'setters/non-api/spj/rekap/splice',
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
              axios.get('spj/'+id+'/rekap').then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }
                                      
                  resolve(this.set_rekap(response.data.data.spj.rekap))
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
        onDelete(args){
            this.onDeleteConfirmation({
                url: 'spj/'+this.get_form.id+'/rekap/'+args.id,
                id: args.id,
                bundle: args
            })      
        }          
    },  
    mounted() {
      // CORE: untuk mengambil data init pada page ini
      this.onInitData()

    },
    data() {
        return {
            judul: 'Daftar Rekap Pengeluaran SPJ',
            user: this.$root.level, // 'Super Admin',

            theads: [
                {
                    title: 'No',
                    width: '30',
                },
                {
                    title: 'Kode Rincian',
                    width: '',
                },
                {
                    title: 'Penerima',
                    width: '',
                },
                {
                    title: 'Uraian',
                    width: '',
                },
                {
                    title: 'Tanggal',
                    width: '',
                },
                {
                    title: 'Jumlah',
                    width: '',
                },
                {
                    title: 'Aksi',
                    width: '100',
                },
            ]   
                        
        }
    },

}

</script>
