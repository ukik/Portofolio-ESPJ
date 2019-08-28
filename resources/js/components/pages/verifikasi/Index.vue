<template>
<div class="container">
    <div class="row justify-content-center mt-5">
        <div class="col-md-3 mb-5" v-for="(item, index) in items" :key="index" v-if="index <= 1" >
            <Thumbnails v-pointer :item="item" :notification="notification(item.notification)" />
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="col-md-3 mb-5" v-for="(item, index) in items" :key="index" v-if="index >= 2 & index <= 4" >
            <Thumbnails v-pointer :item="item" :notification="notification(item.notification)" />
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="col-md-3 mb-5" v-for="(item, index) in items" :key="index" v-if="index > 4" >
            <Thumbnails v-pointer :item="item" :notification="notification(item.notification)" />
        </div>
    </div>
</div>
</template>

<script>
export default {
    mounted(){
        const request = new Promise((resolve, reject) => {
            axios.get('verifikasi').then((response) => {
                this.notif = response.data.data;
                resolve(response)
            }).catch((error) => {
                reject(error);
            })
        })
        return request;        

        this.$memory.set('last_route', this.$route.name)

    },
    computed: {
        notification() {
            return (args) => {
                for (const key in this.notif) {
                    if (this.notif.hasOwnProperty(key)) {
                        if(args == key) {
                            return this.notif[args]
                        }
                    }
                }
            }
        }
    },
    data() {
        return {
            notif: {
                "gu": 0,
                "spj": 0,
                "honor": 0,
                "perjadin": 0,
                "spk": 0,
                "perubahan_honor": 0,
                "perubahan_perjadin": 0,
                "perubahan_spk": 0,
            },

            items: [{
                    route: 'verifikasi-ganti-uang',
                    judul: 'Ganti Uang (GU)',
                    tagline: 'Verifikasi Permohonan',
                    icon: 'fe fe-message-square',
                    notification: "gu",
                },
                {
                    route: 'verifikasi-spj',
                    judul: 'SPJ',
                    tagline: 'Verifikasi SPJ',
                    icon: 'fe fe-message-square',
                    notification: "spj",
                },
                {
                    route: 'verifikasi-honor',
                    judul: 'Honor',
                    tagline: 'Verifikasi Honor',
                    icon: 'fe fe-message-square',
                    notification: "honor",
                },
                {
                    route: 'verifikasi-perjadin',
                    judul: 'SPT',
                    tagline: 'Verifikasi SPT',
                    icon: 'fe fe-message-square',
                    notification: "perjadin",
                }, {
                    route: 'verifikasi-spk',
                    judul: 'SPK',
                    tagline: 'Verifikasi SPK',
                    icon: 'fe fe-message-square',
                    notification: "spk",
                }, {
                    route: 'verifikasi-honor',
                    judul: 'Perubahan Honor',
                    tagline: 'Verifikasi Honor',
                    icon: 'fe fe-message-square',
                    notification: "perubahan_honor",
                }, {
                    route: 'verifikasi-perjadin-perubahan',
                    judul: 'Perubahan SPT',
                    tagline: 'Verifikasi SPT',
                    icon: 'fe fe-message-square',
                    notification: "perubahan_perjadin",
                }, {
                    route: 'verifikasi-spk-perubahan',
                    judul: 'Perubahan SPK',
                    tagline: 'Verifikasi SPK',
                    icon: 'fe fe-message-square',
                    notification: "perubahan_spk",
                },
            ]
        }
    }
}
</script>
