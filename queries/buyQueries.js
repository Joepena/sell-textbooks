var buyQueries = {} ;

buyQueries.loadAllFrom    = function(start,end) {

                                     //empty inputs
                                     if(!start && !end){
                                        return  `Select title,first_name,last_name, author, ISBN, price, listingId 
                                                 From (Select * From Listing Where Listing.IsSold = 'F') Natural Join Item Natural Join Account 
                                                 Where ROWNUM Between 0 AND 24`;
                                       
                                     }
                                    return `select *
                                            from (select x.*,rownum rnum
                                                  from(select i.TITLE, a.FIRST_NAME,a.LAST_NAME, i.AUTHOR,i.ISBN,l.PRICE
                                                       from ACCOUNT a, ITEM i, LISTING l
                                                       where a.EMAIL=l.EMAIL and
                                                             i.ISBN=l.ISBN and
                                                             l.ISSOLD='F'
                                                       order by i.TITLE asc)x
                                                  where rownum<=${end})
                                            where rnum>${start}`
                             };

buyQueries.loadListing  = function(id){
                            return `Select title, author, date_published,ISBN, condition, first_name, last_name, email, price, listingId
                                    From (Select * From Listing Where Listing.listingId = ${id}) Natural Join Item Natural Join Account`;
         
                         };
buyQueries.loadAvg      = function(id){
                            return `select i.ISBN, avg(l.price) as "Average Price"
                                    from ITEM i, LISTING l
                                    where i.ISBN=l.ISBN and
                                          l.listingId= ${id}
                                    group by i.ISBN
                                    `
                            
                             
                          };                         

buyQueries.loadSearchQuery  = function(queryString,start,end){
                                    
                                    if(!start && !end){
                                        return  `select * 
                                                from (select x.*,rownum rnum
                                                from( select i.title,a.first_name, a.last_name, i.author, l.ISBN, l.price, l.listingId 
                                                      from LISTING l, ITEM i, Account a where l.ISSOLD='F' and 
                                                      a.EMAIL = l.EMAIL and
                                                      (l.ISBN like '%${queryString}%' or      
                                                       i.AUTHOR like '%${queryString}%' or       
                                                       i.TITLE like '%${queryString}%') and       
                                                       i.ISBN=l.ISBN)x
                                                where rownum<=24)
                                                where rnum>0`
                                       
                                     }
                                    
                                    return `select * 
                                                from (select x.*,rownum rnum
                                                from( select i.title,a.first_name, a.last_name, i.author, l.ISBN, l.price, l.listingId
                                                      from LISTING l, ITEM i, Account a where l.ISSOLD='F' and 
                                                      a.EMAIL = l.EMAIL and
                                                      (l.ISBN like '%${queryString}%' or      
                                                       i.AUTHOR like '%${queryString}%' or       
                                                       i.TITLE like '%${queryString}%') and       
                                                       i.ISBN=l.ISBN)x
                                                where rownum<=${end})
                                                where rnum>${start}`                                             
};





module.exports = buyQueries;