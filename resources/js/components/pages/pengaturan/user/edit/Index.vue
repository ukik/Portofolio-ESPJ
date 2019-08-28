<template>
    <div>
        <Toolbar judul="Edit User" slot="title">
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

            <FormulirLegend slot="legend" title="Edit User" />

            <FormulirInput 
                slot="input" 
                title="Nama" 
                name="nama" 
                v-model="get_form.nama" 
                placeholder="Nama" />

            <FormulirInput 
                slot="input" 
                title="Username" 
                name="username" 
                v-model="get_form.username"
                placeholder="Username" />

            <FormulirDropdown slot="input" title="Level">
                <div slot="default" class="input-group">
                    <select v-model="get_form.level" class="form-control custom-select submit-on-change" name="level" id="level">
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
            

            <!-- Berlaku pada Edit page -->
            <FormulirInput 
                slot="input" 
                title="Password Lama" 
                name="password_lama" 
                type="password"
                value=""
                placeholder="Password Lama" />

            <FormulirInput 
                slot="input" 
                title="Password Baru" 
                name="password" 
                type="password"
                value=""
                placeholder="Password Baru" />

            <FormulirInput 
                slot="input" 
                title="Konfirmasi Password" 
                name="password_confirmation" 
                type="password"
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
            'get_form': 'getters/pengaturan/user/form',
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

          const id = this.get_form.id

          // sesuaikan dengan kebutuhan bisnis page ini
          const request = new Promise((resolve, reject) => {
              axios.get('pengaturan/user/'+id+'/edit').then((response) => {
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

          const id = this.get_form.id
          
          const nama = document.getElementById('nama').value
          const username = document.getElementById('username').value
          const level = document.getElementById('level').value
          const pegawai_id = this.pegawai_id 
          const bidang_id = this.bidang_id 
          const password_lama = document.getElementById('password_lama').value
          const password = document.getElementById('password').value
          const password_confirmation = document.getElementById('password_confirmation').value

          const payload = { id, nama, username, level, bidang_id, pegawai_id, password_lama, password, password_confirmation }   

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

            if(password_lama == ""){
              this.onWarningSnotify({ 
                message: "Jika ingin memberpaharui password, wajib mengisi password lama", 
                title: 'Peringatan'
              });
              this.$root.error.status = true // membuka bootstrap error notification ui
              this.$root.error.message = "Jika ingin memberpaharui password, wajib mengisi password lama"
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

            if(password_lama == ""){
              this.onWarningSnotify({ 
                message: "Jika ingin memberpaharui password, wajib mengisi password lama", 
                title: 'Peringatan'
              });
              this.$root.error.status = true // membuka bootstrap error notification ui
              this.$root.error.message = "Jika ingin memberpaharui password, wajib mengisi password lama"              
              return
            }
          }

          const request = new Promise((resolve, reject) => {
              axios.put('pengaturan/user/'+id, payload).then((response) => {

                // untuk edit profil
                this.$store.dispatch('setters/api/login', response.data)

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

                    if(element.id == this.get_form.pegawai_id) {
                        this.selected_pegawai = element.nama +" "+ element.nip
                    }
                });   
                resolve()
            }).then(result => { 
                this.pageReady = true
                this.pegawai_id = this.get_form.pegawai_id
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

                        if(element2.id == this.get_form.bidang_id) {
                            this.selected_bidang = element.nama +" "+element2.nama
                        }

                    });
                });   
                resolve()
            }).then(result => { 
                
                this.pageReady = true
                this.bidang_id = this.get_form.bidang_id
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

