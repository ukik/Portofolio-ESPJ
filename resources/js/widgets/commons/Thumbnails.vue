<template>
    <div class="card h-100">
        <div @click="jump({ name:item.route })" class="card-body p3 text-center">
            <a class="btn-dashboard">
                <i :class="item.icon"></i>
                <div>{{ item.judul }}</div>
            </a>
            <p v-if="notification == undefined || notification <= 0" class="text-muted">{{ item.tagline }}</p> 
            <p v-if="notification != undefined && notification > 0" class="text-muted" :inner-html.prop="notification | notification(item.tagline)" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            default: '',
            required: true,
        }, 
        notification: {
            // type: String,
            default: '',
        }
    },
}
</script>