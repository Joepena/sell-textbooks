


var percentageQuery = "Select (((x.transactions/y.transactions)-1)*100) as '% Change' "+
                                  "From (select count(*) as transactions "+
                                      "From Listing l"+
                                      "Where l.TRANSACTIONDATE>'1 month ago' and "+
                                            "l.ISSOLD='T') x,"+
                                      "(select count(*) as transactions "+
                                      "From Listing l "+
                                      "Where l.TRANSACTIONDATE > '2 months ago' and "+
                                            "l.TRANSACTIONDATE < '1 month ago' and "+
                                            "l.ISSOLD='T')y"
                              
exports.percentDiff = percentageQuery;                              