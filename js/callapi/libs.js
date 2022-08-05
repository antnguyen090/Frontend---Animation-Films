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