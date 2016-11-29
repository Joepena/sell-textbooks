var oracledb      = require('oracledb'),
    dbConfig      = require('./dbConfig'),
    express       = require('express'),
    app           = express(),
    path          = require('path'),
    statsQuery    = require('./queries/statistic'),
    buyQuery      = require('./queries/buyQueries'),
    adminQuery    = require('./queries/adminQueries'),
    bodyParser    = require('body-parser');
    

    app.set("view engine", "ejs");
    app.set('views', path.join(__dirname, 'views'));
    app.use(express.static(__dirname+"/public"));
    app.use(bodyParser.urlencoded({extended: true}));

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
            var countLastMonth;
            var percentDiff;
            var countCurrentMonth;
            connection.execute(statsQuery.countLastMonthQuery, function(err,result){
                      if(err) {console.error(err.message); return;}
                      //console.log(result.rows[0][0]);
                      countLastMonth = result.rows[0][0];   

                      connection.execute(statsQuery.percentageDiff, function(err,result){
                          if(err) {console.error(err.message); return;}
                          //console.log(result.rows[0][0]);
                          percentDiff = Math.round(result.rows[0][0]); 
                      
                          connection.execute(statsQuery.countCurrentMonthQuery, function(err,result){
                              if(err) {console.error(err.message); return;}
                              //console.log(result.rows[0][0]);
                              countCurrentMonth = result.rows[0][0]; 
                              res.render("landing",{countLastMonth: countLastMonth, countCurrentMonth: countCurrentMonth, percentDiff: percentDiff});   
                      });   
                });      
            }); 
                
          });


          //Sell
          app.get('/sell', function (req, res) {
            res.render("sell");
          });

          //Buy
          app.get('/buy/viewAll/', function (req, res) {
            
            connection.execute(buyQuery.loadAllFrom(), function(err,result){
              if(err) {console.log(err); return;}
              res.render("buy",{results: result.rows, rangeStart:24, rangeEnd: 48, url:req.url});
            });
          });
          
          //Buy - rangeSearch
          app.get('/buy/viewAll/:range', function (req, res) {
            var start;
            var end;
            var range = req.params.range.split(':'); 
            start = range[0];
            end = range[1];
            connection.execute(buyQuery.loadAllFrom(start,end), function(err,result){
              if(err) {console.log(err); return;}
              console.log(result.rows);
              res.render("buy",{results: result.rows, rangeStart:end, rangeEnd: Number(end)+24, url: req.url});
            });
          });
          
          //Buy - query
          app.get('/buy/query', function(req,res){
            var queryString = req.query.queryString;
            connection.execute(buyQuery.loadSearchQuery(queryString,null,null), function(err,result){
              if(err) {console.log(err); return;}
              res.render("buy",{results:result.rows, rangeStart:24,rangeEnd:48, url: req.url});
            });
            
          });

          //Buy - show page
          app.get('/buy/:id', function(req,res){
           connection.execute(buyQuery.loadListing(req.params.id), function(err,result){
            if(err) {console.log(err); return;}
            res.render("show",{results: result.rows});
            });
 
          });

          //User - Sign up
          app.get('/signup',function (req, res) {
             res.render("signup");
          });

          //User - Login
          app.get('/login',function (req, res) {
             res.render("login");
          });

          //Admin
          app.get('/admin',function (req, res) {
             var listingQuantity, itemQuantity, accountQuantity;
             connection.execute(adminQuery.listingCount, function(err,result){
               if(err) {console.log(err); return;}
               listingQuantity = result.rows[0][0];
               
               connection.execute(adminQuery.itemCount, function(err,result){
                if(err) {console.log(err); return;}
                itemQuantity = result.rows[0][0];
                
                connection.execute(adminQuery.accountCount, function(err,result){
                  if(err) {console.log(err); return;}
                  accountQuantity = result.rows[0][0];
                  
                  res.render("admin",{listingQuantity:listingQuantity,itemQuantity:itemQuantity,accountQuantity:accountQuantity  });
               });
              });
             });
             
          });

          //Redirect
          app.use(function(req,res){
            res.sendStatus(404);
          });

          app.listen(3000, function () {
            console.log('App listening on port 3000!');
          });

        });

