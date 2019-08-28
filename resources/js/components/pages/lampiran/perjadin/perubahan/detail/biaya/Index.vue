<template>
    <div>
        <Toolbar :judul="judul" slot="toolbar">
            <RefreshButton @onRefresh="onRefresh()" />           
            <a  href="#" 
                onclick="return false;" 
                v-if="get_perjadin.status == 0"
                @click="onAddRAB()"
                class="btn btn-sm btn-outline-primary mr-2">
                <i class="fe fe-plus"></i> Tambah RAB
            </a>          
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

        <TableView :items="get_biaya" :theads="theads">

            <tr slot="thead" v-if="get_perjadin.status == 0" class="bg-primary text-light">
                <th v-for="(item, index) in theads" 
                  :key="index" 
                  v-table-view-th="item.width">{{ item.title }}</th>
            </tr>

            <tbody slot="tbody"> 
                <tr v-for="(item, index) in get_biaya" :id="'detail['+item.id+']'" :key="index">    
                    <td class="align-middle text-center">{{ index + 1 }}</td>

                    <td class="align-middle" v-null-info="item.rincian">
                        <input v-if="get_perjadin.status == 0"
                            type="text" 
                            class="form-control form-control-sm" 
                            :name="'rincian['+item.id+']'"
                            :id="'rincian['+item.id+']'"
                            v-model.trim="item.rincian" >

                        {{ get_perjadin.status != 0 ? item.rincian : '' }}
                    </td>

                    <td class="align-middle text-center" v-nan-info="item.volume">
                        <input v-if="get_perjadin.status == 0"
                            type="text" 
                            class="form-control form-control-sm text-center numeric volume" 
                            :name="'volume['+item.id+']'" 
                            :id="'volume['+item.id+']'" 
                            @blur="onFilterNumberAndDecimal({event:$event, index, item:'volume'})"
                            v-model.trim.number="item.volume" >

                        {{ get_perjadin.status != 0 ? item.volume : '' }}
                    </td>

                    <td class="align-middle text-center" v-null-info="item.satuan">
                        <input v-if="get_perjadin.status == 0"
                            type="text" 
                            class="form-control form-control-sm text-center satuan" 
                            :name="'satuan['+item.id+']'" 
                            :id="'satuan['+item.id+']'" 
                            v-model.trim="item.satuan" >
 
                        {{ get_perjadin.status != 0 ? item.satuan : '' }}

                    </td>

                    <td class="align-middle text-right" v-nan-info="item.harga">
                       <input v-if="get_perjadin.status == 0"
                            type="text" 
                            class="form-control form-control-sm text-right numeric harga" 
                            :name="'harga['+item.id+']'" 
                            :id="'harga['+item.id+']'" 
                            @blur="onFilterNumberAndDecimal({event:$event, index, item:'harga'})"
                            v-model.trim.number="item.harga" >
 
                        {{ get_perjadin.status != 0 ? item.harga : '' }}

                    </td>

                    <td class="align-middle text-right">
                        <input v-if="get_perjadin.status == 0"
                            type="text" 
                            class="form-control form-control-sm text-right numeric jumlah" 
                            :name="'jumlah['+item.id+']'" 
                            :id="'jumlah['+item.id+']'" 
                            :value="item.jumlah | rupiah2" disabled>

                        {{ get_perjadin.status != 0 ? item.jumlah : '' }}
 
                    </td>

                    <td class="align-middle text-right">
                        <input v-if="get_perjadin.status == 0"
                            type="text" 
                            class="form-control form-control-sm" 
                            :name="'keterangan['+item.id+']'" 
                            :id="'keterangan['+item.id+']'" 
                            v-model.trim="item.keterangan" >
 
                        {{ get_perjadin.status != 0 ? item.keterangan : '' }}
 
                    </td>

                    <td v-if="get_perjadin.status == 0"
                        class="align-middle text-center">
 
                        <a @click="onDelete(index)" class="icon">
                            <i class="fe fe-trash-2 text-danger"></i>
                        </a>

                    </td>
                </tr>
            </tbody>

            <template slot="tfoot">
                <tr class="bg-light">
                    <th colspan="6" class="text-right">Total :</th>
                    <th class="text-right">{{ nominal | rupiah2 }}</th>
                    <th :colspan="get_perjadin.status != 0 ? 1 : 2"></th>
                </tr>
            </template>

        </TableView>

        <FormulirButton @onSubmit="onSubmit()" slot="button" />        
    </div>
</template>


<script>

import {  mapGetters, mapActions } from 'vuex';

function CalculatorRAB(args) {
  var data = 0;
  args.forEach(element => {
    if (!isNaN(element.volume) && !isNaN(element.harga)) {
      data += element.volume * element.harga;
    }
  });
  return data;
}

export default {
    computed: {
        ...mapGetters({
            'get_perjadin': 'getters/lampiran/perjadin/detail/perjadin',
            'get_biaya':'getters/lampiran/perjadin/detail/biaya',
            'get_form': 'getters/lampiran/perjadin/form',
            'get_form_detail': 'getters/lampiran/perjadin/detail/form',
        }),
    },
    watch: {
      get_biaya: {
        handler: function(val, oldVal) {
          var data = 0;

          for (let i = 0; i < val.length; i++) {
            if (!isNaN(val[i].volume) && !isNaN(val[i].harga)) {
              val[i].jumlah = val[i].volume * val[i].harga;
              data += val[i].jumlah;
            }
          }

          this.nominal = data;
        },
        deep: true
      }
    },    
    methods: {
        ...mapActions({
            'set_biaya':'setters/api/lampiran/perjadin/detail/biaya',
        }),    
        // CORE: untuk mengambil data init pada page ini
        onInitData(){
          // error handler reset
          this.$root.error.status = false
          this.$root.error.message = ""
          this.$root.request = true // membuka spinner ui

            const id = this.get_form.id
            const id_detail = this.get_form_detail.id

          // sesuaikan dengan kebutuhan bisnis page ini
          const request = new Promise((resolve, reject) => {
              axios.get('lampiran/perjadin/'+id+'/detail/'+id_detail+'/biaya').then((response) => {
                  if(response == undefined) {
                      return resolve()
                  }

                  resolve(this.set_biaya(response.data.data))
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
        onSubmit(){
          // error handler reset
          this.$root.error.status = false
          this.$root.error.message = ""
          this.$root.request = true // membuka spinner ui
          
          const id = this.get_form.id
          const id_detail = this.get_form_detail.id

          let payload = {}

          if (this.get_perjadin.status == 0) {

            let rincian = {}
            this.get_biaya.forEach((element, index) => {
              const data = document.getElementById('rincian['+element.id+']').value 
              rincian[element.id] = data
            });

            let volume = {}
            this.get_biaya.forEach((element, index) => {
              const data = document.getElementById('volume['+element.id+']').value 
              volume[element.id] = data
            });

            let satuan = {}
            this.get_biaya.forEach((element, index) => {
              const data = document.getElementById('satuan['+element.id+']').value 
              satuan[element.id] = data
            });

            let harga = {}
            this.get_biaya.forEach((element, index) => {
              const data = document.getElementById('harga['+element.id+']').value 
              harga[element.id] = data
            });

            let keterangan = {}
            this.get_biaya.forEach((element, index) => {
              const data = document.getElementById('keterangan['+element.id+']').value 
              keterangan[element.id] = data
            });

            payload = { rincian, volume, satuan, harga, keterangan }

          }

          const request = new Promise((resolve, reject) => {
              axios.put('lampiran/perjadin/'+id+'/detail/'+id_detail+'/biaya', payload).then((response) => {
                  resolve(response)
              }).catch((error) => {
                  reject(error);
              })
          })                     

        },        

        onDelete(args) {
          this.get_biaya.splice(args, 1);
        },
        onAddRAB() {
          this.get_biaya.push( {
            id: this.get_biaya + 1,
            urut: this.get_biaya + 1,
            perjadin_id: this.get_biaya + 1,
            perjadin_detail_id: this.get_biaya + 1,
            rincian: "",
            harga: 0,
            volume: 0,
            satuan: "",
            jumlah: 0,
            keterangan: null,
            created_at: "",
            updated_at: ""
          });
        },         
    },  
    mounted() {
      // CORE: untuk mengambil data init pada page ini
      this.onInitData()

      this.nominal = CalculatorRAB(this.get_biaya)

  },

  data() {
    return {
      judul: "Rincian Perhitungan Perjalanan Dinas" + this.$store.state.lampiran_perjadin_detail.form.pegawai_nama,
      user: "Super Admin",

      nominal: 0,

      theads: [
        {
          title: "No",
          width: "30"
        },
        {
          title: "Uraian",
          width: "0"
        },
        {
          title: "Volume",
          width: "80"
        },
        {
          title: "Satuan",
          width: "120"
        },
        {
          title: "Harga",
          width: "120"
        },
        {
          title: "Jumlah",
          width: "160"
        },
        {
          title: "Keterangan",
          width: "0"
        },
        {
          title: "Aksi",
          width: "50"
        },        
      ]
    };
  },
}

</script>