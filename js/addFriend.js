

// function getHashEmail(email){
//     var hash = 7;
//     for(var i=0; i<email.length;i++){
//         hash = (hash*17) + email.charAt(i);
//         console.log("hash "+i+ "   value:"+hash);
//     }
//     return hash;
// }

// function cryptoHash(...inputs){
//     const hash = crypto.createHash('sha256');

//     //joins everything from the input and updates the has.
//     hash.update(inputs.sort().join(''));

//     //return the result of the hash in a hex form.
//     return hash.digest('hex');
// };

function sendReq(emailIn){
var hashedEmail = cryptoHash(emailIn.toLowerCase());

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
                console.log("empika mesa")
                friendUid = data.child(hashedEmail).val();

                var ReqRef = database.ref('/friendRequests/');

                ReqRef.on('value', gotData, errData);
        
                function gotData(data){
                    var statusOfUser =  data.child(userId).child("friends").child(friendUid).child("status").val();
                    var statusOfFriend = data.child(friendUid).child("friends").child(userId).child("status").val();
                    
                    if(statusOfFriend!=null && statusOfUser!=null){
                       window.alert("You already made a connection with that person!");
                    }
        
                    else{
                        var userRef = ref.child(userId);
                        userRef.child("friends").child(friendUid).child("status").set("Sent");
        
                        var friendRef = ref.child(friendUid);
                        friendRef.child("friends").child(userId).child("status").set("Received");
        
                        window.alert("Friend request sent.");
        
                        var email = $("#emailEnter");
                        email.set("");
        
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


// function sendRequest(friendUid){

//     firebase.auth().onAuthStateChanged(function (user)
//     {
  
//       if(user){
//         var database = firebase.database();
//         var userId = user.uid
//         var ref = database.ref('/friendRequests/');

//         ref.on('value', gotData, errData);

//         function gotData(data){
//             var statusOfUser =  data.child(userId).child("friends").child(friendUid).child("status").val();
//             var statusOfFriend = data.child(friendUid).child("friends").child(userId).child("status").val();
            
//             if(statusOfFriend!=null && statusOfUser!=null){
//                window.alert("You already made a connection with that person!");
//             }

//             else{
//                 var userRef = ref.child(userId);
//                 userRef.child("friends").child(friendUid).child("status").set("Sent");

//                 var friendRef = ref.child(friendUid);
//                 friendRef.child("friends").child(userId).child("status").set("Received");

//                 window.alert("Friend request sent.");

//                 var email = $("#emailEnter");
//                 email.set("");

//             }
//          }

//         function errData(err) {
//             console.log('Error!');
//             console.log(err);
//         }
//       }
//     });

// }