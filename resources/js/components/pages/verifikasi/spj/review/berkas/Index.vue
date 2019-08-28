<template>
<div>
    <TableView :items="get_berkas" :theads="theads">
        <template slot-scope="scope">
            <tr>
              <td class="align-middle text-center">{{ scope.index + 1 }}</td>
              <td class="align-middle text-center">{{ scope.item.nama }}</td>
              <td class="align-middle text-center"><span class="tag tag-primary">{{ scope.item.jenis }}</span></td>
              <td class="align-middle text-center">{{ scope.item.deskripsi }}</td>
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
          'get_berkas': 'getters/spj/berkas',
        }),
        items_length() {
            return this.get_berkas.berkas == undefined ? 0 : this.get_berkas.berkas.length
        },
        total_nominal(){
            var total = 0
            this.get_berkas.berkas.forEach(element => {
                total += element.nominal
            }); 
            return total
        }
    },
    methods: {
        ...mapActions({
            'set_berkas': 'setters/api/spj/berkas',
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
              axios.get('spj/'+id+'/berkas').then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }
                                      
                  resolve(this.set_berkas(response.data.data.spj.berkas))
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
            judul: 'Daftar Berkas SPJ',
            user: this.$root.level, // 'Super Admin',

            theads: [
                {
                    title: 'No',
                    width: '30',
                },
                {
                    title: 'Nama Berkas',
                    width: '',
                },
                {
                    title: 'Jenis Berkas',
                    width: '',
                },
                {
                    title: 'Deskripsi',
                    width: '',
                },
            ]    
    };
  },
};

</script>
