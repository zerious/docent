// @use jymin/jymin.js

Jymin.onReady(function () {
  var nav = Jymin.getElement('_docentNav');
  var doc = Jymin.getElement('_docentDoc');
  if (nav && doc) {
    var html = Jymin.getHtml(nav);
    if (!html) {
      var headings = [];
      html = '<t-form><t-field type="search"></t-field></t-form>';
      Jymin.getHtml(doc).replace(/<h(\d) id="(.*?)">/g, function (match, level, id) {
        var heading = Jymin.getElement(id);
        heading._depth = level - 2;
        headings.push(heading);
        var text = Jymin.getText(heading).replace(/\(.*$/, '');
        html += '<a href="#' + id + '">' + text + '</a>';
      });
      Jymin.setHtml(nav, html);
    }
  }
});
