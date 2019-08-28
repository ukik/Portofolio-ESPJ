<template>
    <div>
        <Toolbar :judul="judul" slot="toolbar">
            <RefreshButton @onRefresh="onRefresh()" />            
            <AddButton route="permohonan-uang-persediaan-create" name="Uang Persediaan" />
        </Toolbar>

        <!-- dipanggil jike error -->
        <div v-if="$root.error.status" class="alert alert-icon alert-danger" role="alert">
          <i class="fe fe-info mr-2" aria-hidden="true"></i> {{ $root.error.message }}
        </div>

        <!-- dipanggil saat terjadi request di component ini  -->
        <div v-if="$root.request" class="alert bg-primary alert-success text-center" role="alert">
          <components is="loader-spinner" style="zoom: 0.75;" />
        </div>

        <TableView :items="get_permohonan.data" :theads="theads" :action_visibility="user == 'Super Admin'">
            <template slot-scope="scope">
                <tr>
                    <td class="align-middle text-center">{{ scope.index + 1 }}</td>
                    <td class="align-middle text-center">{{ scope.item.tanggal }}</td>
                    <td class="align-middle">{{ scope.item.uraian }}</td>
                    <td class="align-middle text-right">{{ scope.item.nominal_sebelum | rupiah2 }}</td>
                    <td class="align-middle text-right">{{ scope.item.nominal_pemakaian | rupiah2 }}</td>
                    <td class="align-middle text-right">{{ scope.item.nominal_persediaan | rupiah2 }}</td>
                    <td class="align-middle text-right">{{ scope.item.nominal_saldo | rupiah2}}</td>

                    <td class="text-center" v-if="user != 'Supervisor'">
                        <a @click="set_form({ id: scope.item.id }); jump({ name: 'permohonan-uang-persediaan-edit' })" onclick="return false;" href="#" class="icon"><i class="fe fe-edit"></i></a>

                        <a @click="onDelete({ id: scope.item.id })" class="icon"><i class="fe fe-trash text-danger"></i></a>
                    </td>    

                </tr>
            </template>

        <Paginator 
            slot="paginate" 
            :totalPage="total_paginate(get_permohonan.last_page)" 
            @btnClick="onPaginator"></Paginator> 

        </TableView>
    </div>
</template>


<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            'get_permohonan': 'getters/permohonan/uang-persediaan',
        }),
        undefined_checker(){
            return function(args){
                console.log(args)
                if(args == undefined) {
                    return ""
                } else {
                    return args.nama 
                }
            }
        }        
    },
    methods: {
        ...mapActions({
            'set_permohonan': 'setters/api/permohonan/uang-persediaan',
            'set_form': 'setters/non-api/permohonan/uang-persediaan/form',  
            'set_splice': 'setters/non-api/permohonan/uang-persediaan/splice',
        }),
        // CORE: untuk mengambil data init pada page ini
        onInitData(){
            // error handler reset
            this.$root.error.status = false
            this.$root.error.message = ""
            this.$root.request = true // membuka spinner ui
                        
            // sesuaikan dengan kebutuhan bisnis page ini
            const request = new Promise((resolve, reject) => {
                axios.get('permohonan/uang-persediaan'+this.suffix).then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }
                                        
                    resolve(this.set_permohonan(response.data.data.permohonan))
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
                url: 'permohonan/uang-persediaan/'+args.id,
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

            judul: 'Daftar Ganti Uang Persediaan (UP)',
            user: this.$root.level, // 'Super Admin',

            theads: [{
                    title: 'No',
                    width: '30',
                },
                {
                    title: 'Tanggal',
                    width: '0',
                },
                {
                    title: 'Uraian',
                    width: '0',
                },
                {
                    title: 'Nominal (Sebelum)',
                    width: '0',
                },
                {
                    title: 'Nominal (Pemakaian)',
                    width: '0',
                },
                {
                    title: 'Nominal (Persediaan)',
                    width: '0',
                },
                {
                    title: 'Nominal (Saldo)',
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
