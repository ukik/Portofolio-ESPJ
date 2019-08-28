<template>
    <div>
        <Toolbar judul="Create File" slot="title">
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
 
            <FormulirLegend slot="legend" title="Upload Berkas" />

            <FormulirFile 
                @onChange="$refs.file_label.innerText = $event"
                slot="input" 
                title="File" 
                name="berkas" 
                type="file">
                <label slot="append" ref="file_label" class="custom-file-label">Pilih berkas</label>
            </FormulirFile>

            <FormulirTextarea 
                slot="input" 
                title="Deskripsi" 
                name="deskripsi" 
                placeholder="Deskripsi" />

            <FormulirSwitch 
                slot="input"
                title="Aktif"
                type="checkbox" 
                name="aktif" 
                checked="false" />

            <FormulirButton @onSubmit="onSubmit()" slot="button" />
        </Formulir>
    </div>
</template>

<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    methods: {
        onSubmit(){
            // error handler reset
            this.$root.error.status = false
            this.$root.error.message = ""
            this.$root.request = true // membuka spinner ui

            const deskripsi = document.getElementById('deskripsi').value
            const aktif = document.getElementById('aktif').checked
            const berkas = document.getElementById('berkas').files[0]

            let payload = new FormData()
            payload.append('deskripsi', deskripsi)
            payload.append('aktif', aktif)
            payload.append('berkas', berkas)

            const request = new Promise((resolve, reject) => {
                axios.post('pengaturan/berkas', payload, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error);
                })
            })                     
        },
    },  
};

</script>