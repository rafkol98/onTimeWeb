  // Login user.
  $("#btn-login").click(function(){

    var email = $("#email").val();
    var password = $("#password").val();

    if(email != "" && password !=""){

        var result = firebase.auth().signInWithEmailAndPassword(email,password);
        result.catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            
            console.log(errorCode);
            console.log(errorMessage);
            window.alert("Message :" + errorMessage);
        }
        );

    }else{
        window.alert("Please write both your email and password to login");
    }
  });

// For upcoming walks.
  firebase.auth().onAuthStateChanged(function (user)
  {

    if(user){
      var database = firebase.database();
      var userId = user.uid
      var ref = database.ref('/profiles/'+userId+"/trips");

      ref.once('value', gotData, errData);

      function gotData(data){
      // console.log(data.val());
      var trips = data.val();
      var keys = Object.keys(trips);
      console.log("here" + keys);

      for (var i=0; i < keys.length; i ++){
          var k = keys[i];
          var destination = trips[k].destination;
          var timestamp = trips[k].timestamp;
          
          var date = convertLong(timestamp);

        // Create cards. 
          var myDiv = document.createElement("div");

          console.log(trips[k]);
          localStorage.setItem("trip"+i, k);
          localStorage.setItem("destination"+i, destination);
          console.log("trip"+i);
          var keyOfCurrentTrip = localStorage.getItem("trip"+i);

          myDiv.innerHTML = "<div class=\"card-body\">"+ 
          "<h5 class=\"card-title\">"+destination+"</h5>"+"<p class=\"card-text\">"+date+"</p>"+
          "<a href='javascript:smallLink("+keyOfCurrentTrip+","+i+")' class=\"card-link\">Edit Trip</a>"
          + "<a href='javascript:deleteTrip("+keyOfCurrentTrip+")' class=\"card-link redLink\">Delete Trip</a>"

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



  function deleteTrip(tripKey){
    firebase.auth().onAuthStateChanged(function (user)
  {

    if(user){
    var database = firebase.database();
    var userId = user.uid
    var ref = database.ref('/profiles/'+userId+"/trips/"+tripKey);

 
    return ref.remove();
  }}); window.location = window.location}



// Edit Trip modal
    function smallLink(tripKey,i){
      firebase.auth().onAuthStateChanged(function (user){
        if(user){
      document.querySelector('.bg-modal').style.display = "flex";

      document.getElementById('buttonPlan').addEventListener("click", function(){
        var database = firebase.database();
        var userId = user.uid
        
        
        var stringDate = document.getElementById("inputTime").value;
        var date = new Date(stringDate);

        var destTrip = localStorage.getItem("destination"+i);
        console.log(destTrip);
        var newTime =date.getTime();
        var ref = database.ref('/profiles/'+userId+"/trips/"+tripKey+"/timestamp").set(newTime,function(error){
          if (error) {
                    alert("Walk could not be saved." + error);
                  } else {
                    alert("Walk updated succesfully.");
                    window.location = window.location;
                  }
        });
        });}
      });}
