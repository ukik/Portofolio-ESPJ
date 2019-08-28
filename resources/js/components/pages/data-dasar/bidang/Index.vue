<template>
    <div>
        <Toolbar :judul="judul" slot="toolbar">
            <RefreshButton @onRefresh="onRefresh()" />
            <AddButton route="data-dasar-bidang-create" name="Bidang" class="mr-2" />
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

        <TableView :items="get_bidang" :theads="theads" :action_visibility="user == 'Super Admin'">
            <template slot-scope="scope" v-if="get_bidang.length > 0">
                <tr class="bg-gray-dark-lightest font-weight-bold">
                    <td class="align-middle text-center">{{ scope.index + 1 }}</td>
                    <td class="align-middle">{{ scope.item.tahun }}</td>
                    <td class="align-middle">{{ scope.item.nama }}</td>
                    <td class="align-middle text-center">{{ scope.item.singkatan }}</td>
                    <td v-blank-inner="user == 'Super Admin'" class="text-center" v-if="user == 'Super Admin'">
                        <a @click="set_create({ induk: scope.item.id, nama: scope.item.nama }); jump({ name:'data-dasar-bidang-create' }); " class="icon"><i class="fe fe-plus"></i></a>
                        <a @click="set_form({ id: scope.item.id }); jump({ name:'data-dasar-bidang-edit' });" class="icon"><i class="fe fe-edit"></i></a>
                        <a @click="onDelete({ id: scope.item.id })" class="icon"><i class="fe fe-trash-2 text-danger"></i></a>
                    </td>
                </tr>
                <tr v-for="(item, index) in scope.item.sub" :key="index+'.'+scope.index">
                    <td class="align-middle text-center">{{ scope.index + 1 }}.{{ index + 1 }}</td>
                    <td class="align-middle">{{ scope.item.tahun }}</td>
                    <td class="align-middle">{{ item.nama }}</td>
                    <td class="align-middle text-center">{{ item.singkatan }}</td>
                    <td v-blank-inner="user == 'Super Admin'" class="text-center" v-if="user == 'Super Admin'">
                        <span class="text-muted">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <a @click="set_form({ child_id: item.id, induk: item.induk_id, nama: scope.item.nama }); jump({ name:'data-dasar-bidang-edit' });"
                            class="icon">
                            <i class="fe fe-edit"></i>
                        </a>
                        <a @click="onDelete({ id: item.id, child_id: item.id })" class="icon">
                            <i class="fe fe-trash-2 text-danger"></i>
                        </a>
                    </td>
                </tr>
            </template>
        </TableView>
    </div>
</template>

<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            'get_bidang': 'getters/data-dasar/bidang/bidang',
        }),
    },
    methods: {
        ...mapActions({
            'set_bidang': 'setters/api/data-dasar/bidang/bidang',
            'set_form': 'setters/non-api/data-dasar/bidang/form',  
            'set_create': 'setters/non-api/data-dasar/bidang/create',  
            'set_splice': 'setters/non-api/data-dasar/bidang/splice',
        }),
        // CORE: untuk mengambil data init pada page ini
        onInitData(){
            // error handler reset
            this.$root.error.status = false
            this.$root.error.message = ""
            this.$root.request = true // membuka spinner ui

            // sesuaikan dengan kebutuhan bisnis page ini
            const request = new Promise((resolve, reject) => {
                axios.get('data-dasar/bidang').then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }

                    resolve(this.set_bidang(response.data.data.bidang))
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
                url: 'data-dasar/bidang/'+args.id,
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


            user: this.$root.level, // 'Super Admin',
            judul: 'Data Dasar Bidang',

            theads: [{
                    title: 'No',
                    width: '30',
                },
                {
                    title: 'Tahun',
                    width: '30',
                },
                {
                    title: 'Nama Bidang',
                    width: '0',
                },
                {
                    title: 'Singkatan',
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
