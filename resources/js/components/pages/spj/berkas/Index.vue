<template>
<div>
    <Toolbar :judul="judul" slot="toolbar">
        <RefreshButton @onRefresh="onRefresh()" />          
        <UploadButton route="spj-berkas-create" name="Berkas" class="mr-2" />
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

    <TableView :items="get_berkas" :theads="theads">

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
              <td class="align-middle text-center">{{ scope.item.nama }}</td>
              <td class="align-middle text-center"><span class="tag tag-primary">{{ scope.item.jenis }}</span></td>
              <td class="align-middle text-center">{{ scope.item.deskripsi }}</td>
              <td class="text-center">
                <a :href="'/'+scope.item.path" target="_blank" rel="noopener noreferrer" data-lightbox class="icon"><i class="fe fe-search"></i></a>

                <a :href="'api/spj/'+get_form.id+'/berkas/'+scope.item.id+'/'+scope.item.nama+'/download'" class="icon"><i class="fe fe-download"></i></a>
                
                <a v-if="user != 'Supervisor'" @click="onDelete({ id: scope.item.id })" class="icon"><i class="fe fe-trash-2 text-danger"></i></a>
              </td>
            </tr>

        </template>

    </TableView>

    <p />

</div>
</template>

<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
          'get_berkas': 'getters/spj/berkas',
          'get_form': 'getters/spj/form',
        }),
        items_length() {
            return this.get_berkas.berkas == undefined ? 0 : this.get_berkas.berkas.length
        },
        total_nominal(){
            var total = 0
            this.get_berkas.berkas.forEach(element => {
                total += element.nominal
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
            'set_berkas': 'setters/api/spj/berkas',
            'set_splice': 'setters/non-api/spj/berkas/splice',
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
              axios.get('spj/'+id+'/berkas').then((response) => {
                if(response == undefined) {
                    return resolve()
                }

                  resolve(this.set_berkas(response.data.data.spj.berkas))
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
                url: 'spj/'+this.get_form.id+'/berkas/'+args.id,
                id: args.id,
                bundle: args
            })      
        }, 
        download(args){
            return window.location.href = 'api/spj/'+this.get_form.id+'/berkas/'+args.id+'/'+args.nama+'/download';
        }
    },  
    mounted() {
      // CORE: untuk mengambil data init pada page ini
      this.onInitData()

    },
  data() {
    return {
            judul: 'Daftar Berkas SPJ',
            user: this.$root.level, // 'Super Admin',

            theads: [
                {
                    title: 'No',
                    width: '30',
                },
                {
                    title: 'Nama Berkas',
                    width: '',
                },
                {
                    title: 'Jenis Berkas',
                    width: '',
                },
                {
                    title: 'Deskripsi',
                    width: '',
                },
                {
                    title: 'Aksi',
                    width: '100',
                },
            ]    
    };
  },
};

</script>
