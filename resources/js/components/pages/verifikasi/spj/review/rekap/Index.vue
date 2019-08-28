<template>
<div>
    <TableView :items="get_rekap" :theads="theads">
        <template slot-scope="scope">
            <tr>
              <td class="align-middle text-center">{{ scope.index + 1 }}</td>
              <td class="align-middle text-center">{{ scope.item.kode_dpa }}.{{ scope.item.kode_rekening }}</td>
              <td class="align-middle text-center">{{ scope.item.penerima }}</td>
              <td class="align-middle">{{ scope.item.uraian }}</td>
              <td class="align-middle text-center">{{ scope.item.tanggal }}</td>
              <td class="align-middle text-right">{{ scope.item.nominal | rupiah2 }}</td>
            </tr>
        </template>
    </TableView>
    <p />
</div>
</template>


<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    props: [ 'id' ],
    computed: {
        ...mapGetters({
          'get_rekap': 'getters/spj/rekap',
        }),
        items_length() {
            return this.get_rekap == undefined ? 0 : this.get_rekap.length
        },
        total_nominal(){
            var total = 0
            this.get_rekap.forEach(element => {
                total += element.nominal
            }); 
            return total
        }
    },
    methods: {
        ...mapActions({
            'set_rekap': 'setters/api/spj/rekap',
        }),    
        // CORE: untuk mengambil data init pada page ini
        onInitData(){
          // error handler reset
          this.$root.error.status = false
          this.$root.error.message = ""
          this.$root.request = true // membuka spinner ui

          const id = this.id

          // sesuaikan dengan kebutuhan bisnis page ini
          const request = new Promise((resolve, reject) => {
              axios.get('spj/'+id+'/rekap').then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }
                                      
                  resolve(this.set_rekap(response.data.data.spj.rekap))
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

    },
    data() {
        return {
            judul: 'Rincian Aliran Kas',
            user: this.$root.level, // 'Super Admin',

            theads: [
                {
                    title: 'No',
                    width: '30',
                },
                {
                    title: 'Kode Rincian',
                    width: '',
                },
                {
                    title: 'Penerima',
                    width: '',
                },
                {
                    title: 'Uraian',
                    width: '',
                },
                {
                    title: 'Tanggal',
                    width: '',
                },
                {
                    title: 'Jumlah',
                    width: '',
                },
            ]   
                        
        }
    },

}

</script>
