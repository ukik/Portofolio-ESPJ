<template>
    <div class="container">
        <Toolbar judul="Register Penerimaan Laporan" slot="title">
            <BackButton />
        </Toolbar>

        <div class="page-header">
            <p class="d-block w-100 text-center">
                <strong>SPJ Permohonan</strong>
            </p>
            
            <h1 class="page-title m-auto">{{ undefined_nomor_permohonan(get_form.permohonan) }}</h1>
            <p class="d-block w-100 text-center">
                <strong>{{ get_form.kegiatan }}</strong>
            </p>
        </div>

        <div class="row justify-content-center mt-5">
            <div class="col-md-3 mb-5" v-for="(item, index) in items" :key="index">
                <Thumbnails v-pointer :item="item" />
            </div>
        </div>
    </div>
</template>

<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
          'get_form': 'getters/spj/form', // parent
        }),
        undefined_nomor_permohonan() {
            return function(args) {
                if(args == undefined) {
                    return ""
                } else {
                    return args.nomor_permohonan
                }
            }
        }
    },
    data() {
        return {
            items: [{
                    route: '#',
                    judul: 'KPA',
                    tagline: 'Register Penerimaan Laporan',
                    icon: 'fe fe-printer',
                    notification: 0,
                },
            ]
        }
    }
}

</script>
