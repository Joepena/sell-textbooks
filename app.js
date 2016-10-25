var oracledb   = require('oracledb'),
    dbConfig   = require('./dbConfig'),
    express    = require('express'),
    app        = express();


  app.get('/', function (req, res) {
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
        connection.execute(
          // example query
          "SELECT COUNTRY FROM LANGUAGE WHERE name = 'English' and percentage >50 ",
          function(err, result)
          {
            if (err) { console.error(err.message); return; }
            //res 
            res.send(result.rows);
          });
        });
      });


  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
