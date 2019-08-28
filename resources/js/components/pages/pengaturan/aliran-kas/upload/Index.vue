<template>
    <div>
      
      <Toolbar judul="Upload Anggaran" slot="title">
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

       <Formulir column_content="col-12">
 
            <FormulirLegend slot="legend" title="Upload Anggaran" />

            <AlertError slot="input" />  

            <div slot="input" class="form-group">
              <div class="row">
                <div class="col">

                  <FormulirDropdown 
                      slot="input" 
                      title="Tahun">
                      <div slot="default" class="input-group">
                        <select class="form-control selectize" name="tahun" id="tahun">
                          <option value="">- Pilih Tahun -</option>
                            <option v-for="(item, index) in get_listTahun" 
                              v-if="get_listTahun.length > 0" 
                            :key="index" 
                            :value="item">
                            {{ item }}
                          </option>
                        </select>
                      </div>
                  </FormulirDropdown>

                </div>
                <div class="col">

                  <FormulirDropdown 
                      slot="input" 
                      title="Jenis Anggaran">
                      <div slot="default" class="input-group">
                        <select class="form-control selectize" name="jenis_anggaran" id="jenis_anggaran">
                          <option value="">- Pilih Jenis Anggaran -</option>
                          <option v-for="(item, index) in get_listAnggaran" 
                            :key="index" 
                            :value="item">
                            {{ item }}
                          </option>
                        </select>
                      </div>
                  </FormulirDropdown>

                </div>
              </div>
            </div>

            <FormulirFile 
                @onChange="$refs.file_label.innerText = $event"
                slot="input" 
                title="File Anggaran Kas/Aliran Kas" 
                name="file" 
                type="file">
                <label slot="append" ref="file_label" class="custom-file-label">Pilih File</label>
            </FormulirFile>

            <FormulirButton @onSubmit="onSubmit()" slot="button" />
        </Formulir>
    </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    computed: {
      ...mapGetters({
        'get_listTahun': 'getters/pengaturan/aliran-kas/listTahun',
        'get_listAnggaran': 'getters/pengaturan/aliran-kas/listAnggaran',
      }),
    },
    methods: {
      ...mapActions({
          'set_upload': 'setters/api/pengaturan/aliran-kas/upload',         
      }),      
      // CORE: untuk mengambil data init pada page ini
      onInitData(){
        // error handler reset
        this.$root.error.status = false
        this.$root.error.message = ""
        this.$root.request = true // membuka spinner ui

        // sesuaikan dengan kebutuhan bisnis page ini
        const request = new Promise((resolve, reject) => {
            axios.get('pengaturan/aliran-kas/upload').then((response) => {
                if(response == undefined) {
                    return resolve()
                }

                resolve(this.set_upload(response.data.data))
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
      onSubmit() {
        // error handler reset
        this.$root.error.status = false
        this.$root.error.message = ""
        this.$root.request = true // membuka spinner ui

        const tahun = document.getElementById('tahun').value
        const jenis_anggaran = document.getElementById('jenis_anggaran').value
        const file = document.getElementById('file').files[0]

        let payload = new FormData()
        payload.append('tahun', tahun)
        payload.append('jenis_anggaran', jenis_anggaran)
        payload.append('file', file)

        const request = new Promise((resolve, reject) => {
          axios.post('pengaturan/aliran-kas', payload, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then((response) => {
              resolve(response)
          }).catch((error) => {
              reject(error);
          })
        })
      }
    },
    mounted() {
      // CORE: untuk mengambil data init pada page ini
      this.onInitData()

    },
  };
</script>