var buyQueries = {} ;

buyQueries.loadAllFrom    = function loadAllFrom(start,end) {
                                     var base = `Select title,first_name,last_name, author, ISBN, price
                                                 From (Select * From Listing Where Listing.IsSold = 'F') Natural Join Item Natural Join Account
                                                 Where 
                                                `
                                     //empty inputs
                                     if(!start && !end){
                                        return  base + "ROWNUM <= 24"
                                                
                                     }
                                     return start+" <= ROWNUM "+" <= "+end
                             };







module.exports = buyQueries;