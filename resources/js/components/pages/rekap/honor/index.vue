<template>
<div>
    <Toolbar :judul="title" slot="toolbar">
         <BackButton />
    </Toolbar>

    <data-viewer 
        :store="store"
        :init_params="init_params"
        :alias="alias" 
        :source="source" 
        :thead="thead" 
        :filter="filter" 
        :title="title">

        <template slot-scope="props">
            <tr>
                <td>{{props.item.lampiran_honor_id | inull}}</td>
                <td>{{props.item.lampiran_honor_tanggal | inull}}</td>
                <td>{{props.item.lampiran_honor_uraian | inull}}</td>
                <td>{{props.item.lampiran_honor_kode_dpa | inull}}</td>
                <td>{{props.item.lampiran_honor_subtotal | inull_number | rupiah2 }}</td>
                <td>{{props.item.lampiran_honor_pph_21 | inull_number | rupiah2 }}</td>
                <td>{{props.item.lampiran_honor_pph_22 | inull_number | rupiah2 }}</td>
                <td>{{props.item.lampiran_honor_pph_23 | inull_number | rupiah2 }}</td>
                <td>{{props.item.lampiran_honor_total | inull_number | rupiah2 }}</td>
            </tr>
        </template>

        <template slot-scope="props" slot="tfoot" >
            <tr class="bg-secondary">
                <td colspan="4" class="text-center"><em></em></td>
                <td class="text-right text-white"><em><strong>{{ total_nominal({ item: props.items, key: 'lampiran_honor_subtotal'}) | rupiah2 }}</strong></em></td>
                <td class="text-right text-white"><em><strong>{{ total_nominal({ item: props.items, key: 'lampiran_honor_pph_21'}) | rupiah2 }}</strong></em></td>
                <td class="text-right text-white"><em><strong>{{ total_nominal({ item: props.items, key: 'lampiran_honor_pph_22'}) | rupiah2 }}</strong></em></td>
                <td class="text-right text-white"><em><strong>{{ total_nominal({ item: props.items, key: 'lampiran_honor_pph_23'}) | rupiah2 }}</strong></em></td>
                <td class="text-right text-white"><em><strong>{{ total_nominal({ item: props.items, key: 'lampiran_honor_total'}) | rupiah2 }}</strong></em></td>
            </tr>
            <tr>
                <td colspan="9" class="text-center">
                    <em>
                        {{ total_nominal({ item: props.items, key: 'lampiran_honor_total'}) | rupiah2 }}
                    </em>
                </td>
            </tr>        
        </template>


    </data-viewer>
</div>
</template>
<script>

    export default {
        name: 'rekap_honor',
        data() {
            return {
                store: 'spj',                
                title: 'Rekap Honor',
                source: '/rekap/honor',
                init_params: 'lampiran_honor_id', // default params                
                thead: [
                    {title: 'ID', key: 'lampiran_honor_id', sort: true},
                    {title: 'Tanggal', key: 'lampiran_honor_tanggal', sort: true},
                    {title: 'Uraian', key: 'lampiran_honor_uraian', sort: true},
                    {title: 'Kode DPA', key: 'lampiran_honor_kode_dpa', sort: true},
                    {title: 'Subtotal', key: 'lampiran_honor_subtotal', sort: true},
                    {title: 'PPH 21', key: 'lampiran_honor_pph_21', sort: true},
                    {title: 'PPH 22', key: 'lampiran_honor_pph_22', sort: true},
                    {title: 'PPH 23', key: 'lampiran_honor_pph_23', sort: true},
                    {title: 'Total', key: 'lampiran_honor_total', sort: true},
                ],
                filter: [
                    'lampiran_honor_id',
                    'lampiran_honor_uraian',
                    'lampiran_honor_kode_dpa',
                    'lampiran_honor_tanggal',
                    'lampiran_honor_subtotal',
                    'lampiran_honor_pph_21',
                    'lampiran_honor_pph_22',
                    'lampiran_honor_pph_23',
                    'lampiran_honor_total',
                ],
                alias: [
                    'Lampiran Honor ID',
                    'Lampiran Honor Uraian',
                    'Lampiran Honor Kode DPA',
                    'Lampiran Honor Tanggal',
                    'Lampiran Honor Subtotal',
                    'Lampiran Honor PPH 21',
                    'Lampiran Honor PPH 22',
                    'Lampiran Honor PPH 23',
                    'Lampiran Honor Total',
                ]                
            }
        },
        computed: {
            total_nominal(){
                return function(args){
                    var total = 0
                    args.item.forEach(element => {
                        total += element[args.key]
                    }); 
                    return total
                }
            },   
        }
    }
</script>