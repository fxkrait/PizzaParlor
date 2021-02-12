/*var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

*/


/* always keep at least 1 open by preventing the current to close itself */
$('[data-toggle="collapse"]').on('click',function(e){
    if ( $(this).parents('.accordion').find('.collapse.show') ){
        var idx = $(this).index('[data-toggle="collapse"]');
        if (idx == $('.collapse.show').index('.collapse')) {
            // prevent collapse
            e.stopPropagation();
        }
    }
});



// TESTING
let modifyA = () => {
    $('.card-title[data-index-number="0"]').text("test") ;
} 

// https://stackoverflow.com/questions/15839169/how-to-get-value-of-selected-radio-button
let updateSizeRadio = () => {
    let output = $("input[type='radio'][name='sizeRadios']:checked").val();
    console.log("size output is:");
    console.log(output);
    $('#pizzaSize').text(output);
}

// https://stackoverflow.com/questions/15839169/how-to-get-value-of-selected-radio-button
let updateCrustRadio = () => {
    let output = $("input[type='radio'][name='crustRadios']:checked").val();
    console.log("crust output is:");
    console.log(output);
    $('#pizzaCrust').text(output);
}
// https://stackoverflow.com/questions/15839169/how-to-get-value-of-selected-radio-button
let updateSauceRadio = () => {
    let output = $("input[type='radio'][name='crustRadios']:checked").val();
    console.log("sauce output is:");
    console.log(output);
    $('#pizzaSauce').text(output);
}

// https://stackoverflow.com/questions/15839169/how-to-get-value-of-selected-radio-button
let updateRadio = (feature) => {
    let radioName = feature + "Radios";
    //console.log(radioName);
    let output = $(`input[type='radio'][name=${radioName}]:checked`).val();
    //console.log("output is:");
    //console.log(output);
    let outputName = "pizza" + feature; 
    //console.log(outputName);
    $(`#${outputName}`).text(output);
    updatePizza();
}


let updateCheckBoxes = (feature) => {
    let checkboxName = feature + "Checkboxes";
    console.log("checkboxname: " + checkboxName);
    var checkedBoxes = document.querySelectorAll(`input[name=${checkboxName}]:checked`);
    console.log(checkedBoxes)
    //console.log(checkedBoxes[0].value);

    let outputName = "pizza" + feature + "List";


    let toppings = [];
    checkedBoxes.forEach(topping => {
        toppings.push(topping.value);
    }) 


    //console.log(toppings);



    var cList = $(`ul.${outputName}`)
   /* const $ul = $('<ul>', { class: "pizzaToppingsMeatList" }).append(
        toppings.map(topping => 
          $("<li>").append($("<a>").text(topping))
        )
      );*/

      let $cList = $(`#${outputName}`) //Your list element
      $cList.empty();

$.each(toppings, function(i, topping) {
    $cList.append("<li>" + topping + "</span></li>")
});

}


let getCheckBoxes = (feature) => {
    let checkboxName = feature + "Checkboxes";
    //console.log("checkboxname: " + checkboxName);
    var checkedBoxes = document.querySelectorAll(`input[name=${checkboxName}]:checked`);
    //console.log(checkedBoxes)
    //console.log(checkedBoxes[0].value);

    let outputName = "pizza" + feature + "List";


    let toppings = [];
    checkedBoxes.forEach(topping => {
        toppings.push(topping.value);
    }) 


    //console.log(toppings);
    return toppings;

}


// https://stackoverflow.com/questions/15839169/how-to-get-value-of-selected-radio-button
let checkoutPizza = () => {
    if (typeof Storage !== "undefined") {
        updatePizza();
        ///window.location.href = "checkout.html";
        window.location.href="cart.html";

    } else {
        window.alert("Sorry, your browser does not support Web Storage...");
    }
}

let redirectTest = () => {
    window.location.href="cart.html";
}

$(document).ready(function(){
    updatePizza();
    $("#pizzaName").on("input", function(){
        let name = $('#pizzaName').val();
        $('.card-title[data-index-number="0"]').text(`${name}`) ;
        // Print entered value in a div box
        //console.log($(this).val());
        updatePizza();
    });
    $("#pizzaQuantity").on("input", function(){
        // Print entered value in a div box
        //console.log($(this).val());
        updatePizza();
    });
});

// https://stackoverflow.com/questions/15839169/how-to-get-value-of-selected-radio-button
let updatePizza = () => {
    if (typeof Storage !== "undefined") {
        //alertify.success("test");

        let currentOrder = JSON.parse(sessionStorage.getItem("currentOrder"));

        if (currentOrder === null) {
            currentOrder = [];
        }

        let name = $('#pizzaName').val();
        if (name === "") {
            name = "Pizza"
        }
        let quantity = $('#pizzaQuantity').val();
        if (quantity === "") {
            quantity = "1";
        }
        let size = $('#pizzaSize').text();
        let crust = $('#pizzaCrust').text();
        let sauce = $('#pizzaSauce').text();
        let cheese = $('#pizzaCheese').text();

        let toppingsMeatList = getCheckBoxes('ToppingsMeat');
        let toppingsNonMeatsList = getCheckBoxes('ToppingsNonMeats');
        let pizza = {name, quantity, size, crust, sauce, cheese, toppingsMeatList, toppingsNonMeatsList};
        
        let price = calculatePizzaPrice(pizza)

        pizza.prize = price;
        console.log(pizza);
    
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

let calculatePizzaPrice = (pizza) => {
    let price = 11.99;
    if (pizza.size === 'Medium 12" (+2)') {
        price += 2
    } else if (pizza.size === 'Large 14" (+4)') {
        price += 4;
    } else if (pizza.size === 'X-Large" (+6)') {
        price += 6;
    } 
    if (pizza.crust === "Deep Dish (+2.95)") {
        price += 2.95
    }
    let quantity = $('#pizzaQuantity').val();
    if (quantity === "") {
        quantity = "1";
    }
    price *= quantity;
    price = price.toFixed(2); // round to 2 decimals.
    $('#pizzaPrice').text("$" + price.toString());
    //console.log(price);
    return price;
}

let colorFavoriteButton = () => {
    let checked = $('#favoritePizzaButton').attr("data-state");
    //console.log(checked);

}

let toggleFavoriteButton = () => {
    let button = $('#pizzaFavoriteButton');
    let checked = button.is(':checked')
    //let checked = button.attr("checked");
    //console.log(checked);
    if (checked) {
        //console.log("true");
        //button.prop("data-state", false);
        //button.html("Click to un-favorite order");
        $('#favoriteButtonText').text("Click to un-favorite order");
        button.css('background-color', 'red');
    } else {
        //console.log("false");
        //button.prop("data-state", true);
        //button.html("Click to favorite order");
        $('#favoriteButtonText').text("Click to favorite order");
        $('#favoriteButtonText').css('color', 'grey');

    }
}

let resetPizza = () => {


    // Size
    $('#sizeSmallRadio').attr('checked',true);

    // toppingsMeat
    $('#hamCheck').prop('checked', false);
    $('#beefCheck').prop('checked', false);
    $('#salamiCheck').prop('checked', false);
    $('#pepperoniCheck').prop('checked', false);
    $('#italianSausageCheck').prop('checked', false);
    $('#premiumChickenCheck').prop('checked', false);
    $('#baconCheck').prop('checked', false);
    $('#phillySteakCheck').prop('checked', false);
    
    // ToppingsNonMeat
    $('#hotBuffaloSauceCheck').prop('checked', false);
    $('#garlicCheck').prop('checked', false);
    $('#jalapenoPeppersCheck').prop('checked', false);
    $('#onionsCheck').prop('checked', false);
    $('#bananaPeppersCheck').prop('checked', false);
    $('#dicedTomatoesCheck').prop('checked', false);
    $('#blackOlivesCheck').prop('checked', false);
    $('#mushroomsCheck').prop('checked', false);
    $('#pineappleCheck').prop('checked', false);
    $('#shreddedProvoloneCheeseCheck').prop('checked', false);
    $('#cheddarCheeseCheck').prop('checked', false);
    $('#greenPeppersCheck').prop('checked', false);
    $('#spinachCheck').prop('checked', false);
    $('#roastedRedPeppersCheck').prop('checked', false);
    $('#fetaCheeseCheck').prop('checked', false);
    $('#shreddedParmesanAsiagoCheck').prop('checked', false);

    updatePizza();


}


let favoriteAPizza = (pizza) => {
    let price = 11.99;
    if (pizza.size === 'Medium 12" (+2)') {
        price += 2
    } else if (pizza.size === 'Large 14" (+4)') {
        price += 4;
    } else if (pizza.size === 'X-Large" (+6)') {
        price += 6;
    } 

    if (pizza.crust === "Deep Dish (+2.95)") {
        price += 2.95
    }
    price = price.toFixed(2); // round to 2 decimals.
    $('#pizzaPrice').text("$" + price.toString());
    //console.log(price);
    return price;
}


///////////////////////////////////////////////////////////////
/// Save Orders:
