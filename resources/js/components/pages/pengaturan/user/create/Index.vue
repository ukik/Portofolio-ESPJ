<template>
    <div>
        <Toolbar judul="Create User" slot="title">
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

        <Formulir>

            <FormulirLegend slot="legend" title="Create User" />

            <FormulirInput 
                slot="input" 
                title="Nama" 
                name="nama" 
                value="" 
                placeholder="Nama" />

            <FormulirInput 
                slot="input" 
                title="Username" 
                name="username" 
                value="" 
                placeholder="Username" />


            <FormulirDropdown slot="input" title="Level">
                <div slot="default" class="input-group">
                    <select class="form-control custom-select submit-on-change" name="level" id="level">
                        <option value="">- Pilih Level -</option>
                        <option v-for="(item, index) in level" 
                            :key="index" 
                            :value="item">
                            {{ item }}</option>
                    </select>
                </div>
            </FormulirDropdown>

            <Autocomplete 
                v-if="pageReady" 
                @onSelectedItem="onSelectedItemPegawai" 
                slot="input" 
                :selected="selected_pegawai" 
                :items="items_pegawai" 
                title="Pegawai" >

                <template slot="item" slot-scope="props">
                    {{ props.result.nama }} - {{ props.result.nip }}
                </template>

                <template slot="selection" slot-scope="props">
                    {{ props.result.nama }} - {{ props.result.nip }}
                </template>

            </Autocomplete>     

                <Autocomplete 
                    v-if="pageReady" 
                    @onSelectedItem="onSelectedItemBidang" 
                    slot="input" 
                    :selected="selected_bidang" 
                    :items="items_bidang" 
                    title="Bidang" >

                    <template slot="item" slot-scope="props">
                        <b>{{ props.result.kode_surat }}:</b> {{ props.result.parent_nama }} - {{ props.result.nama }}
                    </template>

                    <template slot="selection" slot-scope="props">
                        <b>{{ props.result.kode_surat }}:</b> {{ props.result.parent_nama }} - {{ props.result.nama }}
                    </template>

                </Autocomplete>


            <FormulirInput 
                slot="input" 
                type="password"
                title="Password Baru" 
                name="password" 
                value="" 
                placeholder="Password Baru" />

            <FormulirInput 
                slot="input" 
                type="password"
                title="Konfirmasi Password" 
                name="password_confirmation" 
                value="" 
                placeholder="Konfirmasi Password" />

            <FormulirButton @onSubmit="onSubmit()" slot="button" />
        </Formulir>
    </div>
</template>


<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            'get_listPegawai': 'getters/pengaturan/user/listPegawai',
            'get_listBidang': 'getters/pengaturan/user/listBidang',            
        }),
    },
    methods: {
        ...mapActions({
            'set_listPegawai': 'setters/api/pengaturan/user/listPegawai',            
        }),    
        // CORE: untuk mengambil data init pada page ini
        onInitData(){
          // error handler reset
          this.$root.error.status = false
          this.$root.error.message = ""
          this.$root.request = true // membuka spinner ui

          // sesuaikan dengan kebutuhan bisnis page ini
          const request = new Promise((resolve, reject) => {
              axios.get('pengaturan/user/create').then((response) => {
                if(response == undefined) {
                    return resolve()
                }

                this.AutocompletePegawai(response.data.data.listPegawai)
                this.AutocompleteBidang(response.data.data.listBidang)                

                  resolve(this.set_listPegawai(response.data.data))
              }).catch((error) => {
                  reject(error);
              })
          })
          return request
        },  
        // CORE: untuk refresh data init pada page ini
        onRefresh(){
            // pegawai
            this.items_pegawai = []
            this.selected_pegawai = null
            this.pegawai_id = ""        

            // bidang
            this.items_bidang = []
            this.selected_bidang = null
            this.bidang_id = ""  
                        
          // CORE: untuk mengambil data init pada page ini
          this.onInitData()
        },      
        onSubmit(){
          // error handler reset
          this.$root.error.status = false
          this.$root.error.message = ""
          this.$root.request = true // membuka spinner ui
          
          const nama = document.getElementById('nama').value
          const username = document.getElementById('username').value
          const level = document.getElementById('level').value
          const bidang_id = this.bidang_id 
          const pegawai_id = this.pegawai_id 
          const password = document.getElementById('password').value
          const password_confirmation = document.getElementById('password_confirmation').value

          const payload = { nama, username, level, bidang_id, pegawai_id, password, password_confirmation }   

          if(password != "") {
            if(password != password_confirmation) {
              this.onWarningSnotify({ 
                message: "Data password dan data konfirmasi harus sama", 
                title: 'Peringatan'
              })    
              this.$root.error.status = true // membuka bootstrap error notification ui
              this.$root.error.message = "Data password dan data konfirmasi harus sama"          
              return
            }
          }

          if(password_confirmation != "") {
            if(password != password_confirmation) {
              this.onWarningSnotify({ 
                message: "Data password dan data konfirmasi harus sama", 
                title: 'Peringatan'
              })    
              this.$root.error.status = true // membuka bootstrap error notification ui
              this.$root.error.message = "Data password dan data konfirmasi harus sama"          
              return
            }
          }

          const request = new Promise((resolve, reject) => {
              axios.post('pengaturan/user', payload).then((response) => {
                  resolve(response)
              }).catch((error) => {
                  reject(error);
              })
          })                     
        },

        AutocompletePegawai(args){
            new Promise((resolve) => {
                args.forEach(element => {
                    var data = element
                    data["search"] = element.nama +" "+ element.nip

                    this.items_pegawai.push(data);
                });   
                resolve()
            }).then(result => { 
                this.pageReady = true
            })
            
        },     
        onSelectedItemPegawai(args){
            this.pegawai_id = args.id
        },          

        AutocompleteBidang(args){
            new Promise((resolve) => {
                args.forEach(element => {
                    element.sub.forEach(element2 => {
                        var data = element2
                        data["parent_nama"] = element.nama
                        data["search"] = element.nama +" "+element2.nama

                        this.items_bidang.push(data);
                    });
                });   
                resolve()
            }).then(result => { 
                this.pageReady = true
            })
            
        },
        onSelectedItemBidang(args){
            this.bidang_id = args.id
        },        
    },  
    mounted() {
      // CORE: untuk mengambil data init pada page ini
      this.onInitData()
    },
    data(){
        return {
            pageReady: false,
            // pegawai
            items_pegawai: [],
            selected_pegawai: null,
            pegawai_id: "",        

            // bidang
            items_bidang: [],
            selected_bidang: null,
            bidang_id: "",  

            level: [
                'Super Admin',
                'Penghubung',
                'Supervisor',
                'Verifikator'
            ]
        }
    }    
};


</script>

