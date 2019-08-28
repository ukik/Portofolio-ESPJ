<?php 

return [
    'level' => [
        'Super Admin',
        'Penghubung',
        'Supervisor',
        'Verifikator'
    ],
    'golongan' => [
        'I/a' => 'Juru Muda',
        'I/b' => 'Juru Muda Tingkat I',
        'I/c' => 'Juru',
        'I/d' => 'Juru Tingkat I',
        'II/a' => 'Pengatur Muda',
        'II/b' => 'Pengatur Muda Tingkat I',
        'II/c' => 'Pengatur',
        'II/d' => 'Pengatur Tingkat I',
        'III/a' => 'Penata Muda',
        'III/b' => 'Penata Muda Tingkat I',
        'III/c' => 'Penata',
        'III/d' => 'Penata Tingkat I',
        'IV/a' => 'Pembina',
        'IV/b' => 'Pembina Tingkat I',
        'IV/c' => 'Pembina Utama Muda',
        'IV/d' => 'Pembina Utama Madya',
        'IV/e' => 'Pembina Utama',
        'Non PNS' => 'Honorer/Kontrak'
    ],
    'honor' => [
        'limit' => [
            '5.2.1.01.01' => 'Honorarium Panitia Pelaksanaan Kegiatan',
            '5.2.1.01.02' => 'Honorarium Tim Pengadaan Barang dan Jasa',
            '5.2.1.01.03' => 'Honorarium Panitia Pemeriksaan Barang dan Jasa',
            '5.2.1.01.04' => 'Honorarium Tenaga Ahli / Instruktur / Narasumber',
        ]
    ],
    'surat'=>[
        'honor' => 'Honor',
        'spk' => 'SPK',
        'spt' => 'SPT',
        'sppd' => 'SPPD',
        'permohonan' => 'Permohonan'
    ],
    'perjalanan'=>[
        'limit' => 'Limit'
    ],
    'spp' => [
        'up' => [
            'kode' => 'SPP-UP',
            'uraian' => 'Uang Persediaan'
        ],
        'gu' => [
            'kode' => 'SPP-GU',
            'uraian' => 'Ganti Uang Persediaan'
        ],
        'tu' => [
            'kode' => 'SPP-TU',
            'uraian' => 'Tambah Uang Persediaan'
        ],
        'ls' => [
            'kode' => 'SPP-LS',
            'uraian' => 'Pembayaran Langsung'
        ],
    ],
    'pendidikan'=>[
        'SD' => 'Sekolah Dasar',
        'SMP' => 'Sekolah Menengah Pertama',
        'SMA' => 'Sekolah Menegah Atas',
        'D1' => 'Diploma I',
        'D2' => 'Diploma II',
        'D3' => 'Diploma III',
        'D4' => 'Diploma IV',
        'S1' => 'Strata I',
        'S2' => 'Strata II',
        'S3' => 'Strata III',
    ],
    'tujuan' => [
        'Balikpapan',
        'Bontang',
        'Sangatta',
        'Paser',
        'PPU',
        'Kukar',
        'Luar Daerah',
    ],
    'perjadin' => [
        'biaya' => [
            [
                'rincian' => 'Biaya angkutan pegawai',
                'harga' => 0,
                'volume' => 1,
                'satuan' => 'Perjalanan',
            ],
            [
                'rincian' => 'Biaya angkutan pegawai',
                'harga' => 0,
                'volume' => 1,
                'satuan' => 'Perjalanan',
            ],
            [
                'rincian' => 'Biaya angkutan pegawai',
                'harga' => 0,
                'volume' => 1,
                'satuan' => 'Perjalanan',
            ],
            [
                'rincian' => 'Biaya akomodasi/Penginapan',
                'harga' => 0,
                'volume' => 1,
                'satuan' => 'Perjalanan',
            ],
            [
                'rincian' => 'Biaya angkutan pegawai',
                'harga' => 0,
                'volume' => 1,
                'satuan' => 'Perjalanan',
            ],
            [
                'rincian' => 'Biaya angkutan pegawai',
                'harga' => 0,
                'volume' => 1,
                'satuan' => 'Perjalanan',
            ],
            [
                'rincian' => 'Biaya angkutan pembantu rumah tangga',
                'harga' => 0,
                'volume' => 1,
                'satuan' => 'Perjalanan',
            ],
            [
                'rincian' => 'Biaya pengepakan',
                'harga' => 0,
                'volume' => 1,
                'satuan' => 'Perjalanan',
            ],
            [
                'rincian' => 'Biaya penggudangan',
                'harga' => 0,
                'volume' => 1,
                'satuan' => 'Perjalanan',
            ],
            [
                'rincian' => 'Biaya angkutan barang',
                'harga' => 0,
                'volume' => 1,
                'satuan' => 'Perjalanan',
            ],
            [
                'rincian' => 'Biaya uang harian tiba (bagi mereka yang melakukan perjalanan pindah dalam negeri )',
                'harga' => 0,
                'volume' => 1,
                'satuan' => 'Perjalanan',
            ],
            [
                'rincian' => 'Biaya lunsum',
                'harga' => 0,
                'volume' => 1,
                'satuan' => 'Hari',
            ],
        ]
    ],
    'pajak'=> [
        'PPN',
        'PPh 22',
        'PPh 23'
    ],
    'jenis_berkas' => [
        'Kwitansi',
        'Lampiran',
        'Lainnya'
    ],
    'jenis_lokasi' => [
        'Provinsi',
        'Kabupaten',
        'Kota',
        'Kecamatan',
    ],
    'jenis_lokasi_ln' => [
        'Wilayah',
        'Negara',
    ]
];
