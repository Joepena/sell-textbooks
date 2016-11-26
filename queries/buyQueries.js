var buyQueries = {} ;

buyQueries.loadAllFrom    = function loadAllFrom(start,end) {
                                     var base = "Select title,first_name,last_name, author, ISBN, price From (Select * From Listing Where Listing.IsSold = 'F') Natural Join Item Natural Join Account Where ";
                                     //empty inputs
                                     if(!start && !end){
                                        return  base + "ROWNUM Between 0 AND 24"
                                                
                                     }
                                     console.log(base+"ROWNUM Between "+start+" AND "+end);
                                     return base+"ROWNUM Between "+start+" AND "+end;
                             };







module.exports = buyQueries;