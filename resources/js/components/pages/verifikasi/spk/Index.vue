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
                
        <TableView :items="get_spk.data" :theads="theads">
            <template slot-scope="scope">
              <tr>
                <td class="align-middle text-center">{{ scope.index + 1 }}</td>
                <td v-jenis-spk="scope.item.jenis" class="align-middle text-center" />
                <td class="align-middle">{{ scope.item.nomor_spk }}</td>
                <td class="align-middle">{{ scope.item.tanggal }}</td>
                <td class="align-middle">{{ scope.item.nama_pekerjaan }}</td>
                <td class="align-middle">{{ scope.item.uraian }}</td>
                <td v-status-info="scope.item.status" class="align-middle text-center" />
                <td class="text-center">
                    <a  
                        @click="set_form({ id: scope.item.id }); jump({ name:'verifikasi-spk-review' })"
                        title="Verifikasi Permohonan" 
                        class="icon">
                        <i class="fe fe-search"></i>
                    </a>
                </td>
              </tr>
            </template>

        <Paginator 
            slot="paginate" 
            :totalPage="total_paginate(get_spk.last_page)" 
            @btnClick="onPaginator"></Paginator> 

        </TableView>
    </div>
</template>


<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            'get_spk': 'getters/verifikasi/spk/spk',
        }),
    },
    methods: {
        ...mapActions({
            'set_spk': 'setters/api/verifikasi/spk/spk',
            'set_form': 'setters/non-api/verifikasi/spk/form',  
        }),
        // CORE: untuk mengambil data init pada page ini
        onInitData(){
            // error handler reset
            this.$root.error.status = false
            this.$root.error.message = ""
            this.$root.request = true // membuka spinner ui
                        
            // sesuaikan dengan kebutuhan bisnis page ini
            const request = new Promise((resolve, reject) => {
                axios.get('verifikasi/spk').then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }
                                        
                    resolve(this.set_spk(response.data.data.spk))
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

            judul: 'Verifikasi Data SPK',
            user: this.$root.level, // 'Super Admin',
            theads: [
                {
                    title: 'No',
                    width: '30',
                },
                {
                    title: 'Jenis',
                    width: '',
                },
                {
                    title: 'Nomor',
                    width: '',
                },
                {
                    title: 'Tanggal',
                    width: '',
                },
                {
                    title: 'Nama Pekerjaan',
                    width: '',
                },
                {
                    title: 'Uraian',
                    width: '',
                },
                {
                    title: 'Status',
                    width: '',
                },
                {
                    title: 'Aksi',
                    width: '100',
                },
            ]            
        }
    }
}
