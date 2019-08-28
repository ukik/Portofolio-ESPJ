<template>
<div>
    <Toolbar :judul="judul" slot="toolbar">
        <RefreshButton @onRefresh="onRefresh()" />          
        <DropdownButton 
            class="mr-2" 
            classname="primary" 
            :name="'Tampilan Dalam '+ ($route.query.view == undefined ? 'Bulan' : 'Triwulan')">

            <a v-pointer class="dropdown-item" 
            @click="history += 1; jump({ name:'pengaturan-aliran-kas-rincian' })">Bulan</a>
            <a v-pointer class="dropdown-item" 
            @click="history += 1; jump({ name:'pengaturan-aliran-kas-rincian', query:{ view:'triwulan' } })">Triwulan</a>
        </DropdownButton>          
        <BackButton @onBack="history -= 1"/>
        <a v-if="history > 0"
            class="btn btn-sm btn-outline-danger ml-2" 
            href="#"
            onclick="return false;" 
            @click="jump({ name: origin })" >
            <i class="fe fe-x"></i> 
            Tutup
        </a>        
    </Toolbar>

    <!-- dipanggil jike error -->
    <div v-if="$root.error.status" class="alert alert-icon alert-danger" role="alert">
        <i class="fe fe-info mr-2" aria-hidden="true"></i> {{ $root.error.message }}
    </div>

    <!-- dipanggil saat terjadi request di component ini  -->
    <div v-if="$root.request" class="alert bg-primary alert-success text-center" role="alert">
        <components is="loader-spinner" style="zoom: 0.75;" />
    </div>    
    
    <TableView :items="get_rincian">

        <div slot="pre-information">
            <div class="row">
                <div class="col">
                    <div class="card">
                        <div class="table-responsive">
                            <table class="table table-hover table-sm table-outline table-vcenter text-nowrap card-table">
                                <tr v-if="get_program">
                                    <th>Program</th>
                                    <th>:</th>
                                    <td>[{{ get_program.kode_dpa }}] &nbsp; {{ get_program.nama }}</td>
                                </tr>
                                <tr>
                                    <th>Kegiatan</th>
                                    <th>:</th>
                                    <td>[{{ get_kegiatan.kode_dpa }}] &nbsp; {{ get_kegiatan.nama }}</td>
                                </tr>
                                <tr v-if="get_kegiatan.kpa_singkatan">
                                    <th>KPA</th>
                                    <th>:</th>
                                    <td>{{ get_kegiatan.kpa_singkatan }}</td>
                                </tr>
                                <tr v-if="get_kegiatan.pptk_singkatan">
                                    <th>PPTK</th>
                                    <th>:</th>
                                    <td>{{ get_kegiatan.pptk_singkatan }}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <tr slot="thead" class="bg-primary text-light">
            <th rowspan="2" class="align-middle text-light">Kode Rekening</th>
            <th rowspan="2" class="align-middle text-light">Uraian</th>
            <th rowspan="2" class="align-middle text-light">Pagu</th>
            <th colspan="12" class="align-middle text-light">Aliran Kas</th>
        </tr>
        <tr slot="thead" class="bg-primary text-light">
            <th v-for="(item, index) in triwulan" :key="index" v-bulan-or-triwulan="{ item, triwulan }" class="align-middle text-light">
            </th>
        </tr>

        <template v-if="get_rincian.length > 0" slot-scope="scope">

            <tr v-belanja="scope.item.jenis">
                <td class="align-middle" :inner-text.prop="scope.item.jenis == 'kegiatan' ? '5.2' : scope.item.kode_rekening" nowrap>
                </td>

                <td class="align-middle" :inner-html.prop="scope.item.jenis == 'kegiatan' ? 'BELANJA LANGSUNG' : scope.item.nama" nowrap>
                </td>

                <td class="align-middle text-right">{{ scope.item.pagu | rupiah2 }}</td>
                <td v-for="(item, index) in triwulan" :key="index" class="align-middle text-right">
                    {{ triwulan_sum({ index, nominal:scope.item.aliran_kas }) | rupiah2 }}
                </td>
            </tr>
        </template>

        <tbody v-if="get_rincian.length <= 0" slot="tbody" v-no-data="{ colspan:4+triwulan }" />

    </TableView>
    <p />

</div>
</template>

<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            'get_tahun': 'getters/pengaturan/aliran-kas/tahun',
            'get_jenis_anggaran': 'getters/pengaturan/aliran-kas/jenis_anggaran',
            'get_program': 'getters/pengaturan/aliran-kas/program',
            'get_kegiatan': 'getters/pengaturan/aliran-kas/kegiatan',
            'get_rincian': 'getters/pengaturan/aliran-kas/rincian',        
        }),
        triwulan() {
            return this.$route.query.view == 'triwulan' ? 4 : 12
        },
        triwulan_sum() {
            return function (args) {

                if (this.triwulan == 12) {
                    try {
                        return args.nominal[args.index].rencana
                    } catch (error) {
                        return 0
                    }
                }

                var count = 0
                switch (args.index) {
                    case 0:
                        try {
                            count += args.nominal[0].rencana
                            count += args.nominal[1].rencana
                            count += args.nominal[2].rencana
                            return count
                        } catch (error) {
                            return 0
                        }

                        break
                    case 1:
                        try {
                            count += args.nominal[3].rencana
                            count += args.nominal[4].rencana
                            count += args.nominal[5].rencana
                            return count
                        } catch (error) {
                            return 0
                        }
                        break
                    case 2:
                        try {
                            count += args.nominal[6].rencana
                            count += args.nominal[7].rencana
                            count += args.nominal[8].rencana
                            return count
                        } catch (error) {
                            return 0
                        }
                        break
                    case 3:
                        try {
                            count += args.nominal[9].rencana
                            count += args.nominal[10].rencana
                            count += args.nominal[11].rencana
                            return count
                        } catch (error) {
                            return 0
                        }
                        break
                }
            }
        }        
    },
    methods: {
        ...mapActions({
            'set_edit': 'setters/api/pengaturan/aliran-kas/edit',
        }),    
        // CORE: untuk mengambil data init pada page ini
        onInitData(){
          // error handler reset
          this.$root.error.status = false
          this.$root.error.message = ""
          this.$root.request = true // membuka spinner ui

          const id = this.$route.params.id

          // sesuaikan dengan kebutuhan bisnis page ini
          const request = new Promise((resolve, reject) => {
              axios.get('pengaturan/aliran-kas/'+id+'/rincian').then((response) => {
                if(response == undefined) {
                    return resolve()
                }

                  resolve(this.set_edit(response.data.data))
              }).catch((error) => {
                  reject(error);
              })
          })
          return request
        },  
        // CORE: untuk refresh data init pada page ini
        onRefresh(){
          // CORE: untuk mengambil data init pada page ini
          this.onInitData()
        },      
    },  
    mounted() {
      // CORE: untuk mengambil data init pada page ini
      this.onInitData()
      
      switch(this.$route.query.origin) {
        case "data-dasar":
            this.origin = "data-dasar-dpa"
            break
        case "pengaturan":
            this.origin = "pengaturan-aliran-kas"
            break
      }

    },
    data() {
        return {
            judul: 'Rincian Aliran Kas',
            user: this.$root.level, // 'Super Admin',

            history: 0,
            origin: ''
        }
    },
}

</script>