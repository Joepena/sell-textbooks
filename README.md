# Sell-Textbooks

## Instructions for setup:

  1. [Follow this.](https://github.com/oracle/node-oracledb/blob/master/INSTALL.md#instrpm)
  2. [setup ufl vpn with cisco anyconnect](https://connect.ufl.edu/it/wiki/pages/glvpn.aspx)
  3. Have python 2.7
  4. download repo and run `npm install`
  5. Set-up your dbConfig.js file
  6. Populate your database:

    1. `createTables.js` is not working currently. For now go into SQL developer and run the following script:


    ````````
    CREATE TABLE ACCOUNT ( Email VARCHAR(255) PRIMARY KEY NOT NULL , First_Name VARCHAR(255) NOT NULL, Last_Name VARCHAR(255) NOT NULL,	Phone_Number VARCHAR(255) NOT NULL);

    CREATE TABLE ITEM ( ISBN VARCHAR(255) PRIMARY KEY NOT NULL,	Author VARCHAR(255),	Title VARCHAR(255),	Date_Published VARCHAR(255));

    CREATE TABLE Listing (	Price NUMERIC(6,2)NOT NULL,	Condition VARCHAR(255) NOT NULL,	ListingID INTEGER PRIMARY KEY NOT NULL,  	isSold VARCHAR(1) DEFAULT 'F',  	ISBN VARCHAR(255) NOT NULL REFERENCES Item(ISBN),	Email VARCHAR(255) NOT NULL REFERENCES ACCOUNT(Email),	TransactionDate DATE DEFAULT NULL, CONSTRAINT ck_isSold check (isSold in ('T', 'F')));

    ````````

    
    2. in your terminal go into `/util` directory
    3. run the following:
      * `node insertAccounts.js`
      * `node insertItems.js`
      * `node generateListings.js`
  7. run command `node app.js` while in directory.
  8. your app is running on `http://http://localhost:3000/`
