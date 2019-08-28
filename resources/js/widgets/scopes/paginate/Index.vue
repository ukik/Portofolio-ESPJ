<template>
<div class="row">
    <div class="col">
        <ul class="pagination" role="navigation">
            <!-- first -->
            <li class="page-item" v-disabled="currentPage == 1 ? true : false" aria-label="&amp;laquo; Sebelumnya">
                <span class="page-link" @click="prevPage()" aria-hidden="true">&lsaquo;</span>
            </li>

<li v-hidden="hiddenPage+1 == 1 || currentPage == 1 ? true : false" class="page-item disabled"><a class="page-link" >...</a></li>

            <li v-for="index in displayPage" v-active="currentPage == index + hiddenPage ? true : false" :key="index" @click="thisPage(index)" class="page-item" aria-current="page">
                <a class="page-link">{{ index + hiddenPage }}</a>
            </li>

<li v-hidden="hiddenPage+1 == last_page || currentPage == last_page ? true : false" class="page-item disabled"><a class="page-link" >...</a></li>

            <!-- last -->
            <li class="page-item" v-disabled="currentPage == last_page ? true : false">
                <a class="page-link" @click="nextPage()" rel="next" aria-label="Berikutnya &amp;raquo;">&rsaquo;</a>
            </li>
        </ul>
    </div>
    <div class="col">
        <p class="text-right">
            <small class="font-italic">
            <i class="fe fe-check-circle text-success"></i> Standar Telah Ditetapkan, <i class="fe fe-x text-danger"></i> Belum Ditetapkan Standar
          </small>
        </p>
    </div>
</div>
</template>

<script>

export default {
    props: {
        current_page: {
            type: Number,
            required: true,
            default: 1,
        },
        first_page_url: {
            type: String,
            required: true,
            default: "/data-dasar/pegawai?page=1",
        },
        from: {
            type: Number,
            required: true,
            default: 0,
        },
        last_page: {
            type: Number,
            required: true,
            default: 0,
        },
        last_page_url: {
            type: String,
            required: true,
            default: "#",
        },
        next_page_url: {
            type: String,
            required: true,
            default: "#",
        },
        path: {
            type: String,
            required: true,
            default: "#",
        },
        per_page: {
            type: Number,
            required: true,
            default: 0,
        },
        prev_page_url: {
            type: String,
            required: true,
            default: "#",
        },
        to: {
            type: Number,
            required: true,
            default: 0,
        },
        total: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    data() {
        return {
            currentPage: 0,
            displayPage: 0,
            hiddenPage: 0,
        }
    },

    methods: {
        nextPage() {
            if (this.currentPage < this.last_page) {
                this.currentPage += 1
                if(this.currentPage > this.displayPage) {
                    this.hiddenPage += 1
                }
                return this.currentPage
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage -= 1
                if(this.hiddenPage > 0) {
                    this.hiddenPage -= 1
                }
                return this.currentPage
            }
        },
        thisPage(index) {
            console.log(index)
            return this.currentPage = index
        },
    },
    mounted() {
        this.currentPage = this.current_page
        this.displayPage = Math.round(this.last_page / 2)
    }
}
</script>
