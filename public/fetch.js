$(document).ready(function() {
  var startTime = new Date().getTime();
  $.getJSON("/book", function(book) {
    var time = new Date().getTime();
    var dif = time - startTime;
    ms = dif % 1000;
    s = Math.floor(dif / 1000) % 60;
    m = Math.floor(dif / 1000 / 60) % 60;
    $("#swatchredis").text(m + ":" + s + ":" + ms);

    console.log(book);
  });

  var startTimeNoCache = new Date().getTime();
  $.getJSON("/book/nocache", function(book) {
    var time = new Date().getTime();
    var dif = time - startTimeNoCache;
    ms = dif % 1000;
    s = Math.floor(dif / 1000) % 60;
    m = Math.floor(dif / 1000 / 60) % 60;
    $("#swatch").text(m + ":" + s + ":" + ms);

    console.log(book);
  });

  var startTimeLocal = new Date().getTime();
  Services.cachedFetch.cachedFetch(
    "/book",
    {},
    10000,
    function(book) {
      var time = new Date().getTime();
      var dif = time - startTimeLocal;
      ms = dif % 1000;
      s = Math.floor(dif / 1000) % 60;
      m = Math.floor(dif / 1000 / 60) % 60;
      $("#swatchlocal").text(m + ":" + s + ":" + ms);

      console.log(book);
    },
    function() {}
  );
});
