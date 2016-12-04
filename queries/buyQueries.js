var buyQueries = {} ;

buyQueries.loadAllFrom    = function(start,end) {

                                     var base = `Select title,first_name,last_name, author, ISBN, price, listingId 
                                                 From (Select * From Listing Where Listing.IsSold = 'F') Natural Join Item Natural Join Account 
                                                 Where `;
                                                  
                                     //empty inputs
                                     if(!start && !end){
                                        return  base + "ROWNUM Between 0 AND 24"
                                       
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

buyQueries.loadSearchQuery  = function(queryString,start,end){
                                    var base = `Select title,first_name,last_name, author, ISBN, price, listingId
                                                 From (Select * From Listing Where Listing.IsSold = 'F') Natural Join Item Natural Join Account 
                                                 Where `;
                                    if(!start && !end){
                                        return  base + "ROWNUM Between 0 AND 24"
                                       
                                     }
                                    // console.log(base+"ROWNUM Between "+start+" AND "+end);
                                    return base+"ROWNUM Between "+start+" AND "+end;                                             
};





module.exports = buyQueries;