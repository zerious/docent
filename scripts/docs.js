onReady(function () {
  var nav = getElement('_DOCENT_NAV');
  var doc = getElement('_DOCENT_DOC');
  var html = getHtml(nav);
  if (nav && doc && !html) {
    var headings = [];
    html = '<form><input type="text" name="q"></form>';
    getHtml(doc).replace(/<h(\d) id="(.*?)">/g, function (match, level, id) {
      var heading = getElement(id);
      heading._DEPTH = level - 2;
      headings.push(heading);
      var text = getText(heading).replace(/\(.*$/, '');
      html += '<a href="#' + id + '">' + text + '</a>';
    });
    setHtml(nav, html);
  }
});