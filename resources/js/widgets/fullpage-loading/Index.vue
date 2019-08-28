<template>
    <transition name="fade-loading">
        <div class="loading-container d-flex justify-content-center">
            <div class="container h-100">
                <div class="row align-items-center h-100">
                    <div class="col-6 mx-auto text-center">
                        <div class="jumbotron" style="padding: 3rem; background-color: white !important;">
                            <p class="h2">Sedang Diproses</p>
                                <LoaderRing />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>


<style scoped>
    .loading-container {
        height: 100%;
        width: 100%;
        position: fixed;
        background: #00000094;
        z-index: 9999;
        top: 0;
    }
    .fade-loading-enter-active,
    .fade-loading-leave-active {
        transition: opacity .5s;
    }
    .fade-loading-enter,
    .fade-loading-leave-to
    /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }
</style>
