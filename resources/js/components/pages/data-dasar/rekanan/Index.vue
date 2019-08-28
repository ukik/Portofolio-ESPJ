<template>
<div>
    <Toolbar :judul="judul" slot="toolbar">
        <RefreshButton @onRefresh="onRefresh()" />          
        <AddButton route="data-dasar-rekanan-create" name="Rekanan" class="mr-2" />
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

    <TableView :items="get_rekanan.data" :theads="theads" :action_visibility="user == 'Super Admin'">

        <Keyword slot="pivot" 
            name="keyword"
            param="keyword" 
            @onSearch="onSearch()" />

        <ResetButton @onReset="onReset()" slot="pivot" v-if="keyword != ''"/>        

        <template slot-scope="scope" v-if="get_rekanan.data.length > 0">
            <tr>
                <td class="align-middle text-center">{{ scope.index + 1 }}</td>
                <td class="align-middle">{{ scope.item.tahun }}</td>
                <td class="align-middle">{{ scope.item.nama_perusahaan }}</td>
                <td class="align-middle">{{ scope.item.nama_pimpinan }}</td>
                <td class="align-middle">{{ scope.item.npwp }}</td>
                <td class="align-middle">{{ scope.item.telp }}</td>
                <td class="align-middle">{{ scope.item.alamat }}</td>
                <td class="text-center" v-if="user == 'Super Admin'">
                    <a @click="set_form({ id: scope.item.id }); jump({ name:'data-dasar-rekanan-edit' })" class="icon">
                      <i class="fe fe-edit"></i>
                    </a>
                    <a  @click="onDelete({ id: scope.item.id })" class="icon"><i class="fe fe-trash-2 text-danger"></i></a>
                </td>   
            </tr>
        </template>

        <Paginator 
            slot="paginate" 
            :totalPage="total_paginate(get_rekanan.last_page)" 
            @btnClick="onPaginator"></Paginator>  

    </TableView>
</div>
</template>

<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            'get_rekanan': 'getters/data-dasar/rekanan/rekanan',
        }),
    },
    methods: {
        ...mapActions({
            'set_rekanan': 'setters/api/data-dasar/rekanan/rekanan',
            'set_form': 'setters/non-api/data-dasar/rekanan/form',  
            'set_splice': 'setters/non-api/data-dasar/rekanan/splice',
        }),
        // CORE: untuk mengambil data init pada page ini
        onInitData(args){
            // error handler reset
            this.$root.error.status = false
            this.$root.error.message = ""
            this.$root.request = true // membuka spinner ui

            // sesuaikan dengan kebutuhan bisnis page ini
            const request = new Promise((resolve, reject) => {
                axios.get('data-dasar/rekanan'+args, this.axiosHeaders).then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }

                    resolve(this.set_rekanan(response.data.data.rekanan))
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
            this.onInitData(this.last_args)
        },        
        onPaginator (pageNum) {

            this.keyword = ''

            document.getElementById('keyword').value = ''           

            this.current_page = pageNum
            this.last_args = "?page="+this.current_page

            this.$nextTick(() => {
                this.onInitData(this.last_args)
            })

        },
        onSearch(){
            
            const keyword = document.getElementById('keyword').value

            this.keyword = keyword

            this.last_args = "?keyword="+keyword

            this.onInitData(this.last_args)
        },
        onReset(){

            this.keyword = ''

            document.getElementById('keyword').value = ''

            this.current_page = 1
            this.last_args = "?page="+this.current_page

            this.onInitData(this.last_args)
        },
        onDelete(args){
            this.onDeleteConfirmation({
                url: 'data-dasar/rekanan/'+args.id,
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
        this.last_args = "?page="+this.current_page
        this.onInitData(this.last_args)
        
        this.$memory.set('last_route', this.$route.name)

    },    
    data() {
        return {
            // CORE
            callback_status: this.$store.state.callback.callback_status,
            current_page: 1,
            last_args: '',
            keyword: '',           

            judul: "Data Dasar Rekanan",
            user: this.$root.level, // 'Super Admin',
            
            theads: [
                {
                    title: "No",
                    width: "80"
                },
                {
                    title: 'Tahun',
                    width: '30',
                },
                {
                    title: "Nama",
                    width: ""
                },
                {
                    title: "Pimpinan",
                    width: ""
                },
                {
                    title: "NPWP",
                    width: ""
                },
                {
                    title: "Telp",
                    width: ""
                },
                {
                    title: "Alamat",
                    width: ""
                },
                {
                    title: "Aksi",
                    width: "100"
                },
            ],
        };
    },
};

</script>
