var adminQueries = {} ;

adminQueries.listingCount = 'SELECT COUNT(ISBN) FROM LISTING';
adminQueries.itemCount = 'SELECT COUNT(TITLE) FROM ITEM';
adminQueries.accountCount = 'SELECT COUNT(EMAIL) FROM ACCOUNT';

module.exports = adminQueries;
