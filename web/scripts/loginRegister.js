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

function login() {
  // ensure storage is supported
  if (typeof Storage !== "undefined") {
    alertify.set('notifier','position', 'top-center');
    alertify.success("test");

    // update values
    // could do:
    //window.document.getElementById("perm").innerHTML = window.localStorage.getItem("first")
    
    // get the values the user entere      let email = $("#registerEmail").val(); 
    let email = $("#loginEmail").val(); 
    let pass =  $("#loginPass").val();

    // visually reset the fields again.
    //document.getElementById("loginEmail").value = "";
    //document.getElementById("loginPass").value = "";
    $("#loginEmail").val("")
    $("#loginPass").val("")

    //document.getElementById("perm").innerHTML = localStorage.getItem("first");
    //alert(email);

    let getExistingUser = JSON.parse(sessionStorage.getItem(email));

    //console.log("before if");
    // if no registered user found
    if (getExistingUser !== null && getExistingUser.pass === pass) {
      //console.log("suc");
      //alertify.success(`Login successful for ${email}`);
      alertify.success(`Login successful`);
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

function register() {
    // ensure storage is supported
    if (typeof Storage !== "undefined") {
      alertify.set('notifier','position', 'top-center');


      // get the values the user entered in the email and password fields
      let fName = $("#registerFirstName").val();
      let lName = $("#registerLastName").val();
      let email = $("#registerEmail").val(); 
      let pass =  $("#registerPass").val();



      if (fName === "" || lName === "" || email === "" || pass === ""){
          alertify.error("Please fill out all fields to register");

        if (fName === "") { 
            $("#registerFirstName").css({
                "color" : "red"
            } );
        }
      } else {
       //alertify.success(JSON.stringify(validateEmail(email)));
       console.log(validateEmail(email));

 

      // construct JSON object for storage
      var registeredUser = {pass, fName, lName};
      // get existing user from storage if available
      let getExistingUser = JSON.parse(sessionStorage.getItem(email));

      // if no registered user found
      if (getExistingUser === null) {

        // visually reset the fields again.
        $("#registerFirstName").val("")
        $("#registerLastName").val("")
        $("#registerEmail").val("")
        $("#registerPass").val("")

        // then register the user
        sessionStorage[email] = JSON.stringify(registeredUser);
        let getExistingUser2 = JSON.parse(sessionStorage[email]);
        console.log(getExistingUser2);
        //alertify.success(JSON.stringify(getExistingUser2));
        alertify.success(`Registration successful for ${email}`);

      } else { // existing user registered with provided email
        // print an error
        alertify.error(`Registration unsuccessful! There is already a user registered with the email: ${email}`);
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