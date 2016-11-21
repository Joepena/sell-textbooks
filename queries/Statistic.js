


 var countLastMonthQuery = "Select count(*) as TotalSales"+
                        " From Listing l"+
                        " Where l.TRANSACTIONDATE > TO_DATE('2016-09-20','YYYY-MM-DD')"

 var countCurrentMonthQuery = "Select count(*) as TotalSales"+
                        " From Listing l"+
                        " Where l.TRANSACTIONDATE > TO_DATE('2016-10-20','YYYY-MM-DD')"                       

 var percentageDiff = `Select (((x.transactions/y.transactions)-1)*100) as Change
                        From (select count(*) as transactions
                        From Listing l
                        Where l.TRANSACTIONDATE>TO_DATE('2016-09-20','YYYY-MM-DD') and
                              l.ISSOLD='T') x,
                              (select count(*) as transactions
                        From Listing l
                        Where l.TRANSACTIONDATE>TO_DATE('2016-08-20','YYYY-MM-DD') and
                              l.TRANSACTIONDATE<TO_DATE('2016-09-20','YYYY-MM-DD') and
                              l.ISSOLD='T')y
                        `

                        
 
                              
exports.countLastMonth = countLastMonthQuery;
exports.percentageDiff = percentageDiff; 
exports.countCurrentMonthQuery = countCurrentMonthQuery;                             