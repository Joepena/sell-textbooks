var oracledb   = require('oracledb'),
    dbConfig   = require('../dbConfig'),
    fs         = require('fs');


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

        for(var i = 1; i<=11; i++){
            var obj = JSON.parse(fs.readFileSync('../json_accounts/user_'+i+'.json', 'utf8'));

            var tableName = 'ACCOUNT';

            obj.forEach(function (entry){

              connection.execute(
                  "INSERT INTO "+tableName+" VALUES "+"(:0, :1, :2, :3)",
                  [entry.email, entry.first_name, entry.last_name, entry.phone_number],
                  { autoCommit: true },

                  function(err, result)
                  {
                    if (err) { console.error(err.message); return; }
                    else console.log('sucess on this one..');
                  });

                });
              }

        connection.close();

        });
