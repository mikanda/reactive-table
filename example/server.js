
/**
 * Module dependencies.
 */

var express = require('express')
  , app = express();

// middleware

app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.static(__dirname));
app.use(express.static(__dirname + '/..'));

// faux db

var db = { pets: [], users: [{
  id: 0,
  title: 'Mr',
  forename: 'Test',
  surname: 'User',
  birthdate: new Date,
  email: 'e@mail.com'
},{
  id: 1,
  title: 'Mrs',
  forename: 'Be',
  surname: 'Nutzer',
  birthdate: new Date,
  email: 'be@nutzer.com'
}] };

// routes

// users

/**
 * DELETE all users.
 */

app.del('/user/all', function(req, res){
  db.users = [];
  res.send(200);
});


/**
 * DELETE all users.
 */

app.del('/user/:id', function(req, res){
  var user = db.users[req.params.id];
  if (!user) return res.send(404, 'cant find user');
  db.users.splice(user.id, 1);
  res.send(200);
});

/**
 * GET all users.
 */

app.get('/user/all', function(req, res){
  res.send(db.users);
});


app.get('/user/filter', function(req, res){
  var users = [];
  var filter = req.query.filter;
  var filterBy = req.query.filterBy;
  if (filter === undefined || filterBy === undefined) {
    res.send(db.users);
    return;
  }
  var filters = filter.split(/ /gi);
  /*
   * select each user and test if all filter match at leatst one of filterBy fields
   */
  for (var i = 0; i < db.users.length; i++) {
    var user = db.users[i];
    
    /*
     * each filter param must match at least one property of the current user
     */
    var matches = true;
    for (var index in filters) {
      if (!filters.hasOwnProperty(index))
        continue;
        /*
        * select each user property
        */
      var m = false;
      for (var prop in user) {
        if (!user.hasOwnProperty(prop))
          continue;
        if (filterBy.indexOf(prop) !== -1) {
          /*
           * property is a valid filter property
           * 
           */
          if (user[prop].match(filters[index]) !== null){
            m = true;
            break;
          }
        }
      }
      if (m === false) {
        matches = false;
        break;
      }
    }
    if (matches)
      users.push(user);
  }
  res.send(users);
});

/**
 * POST a new user.
 */

app.post('/user', function(req, res){
  var user = req.body;
  var id = db.users.push(user) - 1;
  user.id = id;
  res.send({ id: id });
});

app.listen(3000);
console.log('test server listening on port 3000');