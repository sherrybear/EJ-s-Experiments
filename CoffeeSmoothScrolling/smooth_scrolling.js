var scrolloffset, scrolltiming;

scrolloffset = 0;

scrolltiming = 0;

$(document).ready(function() {
  var filterpath, locationPath, scrollElem;
  filterpath = function(string) {
    return string.replace(/^\//, '').replace(/(index|default).[a-zA-Z]{3,4}$/, '').replace(/\/$/, '');
  };
  locationPath = filterPath(location.pathname);
  return scrollElem = scrollableElement('html', 'body');
});
