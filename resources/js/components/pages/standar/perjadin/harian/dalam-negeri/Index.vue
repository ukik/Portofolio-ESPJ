<template>
    <div>
        <Toolbar :judul="judul" slot="toolbar">
            <RefreshButton @onRefresh="onRefresh()" />
            <DropdownButton class="mr-2" classname="success" name="Standar Lainnya">
                <a v-pointer class="dropdown-item bg-success text-white" @click="jump({ name:'standar-perjadin-harian-dalam-negeri' })">Harian</a>
                <a v-pointer class="dropdown-item" @click="jump({ name:'standar-perjadin-hotel-dalam-wilayah' })">Hotel</a>
                <a v-pointer class="dropdown-item" @click="jump({ name:'standar-perjadin-representatif' })">Representatif</a>
                <a v-pointer class="dropdown-item" @click="jump({ name:'standar-perjadin-transportasi' })">Transportasi</a>
                <div class="dropdown-divider"></div>
                <a v-pointer class="dropdown-item" @click="jump({ name:'standar-perjadin-honor' })">Honor</a>
            </DropdownButton>
            <DropdownButton class="mr-2" classname="success" name="Data Harian">
                <a v-pointer class="dropdown-item" @click="jump({ name:'standar-perjadin-harian-dalam-negeri' })">Dalam Negeri</a>
                <a v-pointer class="dropdown-item" @click="jump({ name:'standar-perjadin-harian-luar-negeri' })">Luar Negeri</a>
            </DropdownButton>
            <AddButton route="standar-perjadin-harian-dalam-negeri-create" name="Standar" class="mr-2" />
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

        <TableView :items="get_hairan_dalam.data" :theads="theads" :action_visibility="user == 'Super Admin'">
            <template slot-scope="scope">
                <tr>
                    <td class="align-middle text-center">{{ scope.index + 1 }}</td>
                    <td class="align-middle">{{ scope.item.jabatan }}</td>
                    <td class="align-middle text-right">{{ scope.item.nominal_luar_wilayah | rupiah2 }}</td>
                    <td class="align-middle text-right">{{ scope.item.nominal_dalam_wilayah | rupiah2 }}</td>
                    <td class="align-middle text-right">{{ scope.item.nominal_dalam_kota | rupiah2 }}</td>
                    <td class="text-center" v-if="user == 'Super Admin'">
                        <a @click="set_form({ id: scope.item.id }); jump({ name:'standar-perjadin-harian-dalam-negeri-edit' })" class="icon">
                            <i class="fe fe-edit"></i>
                        </a>

                        <a @click="onDelete({ id: scope.item.id })" class="icon"><i class="fe fe-trash-2 text-danger"></i></a>
                    </td>    
                </tr>
            </template>

        <Paginator 
            slot="paginate" 
            :totalPage="total_paginate(get_hairan_dalam.last_page)" 
            @btnClick="onPaginator"></Paginator> 

        </TableView>
    </div>
</template>


<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            'get_hairan_dalam': 'getters/standar/harian/dalam',
            'get_form': 'getters/standar/harian/dalam/form',
        }),
    },
    methods: {
        ...mapActions({
            'set_hairan_dalam': 'setters/api/standar/harian/dalam',
            'set_form': 'setters/non-api/standar/harian/dalam/form',  
            'set_splice': 'setters/non-api/standar/harian/dalam/splice',
        }),
        // CORE: untuk mengambil data init pada page ini
        onInitData(){
            // error handler reset
            this.$root.error.status = false
            this.$root.error.message = ""
            this.$root.request = true // membuka spinner ui
                        
            // sesuaikan dengan kebutuhan bisnis page ini
            const request = new Promise((resolve, reject) => {
                axios.get('standar/harian/dalam'+this.suffix).then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }
                                        
                    resolve(this.set_hairan_dalam(response.data.data.harian))
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
                url: 'standar/harian/dalam/'+args.id,
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

                judul: 'Standar Perjalanan Dinas Harian Dalam Negeri',
                user: this.$root.level, // 'Super Admin',

                theads: [{
                        title: 'No',
                        width: '30',
                    },
                    {
                        title: 'Jabatan',
                        width: '',
                    },
                    {
                        title: 'Di Luar Wilayah',
                        width: '',
                    },
                    {
                        title: 'Dalam Wilayah',
                        width: '',
                    },
                    {
                        title: 'Dalam Kota',
                        width: '',
                    },
                    {
                        title: 'Aksi',
                        width: '100',
                    },
                ]
            }
        },
    }

</script>