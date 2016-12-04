var adminQueries = {} ;

adminQueries.listingCount = 'SELECT COUNT(ISBN) FROM LISTING';
adminQueries.itemCount = 'SELECT COUNT(TITLE) FROM ITEM';
adminQueries.accountCount = 'SELECT COUNT(EMAIL) FROM ACCOUNT';
adminQueries.mostPopular = `select *
                            from (select i.TITLE, count(*) as NumberSold
                                  from ITEM i, LISTING l
                                  where i.ISBN = l.ISBN and
                                        l.ISSOLD='T'
                                  group by i.TITLE
                                  order by NumberSold desc )
                            where rownum=1`;
adminQueries.leastPopular = `select *
                             from (select i.TITLE, count(*) as NumberSold
                                   from ITEM i, LISTING l
                                   where i.ISBN = l.ISBN and
                                         l.ISSOLD='T'
                                   group by i.TITLE
                                   order by NumberSold asc)
                             where rownum=1`; 
adminQueries.mostExpensive = `
                              select *
                              from (select i.TITLE, l.PRICE
                                    from ITEM i, LISTING l
                                    where i.ISBN = l.ISBN and
                                          l.ISSOLD='T'
                                    order by l.PRICE desc)
                              where rownum=1  
                             `;
adminQueries.leastExpensive = `select *
                               from (select i.TITLE, l.PRICE
                                     from ITEM i, LISTING l
                                     where i.ISBN = l.ISBN and
                                           l.ISSOLD='T'
                                     order by l.PRICE asc)
                                where rownum=1`;   
adminQueries.unsoldQueries = `select count(*) as "Number of Unsold Books"
                              from LISTING
                              where ISSOLD='F'`;
adminQueries.topTen = `select*
                       From (select a.Email, count(*) as NumberSold, sum(l.PRICE) as TotalEarnings
	                         From LISTING l, ACCOUNT a
	                         Where a.Email = l.Email and
                                   l.ISSOLD='T'
	                         Group by a.Email
	                         Order by NumberSold desc)
                        Where rownum<=10`;                                                                                                                                               
module.exports = adminQueries;
