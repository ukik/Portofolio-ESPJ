<template>
    <div ref="main" id="main" class="page-main">

        <vue-snotify></vue-snotify>

        <go-top 
            :size="50"
            :right="20"
            :bottom="125"
            :has-outline="false" />

        <transition-group>
            <Header key="0" />
            <Navigation key="1" />
        </transition-group>

        <transition> 
            <Content key="2" v-if="content" v-show="content_display">
                <Cache>
                    <transition>
                        <router-view></router-view>
                    </transition>
                </Cache>
            </Content>
        </transition>
        <transition name="fade-footer">
            <Footer key="3" v-if="footer"/>
        </transition>
    </div>
</template>

<script>

import GoTop from '@inotom/vue-go-top';

export default {
    components: {
        GoTop
    },
    data(){
        return {
            content: null,
            content_display: false,
            footer: null,
            connection: 'online'
        }
    },
    methods: {
        deleteNotify(){
            if(this.$snotify.notifications.length >= 1){
                this.$snotify.remove(this.$snotify.notifications[0].id)
            }
        },
    },
    mounted(){
        const vm = this

        setTimeout(() => {
            this.content = {}
        }, 1000);

        setTimeout(() => {
            this.footer = {}
        }, 1500);

        setTimeout(() => {
            this.content_display = true
        }, 2000);


        vm.connection = navigator.onLine ? "online" : "offline";
        window.addEventListener('load', function() {

            function updateOnlineStatus(event) {
                vm.connection = navigator.onLine ? "online" : "offline";

                if(vm.$root.offline) {
                    vm.$swal({
                        title: 'Peringatan',
                        text: 'Maaf terdapat halaman-halaman yang belum pernah diakses sebelumnya, apakah ingin lakukan penyegaran utama halaman?',
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Segarkan Halaman',
                        showCloseButton: false,
                        allowOutsideClick: true,
                        }).then((result) => {
                        // console.log(result)
                        if(result.value) {
                            app.$data.offline = false
                            location.reload();
                            return
                        }
                    })                      
                }
            }

            window.addEventListener('online',  updateOnlineStatus);
            window.addEventListener('offline', updateOnlineStatus);
        
        });

    }
}
</script>
