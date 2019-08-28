<template>
    <div class="page-single">
        <div class="container">
            <!-- dipanggil jike error -->
            <div v-if="$root.error.status" class="alert alert-icon alert-danger" role="alert">
                <i class="fe fe-info mr-2" aria-hidden="true"></i> {{ $root.error.message }}
            </div>
            <!-- dipanggil saat terjadi request di component ini  -->
            <div v-if="$root.request" class="alert bg-primary alert-success text-center" role="alert">
                <components is="loader-spinner" style="zoom: 0.75;" />
            </div>

            <div class="row">
                <div class="col col-login mx-auto">
                    <form @submit.prevent="" class="card card-login mb-2" >

                    <div class="card-header p-5" @click="jump({ path:'/' })" v-pointer>
                        <img src="../../../assets/logo.png" class="logo-login" alt="E-SPJ BAPPEDA">
                    </div>
                    <div class="card-body p-5">

                        <FormulirInput 
                            slot="input" 
                            title="Username" 
                            name="username" 
                            value="" 
                            placeholder="Username" />

                        <FormulirInput 
                            slot="input" 
                            title="Password" 
                            name="password" 
                            type="password"
                            value="" 
                            placeholder="Password" />

                        <div class="row">
                            <div class="col">
                                <FormulirDropdown slot="input" title="Tahun">
                                    <div slot="default" class="input-group">
                                        <select class="form-control selectize" name="tahun" id="tahun">
                                     <option v-for="(item, index) in get_listTahun" 
                                    :key="index" 
                                    :value="item">
                                    {{ item }}
                                    </option>
                                </select>
                                    </div>
                                </FormulirDropdown>
                            </div>
                            <div class="col">
                                <FormulirDropdown slot="input" title="Anggaran">
                                    <div slot="default" class="input-group">
                                        <select class="form-control selectize" name="jenis_anggaran" id="jenis_anggaran">
                                    <option v-for="(item, index) in get_listAnggaran" 
                                    :key="index" 
                                    :value="index">
                                    {{ item }}
                                    </option>
                                </select>
                                    </div>
                                </FormulirDropdown>
                            </div>
                        </div>

                        <div class="form-footer">
                            <button @click="onLogin()" class="btn btn-primary btn-block">
                            <i class="fe fe-log-in"></i> Sign in</button>
                            <button @click="onDownload()" class="btn btn-success btn-block">
                            <i class="fe fe-download"></i> Download</button>
                        </div>
                    </div>
                    </form>
                    <div class="text-center text-muted">
                        <small>
                  &copy; 2018 Badan Perencanaan Pembangunan Daerah<br>Provinsi Kalimantan Timur
                </small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex';
    export default {
        computed: {
            ...mapGetters({
                'get_listAnggaran': 'getters/login/listAnggaran',
                'get_listTahun': 'getters/login/listTahun',
                'get_listBerkas': 'getters/login/listBerkas',
            }),
            username(){
                var username = this.$memory.get('username')
                if(username) {
                    return ''
                } else {
                    return username
                }
            }
        },
        methods: {
            ...mapActions({
                'set_login': 'setters/api/login',
            }),
            // CORE: untuk mengambil data init pada page ini
            onInitData() {
                // error handler reset
                this.$root.error.status = false
                this.$root.error.message = ""
                this.$root.request = true // membuka spinner ui
                // sesuaikan dengan kebutuhan bisnis page ini
                const request = new Promise((resolve, reject) => {
                    axios.get('login').then((response) => {
                        console.log(response)
                        if(response == undefined) {
                            return resolve()
                        }

                        this.files = response.data.data.listBerkas
                        resolve(this.set_login(response.data.data))
                    }).catch((error) => {
                        reject(error);
                    })
                })
                return request;
            },
            onLogin() {
                // error handler reset
                this.$root.error.status = false
                this.$root.error.message = ""
                this.$root.request = true // membuka spinner ui

                const username = document.getElementById('username').value
                const password = document.getElementById('password').value
                const tahun = document.getElementById('tahun').value
                const jenis_anggaran = document.getElementById('jenis_anggaran').value

                const payload = {
                    username,
                    password,
                    tahun,
                    jenis_anggaran
                }

                axios.post('login', payload).then((response) => {

                    this.$root.welcome = false

                    if(response == undefined) {
                        return
                    }                    

                    if (response.data.data == "create" && response.data.security != undefined) {

                        // untuk edit profil
                        this.set_login(response.data)                        

                        this.$root.component = "Layout"

                        this.$root.auth = true
                        this.$root.level = response.data.security.scopes
                        this.$root.token = response.data.security.token
                        this.$root.signiture = response.data.security.signiture
                        this.$root.year = response.data.security.tahun
                        this.$root.jenis_anggaran = response.data.security.jenis_anggaran
                        this.$root.username = response.data.security.username

                        this.$memory.set('auth', this.$root.auth)
                        this.$memory.set('level', this.$root.level)
                        this.$memory.set('token', this.$root.token)
                        this.$memory.set('signiture', this.$root.signiture)
                        this.$memory.set('year', this.$root.year)
                        this.$memory.set('jenis_anggaran', this.$root.jenis_anggaran)
                        this.$memory.set('username', this.$root.username)

                        switch (this.$root.level) {
                            case 'Super Admin':
                                this.$root.beranda_url = 'data-dasar'
                            break;
                            case 'Supervisor':
                                this.$root.beranda_url = 'data-dasar'
                            break;
                            case 'Verifikator':
                                this.$root.beranda_url = 'verifikasi'
                            break;
                            case 'Penghubung':
                                this.$root.beranda_url = 'spj'
                            break;
                        }                        

                        setTimeout(() => {
                            this.jump({
                                name: this.$root.beranda_url
                            })
                        }, 500)
                    }

                }, (error) => {
                    return (error);
                })
            },
            onDownload() {
                var satuan = ''
                this.files.forEach((element, index) => {

                    satuan += `<a href="${this.$root.domain}/download/satuan/${element.id}" target="_blank" rel="noopener noreferrer" class="list-group-item list-group-item-action"><span style="color: blue;">${element.nama}</span> <br> "<span style="font-size: 14px; color: #0000006e;">${element.deskripsi}</span>"</a>`

                });
                this.$swal({
                    title: 'Download Berkas',
                    html: `
                        <p>
                            file tersedia dalam bentuk .zip atau satuan
                        </p>
                        <div class="list-group">
                            <a href="/zip" target="_blank" rel="noopener noreferrer"  class="list-group-item list-group-item-action list-group-item-success">
                                <b>Semua Berkas</b>
                            </a>
                        </div>
                        <br>
                        <div class="list-group" style="height: 250px !important; overflow-y: auto;">
                            ${satuan}
                        </div>                                
                    `,
                    allowOutsideClick: true,
                });
            }
        },
        mounted() {
            // CORE: untuk mengambil data init pada page ini
            this.onInitData()
        },
        data() {
            return {
                files: [],
            }
        }
    }
</script>

