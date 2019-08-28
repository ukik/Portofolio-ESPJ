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
            items: [{
                    route: 'data-dasar-dpa',
                    judul: 'DPA',
                    tagline: 'Data Dasar DPA',
                    icon: 'fe fe-list',
                },
                {
                    route: 'data-dasar-bidang',
                    judul: 'Bidang',
                    tagline: 'Data Dasar Bidang',
                    icon: 'fe fe-briefcase',
                },
                {
                    route: 'data-dasar-pegawai',
                    judul: 'Pegawai',
                    tagline: 'Data Dasar Pegawai',
                    icon: 'fe fe-users',
                },
                {
                    route: 'data-dasar-pemimpin',
                    judul: 'Pimpinan',
                    tagline: 'Data Dasar Pimpinan',
                    icon: 'fe fe-user',
                },
                {
                    route: 'data-dasar-kpa',
                    judul: 'KPA',
                    tagline: 'Data Dasar KPA',
                    icon: 'fe fe-users',
                },
                {
                    route: 'data-dasar-pptk',
                    judul: 'PPTK',
                    tagline: 'Data Dasar PPTK',
                    icon: 'fe fe-users',
                },
                {
                    route: 'data-dasar-ppk',
                    judul: 'PPK-SKPD',
                    tagline: 'Data Dasar PPK-SKPD',
                    icon: 'fe fe-users',
                },
                {
                    route: 'data-dasar-bendahara',
                    judul: 'Bendahara',
                    tagline: 'Data Dasar Bendahara',
                    icon: 'fe fe-users',
                },
                {
                    route: 'data-dasar-penghubung',
                    judul: 'Penghubung',
                    tagline: 'Data Dasar Penghubung',
                    icon: 'fe fe-users',
                },
                {
                    route: 'data-dasar-rekanan',
                    judul: 'Rekanan',
                    tagline: 'Data Dasar Rekanan',
                    icon: 'fe fe-users',
                },
                {
                    route: 'data-dasar-lokasi-dalam-negeri',
                    judul: 'Lokasi',
                    tagline: 'Data Dasar Lokasi',
                    icon: 'fe fe-map-pin',
                },
                {
                    route: 'standar-perjadin-harian-dalam-negeri',
                    judul: 'Standar',
                    tagline: 'Data Standar',
                    icon: 'fe fe-book-open',
                },
            ]
        }
    }
}
</script>
