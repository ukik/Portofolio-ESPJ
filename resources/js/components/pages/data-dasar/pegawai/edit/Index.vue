<template>
    <div>
        <Toolbar judul="Edit Data Dasar Pegawai" slot="title">
            <RefreshButton @onRefresh="onRefresh()" />              
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

        <div class="row justify-content-center">
          <div class="col-md-12 col-lg-4 mb-5">
            <div class="card h-100">
              <div class="card-header">
                <h2 class="card-title">Data Personal</h2>
              </div>
              <div class="card-body">

              <FormulirInput 
                  slot="input" 
                  type="text"
                  title="NIP" 
                  name="nip" 
                  v-model="get_form.nip" 
                  placeholder="NIP" />

              <FormulirInput 
                  slot="input" 
                  type="text"
                  title="Nama" 
                  name="nama" 
                  v-model="get_form.nama" 
                  placeholder="Nama" />     

              <FormulirInput 
                  slot="input" 
                  type="text"
                  title="Gelar Depan" 
                  name="gelar_depan" 
                  v-model="get_form.gelar_depan" 
                  placeholder="Gelar Depan" />                               

              <FormulirInput 
                  slot="input" 
                  type="text"
                  title="Gelar Belakang" 
                  name="gelar_belakang" 
                  v-model="get_form.gelar_belakang" 
                  placeholder="Gelar Belakang" />                               

              <FormulirInput 
                  slot="input" 
                  type="text"
                  title="Singkatan/Panggilan" 
                  name="singkatan" 
                  v-model="get_form.singkatan" 
                  placeholder="Singkatan/Panggilan" />            

              <FormulirInput 
                  slot="input" 
                  type="text"
                  title="NPWP" 
                  name="npwp" 
                  v-model="get_form.npwp" 
                  placeholder="NPWP" />  


              <FormulirInput 
                  slot="input" 
                  type="email"
                  title="Email" 
                  name="email" 
                  v-model="get_form.email" 
                  placeholder="Email" />  

              <FormulirInput 
                  slot="input" 
                  type="text"
                  title="Whatsapp" 
                  name="whatsapp" 
                  v-model="get_form.whatsapp" 
                  placeholder="Whatsapp" />  

              <FormulirInput 
                  slot="input" 
                  type="text"
                  title="Telpon" 
                  name="telp" 
                  v-model="get_form.telp" 
                  placeholder="Telpon" />  

              <FormulirTextarea 
                  slot="input" 
                  title="Alamat" 
                  name="alamat" 
                  v-model="get_form.alamat" 
                  placeholder="Alamat" />

              </div>
            </div>
          </div>
          <div class="col-md-12 col-lg-4 mb-5">
            <div class="card h-100">
              <div class="card-header">
                <h2 class="card-title">Data Pendukung</h2>
              </div>
              <div class="card-body">

                <FormulirInput 
                    slot="input" 
                    type="text"
                    title="Tempat Lahir" 
                    name="tempat_lahir" 
                    v-model="get_form.tempat_lahir" 
                    placeholder="Tempat Lahir" />  


                <FormulirPicker 
                    @onPicker="onPicker({ key: 'tanggal_lahir', value: $event })"
                    slot="input" 
                    type="date"
                    title="Tanggal Lahir" 
                    name="tanggal_lahir" 
                    v-model="get_form.tanggal_lahir"  
                    placeholder="Tanggal Lahir" />    

                <FormulirDropdown slot="input" title="Jenis Kelamin">
                    <div slot="default" class="input-group">
                        <select v-model="get_form.jenis_kelamin" class="form-control custom-select submit-on-change" name="jenis_kelamin" id="jenis_kelamin">
                            <option value="">- Pilih Jenis Kelamin -</option>
                            <option v-for="(item, index) in ['Laki-laki', 'Perempuan']" 
                                :key="index" 
                                :value="item">
                                {{ item }}</option>
                        </select>
                    </div>
                </FormulirDropdown>     

                <FormulirDropdown slot="input" title="Pegawai">
                    <div slot="default" class="input-group">
                        <select v-model="get_form.jenis" class="form-control custom-select submit-on-change" name="jenis" id="jenis">
                            <option value="">- Pilih Pegawai -</option>
                            <option v-for="(item, index) in ['PNS', 'Honorner', 'Luar Instansi']" 
                                :key="index" 
                                :value="item">
                                {{ item }}</option>
                        </select>
                    </div>
                </FormulirDropdown>     

                <FormulirDropdown slot="input" title="Pendidikan">
                    <div slot="default" class="input-group">
                        <select v-model="get_form.pendidikan" class="form-control custom-select submit-on-change" name="pendidikan" id="pendidikan">
                            <option value="">- Pilih Pendidikan -</option>
                            <option v-for="(item, index) in pendidikan" 
                                :selected="onSearchPendidikan(get_form.pendidikan)"
                                :key="index" 
                                :value="item.keterangan">
                                {{ item.label }} - {{ item.keterangan }}  </option>
                        </select>
                    </div>
                </FormulirDropdown>     

                <FormulirDropdown slot="input" title="Golongan/Eselon">
                    <div slot="default" class="input-group">
                        <select v-model="get_form.golongan" class="form-control custom-select submit-on-change" name="golongan" id="golongan">
                            <option value="">- Pilih Golongan/Eselon -</option>
                            <option v-for="(item, index) in golongan" 
                                :key="index" 
                                :value="item.label">
                                {{ item.label }} - {{ item.keterangan }}  </option>
                        </select>
                    </div>
                </FormulirDropdown>    

                <FormulirInput 
                    slot="input" 
                    type="text"
                    title="Instansi" 
                    name="instansi" 
                    v-model="get_form.instansi"
                    placeholder="Instansi" />

                <FormulirDropdown 
                    slot="input" 
                    title="Bidang">
                      <div slot="default" class="input-group">
                        <select v-model="get_form.bidang_id" name="bidang_id" id="bidang_id" class="form-control selectize submit-on-change">
                          <option value="">- Pilih Bidang -</option>

                          <optgroup v-for="(item, index) in get_listBidang" 
                            :key="index"
                            :label="item.nama">

                              <option :value="get_listBidang[index].id">
                              {{ get_listBidang[index].nama }}</option>}}

                              <option v-for="(item, index) in get_listBidang[index].sub" :key="index+'-'+index" 
                              :value="item.id">
                              {{ item.nama }}</option>

                          </optgroup>
                          
                        </select>
                      </div>
                </FormulirDropdown>

                <FormulirInput 
                    slot="input" 
                    type="text"
                    title="Jabatan" 
                    name="jabatan" 
                    v-model="get_form.jabatan"
                    placeholder="Jabatan" />              

              </div>
            </div>
          </div>
          <div class="col-md-12 col-lg-4 mb-5">
            <div class="card h-100">
              <div class="card-header">
                <h2 class="card-title">Data Standar Biaya</h2>
              </div>
              <div class="card-body">

                <FormulirDropdown slot="input" title="Harian Dalam Wilayah">
                    <div slot="default" class="input-group">
                        <select class="form-control custom-select submit-on-change" name="perjadin_harian_dalam_id" id="perjadin_harian_dalam_id">
                            <option value="">- Pilih Harian Dalam Wilayah -</option>
                            <option v-for="(item, index) in get_listPerjadinHarianDalamWilayah"
                                v-option-select="item.id == undefined_value(get_form.standar, 'perjadin_harian_dalam_id')" 
                                :key="index" 
                                :value="item.id">
                                {{ item.jabatan }}  </option>
                        </select>
                    </div>
                </FormulirDropdown>    

                <FormulirDropdown slot="input" title="Harian Luar Wilayah">
                    <div slot="default" class="input-group">
                        <select class="form-control custom-select submit-on-change" name="perjadin_harian_luar_id" id="perjadin_harian_luar_id">
                            <option value="">- Pilih Harian Luar Wilayah -</option>
                            <option v-for="(item, index) in get_listPerjadinHarianLuarWilayah" 
                                v-option-select="item.id == undefined_value(get_form.standar, 'perjadin_harian_luar_id')"
                                :key="index" 
                                :value="item.id">
                                {{ item.jabatan }}  </option>
                        </select>
                    </div>
                </FormulirDropdown>  

                <FormulirDropdown slot="input" title="Representatif">
                    <div slot="default" class="input-group">
                        <select class="form-control custom-select submit-on-change" name="perjadin_representatif_id" id="perjadin_representatif_id">
                            <option value="">- Pilih Representatif -</option>
                            <option v-for="(item, index) in get_listPerjadinRepresentatif" 
                                v-option-select="item.id == undefined_value(get_form.standar, 'perjadin_representatif_id')"
                                :key="index" 
                                :value="item.id">
                                {{ item.jabatan }}  </option>
                        </select>
                    </div>
                </FormulirDropdown>  

                <FormulirDropdown slot="input" title="Hotel Dalam Wilayah">
                    <div slot="default" class="input-group">
                        <select class="form-control custom-select submit-on-change" name="perjadin_hotel_dalam_id" id="perjadin_hotel_dalam_id">
                            <option value="">- Pilih Hotel Dalam Wilayah -</option>
                            <option v-for="(item, index) in get_listPerjadinHotelDalamWilayah" 
                                v-option-select="item.id == undefined_value(get_form.standar, 'perjadin_hotel_dalam_id')"
                                :key="index" 
                                :value="item.id">
                                {{ item.jabatan }}  </option>
                        </select>
                    </div>
                </FormulirDropdown>  

                <FormulirDropdown slot="input" title="Hotel Luar Wilayah">
                    <div slot="default" class="input-group">
                        <select class="form-control custom-select submit-on-change" name="perjadin_hotel_luar_id" id="perjadin_hotel_luar_id">
                            <option value="">- Pilih Hotel Luar Wilayah -</option>
                            <option v-for="(item, index) in get_listPerjadinHotelLuarWilayah" 
                               v-option-select="item.id == undefined_value(get_form.standar, 'perjadin_hotel_luar_id')"
                                :key="index" 
                                :value="item.id">
                                {{ item.jabatan }}  </option>
                        </select>
                    </div>
                </FormulirDropdown>  

                <div slot="input" class="form-group">
                    <label class="form-label">Honor</label>
                    <div class="input-group">
                        <select 
                            class="form-control selectize" 
                            id="honor_id"
                            name="honor_id">
                            <option value="">- Pilih Honor -</option>
                            <option v-for="(item, index) in get_listHonor" 
                                v-option-select="item.id == undefined_value(get_form.standar, 'honor_id')"
                                :key="index" 
                                :value="item.id">
                                {{ item.golongan }} - {{ item.label }}  </option>
                        </select>
                    </div>
                </div>                    

              </div>
            </div>
          </div>
        </div>

        <FormulirButton @onSubmit="onSubmit()" slot="button" />
        
    </div>
</template>

<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            'get_listBidang': 'getters/data-dasar/pegawai/listBidang',
            'get_listPerjadinHarianDalamWilayah': 'getters/data-dasar/pegawai/listPerjadinHarianDalamWilayah',
            'get_listPerjadinHarianLuarWilayah': 'getters/data-dasar/pegawai/listPerjadinHarianLuarWilayah',
            'get_listPerjadinRepresentatif': 'getters/data-dasar/pegawai/listPerjadinRepresentatif',
            'get_listPerjadinHotelDalamWilayah': 'getters/data-dasar/pegawai/listPerjadinHotelDalamWilayah',
            'get_listPerjadinHotelLuarWilayah': 'getters/data-dasar/pegawai/listPerjadinHotelLuarWilayah',
            'get_listHonor': 'getters/data-dasar/pegawai/listHonor',
            'get_form': 'getters/data-dasar/pegawai/form',
        }),
        onSearchPendidikan(){
            return function (args) {
                for (let index = 0; index < this.pendidikan.length; index++) {
                    if(this.pendidikan[index].keterangan == args) {
                        return this.pendidikan[index].label
                    }
                }
            }
        },
        undefined_value(){
            return function(args, variable) {
                if(args == null || args == undefined) {
                    return ""
                } else {
                    return args[variable]
                }
            }
        }
    },
    methods: {
        ...mapActions({
            'set_list': 'setters/api/data-dasar/pegawai/list',            
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
              axios.get('data-dasar/pegawai/'+id+'/edit').then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }
                                      
                  resolve(this.set_list(response.data.data))
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
        onSubmit(){
          // error handler reset
          this.$root.error.status = false
          this.$root.error.message = ""
          this.$root.request = true // membuka spinner ui

          const id = this.get_form.id
          const tahun = this.get_form.tahun

          const nip = document.getElementById('nip').value
          const nama = document.getElementById('nama').value
          const gelar_depan = document.getElementById('gelar_depan').value
          const gelar_belakang = document.getElementById('gelar_belakang').value
          const singkatan = document.getElementById('singkatan').value
          const npwp = document.getElementById('npwp').value
          const alamat = document.getElementById('alamat').value
          const tempat_lahir = document.getElementById('tempat_lahir').value
          const tanggal_lahir = this.tanggal_lahir
          const jenis_kelamin = document.getElementById('jenis_kelamin').value
          const jenis = document.getElementById('jenis').value
          const pendidikan = document.getElementById('pendidikan').value
          const golongan = document.getElementById('golongan').value
          const instansi = document.getElementById('instansi').value
          const bidang_id = document.getElementById('bidang_id').value
          const jabatan = document.getElementById('jabatan').value
          const standar = {
            perjadin_harian_dalam_id: document.getElementById('perjadin_harian_dalam_id').value,
            perjadin_harian_luar_id: document.getElementById('perjadin_harian_luar_id').value,
            perjadin_representatif_id: document.getElementById('perjadin_representatif_id').value,
            perjadin_hotel_dalam_id: document.getElementById('perjadin_hotel_dalam_id').value,
            perjadin_hotel_luar_id: document.getElementById('perjadin_hotel_luar_id').value,
            honor_id: document.getElementById('honor_id').value,
          }

          const email = document.getElementById('email').value
          const whatsapp = document.getElementById('whatsapp').value
          const telp = document.getElementById('telp').value          

          const payload = { 
            tahun,
            nip, 
            nama, 
            gelar_depan, 
            gelar_belakang, 
            singkatan, 
            npwp, 
            alamat, 
            tempat_lahir, 
            tanggal_lahir, 
            jenis_kelamin, 
            jenis, 
            pendidikan, 
            golongan, 
            instansi, 
            bidang_id, 
            jabatan, 
            standar,
            
            email,
            whatsapp,
            telp,
          }


          const request = new Promise((resolve, reject) => {
              axios.put('data-dasar/pegawai/'+id, payload).then((response) => {
                  resolve(response)
              }).catch((error) => {
                  reject(error);
              })
          })                     
        },     
        onPicker(args){
            this[args.key] = args.value
            console.log(args.value)
        }             
    },  
    mounted() {
      // CORE: untuk mengambil data init pada page ini
      this.onInitData()

    },    
    data(){
        return {
          tanggal_lahir: null,

          golongan: [
            {
              label: 'I/a',
              keterangan: "Juru Muda",
            },
            {
              label: 'I/b',
              keterangan: "Juru Muda Tingkat I",
            },
            {
              label: 'I/c',
              keterangan: "Juru",
            },
            {
              label: 'I/d',
              keterangan: "Juru Tingkat I",
            },
            {
              label: 'II/a',
              keterangan: "Pengatur Muda",
            },
            {
              label: 'II/b',
              keterangan: "Pengatur Muda Tingkat I",
            },
            {
              label: 'II/c',
              keterangan: "Pengatur",
            },
            {
              label: 'II/d',
              keterangan: "Pengatur Tingkat I",
            },
            {
              label: 'III/a',
              keterangan: "Penata Muda",
            },
            {
              label: 'III/b',
              keterangan: "Penata Muda Tingkat I",
            },
            {
              label: 'III/c',
              keterangan: "Penata",
            },
            {
              label: 'III/d',
              keterangan: "Penata Tingkat I",
            },
            {
              label: 'IV/a',
              keterangan: "Pembina",
            },
            {
              label: 'IV/b',
              keterangan: "Pembina Tingkat I",
            },
            {
              label: 'IV/c',
              keterangan: "Pembina Utama Muda",
            },
            {
              label: 'IV/d',
              keterangan: "Pembina Utama Madya",
            },
            {
              label: 'IV/e',
              keterangan: "Pembina Utama",
            },
            {
              label: 'Non PNS',
              keterangan: "Honorer/Kontrak",
            },
          ],
          pendidikan: [
            {
              label: 'SD',
              keterangan: "Sekolah Dasar",
            },
            {
              label: 'SMP',
              keterangan: "Sekolah Menengah Pertama",
            },
            {
              label: 'SMA',
              keterangan: "Sekolah Menegah Atas",
            },
            {
              label: 'D1',
              keterangan: "Diploma I",
            },
            {
              label: 'D2',
              keterangan: "Diploma II",
            },
            {
              label: 'D3',
              keterangan: "Diploma III",
            },
            {
              label: 'D4',
              keterangan: "Diploma IV",
            },
            {
              label: 'S1',
              keterangan: "Strata I",
            },
            {
              label: 'S2',
              keterangan: "Strata II",
            },
            {
              label: 'S3',
              keterangan: "Strata III",
            },
          ]
        }
    }
}


</script>
