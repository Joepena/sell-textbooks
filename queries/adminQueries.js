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
adminQueries.avgConditionChange = `select (likenew.x-perfect.x) as "Perfect to Like New", (verygood.x-likenew.x) as "Like New to Very Good", (good.x-verygood.x) as "Very Good to Good", (acceptable.x-good.x) as "Good to Acceptable"
                                from(select round(avg(PRICE),2)as x
                                     from LISTING
                                     where CONDITION='Perfect')perfect,
                                     (select round(avg(PRICE),2)as x
                                      from LISTING
                                      where CONDITION='Like New')likenew,
                                      (select round(avg(PRICE),2)as x
                                       from LISTING
                                       where CONDITION='Very Good')verygood,
                                      (select round(avg(PRICE),2)as x
                                       from LISTING
                                       where CONDITION='Good')good,
                                       (select round(avg(PRICE),2)as x
                                        from LISTING
                                        where CONDITION='Acceptable')acceptable`                                                                                                                                                                         
module.exports = adminQueries;
