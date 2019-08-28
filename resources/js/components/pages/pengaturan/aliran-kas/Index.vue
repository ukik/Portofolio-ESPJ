<template>
    <div>
        <Toolbar :judul="judul" slot="toolbar">
            <RefreshButton @onRefresh="onRefresh()" />          
            <UploadButton route="pengaturan-aliran-kas-upload" name="" class="mr-2" />
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

        <!-- dipanggil dari callback creat/edit/delete -->
        <div v-if="callback_status" class="alert alert-icon alert-info" role="alert">
            <i class="fe fe-info mr-2" aria-hidden="true"></i> {{ get_callback_message }}
        </div>          

        <TableView :items="get_dpa" :theads="theads">
            <template slot-scope="scope">
              <tr v-row-dark-gray="scope.item.jenis">
                <td class="align-middle">{{ scope.item.kode_dpa }}</td>
                <td class="align-middle">{{ scope.item.nama }}</td>
                <td class="align-middle text-right">{{ scope.item.pagu | rupiah2 }}</td>
                <td class="align-middle text-center">
                  {{ scope.item.kpa_singkatan }}
                </td>
                <td class="align-middle text-center">
                  {{ scope.item.pptk_singkatan }}
                </td>
                <td v-keep-inner="scope.item.jenis == 'kegiatan' || scope.item.kode_rekening == '5.1'" class="text-center">
                  <a @click="jump({ name:'pengaturan-aliran-kas-rincian', params: { id: scope.item.id }, query: { origin: 'pengaturan' } })" class="icon">
                    <i class="fe fe-list text-primary "></i></a>
                </td>
              </tr>
            </template>

            <tr slot="tfoot" class="bg-info">
                <th colspan="2" class="text-white text-center">TOTAL</th>
                <th class="text-white text-right" :inner-html.prop="get_total | rupiah2"></th>
                <th colspan="3"></th>
            </tr>

        </TableView>
    </div>
</template>

<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
          'get_dpa': 'getters/pengaturan/aliran-kas/dpa',
          'get_total': 'getters/pengaturan/aliran-kas/total',
          'get_tahun': 'getters/pengaturan/aliran-kas/tahun',
          'get_jenis_anggaran': 'getters/pengaturan/aliran-kas/jenis_anggaran',
 
        }),
    },
    methods: {
        ...mapActions({
            'set_index': 'setters/api/pengaturan/aliran-kas/index',
        }),
        // CORE: untuk mengambil data init pada page ini
        onInitData(){
            // error handler reset
            this.$root.error.status = false
            this.$root.error.message = ""
            this.$root.request = true // membuka spinner ui

            // sesuaikan dengan kebutuhan bisnis page ini
            const request = new Promise((resolve, reject) => {
                axios.get('pengaturan/aliran-kas').then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }

                    resolve(this.set_index(response.data.data))
                }).catch((error) => {
                    reject(error);
                })
            })
            return request;
        },
        // CORE: untuk refresh data init pada page ini
        onRefresh(){
            this.callback_status = false

            // CORE: untuk mengambil data init pada page ini
            this.onInitData()
        },       

    },
    mounted(){
        if(this.get_callback_status){
            this.set_callback_reset()
        }

        // CORE: untuk mengambil data init pada page ini
        this.onInitData()

        this.$memory.set('last_route', this.$route.name)
 
    },    
    data() {
        return {
            // CORE
            callback_status: this.$store.state.callback.callback_status,

            judul: 'Anggaran Belanja',
            user: this.$root.level, // 'Super Admin',

            theads: [{
                    title: 'Kode DPA',
                    width: '0',
                },
                {
                    title: 'Nama',
                    width: '0',
                },
                {
                    title: 'Pagu',
                    width: '0',
                },
                {
                    title: 'Nama KPA',
                    width: '0',
                },
                {
                    title: 'Nama PPTK',
                    width: '0',
                },
                {
                    title: 'Aksi',
                    width: '100',
                },
            ]            
        }
    }
}

</script>
