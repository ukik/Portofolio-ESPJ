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
                    route: 'rekap-perjadin',
                    judul: 'Perjadin',
                    tagline: 'Rekap Perjadin',
                    icon: 'fe fe-file-text',
                },
                {
                    route: 'rekap-spj',
                    judul: 'SPJ',
                    tagline: 'Rekap Berkas SPJ',
                    icon: 'fe fe-file-text',
                },
                {
                    route: 'rekap-honor',
                    judul: 'Honor',
                    tagline: 'Rekap Honor',
                    icon: 'fe fe-file-text',
                },
            ]
        }
    }
}
</script>
