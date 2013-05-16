function init() {
  var ReactiveTable = require('reactive-table');
  var model = require('component-model');

  var table = document.querySelector('table');
  var renderer = [];
  renderer.push('<span data-text="id"></span>');
  renderer.push('<span data-text="{title} {forename} {surname}"></span>');
  renderer.push('<span data-text="birthdate | date:\'%Y-%m-%d\'"></span>');
  renderer.push('<span>Statischer scheiß</span>');
  renderer.push('<span class="btn" on-click="buttonClick" data-text="Change {email}"></span>');
  
  var scope = {
    date: function (date, format) {
      date = new Date(date);
      return format
              .replace('%Y', date.getFullYear())
              .replace('%m', date.getMonth())
              .replace('%d', date.getDate());
    },
    buttonClick: function () {
      console.log('buttonClick');
    }
  };
  var rt = new ReactiveTable(null, table, renderer, scope);
  var User = model('User')
              .attr('id')
              .attr('title')
              .attr('forename')
              .attr('surname')
              .attr('birthdate')
              .attr('email');
  User.all(function (err, collection) {
    rt.setCollection(collection);
  });
};