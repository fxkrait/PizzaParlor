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
  
  function signOut() {
      sessionStorage.removeItem("loggedInUser");
      sessionStorage.removeItem("favorites");
      sessionStorage.removeItem("currentOrder");
      $("#userStatus").text('Anonymous User');
      $('#userLoginButton').prop('disabled', false); 
      $('#userRegistrationButton').prop('disabled', false);
  }
  
  function login() {
    // ensure storage is supported
    if (typeof Storage !== "undefined") {
      alertify.set('notifier','position', 'top-center');
  
      // update values
      // could do:
      //window.document.getElementById("perm").innerHTML = window.localStorage.getItem("first")
      
      // get the values the user entere      let email = $("#registerEmail").val(); 
      let email = $("#loginEmail").val(); 
      let pass =  $("#loginPass").val();
  
      // visually reset the fields again.
      //document.getElementById("loginEmail").value = "";
      //document.getElementById("loginPass").value = "";
  
      //document.getElementById("perm").innerHTML = localStorage.getItem("first");
      //alert(email);
  
      let getRegisteredUsers = JSON.parse(sessionStorage.getItem("registeredUsers"));
      if (getRegisteredUsers === null) {
        getRegisteredUsers = {};
      }
  
      let getExistingUser = getRegisteredUsers[email];
      console.log("getExistingUser is:");
      console.log(getExistingUser);
  
      //console.log("before if");
      // if no registered user found
      if (getExistingUser !== undefined && getExistingUser.pass === pass) {
  
          $("#loginEmail").val("")
          $("#loginPass").val("")
      
        //console.log("suc");
        //alertify.success(`Login successful for ${email}`);
        alertify.success(`Login successful`);
        sessionStorage.setItem("loggedInUser", JSON.stringify(getExistingUser));
        console.log(getExistingUser);
        $("#userStatus").text('Hello, ' + `${getExistingUser.fName}`);
        resetFavorites();
        $('#userLoginButton').prop('disabled', true); 
        $('#userRegistrationButton').prop('disabled', true);
  
        //let email = $("#loginEmail").val(); 
        //let pass =  $("#loginPass").val();
      } else { // existing user registered with provided email
        // print an error
        //console.log("fail");
        alertify.error(`Login unsuccessful! Invald Email/Password combination.`);
      }
      
  
      /*var testUser = {pass:'pass', fName: 'greg', lName:'hab'};
      let testEmail = 'test@gmail.com';
      sessionStorage[testEmail] = JSON.stringify(testUser);
      //console.log(sessionStorage['user']);
      let testUserGot = JSON.parse(sessionStorage.getItem(testEmail))
      console.log(testUserGot);
      console.log(testUserGot.pass);
      */
     /*
      let map = {};
      map["test@gmail.com"]= {pass: "passtest", fName: "greg", lName: "hab"};
      console.log(map);
      sessionStorage.setItem('registeredUserMap', JSON.stringify(map))
      let map2 = JSON.parse(sessionStorage.getItem('deletedItems'))
      console.log(map2);
  */
      /*alertify.success(`Login successful for ${email}`);
      alertify.error(`Login unsuccessful for ${email}`);*/
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
          let loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
          console.log(loggedInUser);
          //$("#userStatus").text('Hello, ' + `${loggedInUser.fName}`);
  
          if(loggedInUser != null) {// logged in
  
              /*console.log("inside");
              console.log("loggedInUser");
              console.log(loggedInUser);
              console.log("loggedInUser.fName");
              //console.log(loggedInUser.get("fName"));
              console.log(loggedInUser.email);
  */
              $("#userStatus").text('Hello, ' + `${loggedInUser.fName}`);
              $("#userStatus").css('color', 'red');
              $('#userLoginButton').prop('disabled', true); 
              $('#userRegistrationButton').prop('disabled', true);
  
          }
        
      } else {
          window.alert("Sorry, your browser does not support Web Storage...");
        }
      
  
    });
    
  
  function register() {
      // ensure storage is supported
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
  
   
  
        // construct JSON object for storage
        var registeredUser = {email, pass, fName, lName};
        // get existing user from storage if available
        //let getExistingUser = JSON.parse(sessionStorage.getItem(email));
        let registeredUsers = JSON.parse(sessionStorage.getItem("registeredUsers"));
        if (registeredUsers === null) {
            registeredUsers = {};
        }
        console.log("registeredUser:")
        console.log(registeredUser);
        console.log("registereUders[email]")
        console.log(registeredUsers[email]);
  
        // if no registered user found
        if (registeredUsers[email] === undefined) {
            console.log("if?");
          if (!error) {
              console.log("no error?");
              // visually reset the fields again.
              $("#registerFirstName").val("")
              $("#registerLastName").val("")
              $("#registerEmail").val("")
              $("#registerPass").val("")
              $("#registerPass2").val("")
  
              // then register the user
              registeredUsers[email] = registeredUser;
              console.log("registered users locally:");
              console.log(registeredUsers)
              sessionStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
              //sessionStorage["registeredUsers"] = JSON.stringify(registeredUsers);
              let getRegisteredUsers = JSON.parse(sessionStorage.getItem("registeredUsers"));
              console.log("registeredUsers:");
              console.log(getRegisteredUsers);
              console.log(getRegisteredUsers[email]);
  
              alertify.success(`Registration successful for ${email}`);
          }
  
        } else { // existing user registered with provided email
          // print an error
          alertify.error(`There is already a user registered with the email: ${email}`);
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
  