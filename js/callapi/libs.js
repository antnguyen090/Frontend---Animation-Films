//get id number
$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    }
    return decodeURI(results[1]) || 0;
}

getRamdom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function removeAccents(str) {
    return str.normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}

function preg_quote (str, delimiter) {
    //  discuss at: https://locutus.io/php/preg_quote/
    // original by: booeyOH
    // improved by: Ates Goral (https://magnetiq.com)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Brett Zamir (https://brett-zamir.me)
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    //   example 1: preg_quote("$40")
    //   returns 1: '\\$40'
    //   example 2: preg_quote("*RRRING* Hello?")
    //   returns 2: '\\*RRRING\\* Hello\\?'
    //   example 3: preg_quote("\\.+*?[^]$(){}=!<>|:")
    //   returns 3: '\\\\\\.\\+\\*\\?\\[\\^\\]\\$\\(\\)\\{\\}\\=\\!\\<\\>\\|\\:'
   
    return (str + '')
      .replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&')
  }
function highlight(str, search) {
    return str.replace(new RegExp("(" + preg_quote(search) + ")", 'gi'), '<span class="bg-warning p-1">$1</span>');
}


