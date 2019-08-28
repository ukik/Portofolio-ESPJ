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
                <td>{{props.item.spj_id | inull}}</td>
                <td>{{props.item.spj_tanggal | inull}}</td>
                <td>{{props.item.permohonan_nomor_permohonan | inull}}</td>
                <td>{{props.item.spj_kode_dpa | inull}}</td>
                <td>{{props.item.spj_kegiatan | inull}}</td>
                <td>{{props.item.spj_nominal_diajukan | inull_number | rupiah2}}</td>
                <td>{{props.item.spj_nominal_disetujui | inull_number | rupiah2}}</td>
            </tr>
        </template>

        <template slot-scope="props" slot="tfoot" >
            <tr class="bg-secondary">
                <td colspan="5" class="text-center"><em></em></td>
                <td class="text-right text-white"><em><strong>
                    {{ total_nominal({ item: props.items, key: 'spj_nominal_diajukan'}) | rupiah2 }}
                </strong></em></td>
                <td class="text-right text-white"><em><strong>
                    {{ total_nominal({ item: props.items, key: 'spj_nominal_disetujui'}) | rupiah2 }}
                </strong></em></td>
            </tr>
        </template>

    </data-viewer>
</div>
</template>
<script>

    export default {
        name: 'rekap_spj',
        data() {
            return {
                store: 'spj',
                title: 'Rekap SPJ',
                source: '/rekap/spj',
                init_params: 'spj_id', // default params                
                thead: [
                    {title: 'ID', key: 'spj_id', sort: true},
                    {title: 'Tanggal', key: 'spj_tanggal', sort: true},
                    {title: 'Nomor Permohonan', key: 'permohonan_nomor_permohonan', sort: true},
                    {title: 'Kode', key: 'spj_kode_dpa', sort: true},
                    {title: 'Kegiatan', key: 'spj_kegiatan', sort: true},
                    {title: 'Pengajuan', key: 'spj_nominal_diajukan', sort: true},
                    {title: 'Disetujui', key: 'spj_nominal_disetujui', sort: true},
                ],
                filter: [
                    'spj_id',
                    'spj_kode_dpa',
                    'spj_kegiatan',
                    'spj_tanggal',
                    'spj_nominal_diajukan',
                    'spj_nominal_disetujui',
                    'permohonan_nomor_permohonan',
                ],
                alias: [
                    'SPJ ID',
                    'SPJ Kode DPA',
                    'SPJ Kegiatan',
                    'SPJ Tanggal',
                    'SPJ Nominal Diajukan',
                    'SPJ Nominal Disetujui',
                    'Permohonan Nomor Permohonan',
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