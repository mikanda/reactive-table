/*
 * require dependencies
 */
var domTable = require('dom-table'),
    reactive = require('reactive'),
    clone = require('clone'),
    domify = require('domify');

/*
 * create new instance of ReactiveTable
 */
function ReactiveTable (collection, table, renderer, scope) {  
  this._table = domTable(table);
  this._renderer = renderer;
  this._scope = scope;
  if (collection !== null)
    this.setCollection(collection);
  return this;
};

/*
 * set collection of models as rows of the table
 */
ReactiveTable.prototype.setCollection = function (collection) {
  var self = this,
      scope;
  this.collection = collection;
  /*
   * remove all table entries
   */
  this._table.removeAllRows();
  /*
   * append collection entries to table
   */
  this.collection.each(function (model) {
    var rowEl,
        cell,
        i;
    rowEl = self._table.addRow();
    for (i = 0; i < self._renderer.length; i++) {
      if (typeof self._renderer[i] === "object")
        cell = self._renderer[i].cloneNode(true);
      else 
        cell = domify(self._renderer[i]);
      rowEl.addCell(cell);
    }
    scope = clone(self._scope);
    scope.model = model;
    scope.row = rowEl;
    scope.collection = collection;
    reactive(rowEl, model, scope);
  });
  return this;
};

module.exports = function (collection, table, renderer, scope) {  
  return new ReactiveTable(collection, table, renderer, scope);
};