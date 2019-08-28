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

        <!-- dipanggil dari callback creat/edit/delete -->
        <div v-if="callback_status" class="alert alert-icon alert-info" role="alert">
            <i class="fe fe-info mr-2" aria-hidden="true"></i> {{ get_callback_message }}
        </div>  

        <TableView :items="get_dpa" :theads="theads">

            <template slot-scope="scope" v-if="get_dpa.length > 0">
                <tr v-row-dark-gray="scope.item.jenis">
                  <td class="align-middle">{{ scope.item.kode_dpa }}</td>
                  <td class="align-middle">{{ scope.item.nama }}</td>
                  <td class="align-middle text-right">{{ scope.item.pagu | rupiah2 }}</td>
                  <td v-blank-inner="scope.item.jenis" class="align-middle text-center">{{ undefined_object(scope.item.kpa1, 'nama') }}</td>
                  <td v-blank-inner="scope.item.jenis" class="align-middle text-center">{{ undefined_object(scope.item.pptk1, 'nama') }}</td>

                  <td v-keep-inner="scope.item.jenis == 'kegiatan' || scope.item.kode_rekening == '5.1'" class="text-center">

                    <a @click="jump({ name:'pengaturan-aliran-kas-rincian', params: { id: scope.item.id }, query: { origin: 'data-dasar' } })" 
                        class="icon">
                        <i class="fe fe-sliders text-primary"></i>
                    </a>
                    <a v-if="user == 'Super Admin'" 
                        @click="set_form({ id: scope.item.id }); jump({ name:'data-dasar-dpa-rincian' })"
                        class="icon">
                        <i class="fe fe-list text-primary"></i>
                    </a>
                    <a v-if="user == 'Super Admin'" 
                        @click="set_form({ id: scope.item.id }); jump({ name:'data-dasar-dpa-edit' })"
                        class="icon">
                        <i class="fe fe-edit"></i>
                    </a>
                    
                  </td>
                </tr>
            </template>
        </TableView>
    </div>
</template>

<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            'get_dpa': 'getters/data-dasar/dpa/dpa',
        }),
        undefined_object(){
            return (arg, object) => {
                if(arg == null || arg == undefined ) {
                    return "-"
                } else {
                    return arg[object]
                }
            }
        }
    },
    methods: {
        ...mapActions({
            'set_dpa': 'setters/api/data-dasar/dpa/dpa',
            'set_form': 'setters/non-api/data-dasar/dpa/form',  
            'set_splice': 'setters/non-api/data-dasar/dpa/splice',
        }),
        // CORE: untuk mengambil data init pada page ini
        onInitData(){
            // error handler reset
            this.$root.error.status = false
            this.$root.error.message = ""
            this.$root.request = true // membuka spinner ui

            // sesuaikan dengan kebutuhan bisnis page ini
            const request = new Promise((resolve, reject) => {
                axios.get('data-dasar/dpa').then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }

                    resolve(this.set_dpa(response.data.data.dpa))
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

            judul: 'Data Dasar DPA',
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
