createURLSlug = function (url){
  var slugRegex = /[^\w\-\.\~]/g;
  while(slugRegex.test(url)) {
    url = url.replace(slugRegex, '-');
  }
  return url.toLowerCase();
};