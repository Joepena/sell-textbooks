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
        //we are generating 100k tuples for listings
        //100 iterations of selecting an account file and a item file and randomizing their selection 1k times per random file
        var iteration =1;
        for(var i=1; i<=99; i++){
            //select two random files to iterate 1k times
            var randomAccountFile = Math.ceil(Math.random()*9);
            var randomItemFile = Math.ceil(Math.random()*9);
            var itemFile = JSON.parse(fs.readFileSync('json_items/item_'+randomItemFile+'.json', 'utf8'));
            var accountFile = JSON.parse(fs.readFileSync('json_accounts/user_'+randomAccountFile+'.json', 'utf8'));

            var conditions = ['Perfect','Very Good','Good','Like New','Acceptable'];
            var soldStatus = ['T','F'];
            //for each account make a listing
            accountFile.forEach(function (account){
              var randomItem = itemFile[Math.floor(Math.random()*itemFile.length)]; 
              var listingObj = {
                  randomPrice: Math.round(Math.random()* (80 - 20) + 20,1),
                  randomCondition: conditions[Math.floor(Math.random()*conditions.length)],
                  listingId: iteration,
                  randomIsSold: soldStatus[Math.floor(Math.random()*soldStatus.length)],
                  randomISBN: randomItem.ISBN,
                  randomEmail: account.email,
                  randomDate: new Date("'"+Math.round(Math.random()* (2016 - 2006) + 2006)+'-'+
                   ('0'+Math.round(Math.random()* (12 - 1) + 1)).slice(-2)+'-'+
                   ('0'+Math.round(Math.random()* (30 - 1) + 1)).slice(-2)+"'"
                   )
                  
              }
              iteration++;
              var tableName = 'LISTING';
              connection.execute(
                  "INSERT INTO "+tableName+
                  " VALUES "+
                  "(:0, :1, :2, :3, :4, :5, :6)",
                  [listingObj.randomPrice,listingObj.randomCondition,listingObj.listingId,listingObj.randomIsSold,listingObj.randomISBN,
                    listingObj.randomEmail,listingObj.randomDate
                  ],
                  { autoCommit: true },

                  function(err, result)
                  {
                    if (err) { console.error(err.message); return; }
                    else console.log('success on this one..');
                  });

        });
      }

      connection.close();
});