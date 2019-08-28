<template>
    <div>
        <Toolbar :judul="judul" slot="toolbar">
            <RefreshButton @onRefresh="onRefresh()" />            
            <AddButton route="pengaturan-berkas-create" name="Berkas" class="mr-2" />
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


        <TableView :items="get_berkas.data" :theads="theads">
            <template slot-scope="scope">
                <tr>
                    <td class="align-middle text-center">{{ scope.index + 1 }}</td>
                    <td class="align-middle text-center">{{ scope.item.nama }}</td>
                    <td class="align-middle text-center">{{ scope.item.deskripsi }}</td>
                    <td v-active-info="scope.item.aktif" class="align-middle text-center" />
                    <td class="text-center">
                        <a :href="$root.domain+'/'+scope.item.path" target="_blank" rel="noopener noreferrer" class="icon"><i class="fe fe-download"></i></a>

                        <a @click="set_form({ id: scope.item.id }); jump({ name:'pengaturan-berkas-edit' })" class="icon"><i class="fe fe-edit"></i></a>

                        <a @click="onDelete({ id: scope.item.id })" class="icon"><i class="fe fe-trash-2 text-danger"></i></a>
                    </td>
                </tr>
            </template>

        <Paginator 
            slot="paginate" 
            :totalPage="total_paginate(get_berkas.last_page)" 
            @btnClick="onPaginator"></Paginator>  

        </TableView>
    </div>
</template>

<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            'get_berkas': 'getters/pengaturan/berkas/berkas',
        }),
    },
    methods: {
        ...mapActions({
            'set_berkas': 'setters/api/pengaturan/berkas/berkas',
            'set_form': 'setters/non-api/pengaturan/berkas/form',
            'set_splice': 'setters/non-api/pengaturan/berkas/splice',
        }),
        // CORE: untuk mengambil data init pada page ini
        onInitData(){
            // error handler reset
            this.$root.error.status = false
            this.$root.error.message = ""
            this.$root.request = true // membuka spinner ui
                        
            // sesuaikan dengan kebutuhan bisnis page ini
            const request = new Promise((resolve, reject) => {
                axios.get('pengaturan/berkas'+this.suffix).then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }

                    resolve(this.set_berkas(response.data.data.berkas))
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
                url: 'pengaturan/berkas/'+args.id,
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

            judul: 'Pengaturan Berkas',
            user: this.$root.level, // 'Super Admin',
            theads: [
                {
                    title: 'No',
                    width: '30',
                },
                {
                    title: 'Berkas',
                    width: '',
                },
                {
                    title: 'Deskripsi',
                    width: '',
                },
                {
                    title: 'Aktif',
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

</script>