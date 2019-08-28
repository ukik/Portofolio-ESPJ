webpackJsonp([107],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/js/components/pages/lampiran/perjadin/create/Index.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = (_defineProperty({
    computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapGetters"])({
        'get_listPerjadin': 'getters/lampiran/perjadin/listPerjadin',

        'get_form': 'getters/lampiran/perjadin/form'
    })),
    methods: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapActions"])({
        'set_create': 'setters/api/lampiran/perjadin/create'
    }), {
        // CORE: untuk mengambil data init pada page ini
        onInitData: function onInitData() {
            var _this = this;

            // error handler reset
            this.$root.error.status = false;
            this.$root.error.message = "";
            this.$root.request = true; // membuka spinner ui

            // sesuaikan dengan kebutuhan bisnis page ini
            var request = new Promise(function (resolve, reject) {
                axios.get('lampiran/perjadin/perubahan/create').then(function (response) {
                    resolve(_this.set_create(response.data.data));
                }).catch(function (error) {
                    reject(error);
                });
            });
            return request;
        },

        // CORE: untuk refresh data init pada page ini
        onRefresh: function onRefresh() {
            // CORE: untuk mengambil data init pada page ini
            this.onInitData();
        },
        onSubmit: function onSubmit() {
            // error handler reset
            this.$root.error.status = false;
            this.$root.error.message = "";
            this.$root.request = true; // membuka spinner ui

            var nomor = document.getElementById('nomor').value;
            var nomor_spt = document.getElementById('nomor_spt').value;
            var tanggal = this.tanggal;
            var kode_dpa = document.getElementById('kode_dpa').value;
            var kode_rekening = document.getElementById('kode_rekening').value;
            var uraian = document.getElementById('uraian').value;
            var keterangan = document.getElementById('keterangan').value;
            var tanggal_berangkat = this.tanggal_berangkat;
            var tanggal_kembali = this.tanggal_kembali;
            var lokasi_id = document.getElementById('lokasi_id').value;
            var tempat_tujuan = document.getElementById('tempat_tujuan').value;

            var payload = { nomor: nomor, nomor_spt: nomor_spt, tanggal: tanggal, kode_dpa: kode_dpa, kode_rekening: kode_rekening, uraian: uraian, keterangan: keterangan, tanggal_berangkat: tanggal_berangkat, tanggal_kembali: tanggal_kembali, lokasi_id: lokasi_id, tempat_tujuan: tempat_tujuan };

            var request = new Promise(function (resolve, reject) {
                axios.post('lampiran/perjadin/perubahan/create', payload).then(function (response) {
                    resolve(response);
                }).catch(function (error) {
                    reject(error);
                });
            });
        },
        onPicker: function onPicker(args) {
            this[args.key] = args.value;
        }
    }),
    mounted: function mounted() {
        // CORE: untuk mengambil data init pada page ini
        this.onInitData();

        console.log(this.get_form);
    },
    data: function data() {
        return {
            tanggal: null,
            tanggal_berangkat: null,
            tanggal_kembali: null
        };
    }
}, 'data', function data() {
    return {
        // dpa: data.dpa,
        // bendahara: data.bendahara,
        // pimpinan: data.pimpinan,
        // listProgramKegiatan: data.listProgramKegiatan,
        // listKodeRekening: data.listKodeRekening,
        // listLokasi: data.listLokasi,

    };
}));

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-ffb5f164\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/js/components/pages/lampiran/perjadin/create/Index.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "Toolbar",
        { attrs: { slot: "title", judul: "Create SPT" }, slot: "title" },
        [
          _c("RefreshButton", {
            on: {
              onRefresh: function($event) {
                _vm.onRefresh()
              }
            }
          }),
          _vm._v(" "),
          _c("BackButton")
        ],
        1
      ),
      _vm._v(" "),
      _vm.$root.error.status
        ? _c(
            "div",
            {
              staticClass: "alert alert-icon alert-danger",
              attrs: { role: "alert" }
            },
            [
              _c("i", {
                staticClass: "fe fe-info mr-2",
                attrs: { "aria-hidden": "true" }
              }),
              _vm._v(" " + _vm._s(_vm.$root.error.message) + "\n    ")
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.$root.request
        ? _c(
            "div",
            {
              staticClass: "alert bg-primary alert-success text-center",
              attrs: { role: "alert" }
            },
            [
              _c("loader-spinner", {
                tag: "components",
                staticStyle: { zoom: "0.75" }
              })
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "Formulir",
        { attrs: { column_content: "col-12" } },
        [
          _c("FormulirLegend", {
            attrs: { slot: "legend", title: "Create SPT" },
            slot: "legend"
          }),
          _vm._v(" "),
          _c(
            "FormulirDropdown",
            { attrs: { slot: "input", title: "Nomor Surat" }, slot: "input" },
            [
              _c(
                "div",
                {
                  staticClass: "input-group",
                  attrs: { slot: "default" },
                  slot: "default"
                },
                [
                  _c(
                    "select",
                    {
                      staticClass: "form-control selectize",
                      attrs: { name: "nomor_spt", id: "nomor_spt" }
                    },
                    [
                      _c("option", { attrs: { value: "" } }, [
                        _vm._v("- Pilih Nomor Surat -")
                      ]),
                      _vm._v(" "),
                      _vm._l(_vm.get_listPerjadin, function(item, index) {
                        return _c(
                          "option",
                          { key: index, domProps: { value: item.id } },
                          [
                            _vm._v(
                              "\n                  " +
                                _vm._s(item.nomor_spt) +
                                "\n                "
                            )
                          ]
                        )
                      })
                    ],
                    2
                  )
                ]
              )
            ]
          ),
          _vm._v(" "),
          _c("FormulirButton", {
            attrs: { slot: "button" },
            on: {
              onSubmit: function($event) {
                _vm.onSubmit()
              }
            },
            slot: "button"
          })
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-ffb5f164", module.exports)
  }
}

/***/ }),

/***/ "./resources/js/components/pages/lampiran/perjadin/create/Index.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/js/components/pages/lampiran/perjadin/create/Index.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-ffb5f164\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/js/components/pages/lampiran/perjadin/create/Index.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/pages/lampiran/perjadin/create/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ffb5f164", Component.options)
  } else {
    hotAPI.reload("data-v-ffb5f164", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});