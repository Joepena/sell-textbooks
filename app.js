var oracledb   = require('oracledb'),
    dbConfig   = require('./dbConfig'),
    express    = require('express'),
    app        = express(),
    path       = require('path');


    app.set("view engine", "ejs");
    app.set('views', path.join(__dirname, 'views'));

    oracledb.getConnection(
        {
          user          : dbConfig.username,
          password      : dbConfig.password,
          connectString : dbConfig.connectString
        },
        function(err, connection)
        {
          if (err) { console.error(err.message); return; }
          console.log('Connection was successful!');

          //Express Routes

          //Landing
          app.get('/', function (req, res) {
            res.render("landing");
          });

          //Sell
          app.get('/sell', function (req, res) {
            res.render("sell");
          });

          //Buy
          app.get('/buy', function (req, res) {
            res.render("buy");
          });
          //Redirect
          app.use(function(req,res){
            res.sendStatus(404);
          });

          app.listen(3000, function () {
            console.log('Example app listening on port 3000!');
          });

        });
