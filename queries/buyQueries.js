var buyQueries = {} ;

buyQueries.loadAllFrom    = function loadAllFrom(start,end) {
                                     //empty inputs
                                     if(!start && !end){
                                        return `Select title,first_name,last_name, author, ISBN, price
                                                From (Select * From Listing Where Listing.IsSold = 'F') Natural Join Item Natural Join Account
                                                Where ROWNUM <= 24
                                                `
                                     }
                             };







module.exports = buyQueries;