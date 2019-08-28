<template>
    <div>
        <Toolbar :judul="judul" slot="toolbar">
            <RefreshButton @onRefresh="onRefresh()" />           
            <a  href="#" 
                onclick="return false;" 
                @click="onDisplayTanggal()" 
                class="btn btn-sm btn-outline-primary mr-2">
                <i class="fe fe-calendar"></i> {{ query_tanggal ? 'Sembunyikan Tanggal' : 'Tampilkan Tanggal' }}
            </a>    

            <a  href="#" 
                onclick="return false;" 
                @click="onAddRAB()"
                class="btn btn-sm btn-outline-primary mr-2">
                <i class="fe fe-plus"></i> Tambah RAB
            </a>          

            <a class="btn btn-sm btn-outline-secondary" @click="jump({ name:'lampiran-spk' })" >
                <i class="fe fe-corner-up-left"></i> Kembali
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

        <TableView :items="get_detail" :theads="theads">

            <template slot="thead">
              <tr class="bg-primary">
                <th class="align-middle text-light" width="30">No</th>
                <th v-if="query_tanggal" class="align-middle text-light" width="120">Tanggal</th>
                <th class="align-middle text-light">Uraian</th>
                <th class="align-middle text-light" width="80">Volume</th>
                <th class="align-middle text-light" width="120">Satuan</th>
                <th class="align-middle text-light" width="120">Harga</th>
                <th class="align-middle text-light" width="160">Total</th>
                <th class="align-middle text-light" width="50">Aksi</th>
              </tr>
            </template>

            <tbody slot="tbody"> 
                <tr v-for="(item, index) in get_detail" :id="'rab['+item.id+']'" :key="index">
                    <td class="align-middle text-center">{{ index + 1 }}</td>

                    <td v-if="query_tanggal && listDate.length > 0" class="align-middle" v-null-info="item.tanggal">

                        <datetime 
                            :id="'tanggal['+item.id+']'"
                            input-class="form-control"
                            :name="'tanggal['+item.id+']'" 
                            type="date"
                            format="yyyy-MM-dd" 
                            value-zone="Asia/Makassar"
                            zone="Asia/Makassar"                        
                            v-model="listDate[index].tanggal">
                        </datetime>                     
                    </td>

                    <td class="align-middle" v-null-info="item.uraian">
                        <input type="text" 
                        class="form-control form-control-sm" 
                        :name="'uraian['+item.id+']'"  
                        :id="'uraian['+item.id+']'"
                        v-model.trim="item.uraian">
                    </td>

                    <td class="align-middle" v-nan-info="item.volume">
                        <input type="number" 
                        class="form-control form-control-sm text-center volume" 
                        :name="'volume['+item.id+']'" 
                        :id="'volume['+item.id+']'"
                        @blur="onFilterNumberAndDecimal({event:$event, index, item:'volume'})"
                        v-model.trim.number="item.volume">
                    </td>

                    <td class="align-middle" v-null-info="item.satuan">
                        <input type="text" 
                        class="form-control form-control-sm text-center satuan" 
                        :name="'satuan['+item.id+']'"
                        :id="'satuan['+item.id+']'"
                        v-model.trim="item.satuan"> 
                    </td>
                    <td class="align-middle" v-nan-info="item.harga">
                        <input type="number" 
                        class="form-control form-control-sm text-right harga" 
                        :name="'harga['+item.id+']'" 
                        :id="'harga['+item.id+']'"
                        @blur="onFilterNumberAndDecimal({event:$event, index, item:'harga'})"
                        v-model.trim.number="item.harga"> 
                    </td>

                    <td class="align-middle">
                        <input type="number" 
                        class="form-control form-control-sm text-right jumlah" 
                        :name="'jumlah['+item.id+']'" 
                        :id="'jumlah['+item.id+']'" 
                        :value="item.jumlah | rupiah2" disabled>
                    </td>

                    <td class="text-center">
                        <a @click="onDelete(index)" class="icon ml-2">
                          <i class="fe fe-trash-2 text-danger"></i>
                        </a>
                    </td>
                </tr>
            </tbody>

            <template slot="tfoot">
                <tr class="bg-light">
                    <th :colspan="query_tanggal ? 6 : 5" class="text-right">Subtotal :</th>
                    <th class="text-right">{{ subtotal | rupiah2 }}</th>
                    <th></th>
                </tr>
                <tr class="bg-light">
                    <th :colspan="query_tanggal ? 6 : 5" class="text-right">PPN :</th>
                    <th class="text-right">{{ ppn | rupiah2 }}</th>
                    <th></th>
                </tr>
                <tr class="bg-light">
                    <th :colspan="query_tanggal ? 6 : 5" class="text-right">Total :</th>
                    <th class="text-right">{{ total | rupiah2 }}</th>
                    <th></th>
                </tr>
            </template>


        </TableView>

        <FormulirButton @onSubmit="onSubmit()" slot="button" />  

    </div>
</template>




<script>

import {  mapGetters, mapActions } from 'vuex';

function CalculatorRAB(args){
    var data = 0
    args.forEach(element => {
      if(!isNaN(element.volume) && !isNaN(element.harga)) {
          data += element.volume * element.harga
      }            
    })
    return data
}


export default {
    computed: {
        ...mapGetters({
            'get_detail':'getters/lampiran/spk/detail',
            'get_form': 'getters/lampiran/spk/form',
        }),
        query_tanggal(){
            return this.$route.query.tanggal
        },        
    },
    watch: {
      get_detail: {
        handler: function(val, oldVal) {

          var data = 0

          for (let i = 0; i < val.length; i++) {
            if (!isNaN(val[i].volume) && !isNaN(val[i].harga)) {
              val[i].jumlah = val[i].volume * val[i].harga;
              data += val[i].jumlah 
            }
          }

          this.subtotal = data
          this.ppn = data * 0.1
          this.total = this.subtotal - this.ppn

        },
        deep: true
      }
    },    
    methods: {
        ...mapActions({
            'set_detail':'setters/api/lampiran/spk/detail',
        }),    
        // CORE: untuk mengambil data init pada page ini
        onInitData(){
          // error handler reset
          this.$root.error.status = false
          this.$root.error.message = ""
          this.$root.request = true // membuka spinner ui

            const id = this.get_form.id

          // sesuaikan dengan kebutuhan bisnis page ini
          const request = new Promise((resolve, reject) => {
              axios.get('lampiran/spk/'+id+'/rab?tanggal=true').then((response) => {
                if(response == undefined) {
                    return resolve()
                }

                response.data.data.detail.forEach(element => {
                  this.listDate.push({ tanggal: element.tanggal, id: element.id })  
                });

                  resolve(this.set_detail(response.data.data.detail))
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

          console.log(this.listDate)

          let tanggal = {}
          this.listDate.forEach((element, index) => {
            tanggal[element.id] = (element.tanggal).split('T')[0] 
          })

          let uraian = {}
          this.get_detail.forEach((element, index) => {
            const data = document.getElementById('uraian['+element.id+']').value 
            uraian[element.id] = data
          });

          let volume = {}
          this.get_detail.forEach((element, index) => {
            const data = document.getElementById('volume['+element.id+']').value 
            volume[element.id] = data
          });

          let satuan = {}
          this.get_detail.forEach((element, index) => {
            const data = document.getElementById('satuan['+element.id+']').value 
            satuan[element.id] = data
          });

          let harga = {}
          this.get_detail.forEach((element, index) => {
            const data = document.getElementById('harga['+element.id+']').value 
            harga[element.id] = data
          });

          const payload = { id, tanggal, uraian, volume, satuan, harga }

          const request = new Promise((resolve, reject) => {
              axios.put('lampiran/spk/'+id+'/rab', payload).then((response) => {
                  resolve(response)
              }).catch((error) => {
                  reject(error);
              })
          })                     

        },        

        onDelete(args) {
          this.get_detail.splice(args, 1);
        },
        onDisplayTanggal() {
          var display

          if(this.$route.query.tanggal) {
              display = false
          } else {
              display = true
          }

          this.jump({ name: "lampiran-spk-rab", query: { tanggal: display } });
        },
        onAddRAB() {
          this.listDate.push({ tanggal: this.TanggalHariIni(), id: Number(this.get_detail.length) + 1, }) 

          this.get_detail.push({
            id: Number(this.get_detail.length) + 1,
            spk_rab_id: this.get_form.id,
            tanggal: this.TanggalHariIni(),
            uraian: "",
            volume: 0,
            satuan: "",
            harga: 0,
            jumlah: 0,
            created_at: "",
            updated_at: ""
          });

        },     
    },  
    mounted() {
      // CORE: untuk mengambil data init pada page ini
      this.onInitData()

      this.nominal = CalculatorRAB(this.get_detail)
      this.subtotal = CalculatorRAB(this.get_detail) * 0.1 // 10%
      this.total = this.subtotal - this.ppn

  },

  data() {
    return {
      judul: "Data RAB SPK Nomor : " + this.$store.state.lampiran_spk.form.nomor_spk,
      user: "Super Admin",
      // items: data.detail,

      subtotal: 0, //CalculatorRAB(data.detail),
      ppn: 0, //CalculatorRAB(data.detail) * 0.1, // 10%
      total: 0,

      listDate: [],

      theads: [
        {
          title: "No",
          width: "30"
        },

        {
          title: "Tanggal",
          width: "120"
        },
        {
          title: "Uraian",
          width: "80"
        },
        {
          title: "Volume",
          width: "120"
        },
        {
          title: "Satuan",
          width: "120"
        },
        {
          title: "Harga",
          width: "160"
        },
        {
          title: "Total",
          width: "50"
        },
        {
          title: "Aksi",
          width: "100"
        }
      ]
    };
  },
}



</script>