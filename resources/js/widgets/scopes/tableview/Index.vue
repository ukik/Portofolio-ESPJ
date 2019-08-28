<template>
    <div>
        <slot name="toolbar" />
        <div class="row">
            <slot name="pivot" />
        </div>
        <div>
            <slot name="pre-information" />
            <div class="table-responsive">
                <table class="table table-bordered table-hover table-xs bg-white">
                    <thead class="text-center">
                        <slot name="thead" :theads="theads">
                            <tr class="bg-primary text-light">
                                <th v-for="(item, index) in theads" v-if="aksi(item)" :key="index" v-table-view-th="item.width">{{ item.title }}</th>
                            </tr>
                        </slot>
                    </thead>
                    <slot name="tbody">
                        <tbody v-no-data="{ length:items.length, colspan:theads.length }">
                            <slot v-for="(item, index) in items" :length="items_length" :index="index" :item="item" />
                        </tbody>
                    </slot>
                    <tfoot>
                        <slot name="tfoot" :length="items_length" />
                    </tfoot>
                </table>
                <slot name="append" />
            </div>
        </div>
        <slot name="paginate" />
    </div>
</template>

<script>
    export default {
        props: {
            action_visibility: {
                type: Boolean,
                default: true,
            },
            items: {
                type: Array,
                default: () => [],
            },
            theads: {
                type: Array,
                default: () => [{
                    title: '',
                    width: '0',
                }],
            },
        },
        computed: {
            aksi() {
                return function(args) {
                    if (args.title != 'Aksi') {
                        return true
                    } else {
                        return this.action_visibility == true ? true : false
                    }
                }
            },
            items_length() {
                return this.items.length
            }
        }
    }
</script>

