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
        //error handling
        if (err) { console.error(err.message); return; }

        console.log('Connection was successful!');
        // create Tables

        //ACCOUNT
        console.log('Creating User..');
        connection.execute(

          "CREATE TABLE ACCOUNT ( Email VARCHAR(255) PRIMARY KEY NOT NULL , First_Name VARCHAR(255) NOT NULL, Last_Name VARCHAR(255) NOT NULL,	Phone_Number VARCHAR(255) NOT NULL); ",
          { autoCommit: true },
          function(err, result)
          {
            if (err) { console.error(err.message); return; }
            console.log('table User created...');
        });

        // ITEM
        console.log('Creating Item..');
        connection.execute(

          "CREATE TABLE ITEM ( ISBN VARCHAR(255) PRIMARY KEY NOT NULL,	Author VARCHAR(255),	Title VARCHAR(255),	Date_Published VARCHAR(255)); ",
          { autoCommit: true },
          function(err, result)
          {
            if (err) { console.error(err.message); return; }
            console.log('table Item created...');
        });

        //lISTING
        console.log('Creating Listing..');
        connection.execute(

          "CREATE TABLE Listing (	Price NUMERIC(6,2)NOT NULL,	Condition VARCHAR(255) NOT NULL,	ListingID INTEGER PRIMARY KEY NOT NULL,  	isSold VARCHAR(1) DEFAULT 'F',  	ISBN VARCHAR(255) NOT NULL REFERENCES Item(ISBN),	Email VARCHAR(255) NOT NULL REFERENCES ACCOUNT(Email),	TransactionDate DATE DEFAULT NULL, CONSTRAINT ck_isSold check (isSold in ('T', 'F')));",
          { autoCommit: true },
          function(err, result)
          {
            if (err) { console.error(err.message); return; }
            console.log('table Listing created...');
        });

        connection.close();

        });
