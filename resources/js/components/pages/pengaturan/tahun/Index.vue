<template>
    <div>
        <Toolbar :judul="judul" slot="toolbar">
            <RefreshButton @onRefresh="onRefresh()" />
            <AddButton route="pengaturan-tahun-create" name="Tahun" class="mr-2" />
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

        <TableView :items="get_tahun.data" :theads="theads">
            <template slot-scope="scope">
                <tr>
                    <td class="align-middle text-center">{{ scope.index + 1 }}</td>
                    <td class="align-middle text-center">{{ scope.item.tahun }}</td>
                    <td class="text-center">
                        <a @click="onDelete({ id: scope.item.id })"  class="icon"><i class="fe fe-trash-2 text-danger"></i></a>
                    </td>
                </tr>
            </template>

        <Paginator 
            slot="paginate" 
            :totalPage="total_paginate(get_tahun.last_page)" 
            @btnClick="onPaginator"></Paginator>  

        </TableView>
    </div>
</template>

<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            'get_tahun': 'getters/pengaturan/tahun',
        }),
    },
    methods: {
        ...mapActions({
            'set_tahun': 'setters/api/pengaturan/tahun',
            'set_splice': 'setters/non-api/pengaturan/tahun/splice',
        }),
        // CORE: untuk mengambil data init pada page ini
        onInitData(){
            // error handler reset
            this.$root.error.status = false
            this.$root.error.message = ""
            this.$root.request = true // membuka spinner ui
                        
            // sesuaikan dengan kebutuhan bisnis page ini
            const request = new Promise((resolve, reject) => {
                axios.get('pengaturan/tahun'+this.suffix).then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }
                                        
                    resolve(this.set_tahun(response.data.data.tahun))
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
                url: 'pengaturan/tahun/'+args.id,
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
            
            judul: 'Pengaturan Tahun',
            user: this.$root.level, // 'Super Admin',

            theads: [
                {
                    title: 'No',
                    width: '30',
                },
                {
                    title: 'Tahun',
                    width: '',
                },
                {
                    title: 'Aksi',
                    width: '150',
                },
            ]            
        }
    }
}

</script>