<template>
    <div>
        <Toolbar :judul="judul" slot="toolbar">
            <RefreshButton @onRefresh="onRefresh()" />
            <AddButton route="data-dasar-pemimpin-create" name="Pimpinan" class="mr-2" />
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

        <TableView :items="get_pimpinan.data" :theads="theads" :action_visibility="user == 'Super Admin'">
            <template slot-scope="scope" v-if="get_pimpinan.data.length > 0">
              <tr>
                <td class="align-middle text-center">{{ scope.index + 1 }}</td>
                <td class="align-middle">{{ scope.item.tahun }}</td>
                <td class="align-middle">{{ scope.item.nama }}</td>
                <td class="align-middle">{{ scope.item.pegawai.singkatan }}</td>
                <td class="align-middle">{{ scope.item.pegawai.nip }}</td>
                <td class="align-middle">{{ scope.item.nomor_sk }}</td>
                <td class="align-middle">{{ scope.item.tanggal_sk }}</td>
                <td v-active-info="scope.item.aktif" class="align-middle text-center" />
                <td class="text-center" v-if="user == 'Super Admin'">
                    <a @click="set_form({ id: scope.item.id }); jump({ name:'data-dasar-pemimpin-edit' })" class="icon">
                      <i class="fe fe-edit"></i>
                    </a>
                    <a @click="onDelete({ id: scope.item.id })" class="icon">
                        <i class="fe fe-trash-2 text-danger"></i></a>
                </td>    
              </tr>
            </template>

            <Paginator 
                slot="paginate" 
                :totalPage="total_paginate(get_pimpinan.last_page)" 
                @btnClick="onPaginator"></Paginator>  

        </TableView>
    </div>
</template>

<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            'get_pimpinan': 'getters/data-dasar/pimpinan/pimpinan',
        }),
    },
    methods: {
        ...mapActions({
            'set_pimpinan': 'setters/api/data-dasar/pimpinan/pimpinan',
            'set_form': 'setters/non-api/data-dasar/pimpinan/form',  
            'set_splice': 'setters/non-api/data-dasar/pimpinan/splice',
        }),
        // CORE: untuk mengambil data init pada page ini
        onInitData(){
            // error handler reset
            this.$root.error.status = false
            this.$root.error.message = ""
            this.$root.request = true // membuka spinner ui
                        
            // sesuaikan dengan kebutuhan bisnis page ini
            const request = new Promise((resolve, reject) => {
                axios.get('data-dasar/pimpinan'+this.suffix).then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }

                    resolve(this.set_pimpinan(response.data.data.pimpinan))
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
        onDelete(args){
            this.onDeleteConfirmation({
                url: 'data-dasar/pimpinan/'+args.id,
                id: args.id,
                bundle: args
            })       
        }               
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

            judul: 'Data Dasar Pimpinan',
            user: this.$root.level, // 'Super Admin',
            theads: [
                {
                    title: 'No',
                    width: '0',
                },
                {
                    title: 'Tahun',
                    width: '30',
                },
                {
                    title: 'Nama Pimpinan',
                    width: '0',
                },
                {
                    title: 'Singkatan/Panggilan',
                    width: '0',
                },
                {
                    title: 'NIP',
                    width: '0',
                },
                {
                    title: 'Nomor',
                    width: '0',
                },
                {
                    title: 'Tanggal SK',
                    width: '0',
                },
                {
                    title: 'Status',
                    width: '0',
                },
                {
                    title: 'Aksi',
                    width: '0',
                },

            ]            
        }
    }
}

</script>
