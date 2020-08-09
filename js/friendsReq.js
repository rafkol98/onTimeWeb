//Create cards with all the user's friends.
firebase.auth().onAuthStateChanged(function (user)
{

  if(user){
    var database = firebase.database();
    var userId = user.uid
    var ref = database.ref('/friendRequests/'+userId+"/friends");
    var refProf = database.ref('/profiles/');

    ref.once('value', gotData, errData);

    function gotData(data){
    // console.log(data.val());
    var friends = data.val();
    var keys = Object.keys(friends);
    console.log("here friends" + keys);

    for (var i=0; i < keys.length; i ++){
        var k = keys[i];
        var status = friends[k].status;

        console.log("status of "+i+status);

        if(status=="Received"){
            var email;

            var timestamp = friends[k].timestamp;


            refProf.child(k).child("Email").once('value').then(function(snapshot) {
              email = snapshot.val();
              localStorage.setItem("friendUidEmail"+i, email);
              console.log(email);

              localStorage.setItem("friendUid"+i, k);
            
              // Create cards. 
              var myDiv = document.createElement("div");
              
              // Create cards. 
              var myDiv = document.createElement("div");

              if(document.getElementById("listFriends")){
                var option = document.createElement("option");
                option.value = email;
                option.text = email;
                document.getElementById("listFriends").appendChild(option);
              }
            
              myDiv.innerHTML = "<div class=\"card-body\">"+ 
              "<h5 class=\"card-title friendsCard\">"+email+"</h5>"+
              "<a href='javascript:acceptReq("+i+")' class=\"card-link\">Accept Request</a>"
              + "<a href='javascript:declineReq("+i+")' class=\"card-link redLink\">Decline Request</a>"

              +"</div>"+"</div>" 

              if(document.getElementById("tripsList")){
                document.getElementById("tripsList").appendChild(myDiv);
              }
                
              });
            
            

            
  
        }
    }
    }

    function errData(err) {
        console.log('Error!');
        console.log(err);
    }

  
    
  }
}
);


//Accept friend request.
function acceptReq(i){
  firebase.auth().onAuthStateChanged(function (user)
{
 
  if(user){

    var keyOfCurrentFriend = localStorage.getItem("friendUid"+i);


  var database = firebase.database();
  var userId = user.uid;
  var userEmail = user.email;
  var ref = database.ref('/friendRequests/'+userId+"/friends/"+keyOfCurrentFriend);
  var refFriend =  database.ref('/friendRequests/'+keyOfCurrentFriend+"/friends/"+userId);

  ref.child("status").set("Friends");
  ref.child("email").set(localStorage.getItem("friendUidEmail"+i));
  refFriend.child("status").set("Friends");
  refFriend.child("email").set(userEmail);


  

}}); setTimeout(function () {
  window.location.href = window.location; //will redirect to your blog page (an ex: blog.html)
}, 1000); //will call the function after 2 secs.
}

//Decline request.

function declineReq(i){
  firebase.auth().onAuthStateChanged(function (user)
{
 
  if(user){

    var keyOfCurrentFriend = localStorage.getItem("friendUid"+i);


  var database = firebase.database();
  var userId = user.uid;
  var userEmail = user.email;
  var ref = database.ref('/friendRequests/'+userId+"/friends/"+keyOfCurrentFriend);
  var refFriend =  database.ref('/friendRequests/'+keyOfCurrentFriend+"/friends/"+userId);

  ref.remove();
  refFriend.remove();


  

}}); setTimeout(function () {
  window.location.href = window.location; //will redirect to your blog page (an ex: blog.html)
}, 1000); //will call the function after 2 secs.
}


