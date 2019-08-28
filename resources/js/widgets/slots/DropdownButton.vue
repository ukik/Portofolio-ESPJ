<template>
    <div class="dropdown">
        <button type="button" v-dropdown-button="classname" data-toggle="dropdown" style="text-transform:capitalize">
            <i class="fe fe-file mr-2"></i> {{ name }}
        </button>
        <div class="dropdown-menu">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        classname: {
            type: String,
            default: 'primary', // or 'success'
        },
        name: {
            type: String,
            default: '',
        }
    },
}
</script>

