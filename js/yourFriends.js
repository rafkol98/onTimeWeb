//Create cards with all the user's friends.
firebase.auth().onAuthStateChanged(function (user)
{

  if(user){
    var database = firebase.database();
    var userId = user.uid
    var ref = database.ref('/friendRequests/'+userId+"/friends");

    ref.once('value', gotData, errData);

    function gotData(data){
    // console.log(data.val());
    var trips = data.val();
    var keys = Object.keys(trips);
    console.log("here friends" + keys);

    for (var i=0; i < keys.length; i ++){
        var k = keys[i];
        var status = trips[k].status;

        console.log("status of "+i+status);

        if(status=="Friends"){
            var email = trips[k].email;

            console.log(k+" pou mesa")


            var timestamp = trips[k].timestamp;
            
            var date = convertLong(timestamp);

        // Create cards. 
            var myDiv = document.createElement("div");
            var keyOfCurrentTrip = localStorage.getItem("trip"+i);

            // Create cards. 
            var myDiv = document.createElement("div");

            var keyOfCurrentTrip = localStorage.getItem("trip"+i);

            myDiv.innerHTML = "<div class=\"card-body\">"+ 
            "<h5 class=\"card-title friendsCard\">"+email+"</h5>"+
            "<a href='javascript:smallLink("+keyOfCurrentTrip+","+i+")' class=\"card-link\">Plan a Meeting</a>"
            + "<a href='javascript:deleteTrip("+keyOfCurrentTrip+")' class=\"card-link\">Delete Friend</a>"

            +"</div>"+"</div>" 

        
            document.getElementById("tripsList").appendChild(myDiv);
  
        }
        





        myDiv.innerHTML = "<div class=\"card-body\">"+ 
        "<h5 class=\"card-title\">"+destination+"</h5>"+"<p class=\"card-text\">"+date+"</p>"+
        "<a href='javascript:smallLink("+keyOfCurrentTrip+","+i+")' class=\"card-link\">Edit Trip</a>"
        + "<a href='javascript:deleteTrip("+keyOfCurrentTrip+")' class=\"card-link\">Delete Trip</a>"

        +"</div>"+"</div>" 

       
        document.getElementById("tripsList").appendChild(myDiv);
    }
    }

    function errData(err) {
        console.log('Error!');
        console.log(err);
    }

    function convertLong(long) {
      var date = new Date(long);
      return date;
    }
  }
}
);