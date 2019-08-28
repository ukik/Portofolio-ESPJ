import Vue from 'vue'

function MonthConverter(bulan) {
  switch (bulan) {
    case 1:
    case "1":
      return bulan = 'Januari'
      break;
    case 2:
    case "2":
      return bulan = 'Februari'
      break;
    case 3:
    case "3":
      return bulan = 'Maret'
      break;
    case 4:
    case "4":
      return bulan = 'April'
      break;
    case 5:
    case "5":
      return bulan = 'Mei'
      break;
    case 6:
    case "6":
      return bulan = 'Juni'
      break;
    case 7:
    case "7":
      return bulan = 'Juli'
      break;
    case 8:
    case "8":
      return bulan = 'Agustus'
      break;
    case 9:
    case "9":
      return bulan = 'September'
      break;
    case 10:
    case "10":
      return bulan = 'Oktober'
      break;
    case 11:
    case "11":
      return bulan = 'November'
      break;
    case 12:
    case "12":
      return bulan = 'Desember'
      break;
  }
}

function Romanize(num) {
  var lookup = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1
    },
    roman = '',
    i;
  for (i in lookup) {
    while (num >= lookup[i]) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}

Vue.filter('rupiah', function (value, args) {

  // console.log('rupiah', value)
  if (value != null) {

    var parts = value.toString().split(".");

    parts[0] = parseInt(parts[0]);

    parts = (parseFloat(parts.join(".")).toFixed(2)).toString();

    parts = parts.toString().split(".");

    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    if (args == undefined) {
      args = "Rp. "
    }

    if (isNaN(parts[0])) {
      return args + 0
    }

    return args + parts.join(",")
  } else {
    return 'Rp. ' + 0
  }

});

Vue.filter('rupiah2', function (value, args) {

  var parts = value.toString().split(".");

  parts[0] = parseInt(parts[0]);

  parts = (parseFloat(parts.join(".")).toFixed(2)).toString();

  parts = parts.toString().split(".");

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  if (args == undefined) {
    args = "Rp. "
  }

  return args + parts.join(",")

});

Vue.filter('strip', function (value) {
  // console.log('strip', value)
});

Vue.filter('notification', function (value, agrs) {
  if (value > 0) {
    var char = agrs.split(' ')
    var word = ""
    char.forEach((element, index) => {
      if (index > 0) {
        word += element
      }
    });
    return char[0] + " <b style='color:red'>" + value + "</b> " + word;
  } else {
    return agrs;
  }
});

Vue.filter('bulan', function (value, args) {
  if (args == undefined) {
    // console.log(value, args)
    var char = value.split('/')
    var bulan = Number(char[1]) //Number(value.match(new RegExp('/' + "(.*)" + '/'))[1]);
    bulan = MonthConverter(bulan)
    return char[0] + ' ' + bulan + ' ' + char[2];
  } else if (args == 'convert') {
    // console.log(value, args)
    return MonthConverter(value)
  }
});

Vue.filter('romawi', function (value, args) {
  return Romanize(value) + ' ' + args
})

Vue.filter('toYMD', function (value, args) {
  return value.split("/").reverse().join("-");
  return Romanize(value) + ' ' + args
})

Vue.filter('inull', function (value) {
  return value == null || value == undefined ? '' : value;
});

Vue.filter('inull_number', function (value) {
  return value == null || value == undefined ? 0 : value;
});