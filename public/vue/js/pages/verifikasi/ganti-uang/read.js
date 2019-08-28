webpackJsonp([49],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/js/components/pages/verifikasi/ganti-uang/review/Index.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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



/* harmony default export */ __webpack_exports__["default"] = ({
    computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapGetters"])({
        'get_kegiatan': 'getters/verifikasi/ganti-uang/kegiatan',
        'get_form': 'getters/verifikasi/ganti-uang/form'
    })),
    methods: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapActions"])({
        'set_kegiatan': 'setters/api/verifikasi/ganti-uang/kegiatan'
    }), {
        // CORE: untuk mengambil data init pada page ini
        onInitData: function onInitData() {
            var _this = this;

            // error handler reset
            this.$root.error.status = false;
            this.$root.error.message = "";
            this.$root.request = true; // membuka spinner ui

            var id = this.get_form.id;

            // sesuaikan dengan kebutuhan bisnis page ini
            var request = new Promise(function (resolve, reject) {
                axios.get('verifikasi/gu/' + id + '/review').then(function (response) {
                    resolve(_this.set_kegiatan(response.data.data.kegiatan));
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
        onCancel: function onCancel() {
            // error handler reset
            this.$root.error.status = false;
            this.$root.error.message = "";
            this.$root.request = true; // membuka spinner ui

            var id = this.get_form.id;

            var request = new Promise(function (resolve, reject) {
                axios.post('verifikasi/gu/' + id + '/reject').then(function (response) {
                    resolve(response);
                }).catch(function (error) {
                    reject(error);
                });
            });
        },
        onConfirm: function onConfirm() {
            // error handler reset
            this.$root.error.status = false;
            this.$root.error.message = "";
            this.$root.request = true; // membuka spinner ui

            var id = this.get_form.id;

            var request = new Promise(function (resolve, reject) {
                axios.post('verifikasi/gu/' + id + '/approve').then(function (response) {
                    resolve(response);
                }).catch(function (error) {
                    reject(error);
                });
            });
        }
    }),
    mounted: function mounted() {
        // CORE: untuk mengambil data init pada page ini
        this.onInitData();

        this.onChunkFailed();
    },
    data: function data() {
        return {
            judul: 'Daftar Permohonan',
            user: 'Super Admin',
            theads: [{
                title: 'No',
                width: '30'
            }, {
                title: 'Uraian',
                width: ''
            }, {
                title: 'Diajukan(Rp)',
                width: '150'
            }, {
                title: 'Disetujui (Rp)',
                width: '150'
            }]
        };
    }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-17207bbd\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/js/components/pages/verifikasi/ganti-uang/review/Index.vue":
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
        {
          attrs: {
            slot: "title",
            judul: "Verifikasi Permohonan " + _vm.get_form.nomor_permohonan
          },
          slot: "title"
        },
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
          _c("FormulirInput", {
            attrs: {
              slot: "input",
              readonly: "true",
              title: "Kegiatan",
              name: "kegiatan",
              value:
                "[" + _vm.get_kegiatan.kode_dpa + "] " + _vm.get_kegiatan.nama,
              placeholder: "Kegiatan"
            },
            slot: "input"
          }),
          _vm._v(" "),
          _c("FormulirInput", {
            attrs: {
              slot: "input",
              readonly: "true",
              title: "Nomor SPP",
              name: "nomor_spp",
              value: _vm.get_form.nomor_permohonan,
              placeholder: "Nomor SPP"
            },
            slot: "input"
          }),
          _vm._v(" "),
          _c("FormulirInput", {
            attrs: {
              slot: "input",
              title: "Tanggal",
              name: "tanggal",
              value: _vm.get_form.verified_at,
              placeholder: "Tanggal"
            },
            slot: "input"
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("TableView", {
        attrs: { items: _vm.get_kegiatan.data, theads: _vm.theads },
        scopedSlots: _vm._u([
          {
            key: "default",
            fn: function(scope) {
              return [
                _c("tr", [
                  _c("td", { staticClass: "text-center" }, [
                    _vm._v(_vm._s(scope.index + 1))
                  ]),
                  _vm._v(" "),
                  _c("td", [_vm._v(_vm._s(scope.item.uraian))]),
                  _vm._v(" "),
                  _c("td", { staticClass: "text-right" }, [
                    _vm._v(
                      _vm._s(_vm._f("rupiah")(scope.item.nominal_diajukan))
                    )
                  ]),
                  _vm._v(" "),
                  _c("td", { staticClass: "text-center has-input" }, [
                    _c("input", {
                      staticClass:
                        "form-control form-control-sm text-right numeric",
                      attrs: {
                        type: "text",
                        "data-max": scope.item.nominal_diajukan,
                        name: "nominal_disetujui" + scope.item.id
                      },
                      domProps: { value: scope.item.nominal_disetujui }
                    })
                  ])
                ])
              ]
            }
          }
        ])
      }),
      _vm._v(" "),
      _c(
        "FormulirButton",
        {
          on: {
            onSubmit: function($event) {
              _vm.onConfirm()
            }
          }
        },
        [
          _c("a", { attrs: { slot: "back" }, slot: "back" }),
          _vm._v(" "),
          _c(
            "a",
            {
              staticClass: "btn btn-danger",
              attrs: { slot: "cancel", href: "#", onclick: "return false;" },
              on: {
                click: function($event) {
                  _vm.onCancel()
                }
              },
              slot: "cancel"
            },
            [
              _c("i", { staticClass: "fe fe-x" }),
              _vm._v(" Tolak Permohonan\n        ")
            ]
          )
        ]
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
    require("vue-hot-reload-api")      .rerender("data-v-17207bbd", module.exports)
  }
}

/***/ }),

/***/ "./resources/js/components/pages/verifikasi/ganti-uang/review/Index.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/js/components/pages/verifikasi/ganti-uang/review/Index.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-17207bbd\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/js/components/pages/verifikasi/ganti-uang/review/Index.vue")
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
Component.options.__file = "resources/js/components/pages/verifikasi/ganti-uang/review/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-17207bbd", Component.options)
  } else {
    hotAPI.reload("data-v-17207bbd", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});