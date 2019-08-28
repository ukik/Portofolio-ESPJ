<template>
<div>
    <Toolbar :judul="judul" slot="toolbar">
        <RefreshButton @onRefresh="onRefresh()" />         
        <AddButton route="data-dasar-pegawai-create" name="Pegawai" class="mr-2" />
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

    <TableView :items="get_pegawai.data" :theads="theads" >

        <Dropdown slot="pivot" 
            init="Semua Bidang" 
            name="bidang"
            value="id" 
            label="nama" 
            param="bidang" 
            :options="get_listBidang" />

        <Dropdown slot="pivot" 
            init="Semua Jenis Pegawai" 
            name="jenis"
            value="" 
            label="" 
            param="jenis" 
            :options="options_jenis" />

        <Keyword slot="pivot" 
            name="keyword"
            param="keyword" 
            @onSearch="onSearch()" />

        <ResetButton @onReset="onReset()" slot="pivot" 
            v-if="bidang != '' || jenis != '' || keyword != ''"/>

        <template slot-scope="scope" v-if="get_pegawai.data.length > 0" :action_visibility="user == 'Super Admin'">
            <tr>
                <td class="align-middle text-center">{{ scope.index + 1 }}</td>
                <td class="align-middle">{{ scope.item.tahun }}</td>
                <td class="align-middle">{{ scope.item.nip }}</td>
                <td class="align-middle">{{ scope.item.nama_lengkap }}</td>

                <td v-jenis-kelamin="scope.item.jenis_kelamin" class="align-middle text-center"></td>

                <td class="align-middle text-center">{{ scope.item.jabatan }}</td>
                <td class="align-middle text-center" v-if="scope.item.bidang == null"> - </td>
                <td class="align-middle text-center" v-else> {{ scope.item.bidang.nama }} </td>

                <td class="text-center">

                    <a v-if="user == 'Super Admin'"
                        @click="set_form({ id: scope.item.id }); jump({ name:'data-dasar-pegawai-edit' })"
                        class="icon">
                        <i class="fe fe-edit"></i>
                    </a>

                    <a v-if="user == 'Super Admin'"
                        href="#"
                        onclick="return false;"
                        @click="onDelete({ id: scope.item.id })"
                        class="icon">
                        <i class="fe fe-trash-2 text-danger"></i>
                    </a>
                </td>
            </tr>
        </template>

        <Paginator 
            slot="paginate" 
            :totalPage="get_pegawai.last_page" 
            @btnClick="onPaginator"></Paginator>

    </TableView>
</div>
</template>

<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            'get_pegawai': 'getters/data-dasar/pegawai/pegawai',
            'get_listBidang': 'getters/data-dasar/pegawai/listBidang',
        }),
        table_row_number() {
            const vm = this
            return function (index) {
                return index + 1 + (vm.get_pegawai.current_page - 1) * vm.get_pegawai.per_page
            }
        },
    },
    methods: {
        ...mapActions({
            'set_pegawai': 'setters/api/data-dasar/pegawai/pegawai',
            'set_form': 'setters/non-api/data-dasar/pegawai/form',  
            'set_splice': 'setters/non-api/data-dasar/pegawai/splice',
        }),
        // CORE: untuk mengambil data init pada page ini
        onInitData(args){
            // error handler reset
            this.$root.error.status = false
            this.$root.error.message = ""
            this.$root.request = true // membuka spinner ui

            console.log('data-dasar/pegawai'+args)

            // sesuaikan dengan kebutuhan bisnis page ini
            const request = new Promise((resolve, reject) => {
                axios.get('data-dasar/pegawai'+args).then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }
                                        
                    resolve(this.set_pegawai(response.data.data))
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

            this.jenis = ''
            this.bidang = ''
            this.keyword = ''

            document.getElementById('jenis').selectedIndex = jenis
            document.getElementById('bidang').selectedIndex = bidang
            document.getElementById('keyword').value = ''           

            this.current_page = pageNum
            this.last_args = "?page="+this.current_page

            this.$nextTick(() => {
                this.onInitData(this.last_args)
            })
        },
        onSearch(){
            
            const jenis = document.getElementById('jenis').value
            const bidang = document.getElementById('bidang').value
            const keyword = document.getElementById('keyword').value

            this.jenis = jenis
            this.bidang = bidang
            this.keyword = keyword

            this.last_args = "?jenis="+jenis+"&bidang="+bidang+"&keyword="+keyword

            this.onInitData(this.last_args).then(() => {

                document.getElementById('jenis').value = this.jenis
                document.getElementById('bidang').selectedIndex = this.bidang

            })
        },
        onReset(){

            this.jenis = ''
            this.bidang = ''
            this.keyword = ''

            document.getElementById('jenis').selectedIndex = jenis
            document.getElementById('bidang').selectedIndex = bidang
            document.getElementById('keyword').value = ''

            this.current_page = 1
            this.last_args = "?page="+this.current_page

            this.onInitData(this.last_args)
        },
        onDelete(args){
            this.onDeleteConfirmation({
                url: 'data-dasar/pegawai/'+args.id,
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
            jenis: '',
            bidang: '',
            keyword: '',           

            judul: "Data Dasar Pegawai",
            user: this.$root.level, // 'Super Admin',

            options_jenis: ['PNS', 'Honorner', 'Instansi Luar'],

            theads: [{
                    title: "No",
                    width: "80"
                },
                {
                    title: 'Tahun',
                    width: '30',
                },
                {
                    title: "Nik",
                    width: "0"
                },
                {
                    title: "Nama",
                    width: "0"
                },
                {
                    title: "Jenis Kelamin",
                    width: "0"
                },
                {
                    title: "Jabatan",
                    width: "0"
                },
                {
                    title: "Bidang",
                    width: "0"
                },
                {
                    title: "Aksi",
                    width: "100"
                }
            ],
        };
    },

};

</script>
