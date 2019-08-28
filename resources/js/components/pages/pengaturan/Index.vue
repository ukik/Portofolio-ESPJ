<template>
    <div class="container">
        <div class="row justify-content-center mt-5">
            <div class="col-md-3 mb-5" v-for="(item, index) in items" :key="index">
                <Thumbnails v-pointer :item="item" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
  mounted(){
    this.$memory.set('last_route', this.$route.name)
  },
  data() {
    return {
      items: [
        {
          route: "pengaturan-honor",
          judul: "Honor",
          tagline: "Pengaturan Honor",
          icon: "fe fe-message-square"
        },    
        {
          route: "pengaturan-sppd",
          judul: "Perjadin",
          tagline: "Pengaturan Perjalanan Dinas",
          icon: "fe fe-file-text"
        },
        {
          route: "pengaturan-nomor-surat",
          judul: "Nomor Surat",
          tagline: "Pengaturan Nomor Surat",
          icon: "fe fe-file-text"
        },
        {
          route: "pengaturan-pajak",
          judul: "Pajak",
          tagline: "Pengaturan Pajak",
          icon: "fe fe-tag"
        },      
        {
          route: "pengaturan-user",
          judul: "User",
          tagline: "Pengaturan User",
          icon: "fe fe-users"
        },     
        {
          route: "pengaturan-tahun",
          judul: "Tahun",
          tagline: "Pengaturan Tahun",
          icon: "fe fe-help-circle"
        },
        {
          route: "pengaturan-aliran-kas",
          judul: "Aliran Kas",
          tagline: "Pengaturan Aliran Kas",
          icon: "fe fe-sliders"
        },
        {
          route: "pengaturan-berkas",
          judul: "Berkas",
          tagline: "Pengaturan Berkas",
          icon: "fe fe-file"
        }
      ]
    };
  }
};
</script>