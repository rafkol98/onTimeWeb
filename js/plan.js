
    function myFunction(trip) {
        var database = firebase.database();
            var userId = user.uid
            var ref = database.ref('/profiles/'+userId+"/trips");
      
        return trip.remove();
      }
//   }
