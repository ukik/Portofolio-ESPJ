<template>
    <div>
        <Toolbar :judul="judul" slot="toolbar">
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

        <TableView :items="get_rincian.rincian" :theads="theads">
            <div slot="pre-information">
                <div class="row">
                    <div class="col">
                        <div class="card">
                            <div class="table-responsive">
                                <table class="table table-hover table-sm table-outline table-vcenter text-nowrap card-table">
                                    <tr>
                                        <th>Program</th>
                                        <th>:</th>
                                        <td>{{ get_rincian.program.nama }}</td>
                                    </tr>
                                    <tr>
                                        <th>Kegiatan</th>
                                        <th>:</th>
                                        <td>{{ get_rincian.dpa.nama }}</td>
                                    </tr>
                                    <tr>
                                        <th>KPA</th>
                                        <th>:</th>
                                        <td>{{ get_rincian.dpa.kpa_singkatan }}</td>
                                    </tr>
                                    <tr>
                                        <th>PPTK</th>
                                        <th>:</th>
                                        <td>{{ get_rincian.dpa.pptk_singkatan }}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <template slot-scope="scope" v-if="rows_length({ item: 'get_length' })">

                <tr v-belanja="scope.item.jenis">

                  <td class="align-middle">
                    {{ scope.item.kode_rekening }}
                  </td>

                  <td class="align-middle" 
                    :inner-html.prop="scope.item.jenis == 'rincian' ? `<em>${scope.item.nama}</em>` : scope.item.nama"
                    :style="'padding-left: '+scope.item.level * 5+'px'">
                  </td>

                  <td class="align-middle text-right">{{ scope.item.pagu | rupiah2 }}</td>
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
            'get_form': 'getters/data-dasar/dpa/form',
            'get_rincian': 'getters/data-dasar/dpa/rincian',
            'get_length': 'getters/data-dasar/dpa/rincian/length',
        }),
    },
    methods: {
        ...mapActions({
            'set_rincian': 'setters/api/data-dasar/dpa/rincian',
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
              axios.get('data-dasar/dpa/'+id).then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }

                  resolve(this.set_rincian(response.data.data))
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
    },  
    mounted() {
      // CORE: untuk mengambil data init pada page ini
      this.onInitData()

    },
  data() {
    return {
      judul: "Rincian DPA",
      user: this.$root.level, // 'Super Admin',

      theads: [
        {
          title: "Kode Rekening",
          width: "0"
        },
        {
          title: "Uraian",
          width: "0"
        },
        {
          title: "Pagu",
          width: "0"
        },
      ]
    };
  },
};

</script>
