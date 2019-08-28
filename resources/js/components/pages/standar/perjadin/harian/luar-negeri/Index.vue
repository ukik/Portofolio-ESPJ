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
        <AddButton route="standar-perjadin-harian-luar-negeri-create" name="Lokasi" class="mr-2" />
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

    <TableView :items="get_listLokasi.data" :action_visibility="user == 'Super Admin'">

        <tr slot="thead" class="text-center bg-primary">
            <th class="align-middle text-white" rowspan="2" width="50">No</th>
            <th class="align-middle text-white text-left" rowspan="2">Wilayah / Negara</th>
            <th class="align-middle text-white text-left" rowspan="2">Ibu Kota / Kota<br>Lainnya di tempat<br>Pewakilan RI</th>
            <th class="align-middle text-white" v-if="get_harian.length > 0" :colspan="get_harian.length > 1 ? get_harian.length : '' ">Jumlah Uang Harian</th>
        </tr>
        <tr slot="thead" class="text-center bg-primary">
            <th v-for="(item, index) in get_harian" 
                :key="index" 
                width="100" 
                class="align-middle text-white">
                {{ item.jabatan }}
                <br>
                <a v-if="user == 'Super Admin'" @click="set_form({ id: item.id, jabatan: item.jabatan }); jump({ name:'standar-perjadin-harian-luar-negeri-edit' })" class="icon"><i class="fe fe-edit text-white"></i></a>
                
                <a v-if="user == 'Super Admin'" @click="onDelete({ id: item.id })" class="icon"><i class="fe fe-trash-2 text-danger"></i></a>
            </th>
        </tr>

        <template slot-scope="scope">
            <tr class="font-weight-bold">
              <td class="text-center ">{{ scope.index + 1 }}</td>
              <td>{{ scope.item.nama }}</td>
              <td v-if="get_harian.length > 0" :colspan="get_harian.length + 2">&nbsp;</td>
            </tr>
            <tr v-for="(item, index) in scope.item.sub" :key="scope.index + '.' + index">
                <td class="align-middle text-center">{{ (scope.item.id) + '.' + (index + 1) }}</td>
                <td class="align-middle">{{ item.nama }}</td>
                <td class="align-middle">{{ item.nama_ibu_kota }}</td>
                <td v-for="(item2, index) in get_nominal" 
                    :key="scope.index + '.' + index +'.' + index"  
                    v-if="item2 != null" 
                    class="text-center">
                    {{ Number(item2[item.id]) | rupiah2 }}
                </td>
                <td v-else > &nbsp; </td>
            </tr>
        </template>
        <tbody v-if="undefined_checker(get_listLokasi.data) <= 0" slot="tbody" v-no-data="{ colspan: 6 }" />            

        <Paginator 
            slot="paginate" 
            :totalPage="total_paginate(get_listLokasi.last_page)" 
            @btnClick="onPaginator"></Paginator> 

    </TableView>
</div>
</template>

<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            'get_listLokasi':'getters/standar/harian/luar/listLokasi',
            'get_nominal':'getters/standar/harian/luar/nominal',
            'get_harian':'getters/standar/harian/luar/harian',
            
            'get_form':'getters/standar/harian/luar/form',
        }),
        undefined_checker(){
            return function (args) {
                if(args == undefined) {
                    return 0
                } else {
                    return args.length
                }
            }
        },        
    },
    methods: {
        ...mapActions({
            'set_luar':'setters/api/standar/harian/luar',
            'set_form':'setters/non-api/standar/harian/luar/form',
            'set_splice': 'setters/non-api/standar/harian/luar/splice',
        }),
        // CORE: untuk mengambil data init pada page ini
        onInitData(){
            // error handler reset
            this.$root.error.status = false
            this.$root.error.message = ""
            this.$root.request = true // membuka spinner ui
                        
            // sesuaikan dengan kebutuhan bisnis page ini
            const request = new Promise((resolve, reject) => {
                axios.get('standar/harian/luar'+this.suffix).then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }
                                        
                    resolve(this.set_luar(response.data.data))
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
                url: 'standar/harian/luar/'+args.id,
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

            judul: 'Standar Perjalanan Dinas Harian Luar Negeri',
            user: this.$root.level, // 'Super Admin',
        }
    },
}

</script>
