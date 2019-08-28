import Vue from 'vue'

/**
 * Functions
 */
function JenisKelamin(el, binding) {
  if (binding.value == 'Laki-laki') {
    el.innerHTML = `<span class="tag tag-blue"> ${binding.value} </span>`
  } else {
    el.innerHTML = `<span class="tag tag-pink"> ${binding.value} </span>`
  }
}


function JenisWilayah(el, binding) {
  switch (binding.value) {
    case "Provinsi":
      el.className = "text-primary font-weight-bold"
      break
    case "Kabupaten":
      el.className = "text-green font-weight-bold"
      break
    case "Kota":
      el.className = "text-orange font-weight-bold"
      break
    case "Kecamatan":
      el.className = "text-pink font-weight-bold"
      break
  }
}


function Active(el, binding) {
  if (binding.value == true) {
    // //console.log('update:active true', binding.value)
    el.className = "page-item active"
  } else {
    // //console.log('update:active false', binding.value)
    el.className = "page-item"
  }
}

function Disabled(el, binding) {
  if (binding.value == true) {
    // //console.log('inserted:active true', binding.value)
    el.className = "page-item disabled"
  } else {
    // //console.log('inserted:active false', binding.value)
    el.className = "page-item"
  }
}

function Hidden(el, binding) {
  if (binding.value == true) {
    // //console.log('inserted:active true', binding.value)
    el.style.display = "none"
  } else {
    // //console.log('inserted:active false', binding.value)
    el.style.display = "block"
  }
}

function TableViewTh(el, binding) {
  el.className = "align-middle text-light"
  el.style.width = binding.value+'px'
  // //console.log('inserted:table-view-th', binding.value)
}

function NoData(el, binding) {
  // console.log('inserted:no-data', binding.value.length)
  if (binding.value.length == undefined || binding.value.length <= 0) {
    el.innerHTML = `<td id="no-data" colspan="${binding.value.colspan}" class="text-center"><em>Tidak ada data</em></td>`
  } else {
    try {
      document.getElementById("no-data").outerHTML = "";
    } catch (error) {
      
    }
  } 
}

function Footer(el, binding){
    setTimeout(() => {
      try {
        const navigation = document.getElementById('headerMenuCollapse').clientHeight + 50
        const header = document.getElementById('header').clientHeight + 45
        el.style.minHeight = (window.innerHeight - navigation - header)+"px"
        // //console.log(el.style.minHeight, window.innerHeight - navigation - header)  
      } catch (error) {
        
      }
    }, 500)      
}


function MonthConverter(bulan){
  switch (bulan) {
    case 1:
      return bulan = 'Januari'
      break;
    case 2:
      return bulan = 'Februari'
      break;
    case 3:
      return bulan = 'Maret'
      break;
    case 4:
      return bulan = 'April'
      break;
    case 5:
      return bulan = 'Mei'
      break;
    case 6:
      return bulan = 'Juni'
      break;
    case 7:
      return bulan = 'Juli'
      break;
    case 8:
      return bulan = 'Agustus'
      break;
    case 9:
      return bulan = 'September'
      break;
    case 10:
      return bulan = 'Oktober'
      break;
    case 11:
     return bulan = 'November'
      break;
    case 12:
      return bulan = 'Desember'
      break;
  }
}

function Romanize(num) {
  var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;
  for ( i in lookup ) {
    while ( num >= lookup[i] ) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}

Vue.directive('connection', {
  inserted(el, binding, vnode) {
    if(binding.value == 'online') {
      el.className = "connection wifi-on"
      el.innerHTML = `<span><i class="fe fe-wifi"></i> online</span>`
    } else {
      el.className = "connection wifi-off"
      el.innerHTML = `<span><i class="fe fe-wifi-off"></i> offline</span>`
    }
  },
  update(el, binding, vnode) {
    if(binding.value == 'online') {
      el.className = "connection wifi-on"
      el.innerHTML = `<span><i class="fe fe-wifi"></i> online</span>`
    } else {
      el.className = "connection wifi-off"
      el.innerHTML = `<span><i class="fe fe-wifi-off"></i> offline</span>`
    }
  }      
})

/**
 * 
 */

Vue.directive('pointer', {
  bind(element, binding, vnode) {
    element.style.cursor = "pointer"
  }
})

Vue.directive('selected', {
  bind(element, binding, vnode) {
    element.selected
  }
})

/**
 * 
 */
Vue.directive('blank-inner', {
  inserted(el, binding, vnode) {
    switch (binding.value) {
      case "program":
      case 'Super Admin':
        el.innerHTML = ""
        el.innerText = ""
        break;
    }
  },
  update(el, binding, vnode) {
    switch (binding.value) {
      case "program":
      case 'Super Admin':
        el.innerHTML = ""
        el.innerText = ""
        break;
    }
  },  
})

Vue.directive('option-select', {
  inserted(el, binding, vnode) {
    if(typeof(binding.value) == 'string'){
      if (binding.value == "true") {
        el.selected = true
      } else {
        el.selected = false
      }
    }
    if(typeof(binding.value) == 'boolean'){
      if (binding.value) {
        el.selected = true
      } else {
        el.selected = false
      }
    }
  },
  // update(el, binding, vnode) {
  //   if(typeof(binding.value) == 'string'){
  //     if (binding.value == "true") {
  //       el.selected = true
  //     } else {
  //       el.selected = false
  //     }
  //   }
  //   if(typeof(binding.value) == 'boolean'){
  //     if (binding.value) {
  //       el.selected = true
  //     } else {
  //       el.selected = false
  //     }
  //   }
  // },  
})

Vue.directive('checked', {
  inserted(el, binding, vnode) {
    // console.log(binding.value)
    // el.checked = binding.value
    if(typeof(binding.value) == 'string'){
      if (binding.value == "true") {
        // console.log("TRUE typeof(binding.value) == 'string'", binding.value)
        el.checked = true
      } else {
        // console.log("FALSE typeof(binding.value) == 'string'", binding.value)
        el.checked = false
      }
    }
    if(typeof(binding.value) == 'boolean'){
      if (binding.value) {
        // console.log("TRUE typeof(binding.value) == 'boolean'", binding.value)
        el.checked = true
      } else {
        // console.log("FALSE typeof(binding.value) == 'boolean'", binding.value)
        el.checked = false
      }
    }
  },
  update(el, binding, vnode) {
    // console.log(binding.value)
    // el.checked = binding.value
    if(typeof(binding.value) == 'string'){
      if (binding.value == "true") {
        // console.log("TRUE typeof(binding.value) == 'string'", binding.value)
        el.checked = true
      } else {
        // console.log("FALSE typeof(binding.value) == 'string'", binding.value)
        el.checked = false
      }
    }
    if(typeof(binding.value) == 'boolean'){
      if (binding.value) {
        // console.log("TRUE typeof(binding.value) == 'boolean'", binding.value)
        el.checked = true
      } else {
        // console.log("FALSE typeof(binding.value) == 'boolean'", binding.value)
        el.checked = false
      }
    }
  },  
})

Vue.directive('readonly', {
  inserted(el, binding, vnode) {
    //console.log(binding.value)
    if (binding.value == 'true') {
      el.readOnly = true
    } else {
      el.readOnly = false
    }
  },
  update(el, binding, vnode) {
    //console.log(binding.value)
    if (binding.value == 'true') {
      el.readOnly = true
    } else {
      el.readOnly = false
    }
  },  
})

Vue.directive('keep-inner', {
  inserted(el, binding, vnode) {
    //console.log('inserted:keep-inner', binding.value)
    if (!binding.value) {
      el.innerHTML = ""
      el.innerText = ""
    }
  },
  update(el, binding, vnode) {
    //console.log('inserted:keep-inner', binding.value)
    if (!binding.value) {
      el.innerHTML = ""
      el.innerText = ""
    }
  },  
})


Vue.directive('null-info', {
  inserted(el, binding, vnode) {
    // console.log('inserted', binding.value)
    if(binding.value == "" || binding.value == null){
      el.style.backgroundColor = "#ff000038"
    } else {
      el.style.backgroundColor = "transparent"
    }
  },
  update(el, binding, vnode){
    // console.log('update', binding.value)
    if(binding.value == "" || binding.value == null){
      el.style.backgroundColor = "#ff000038"
    } else {
      el.style.backgroundColor = "transparent"
    }
  }
})

Vue.directive('nan-info', {
  inserted(el, binding, vnode) {
    // console.log('inserted', binding.value)
    if(!isNaN(binding.value)){
      el.style.backgroundColor = "transparent"
    } else {
      el.style.backgroundColor = "#ff000038"
      return
    }
    if(binding.value == "" || binding.value == null){
      el.style.backgroundColor = "#ff000038"
    } else {
      el.style.backgroundColor = "transparent"
    }    
  },
  update(el, binding, vnode){
    // console.log('update', binding.value)
    if(!isNaN(binding.value)){
      el.style.backgroundColor = "transparent"
    } else {
      el.style.backgroundColor = "#ff000038"
      return
    }
    if(binding.value == "" || binding.value == null){
      el.style.backgroundColor = "#ff000038"
    } else {
      el.style.backgroundColor = "transparent"
    }    
  }
})

Vue.directive('tag-info', {
  inserted(el, binding, vnode) {
    //console.log('inserted:tag-info', binding.value)
    switch (Number(binding.value)) {
      case 0:
        el.innerHTML = `<span class="tag tag-warning">Diajukan</span>`
        break;
      case 1:
        el.innerHTML = `<span class="tag tag-success">Diverifikasi</span>`
        break;
      default:
        el.innerHTML = `<span class="tag tag-danger">Ditolak</span>`
        break;
    }
  },
  update(el, binding, vnode) {
    //console.log('inserted:tag-info', binding.value)
    switch (Number(binding.value)) {
      case 0:
        el.innerHTML = `<span class="tag tag-warning">Diajukan</span>`
        break;
      case 1:
        el.innerHTML = `<span class="tag tag-success">Diverifikasi</span>`
        break;
      default:
        el.innerHTML = `<span class="tag tag-danger">Ditolak</span>`
        break;
    }
  },  
})

Vue.directive('status-info', {
  inserted(el, binding, vnode) {
    //console.log('inserted:tag-info', binding.value)
    switch (Number(binding.value)) {
      case 0:
        el.innerHTML = `<span class="tag tag-warning">Belum Diajukan</span>`
        break;
      case 1:
        el.innerHTML = `<span class="tag tag-primary">Diajukan</span>`
        break;
      case 2:
        el.innerHTML = `<span class="tag tag-success">Diverifikasi</span>`
        break;
      default:
        el.innerHTML = `<span class="tag tag-danger">Ditolak</span>`
        break;
    }
  },
  update(el, binding, vnode) {
    //console.log('inserted:tag-info', binding.value)
    switch (Number(binding.value)) {
      case 0:
        el.innerHTML = `<span class="tag tag-warning">Belum Diajukan</span>`
        break;
      case 1:
        el.innerHTML = `<span class="tag tag-primary">Diajukan</span>`
        break;
      case 2:
        el.innerHTML = `<span class="tag tag-success">Diverifikasi</span>`
        break;
      default:
        el.innerHTML = `<span class="tag tag-danger">Ditolak</span>`
        break;
    }
  },  
})

Vue.directive('verification-info', {
  inserted(el, binding, vnode) {
    //console.log('inserted:tag-info', binding.value)
    switch (Number(binding.value)) {
      case 0:
        el.innerHTML = `<span class="tag tag-warning">Diajukan</span>`
        break;
      case 1:
        el.innerHTML = `<span class="tag tag-success">Diverifikasi</span>`
        break;
      default:
        el.innerHTML = `<span class="tag tag-danger">Belum Diajukan</span>`
        break;
    }
  },
  update(el, binding, vnode) {
    //console.log('inserted:tag-info', binding.value)
    switch (Number(binding.value)) {
      case 0:
        el.innerHTML = `<span class="tag tag-warning">Diajukan</span>`
        break;
      case 1:
        el.innerHTML = `<span class="tag tag-success">Diverifikasi</span>`
        break;
      default:
        el.innerHTML = `<span class="tag tag-danger">Belum Diajukan</span>`
        break;
    }
  },  
})

Vue.directive('bulan-or-triwulan', {
  inserted(el, binding, vnode) {
    //console.log('inserted:tag-info', binding.value)
    if(binding.value.triwulan == 4) {
      el.innerText = Romanize(binding.value.item) + ' Triwulan'
    } else {
      el.innerText = MonthConverter(binding.value.item)
    }
  },
  update(el, binding, vnode, oldVnode) {
     //console.log('inserted:tag-info', binding.value)
    if(binding.value.triwulan == 4) {
      el.innerText = Romanize(binding.value.item) + ' Triwulan'
    } else {
      el.innerText = MonthConverter(binding.value.item)
    }
  }  
})

Vue.directive('belanja', {
  inserted(el, binding, vnode) {
    //console.log('inserted:tag-info', binding.value)
    switch(binding.value) {
      case "belanja-1": 
        el.className = 'bg-gray-darkest text-white'
        break
      case "belanja-2":
        el.className = 'bg-gray-dark text-white'
        break
      case "belanja-3":
        el.className = 'bg-gray text-white'
        break
      case "belanja-4":
        el.className = 'bg-gray-light'
        break
      case "belanja-5":
        el.className = 'bg-yellow-lightest font-italic'
        break
    }
  },
  update(el, binding, vnode, oldVnode) {
     //console.log('inserted:tag-info', binding.value)
     switch(binding.value) {
      case "belanja-1": 
        el.className = 'bg-gray-darkest text-white'
        break
      case "belanja-2":
        el.className = 'bg-gray-dark text-white'
        break
      case "belanja-3":
        el.className = 'bg-gray text-white'
        break
      case "belanja-4":
        el.className = 'bg-gray-light'
        break
      case "belanja-5":
        el.className = 'bg-yellow-lightest font-italic'
        break
    }
  }  
})


Vue.directive('row-dark-gray', {
  bind(el, binding, vnode) {
    if (binding.value == "program") {
      el.className = "bg-gray text-white";
    }
  },
  update(el, binding, vnode, oldVnode) {
    if (binding.value == "program") {
      el.className = "bg-gray text-white";
    }
  }
})

Vue.directive('jenis-kelamin', {
  inserted(el, binding, vnode) {
    JenisKelamin(el, binding)
  },
  bind(el, binding, vnode) {
    JenisKelamin(el, binding)
  },
  update(el, binding, vnode) {
    JenisKelamin(el, binding)
  },
})

Vue.directive('jenis-spk', {
  inserted(el, binding, vnode) {
    if(binding.value == 'besar') {
      el.innerHTML = `<span class="tag tag-primary">SPK ${binding.value}</span>`
    } else {
      el.innerHTML = `<span class="tag tag-success">SPK ${binding.value}</span>`
    }
  },
  update(el, binding, vnode) {
    if(binding.value == 'besar') {
      el.innerHTML = `<span class="tag tag-primary">SPK ${binding.value}</span>`
    } else {
      el.innerHTML = `<span class="tag tag-success">SPK ${binding.value}</span>`
    }
  }      
})


/**
 * Footer
 */
Vue.directive('footer', {
  inserted(el, binding, vnode) {
    Footer(el, binding)
  },
  bind(el, binding, vnode) {
    Footer(el, binding)
  },
  update(el, binding, vnode) {
    Footer(el, binding)
  },
})

/**
 * TableView
 */
Vue.directive('active', {
  inserted(el, binding, vnode) {
    Active(el, binding)
  },
  bind(el, binding, vnode) {
    Active(el, binding)
  },
  update(el, binding, vnode) {
    Active(el, binding)
  },
})

Vue.directive('disabled', {
  inserted(el, binding, vnode) {
    Disabled(el, binding)
  },
  bind(el, binding, vnode) {
    Disabled(el, binding)
  },
  update(el, binding, vnode) {
    Disabled(el, binding)
  },
})

Vue.directive('hidden', {
  inserted(el, binding, vnode) {
    Hidden(el, binding)
  },
  bind(el, binding, vnode) {
    Hidden(el, binding)
  },
  update(el, binding, vnode) {
    Hidden(el, binding)
  },
})

Vue.directive('table-view-th', {
  inserted(el, binding, vnode) {
    TableViewTh(el, binding)
  },
  bind(el, binding, vnode) {
    TableViewTh(el, binding)
  },
  update(el, binding, vnode) {
    TableViewTh(el, binding)
  },
})

Vue.directive('no-data', {
  inserted(el, binding, vnode) {
    NoData(el, binding)    
  },
  bind(el, binding, vnode) {
    NoData(el, binding)    
  },
  update(el, binding, vnode) {
    NoData(el, binding)
  },
})

Vue.directive('active-info', {
  inserted(el, binding, vnode) {
    // console.log('active-info', binding.value)
    if(binding.value) {
      el.innerHTML = `<div class="tag tag-success">Aktif</div>`
    } else {
      el.innerHTML = `<div class="tag tag-secondary">Tidak Aktif</div>`
    }
  },
  update(el, binding, vnode) {
    // console.log('active-info', binding.value)
    if(binding.value) {
      el.innerHTML = `<div class="tag tag-success">Aktif</div>`
    } else {
      el.innerHTML = `<div class="tag tag-secondary">Tidak Aktif</div>`
    }
  }      
})

Vue.directive('dropdown-button', {
  inserted(el, binding, vnode) {
    el.className = `btn btn-sm btn-outline-${binding.value} dropdown-toggle `
  },  
})

Vue.directive('wilayah', {
  inserted(el, binding, vnode) {
    JenisWilayah(el, binding)    
  }
})