<template>
    <div id="headerMenuCollapse" 
        class="header d-lg-flex p-0 collapse">
        
        <div class="container" v-if="$root.auth">
            <div class="row align-items-center">
                <div class="col-lg order-lg-first" >
                    <ul class="nav nav-tabs border-0 flex-column flex-lg-row">

                        <NavItem v-if="$root.level == 'Super Admin' || $root.level == 'Supervisor'">
                            <a slot="item" 
                            @click="jump({ name: 'data-dasar'});" 
                            class="nav-link"
                            :data-toggle="data_toggle"
                            data-target="#headerMenuCollapse">
                                <i class="fe fe-home"></i> Data Dasar
                            </a>
                        </NavItem>

                        <NavItem v-if="$root.level == 'Super Admin' || $root.level == 'Penghubung' || $root.level == 'Supervisor'">
                            <a slot="item" class="nav-link " data-toggle="dropdown">
                                <i class="fe fe-file"></i>Permohonan
                            </a>

                            <a slot="dropdown-item" 
                                @click="jump({ name: 'permohonan-ganti-uang'})" 
                                class="dropdown-item"
                                :data-toggle="data_toggle"
                                data-target="#headerMenuCollapse">
                                Ganti Uang Persediaan(GU)
                            </a>

                            <a slot="dropdown-item" 
                                class="dropdown-item"
                                :data-toggle="data_toggle"
                                data-target="#headerMenuCollapse">                                Pembayaran Langsung (LS)
                            </a>

                            <div slot="dropdown-item" class="dropdown-divider" />

                            <a slot="dropdown-item" 
                                @click="jump({ name: 'permohonan-uang-persediaan'})" 
                                class="dropdown-item"
                                :data-toggle="data_toggle"
                                data-target="#headerMenuCollapse">
                                Uang Persediaan (UP)
                            </a>

                            <a slot="dropdown-item" 
                                class="dropdown-item"
                                :data-toggle="data_toggle"
                                data-target="#headerMenuCollapse">                                Tambah Uang Persediaan (TU)
                            </a>
                        </NavItem>

                        <NavItem v-if="$root.level == 'Super Admin' || $root.level == 'Penghubung' || $root.level == 'Supervisor'">
                            <a slot="item" class="nav-link " data-toggle="dropdown">
                                <i class="fe fe-layers"></i>Proses Lampiran
                            </a>

                            <a slot="dropdown-item" 
                                @click="jump({ name:'lampiran-perjadin-perubahan' })"  
                                class="dropdown-item"
                                :data-toggle="data_toggle"
                                data-target="#headerMenuCollapse">
                                SPT
                            </a>

                            <a slot="dropdown-item" 
                                @click="jump({ name:'lampiran-honor' })"  
                                class="dropdown-item"
                                :data-toggle="data_toggle"
                                data-target="#headerMenuCollapse">
                                Honor
                            </a>

                            <a slot="dropdown-item" 
                                @click="jump({ name:'lampiran-spk' })"  
                                class="dropdown-item"
                                :data-toggle="data_toggle"
                                data-target="#headerMenuCollapse">
                                SPK
                            </a>
                        </NavItem>

                        <NavItem v-if="$root.level == 'Super Admin' || $root.level == 'Penghubung' || $root.level == 'Supervisor'">
                            <a slot="item" class="nav-link " data-toggle="dropdown">
                                <i class="fe fe-refresh-cw"></i>Perubahan Lampiran
                            </a>

                            <a slot="dropdown-item" 
                                @click="jump({ name:'lampiran-perjadin-perubahan' })"  
                                class="dropdown-item"
                                :data-toggle="data_toggle"
                                data-target="#headerMenuCollapse">
                                SPT
                            </a>

                            <a slot="dropdown-item" 
                                @click="jump({ name:'lampiran-honor' })" 
                                class="dropdown-item"
                                :data-toggle="data_toggle"
                                data-target="#headerMenuCollapse">
                                Honor
                            </a>

                            <a slot="dropdown-item" 
                                @click="jump({ name:'lampiran-spk' })"  
                                class="dropdown-item"
                                :data-toggle="data_toggle"
                                data-target="#headerMenuCollapse">
                                SPK
                            </a>
                        </NavItem>

                        <NavItem v-if="$root.level == 'Super Admin' || $root.level == 'Penghubung' || $root.level == 'Supervisor'">
                            <a slot="item" 
                                @click="jump({ name: 'spj'})" 
                                class="nav-link "
                                :data-toggle="data_toggle"
                                data-target="#headerMenuCollapse">
                                <i class="fe fe-file-text"></i>SPJ
                            </a>
                        </NavItem>

                        <NavItem v-if="$root.level == 'Super Admin' || $root.level == 'Verifikator'">
                            <a slot="item" 
                                @click="jump({ name: 'verifikasi'})" 
                                class="nav-link "
                                :data-toggle="data_toggle"
                                data-target="#headerMenuCollapse">
                                <i class="fe fe-check-circle"></i>Verifikasi
                            </a>
                        </NavItem>

                        <NavItem v-if="$root.level == 'Super Admin' || $root.level == 'Penghubung' || $root.level == 'Supervisor'">
                            <a slot="item" 
                                @click="jump({ name: 'rekap' })" 
                                class="nav-link "
                                :data-toggle="data_toggle"
                                data-target="#headerMenuCollapse">
                                <i class="fe fe-file-text"></i>Resume
                            </a>
                        </NavItem>

                        <NavItemRight v-if="$root.level == 'Super Admin'">
                            <a slot="item" 
                                @click="jump({ name: 'pengaturan' })" 
                                class="nav-link "
                                :data-toggle="data_toggle"
                                data-target="#headerMenuCollapse">
                                <i class="fe fe-settings"></i>Pengaturan
                            </a>
                        </NavItemRight>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            data_toggle: 'not-collapse',
        }
    },
    mounted(){

        const vm = this

        window.onresize = function() {
            if(window.innerWidth <= 991) {
                vm.data_toggle = 'collapse'                
            } else {
                vm.data_toggle = 'not-collapse'
            }
        }   

        if(window.innerWidth <= 991) {
            this.data_toggle = 'collapse'                
        } else {
            this.data_toggle = 'not-collapse'
        }
    }
}
</script>
