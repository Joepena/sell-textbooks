var buyQueries = {} ;

buyQueries.loadAllFrom    = function loadAllFrom(start,end) {
                                     var base = `Select title,first_name,last_name, author, ISBN, price, listingId 
                                                 From (Select * From Listing Where Listing.IsSold = 'F') Natural Join Item Natural Join Account 
                                                 Where `;

                                     //empty inputs
                                     if(!start && !end){
                                        return  base + "ROWNUM Between 0 AND 24"
                                       
                                     }
                                    // console.log(base+"ROWNUM Between "+start+" AND "+end);
                                    return base+"ROWNUM Between "+start+" AND "+end;
                                    // return `select *
                                    //         from (select i.TITLE, a.FIRST_NAME,a.LAST_NAME, i.AUTHOR,i.ISBN,l.PRICE
                                    //               from ACCOUNT a, ITEM i, LISTING l
                                    //               where a.EMAIL=l.EMAIL and
                                    //                     i.ISBN=l.ISBN and
                                    //                     l.ISSOLD='F')
                                    //         where rownum Between 24 and 48
                                    //        `
                             };

buyQueries.loadListing  = function(id){
    return `Select * from LISTING Where listingId = ${id}`;
}





module.exports = buyQueries;