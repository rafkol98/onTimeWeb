$("#btn_signup").click(function(){

    var email = $("#emailSignUp").val();
    var password = $("#passSignUp").val();
    var repeatPassword = $("#repeatPass").val();

    if(email != "" && password !="" && repeatPassword != ""){
      if(validateEmail(email) && validatePassword(password) && passwordsMatch(password,repeatPassword)){
        // firebase.auth().createUserWithEmailAndPassword(email,password);
        var result = firebase.auth().createUserWithEmailAndPassword(email,password).then(cred => {
            console.log(cred.user);
           
            window.location.href = "succesfuly.html";
                
                
                        
        });
        result.catch(function(error){
            if(error){

                var errorCode = error.code;
                var errorMessage = error.message;
                
                console.log(errorCode);
                console.log(errorMessage);
                window.alert("Message :" + errorMessage);


            
           } 
        });
     
    }else{
        window.alert("Please complete all the fields to sign up!");
    }
    }});


// Function used to validate user's email.
  function validateEmail(email){
    if(email.match(/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/)){
      console.log("valid email");
      return true;
    }else {
      window.alert("Your email is invalid you entered is invalid, please check it again.");
      return false;}
  }

// Function used to validate user's password.
  function validatePassword(password){
    if(password=="" || password.length<6){
      window.alert("make sure the password you entered is more than 6 characters long");
      return false;
    } else {
        console.log("password validated");
        return true;
    }

  }

  function passwordsMatch(password, repeatPass){
     if(password == repeatPass){
        console.log("passwords match");
       return true;
     } else{
      window.alert("The passwords you entered do not match!");
       return false;
     }
  }
