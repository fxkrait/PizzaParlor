/*
Login HTML Code:

 <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-right">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Login
          </a>
          <div class="dropdown-menu p-3">
            <form class="form-horizontal" method="post" accept-charset="UTF-8">
              <input class="form-control login" type="text" name="loginUser" placeholder="Email" />
              <input class="form-control login" type="text" name="loginPass" placeholder="Password" />
              <input class="btn btn-primary" type="button" name="submit" value="Login" />
            </form>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Register
          </a>
          <div class="dropdown-menu p-3">
            <form class="form-horizontal" method="post" accept-charset="UTF-8">
              <input class="form-control register" type="text" name="registerUser" placeholder="Email" />
              <input class="form-control register" type="text" name="registerPass" placeholder="Password" />
              <input class="btn btn-primary" type="button" name="submit" value="Login" />
            </form>
          </div>
        </li>
      </ul>
    </div>

    */



    let resetFavorites = () => {
      sessionStorage.removeItem("favorites");
  let favoritePizza = {
      cheese: "Normal",
  crust: "Deep Dish (+2.95)",
  name: "Big Pizza",
  price: "62.82",
  quantity: "3",
  sauce: "Ranch",
  size: 'X-Large 16" (+6)',
  toppingsMeatList: [
      "Ham",
      "Beef",
      "Salami",
      "Pepperoni",
      "Italian Sausage",
      "Premium Chicken",
      "Bacon",
      "Philly Steak",
  ],
  toppingsNonMeatsList: [
      "Hot Buffalo Sauce",
      "Garlic",
      "Jalapeno Peppers",
      "Onions",
      "Diced Tomatoes",    
      "Black Olives",
      "Shredded Provolone Cheese",
      "Cheddar Cheese",
      "Green Peppers",
      "Spinach",
      "Roasted Red Peppers",
  ]
  }
  console.log(favoritePizza);
  
  let favorites = [];
  favorites.push(favoritePizza);
  sessionStorage.setItem("favorites", JSON.stringify(favorites));
  }
  
  async function signOut() {
    let response = await fetch("/auth",  {
        method: 'DELETE'
    })
    if (response.ok) { // if HTTP-status is 200-299
        // get the response body (the method explained below)
        let json = await response.json()
        console.log(json)

        console.log("successfully signed out");
        sessionStorage.removeItem("loggedInUser");
        sessionStorage.removeItem("favorites");
        sessionStorage.removeItem("currentOrder");
        $("#userStatus").text('Anonymous User');
        $('#userLoginButton').prop('disabled', false); 
        $('#userRegistrationButton').prop('disabled', false);
    } else {
        alert("HTTP-Error: " + response.status)
        console.log(response.status)
        let json = await response.json()
        console.log(json)
    }

    
  }


  // using cookies
  async function login() {
    
    if (typeof Storage !== "undefined") {

      alertify.set('notifier','position', 'top-center');
      let email = $("#loginEmail").val(); 
      let pass =  $("#loginPass").val();
      console.log("pass is: " + pass);

      /*let getRegisteredUsers = JSON.parse(sessionStorage.getItem("registeredUsers"));
      if (getRegisteredUsers === null) {
        getRegisteredUsers = {};
      }*/
  
      //let getExistingUser = getRegisteredUsers[email];
      //console.log("getExistingUser is:");
      //console.log(getExistingUser);

      let encoded = window.btoa(email + ':' + pass)
      console.log(encoded)

      let response = await fetch("/auth",  {
          method: 'GET',
          headers: {
              'Authorization': 'Basic ' + encoded
          }
      })
      if (response.ok) { // if HTTP-status is 200-299
          // get the response body (the method explained below)
          let json = await response.json()
          console.log("login response is: ");
          console.log(json)
          console.log("member id is: ")
          console.log(json.memberid);

          if (json.success) {
            //console.log(pass)
            //console.log(getRegisteredUsers)

            let loggedInUserObject = {email, pass:btoa(pass), memberid: json.memberid};
            //alertify.success(`Login successful for ${email}`);
            alertify.success(`Login successful`);
            //getExistingUser.pass = btoa(pass);
            //getExistingUser.memberid = json.memberid;
            //sessionStorage.setItem("loggedInUser", JSON.stringify(getExistingUser));
            sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUserObject));
            //console.log(getExistingUser);
            //$("#userStatus").text('Hello, ' + `${getExistingUser.fName}`);
            $("#userStatus").text('Hello, ' + `${email}`);

            resetFavorites();
            $('#userLoginButton').prop('disabled', true); 
            $('#userRegistrationButton').prop('disabled', true);

              //alertify.success("json.success");
              console.log("cookie: ")
              console.log(document.cookie)
          }
      } else {
          alertify.error(`Login unsuccessful! Invald Email/Password combination.`);
          //alert("HTTP-Error: " + response.status)
          console.log(response.status)
          let json = await response.json()
          console.log(json)
      }
  } else {
    window.alert("Sorry, your browser does not support Web Storage...");
  }
}
  
  
  // run on load
  $(document).ready(function(){
  
    alertify.set('notifier','position', 'top-center');
    if (typeof Storage !== "undefined") {

        console.log("init login");
        // check if logged in
        let loggedInUserString = sessionStorage.getItem("loggedInUser");
        console.log("loggedInUserString");
        console.log(loggedInUserString);
        if (loggedInUserString !== "undefined") {
          console.log("loggedInUserString !== undefined")
        } else {
          console.log("loggedInUserString == undefined");
        }
        //if (loggedInUserString !== "undefined") {
        if (loggedInUserString !== "undefined" && loggedInUserString !== null && loggedInUserString !== "") {
          //console.log("if!!");
          //console.log("loggedInUserString !== 'undefined': " + (loggedInUserString !== "undefined"));
          //let loggedInUser = JSON.parse(loggedInUserString);
          //console.log(loggedInUser);
          //$("#userStatus").text('Hello, ' + `${loggedInUser.fName}`);

          // if(loggedInUser != null) {// logged in

          //     // console.log("inside");
          //     // console.log("loggedInUser");
          //     // console.log(loggedInUser);
          //     // console.log("loggedInUser.fName");
          //     // console.log(loggedInUser.get("fName"));
          //     // console.log(loggedInUser.email);

          let loggedInUserObject = JSON.parse(loggedInUserString);

            //$("#userStatus").text('Hello, ' + `${loggedInUser.fName}`);
            //$("#userStatus").text('Hello, ' + `${loggedInUser.email}`);
            $("#userStatus").text('Hello, ' + `${loggedInUserObject.email}`);
            $("#userStatus").css('color', 'red');
            $('#userLoginButton').prop('disabled', true); 
            $('#userRegistrationButton').prop('disabled', true);

          // }
        }
    } else {
        window.alert("Sorry, your browser does not support Web Storage...");
     }
      
  
    });

    async function register() {
      if (typeof Storage !== "undefined") {
        alertify.set('notifier','position', 'top-center');


        // get the values the user entered in the email and password fields
        let fName = $("#registerFirstName").val();
        let lName = $("#registerLastName").val();
        let email = $("#registerEmail").val(); 
        let pass =  $("#registerPass").val();
        let pass2 =  $("#registerPass2").val();



        if (fName === "" || lName === "" || email === "" || pass === "" || pass2 === ""){
            alertify.error("Please fill out all fields to register");

          /*if (fName === "") { 
              $("#registerFirstName").css({
                  "color" : "red"
              } );
          }*/
        } 
        
        else {


          let error = false;
          if (pass != pass2) {
              alertify.error("Passwords do not match!");
              error = true;
          } else {
            let validPassword = validatePassword(pass);
            if (!validPassword) {
              error = true;
            }
        }

          if(!validateEmail(email)) {
              alertify.error("email is not in a valid format!");
              error = true;
          }

          //alertify.success(JSON.stringify(validateEmail(email)));
          console.log(validateEmail(email));

          

    
          if (!error) {  
            // construct JSON object for storage
            var registeredUser = {email, pass, fName, lName};
            let encoded = window.btoa(email + ':' + pass);

            console.log(encoded)

            let response = await fetch("/auth",  {
              method: 'POST',
              headers: 
              {
                  'Content-Type' : 'application/json;charset=utf-8'
              },
              body: JSON.stringify(
              {
                first:fName, last:lName, email, password:pass, 
              })
            })
            if (response.ok) { // if HTTP-status is 200-299
              console.log("response is ok!");
              let json = await response.json()
              if (json.success) {
                  alertify.success(`Registration successful for ${email}`);


                  // local storage:

                  // get existing user from storage if available
                //   let getExistingUser = JSON.parse(sessionStorage.getItem(email));
                //   registerUsers.pass = btoa(pass);
                //   let registeredUsers = JSON.parse(sessionStorage.getItem("registeredUsers"));
                //   if (registeredUsers === null) {
                //       registeredUsers = {};
                //   }
                //   console.log("registeredUser:")
                //   console.log(registeredUser);
                //   console.log("registereUders[email]")
                //   console.log(registeredUsers[email]);
            
                //   // if no registered user found
                //   if (registeredUsers[email] === undefined) {
                //       console.log("if?");
                //     if (!error) {
                //         console.log("no error?");
                //         // visually reset the fields again.
                //         $("#registerFirstName").val("")
                //         $("#registerLastName").val("")
                //         $("#registerEmail").val("")
                //         $("#registerPass").val("")
                //         $("#registerPass2").val("")
            
                //         // then register the user
                //         registeredUsers[email] = registeredUser;
                //         console.log("registered users locally:");
                //         console.log(registeredUsers)
                //         sessionStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
                //         //sessionStorage["registeredUsers"] = JSON.stringify(registeredUsers);
                //         let getRegisteredUsers = JSON.parse(sessionStorage.getItem("registeredUsers"));
                //         console.log("registeredUsers:");
                //         console.log(getRegisteredUsers);
                //         console.log(getRegisteredUsers[email]);
            
                //         //alertify.success(`Registration successful for ${email}`);
                //     }
                // }
              }

            } else {
              alertify.error(`There is already a user registered with the email: ${email}`);

            }
          } else {

          }
      }
    } else {
      window.alert("Sorry, your browser does not support Web Storage...");
    }
  }
    
    function validateEmail(email) {
      let res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return res.test(email);
    }
    function validate() {
      let result = $("#result");
      let email = $("#email").val();
      result.text("");
      if(validateEmail(email)) {
        result.text(email + " is valid");
        result.css("color", "blue");
      } else {
        result.text(email + " is not valid");
        result.css("color", "red");
      }
      return false;
    }
  
    // returns true/false if a password is valid.
    function validatePassword(password) {
  
      // https://stackoverflow.com/questions/1559751/regex-to-make-sure-that-the-string-contains-at-least-one-lower-case-char-upper
      let capitalsRegex = new RegExp("(?=.*[A-Z])");    // use positive look ahead to see if at least one upper case letter exists
      let digitRegex = new RegExp("[0-9]");           // use positive look ahead to see if at least one digit exists
  
      let validPassword = true;
  
      if (password == undefined || password == null || password == "") {
        alertify.error("password should not be blank!");
        validPassword = false;
      } else if (password.length < 8) {
        alertify.error("password should be atleast 8 characters!");
        validPassword = false;
      } else if (!capitalsRegex.test(password)) {
        alertify.error("Your password needs a capital letter!");
        validPassword = false;
      } else if (!digitRegex.test(password)) {
        alertify.error("Your password needs atleast one number!");
        validPassword = false;
      }
  
      return validPassword;
    }
  