<template>
    <div>
        <Toolbar :judul="judul" slot="toolbar">
            <RefreshButton @onRefresh="onRefresh()" />             
            <DropdownButton class="mr-2" classname="success" name="Standar Lainnya">
                <a v-pointer class="dropdown-item" @click="jump({ name:'standar-perjadin-harian-dalam-negeri' })">Harian</a>
                <a v-pointer class="dropdown-item" @click="jump({ name:'standar-perjadin-hotel-dalam-wilayah' })">Hotel</a>
                <a v-pointer class="dropdown-item" @click="jump({ name:'standar-perjadin-representatif' })">Representatif</a>
                <a v-pointer class="dropdown-item bg-success text-white" @click="jump({ name:'standar-perjadin-transportasi' })">Transportasi</a>
                <div class="dropdown-divider"></div>
                <a v-pointer class="dropdown-item" @click="jump({ name:'standar-perjadin-honor' })">Honor</a>
            </DropdownButton>
            <AddButton route="standar-perjadin-transportasi-create" name="Lokasi" class="mr-2" />
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

        <TableView :items="get_transportasi.data" :theads="theads" :action_visibility="user == 'Super Admin'">
            <template slot-scope="scope">
                <tr>
                    <td class="align-middle text-center">{{ scope.index + 1 }}</td>
                    <td class="align-middle">{{ scope.item.golongan }}</td>
                    <td class="align-middle">{{ scope.item.tujuan }}</td>
                    <td class="align-middle text-right">{{ scope.item.nominal | rupiah2 }}</td>
                    <td class="text-center" v-if="user == 'Super Admin'">
                        <a @click="set_form({ id: scope.item.id }); jump({ name:'standar-perjadin-transportasi-edit' })" class="icon"><i class="fe fe-edit"></i></a>

                        <a @click="onDelete({ id: scope.item.id })" class="icon"><i class="fe fe-trash-2 text-danger"></i></a>
                    </td>   
                </tr>
            </template>

            <Paginator 
                slot="paginate" 
                :totalPage="total_paginate(get_transportasi.last_page)" 
                @btnClick="onPaginator"></Paginator>   

        </TableView>
    </div>
</template>


<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            'get_transportasi': 'getters/standar/perjadin/transportasi',
        }),
    },
    methods: {
        ...mapActions({
            'set_transportasi': 'setters/api/standar/perjadin/transportasi',
            'set_form': 'setters/non-api/standar/perjadin/transportasi/form',  
            'set_splice': 'setters/non-api/standar/perjadin/transportasi/splice',
        }),
        // CORE: untuk mengambil data init pada page ini
        onInitData(){
            // error handler reset
            this.$root.error.status = false
            this.$root.error.message = ""
            this.$root.request = true // membuka spinner ui
                        
            // sesuaikan dengan kebutuhan bisnis page ini
            const request = new Promise((resolve, reject) => {
                axios.get('standar/perjadin/transportasi'+this.suffix).then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }
                                        
                    resolve(this.set_transportasi(response.data.data.transportasi))
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
                url: 'standar/perjadin/transportasi/'+args.id,
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

            judul: 'Standar Perjalanan Dinas Transportasi',
            user: this.$root.level, // 'Super Admin',

            golongan: [
              {
                label: 'I/a',
                keterangan: "Juru Muda",
              },
              {
                label: 'I/b',
                keterangan: "Juru Muda Tingkat I",
              },
              {
                label: 'I/c',
                keterangan: "Juru",
              },
              {
                label: 'I/d',
                keterangan: "Juru Tingkat I",
              },
              {
                label: 'II/a',
                keterangan: "Pengatur Muda",
              },
              {
                label: 'II/b',
                keterangan: "Pengatur Muda Tingkat I",
              },
              {
                label: 'II/c',
                keterangan: "Pengatur",
              },
              {
                label: 'II/d',
                keterangan: "Pengatur Tingkat I",
              },
              {
                label: 'III/a',
                keterangan: "Penata Muda",
              },
              {
                label: 'III/b',
                keterangan: "Penata Muda Tingkat I",
              },
              {
                label: 'III/c',
                keterangan: "Penata",
              },
              {
                label: 'III/d',
                keterangan: "Penata Tingkat I",
              },
              {
                label: 'IV/a',
                keterangan: "Pembina",
              },
              {
                label: 'IV/b',
                keterangan: "Pembina Tingkat I",
              },
              {
                label: 'IV/c',
                keterangan: "Pembina Utama Muda",
              },
              {
                label: 'IV/d',
                keterangan: "Pembina Utama Madya",
              },
              {
                label: 'IV/e',
                keterangan: "Pembina Utama",
              },
              {
                label: 'Non PNS',
                keterangan: "Honorer/Kontrak",
              }
            ],
                      
            theads: [
                {
                    title: 'No',
                    width: '30',
                },
                {
                    title: 'Golongan',
                    width: '',
                },
                {
                    title: 'Tujuan',
                    width: '',
                },
                {
                    title: 'Nominal',
                    width: '',
                },
                {
                    title: 'Aksi',
                    width: '100',
                }
            ]
        }
    }
}
 

</script>


