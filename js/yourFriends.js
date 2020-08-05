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
    var friends = data.val();
    var keys = Object.keys(friends);
    console.log("here friends" + keys);

    for (var i=0; i < keys.length; i ++){
        var k = keys[i];
        var status = friends[k].status;

        console.log("status of "+i+status);

        if(status=="Friends"){
            var email = friends[k].email;

            var timestamp = friends[k].timestamp;
            
            var date = convertLong(timestamp);

            localStorage.setItem("friend"+i, k);
            // Create cards. 
            var myDiv = document.createElement("div");
            var keyOfCurrentFriend = localStorage.getItem("friend"+i);

   
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
            "<a href='javascript:smallLink("+keyOfCurrentFriend+","+i+")' class=\"card-link\">Plan a Meeting</a>"
            + "<a href='javascript:deleteFriend("+i+")' class=\"card-link redLink\">Delete Friend</a>"

            +"</div>"+"</div>" 

            if(document.getElementById("tripsList")){
              document.getElementById("tripsList").appendChild(myDiv);
            }
            
  
        }
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

function deleteFriend(i){
  firebase.auth().onAuthStateChanged(function (user)
{
 
  if(user){
  var keyOfCurrentFriend = localStorage.getItem("friend"+i);

  var database = firebase.database();
  var userId = user.uid
  var ref = database.ref('/friendRequests/'+userId+"/friends/"+keyOfCurrentFriend);
  var refFriend = database.ref('/friendRequests/'+keyOfCurrentFriend+"/friends/"+userId);

  ref.remove();
  refFriend.remove();
}}); window.location = window.location}
