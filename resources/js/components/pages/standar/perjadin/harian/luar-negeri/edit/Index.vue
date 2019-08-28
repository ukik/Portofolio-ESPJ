<template>
    <div>
        <Toolbar judul="Edit Standar Perjadin Harian" slot="title">
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

        <Formulir column_content="col-12">

            <FormulirLegend slot="legend" title="Edit Standar Perjadin Harian" />

            <FormulirTextarea 
                slot="input" 
                title="Jabatan" 
                name="jabatan" 
                :value="get_form.jabatan"
                placeholder="Jabatan" />

            <TableView slot="input" :items="get_listLokasi" :theads="theads">
                <template slot-scope="scope">
                    <tr class="font-weight-bold">
                        <td class="align-middle text-center">{{ scope.index + 1 }}</td>
                        <td class="align-middle">{{ scope.item.nama }}</td>
                        <td class="align-middle text-center" colspan="2"></td>  
                    </tr>
                    <tr v-for="(item, index) in scope.item.sub" 
                        :key="index+'-'+scope.index" 
                        class="font-italic">
                        <td class="align-middle text-center">{{ scope.index + 1 }}.{{ index + 1 }}</td>
                        <td class="align-middle">{{ item.nama }}</td>
                        <td class="align-middle text-center">{{ item.nama_ibu_kota }}</td>
                        <td class="cell-condensed">
                            <input type="text" 
                                class="form-control form-control-sm numeric" 
                                :name="'nominal['+ item.id +']'" 
                                :id="'nominal['+ item.id +']'" 
                                :value="get_nominal_value({ object: nominal, key: item.id })"
                                :placeholder="get_nominal_value({ object: get_form.nominal, key: item.id }) | rupiah('$')">
                        </td>
                    </tr>
                </template>
            </TableView>

            <FormulirButton @onSubmit="onSubmit()" slot="button" />
        </Formulir>
    </div>
</template>


<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            'get_listLokasi':'getters/standar/harian/luar/edit/listLokasi',
            'get_form':'getters/standar/harian/luar/form',
        }),
        get_nominal_value (){
          return function(args){
            const object = args.object 

            for (const key in object) {
              if (object.hasOwnProperty(key)) {
                if(args.key == key){
                  return object[key];
                }
              }
            }
          }
        }
    },
    methods: {
        ...mapActions({
            'set_edit':'setters/api/standar/harian/luar/edit',
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
                axios.get('standar/harian/luar/'+id+'/edit').then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }
                                        
                    resolve(this.set_edit(response.data.data))
                }).catch((error) => {
                    reject(error);
                })
            })
            return request;
        },         
        onSubmit(){
          // error handler reset
          this.$root.error.status = false
          this.$root.error.message = ""
          this.$root.request = true // membuka spinner ui

          const id = this.get_form.id
          const jabatan = document.getElementById('jabatan').value
          
          let nominal = {}
          this.get_listLokasi.forEach((element_i, index) => {
              element_i.sub.forEach((element_j, index) => {
                const key = element_j.id
                const value = document.getElementById('nominal['+ element_j.id +']').value
                nominal[key] = value == null ? 0 : value
              })
          });

          this.nominal = nominal // replace data

          const payload = { id, jabatan, nominal }

          const request = new Promise((resolve, reject) => {
              axios.put('standar/harian/luar/'+id, payload).then((response) => {
                  resolve(response)
              }).catch((error) => {
                  reject(error);
              })
          })                     
        }
    },  
    mounted(){
        this.onInitData()
    },
  data() {
    return {
        nominal: this.$store.state.standar_perjadin_harian_luar_negeri.form.nominal,
        theads: [
            {
                title: 'No',
                width: '',
            },
            {
                title: 'Wilayah / Negara',
                width: '',
            },
            {
                title: 'Ibu Kota / Kota Lainnya di tempat Pewakilan RI',
                width: '',
            },
            {
                title: 'Nominal ($)',
                width: '',
            },
        ]        
    }
  }
}

</script>
