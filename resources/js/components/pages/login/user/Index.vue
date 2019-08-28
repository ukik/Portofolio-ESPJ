<template>
    <div>
        <Toolbar judul="Edit User" slot="title">       
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
                readonly="true"
                title="Username" 
                name="username" 
                v-model="get_form.username"
                placeholder="Username" />

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

            <div slot="button" class="form-group text-right mb-5">
                <button @click="onSubmit()" class="btn btn-primary">
                    <i class="fe fe-save"></i> Simpan</button>
                <a @click="$router.back();" href="#" class="btn btn-cyan">
                    <i class="fe fe-corner-up-left"></i> Kembali
                </a>
            </div>    

        </Formulir>
    </div>
</template>


<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            'get_form': 'getters/login/user',
        }),
    },
    methods: {
        onSubmit(){
          // error handler reset
          this.$root.error.status = false
          this.$root.error.message = ""
          this.$root.request = true // membuka spinner ui

          const id = this.get_form.id
          const username = this.get_form.username
          const level = this.get_form.level
          const bidang_id = this.get_form.bidang_id
          const pegawai_id = this.get_form.pegawai_id
          
          const nama = document.getElementById('nama').value
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

                  this.$store.dispatch('setters/api/login', response.data)
                  
                  resolve(response)
              }).catch((error) => {
                  reject(error);
              })
          })                     
        }
    },  
};


</script>

