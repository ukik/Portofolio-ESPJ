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
                <td>{{props.item.lampiran_perjadin_id | inull}}</td>
                <td style="width: 30%;">{{props.item.lampiran_perjadin_kegiatan | inull}}</td>
                <td>{{props.item.data_pegawai_nama | inull}}</td>
                <td>{{props.item.lampiran_perjadin_lama_perjalanan | inull}}</td>
                <td>{{props.item.lampiran_perjadin_tempat_tujuan | inull}}</td>
                <td>{{props.item.lampiran_perjadin_nomor_spt | inull}}</td>
            </tr>
        </template>
    </data-viewer>
</div>
</template>
<script>

    export default {
        name: 'rekap_perjadin',
        data() {
            return {
                store: 'perjadin',
                title: 'Rekap Perjadin',
                source: '/rekap/perjadin',
                init_params: 'data_pegawai_nama', // default params                
                thead: [
                    {title: 'ID', key: 'lampiran_perjadin_id', sort: true},
                    {title: 'Kegiatan', key: 'lampiran_perjadin_kegiatan', sort: true},
                    {title: 'Nama', key: 'data_pegawai_nama', sort: true},
                    {title: 'Lama Perjalanan', key: 'lampiran_perjadin_lama_perjalanan', sort: true},
                    {title: 'Tujuan', key: 'lampiran_perjadin_tempat_tujuan', sort: true},
                    {title: 'SPT', key: 'lampiran_perjadin_nomor_spt', sort: true},
                ],
                filter: [
                    'lampiran_perjadin_id',
                    'lampiran_perjadin_kegiatan',
                    'lampiran_perjadin_nomor_spt',
                    'lampiran_perjadin_tempat_tujuan',
                    'lampiran_perjadin_lama_perjalanan',
                    'data_pegawai_nama',
                ],
                alias: [
                    'Lampiran Perjadin ID',
                    'Lampiran Perjadin Kegiatan',
                    'Lampiran Perjadin Nomor SPT',
                    'Lampiran Perjadin Tempat Tujuan',
                    'Lampiran Perjadin Lama Perjalanan',
                    'Data Pegawai Nama',
                ]                
            }
        },
    }
</script>