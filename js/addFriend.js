//Send friend request to the friend.
function sendReq(hashedEmail){
console.log("hashed email"+hashedEmail);

var friendUid;

    firebase.auth().onAuthStateChanged(function (user)
    {
  
      if(user){

        var database = firebase.database();
        var userId = user.uid
        var ref = database.ref('/emailToUid/');
  
        ref.on('value', gotData, errData);
  
        function gotData(data){
           if(data.hasChild(hashedEmail)){
                
                friendUid = data.child(hashedEmail).val();

                var ReqRef = database.ref('/friendRequests/');

                ReqRef.once('value', gotData, errData);
        
                function gotData(data){
                    var statusOfUser =  data.child(userId).child("friends").child(friendUid).child("status").val();
                    var statusOfFriend = data.child(friendUid).child("friends").child(userId).child("status").val();

                    console.log(statusOfFriend+"   log status");
                    
                    if(statusOfFriend=="Friends" || statusOfFriend=="Received"){
                       window.alert("You already made a connection with that person!");
                    } else{
                        console.log("eimai mesa sto else");

                        var userRef = ReqRef.child(userId);
                        userRef.child("friends").child(friendUid).child("status").set("Sent");
        
                        var friendRef = ReqRef.child(friendUid);
                        friendRef.child("friends").child(userId).child("status").set("Received");
        
                        window.alert("Friend request sent.");

                        // window.location.href="loggedIn.html"
        
                    }   
                 }
        
                function errData(err) {
                    console.log('Error!');
                    console.log(err);
                }


                
           } 
        }

        function errData(err) {
            console.log('Error!');
            console.log(err);
        }
      }
    });

}

