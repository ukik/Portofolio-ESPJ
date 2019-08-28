<template>
    <data-viewer status="enable" misc="tools" :alias="alias" :source="source" :thead="thead" :filter="filter" :create="create" :title="title">
        <template scope="props">
            <tr>
                <td>
                    <input type="hidden" :value="props.item.status" >
                    <div @click="getForm(props.index)" :id="'icon_1'+props.index" v-pointer>
                        <i v-mini-icon-1="props.item.status" :id="'mini-icon-1'+props.item.id" :data-popup="'.popup-forms-1'+props.item.id" >collection</i>
                    </div>
                    <div class="popup" :id="'forms_1'+props.index">
                        <div class="content-block">
                            <forms :ref="'forms_1'+props.index" :payload="props.item" :index="props.index"></forms>
                        </div>
                    </div>                    
                </td>  
                <td>{{props.item.id | inull}}</td>
                <td>{{props.item.code_user | inull | shorten}}</td>
                <td>{{props.item.code_tools | inull | shorten}}</td>
                <td>{{props.item.package | inull}}</td>
                <td>{{props.item.title | inull | shorten}}</td>
                <td>{{props.item.level | inull}}</td>
                <td>{{props.item.name | inull}}</td>
                <td>{{props.item.description | inull | shorten}}</td>
                <td>{{props.item.cash | inull}}</td>
                <td>{{props.item.coin | inull}}</td>
                <td>{{props.item.discount | inull}}</td>
                <td>{{props.item.status | inull}}</td>
                <td>{{props.item.created_at | inull | shorten}}</td>
                <td>{{props.item.updated_at | inull | shorten}}</td>
            </tr>
        </template>
    </data-viewer>
</template>
<script>
    import DataViewer from '@/mixins/global/DataViewer'

    import Forms from './tools_form'

    export default {
        name: 'Tools',
        data() {
            return {
                title: 'Tools',
                source: this.$store.state.domain+'/api/mutation/record/tools',
                create: '/tools/create',
                thead: [
                    {title: 'Edit', key: 'status', sort: true},
                    {title: 'ID', key: 'id', sort: true},
                    {title: 'Code User', key: 'code_user', sort: true},
                    {title: 'Code Tools', key: 'code_tools', sort: true},
                    {title: 'Package', key: 'package', sort: true},
                    {title: 'Title', key: 'title', sort: true},
                    {title: 'Level', key: 'level', sort: true},
                    {title: 'Name', key: 'name', sort: true},
                    {title: 'Description', key: 'description', sort: true},
                    {title: 'Cash', key: 'cash', sort: true},
                    {title: 'Coin', key: 'coin', sort: true},
                    {title: 'Discount', key: 'discount', sort: true},
                    {title: 'Status', key: 'status', sort: true},
                    {title: 'Created At', key: 'created_at', sort: true},
                    {title: 'Updated At', key: 'updated_at', sort: true},
                ],
                filter: [
                    'id',  
                    'code_user',
                    'code_tools',
                    'package',
                    'title',
                    'level',
                    'name',
                    'description',
                    'cash',
                    'coin',
                    'discount',
                    'status',
                    'created_at',            
                    'updated_at',     
                              
                    'get_user_profile.id',
                    'get_user_profile.code_user',
                    'get_user_profile.name',
                    'get_user_profile.email',
                    'get_user_profile.address',
                    'get_user_profile.phone',
                    'get_user_profile.scope',
                    'get_user_profile.status',
                    'get_user_profile.created_at',
                    'get_user_profile.updated_at',
         
                ],
                alias: [
                    'ID',  
                    'Code User',
                    'Code Tools',
                    'Package',
                    'Title',
                    'Level',
                    'Name',
                    'Description',
                    'Cash',
                    'Coin',
                    'Discount',
                    'Status',
                    'Created At',            
                    'Updated At',                                          
                              
                    'Profil User (ID)',
                    'Profil User (Code User)',
                    'Profil User (Name)',
                    'Profil User (Email)',
                    'Profil User (Address)',
                    'Profil User (Phone)',
                    'Profil User (Scope)',
                    'Profil User (Status)',
                    'Profil User (Created At)',
                    'Profil User (Updated At)',
                ]                
            }
        },
        components: {
            DataViewer,
            Forms
        },
        methods: {
            getForm(id) {
                this.$refs['forms_1'+id].change()
            }
        },
    }
</script>