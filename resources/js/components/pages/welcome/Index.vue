<template>
    <transition name="fade-welcome">
        <div class="welcome-container d-flex justify-content-center">
            <div class="container h-100">
                <div class="row align-items-center h-100">
                    <div class="col-6 mx-auto text-center">
                        <div class="jumbotron" style="padding: 3rem; background-color: white !important;">
                            <p class="h2">Welcome to E-SPJ</p>
                            <a class="navbar-brand">
                                <img src="../../../assets/logo.png" class="navbar-brand-img" alt="E-SPJ BAPPEDA KALTIM">
                            </a>
                            <p style="margin-top: 50px">
                                <LoaderRing />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>


<style scoped>
    .welcome-container {
        height: 100%;
        width: 100%;
        position: fixed;
        background: white;
        z-index: 9999;
        top: 0;
    }
    .fade-welcome-enter-active,
    .fade-welcome-leave-active {
        transition: opacity .5s;
    }
    .fade-welcome-enter,
    .fade-welcome-leave-to
    /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }
</style>
