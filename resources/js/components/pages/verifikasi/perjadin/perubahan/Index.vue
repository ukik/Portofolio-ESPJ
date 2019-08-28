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

        <TableView :items="get_perjadin.data" :theads="theads">
            <template slot-scope="scope">
                <tr>
                    <td class="text-center">{{ scope.item.id }}</td>
                    <td class="text-center">{{ scope.item.nomor_spt }}</td>
                    <td>{{ scope.item.tempat_tujuan }}</td>
                    <td class="text-center">{{ scope.item.display_tanggal_berangkat }}</td>
                    <td class="text-center">{{ scope.item.display_tanggal_kembali }}</td>
                    <td class="text-center">{{ scope.item.lama_perjalanan }} hari </td>
                    <td v-status-info="scope.item.status" class="align-middle text-center" />
                    <td class="text-center">
                        <a
                            @click="set_form({ id: scope.item.id }); jump({ name:'verifikasi-perjadin-review' })" 
                            title="Verifikasi Permohonan" 
                            class="icon">
                            <i class="fe fe-search"></i>
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
            'get_perjadin': 'getters/verifikasi/perjadin/perjadin',
        }),
    },
    methods: {
        ...mapActions({
            'set_perjadin': 'setters/api/verifikasi/perjadin/perjadin',
            'set_form': 'setters/non-api/verifikasi/perjadin/form',  
        }),
        // CORE: untuk mengambil data init pada page ini
        onInitData(){
            // error handler reset
            this.$root.error.status = false
            this.$root.error.message = ""
            this.$root.request = true // membuka spinner ui
                        
            // sesuaikan dengan kebutuhan bisnis page ini
            const request = new Promise((resolve, reject) => {
                axios.get('verifikasi/perjadin').then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }
                                        
                    resolve(this.set_perjadin(response.data.data.perjadin))
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

            judul: 'Verifikasi Data Perjalan Dinas',
            user: this.$root.level, // 'Super Admin',
            items: data.data.perjadin.data,     
            theads: [
                {
                    title: 'Id',
                    width: '30',
                },
                {
                    title: 'Nomor',
                    width: '',
                },
                {
                    title: 'Tujuan',
                    width: '',
                },
                {
                    title: 'Tanggal Perjalanan',
                    width: '',
                },
                {
                    title: 'Tanggal Kembali',
                    width: '',
                },
                {
                    title: 'Lama Perjalanan',
                    width: '',
                },
                {
                    title: 'Status',
                    width: '',
                },
                {
                    title: 'Aksi',
                    width: '80',
                },
            ]            
        }
    }
}
