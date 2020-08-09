//Create cards with all the user's friends.
firebase.auth().onAuthStateChanged(function (user)
{

  if(user){
    var database = firebase.database();
    var userId = user.uid
    var ref = database.ref('/profiles/'+userId+"/meeting_request");

    // var refProf = database.ref('/profiles/');

    ref.once('value', gotData, errData);

    function gotData(data){
    // console.log(data.val());
    var meetings = data.val();
    var keys = Object.keys(meetings);
    console.log("here meetings" + keys);

    for (var i=0; i < keys.length; i ++){
        var k = keys[i];

            var meeting = meetings[k];
            console.log("edo"+meeting);
            var timestamp = meetings[k].timestamp;
            var destination = meetings[k].destination;
            var invitedByUid = meetings[k].senderUId;

            localStorage.setItem("meetingId"+i, k);
            localStorage.setItem("meetingTime"+i, timestamp);
            
              // Create cards. 
              var myDiv = document.createElement("div");
              
              // Create cards. 
              var myDiv = document.createElement("div");

              myDiv.innerHTML = "<div class=\"card-body\">"+ 
              "<h5 class=\"card-title friendsCard\">"+destination+"<br> invited by:"+invitedByUid+"</h5>"+
              "<a href='javascript:acceptReq("+i+")' class=\"card-link\">Accept Request</a>"
              + "<a href='javascript:declineReq("+i+")' class=\"card-link redLink\">Decline Request</a>"

              +"</div>"+"</div>" 

              if(document.getElementById("meetingsList")){
                document.getElementById("meetingsList").appendChild(myDiv);
              }
                
            
            
            

            
  
        }
    }
    }

    function errData(err) {
        console.log('Error!');
        console.log(err);
    }

  
    
  }

);


//Accept friend request.
function acceptReq(i){
  firebase.auth().onAuthStateChanged(function (user)
{
 
  if(user){
  var timestamp = localStorage.getItem("meetingTime"+i);

  var database = firebase.database();
  var userId = user.uid;
  var ref = database.ref('/profiles/'+userId+"/meeting_request").child(timestamp);
  var refTrip = database.ref('/profiles/'+userId+"/trips").child(timestamp);


    ref.once("value", function(snapshot) {
        console.log(snapshot.val());
       
        refTrip.set(snapshot.val());

        ref.remove();

        

    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });


  

 


}});

setTimeout(function () {
  
  window.location.href = window.location; //will redirect to your blog page (an ex: blog.html)
}, 4000); //will call the function after 2 secs.
}

//Decline request.

function declineReq(i){
  firebase.auth().onAuthStateChanged(function (user)
{
 
  if(user){

  var timestamp = localStorage.getItem("meetingTime"+i);

  var database = firebase.database();
  var userId = user.uid;
  var ref = database.ref('/profiles/'+userId+"/meeting_request").child(timestamp);
  ref.remove();
    

}}); setTimeout(function () {
  window.location.href = window.location; //will redirect to your blog page (an ex: blog.html)
}, 1000); //will call the function after 2 secs.
}


