function showPickupOptions()  {
  showCustomerForm();
  document.getElementById('deliveryoptions').style.display = 'none';
}

function showCustomerForm() {
  document.getElementById('customerForm').style.display = "block";
  
}

function showDeliveryOptions() {
  document.getElementById('deliveryoptions').style.display = "block";
  document.getElementById('customerForm').style.display = 'none';
}


// https://stackoverflow.com/questions/15839169/how-to-get-value-of-selected-radio-button
let getOrder = () => {
  if (typeof Storage !== "undefined") {
      let currentOrder = JSON.parse(sessionStorage.getItem("currentOrder"));
      console.log(currentOrder);


      ///window.location.href = "checkout.html";
      //window.location.href="cart.html";

  } else {
      window.alert("Sorry, your browser does not support Web Storage...");
  }
}

// run on load
$(document).ready(function(){
  //buildCart();
  let currentOrder = JSON.parse(sessionStorage.getItem("currentOrder"));

  let i = 0;
  // traverse orders
  currentOrder.forEach((pizza) => {
    console.log(i);
    console.log(pizza);
    //console.log("hey");
    buildPizza(i, pizza);
    i = i+1;
  });
});

let title = "title";
let content = "content";

let useIt = () => {
  var $content = $("#template").clone();
  /*var $span = $content.find("span");
  $span.text(parseInt($span.text()) + 1);

  $content.children().each(function() {
      $("#container").append($(this));
  });*/
}


let buildPizza = (i, pizza) => {

  let accordian = [
    '<div class="accordion" style="width: 300px;">',
    '<div class="card-header">',
        '<a class="card-title" id=pizzaName' + `${i} ` + 'data-index-number='+ `${i}` + '>',
            'Pizza',
        '</a>',
    '</div>',
    '<div id="collapseOne" class="card-body show" data-parent="#accordion">',
        '<input class="btn btn-primary" type="button" onclick="checkoutPizza()" name="submit" value="Edit" />',
        '<input class="btn btn-primary" type="button" onclick="resetPizza()" name="submit" value="Remove" />',
        '<p>',
            '<h5>Price:</h5>',
            '<p id=pizzaPrice' + `${i}` + '>$33.45</p>',    
            '<h5>Quantity:</h5>',
            '<p id=pizzaQuantity' + `${i}` + '>1</p>',                      

            '<h5>Size:</h5>',
            '<p id=pizzaSize' + `${i}` + '></p>',

            '<h5>Crust:</h5>',
            '<p id=pizzaCrust' + `${i}` + '></p>',


            '<h5>Sauce:</h5>',
            '<p id=pizzaSauce' + `${i}` + '></p>',

            '<h5>Cheese (Cheddar):</h5>',
            '<p id=pizzaCheese' + `${i}` + '></p>',

            '<h5>Toppings (Meat):</h5>',
            '<ul id=pizzaToppingsMeatList' + `${i}` + '> </ul>',

            '<h5>Toppings (Non-Meats):</h5>',
            '<ul id=pizzaToppingsNonMeatsList' + `${i}` + '> </ul>',
        '</p>',
    '</div>',
'</div>'
  ];

  console.log(accordian);

  let accordianStr = accordian.join(" ");
  console.log(accordianStr);
  $("#orderContainer").append(accordianStr);
  updateSingleValuesOfPizza(i, pizza);
  updateListValuesOfPizza(i, pizza);


/*
var temp = document.getElementsByTagName("template")[0];
var pizzaListing = temp.content.cloneNode(true);
pizzaListing.
$("#orderContainer").append(pizzaListing);
*/

}

let testModify = () => {
  //let currentOrder = JSON.parse(sessionStorage.getItem("currentOrder"));
  //let pizza = currentOrder[0];
  $("#pizzaName0").text("testing");
  $("#pizzaCrust0").text("testing");
  //$("#pizzaQuantity0").text(55);

  //${"#pizzaName0").text("testing");
}

// https://stackoverflow.com/questions/15839169/how-to-get-value-of-selected-radio-button
let updateSingleValuesOfPizza = (i, pizza) => {

  let features = ["Name", "Price", "Quantity", "Size", "Crust", "Sauce", "Cheese"];

  let featuresLower =  features.map(feature => feature.toLowerCase());

  features.forEach(feature => {
    console.log(feature);
    
    let idName = "pizza" + feature + i;
    console.log("idName: " + idName);
    let pizzaFeature = feature.toLowerCase();
    console.log("pizzaFeature: " + pizzaFeature);
    console.log("value:" + pizza[pizzaFeature]);
    $(`#${idName}`).text(pizza[pizzaFeature]);
    //$(`#${idName}`).text("test");

  });
}



// Toppings
let updateListValuesOfPizza = (i, pizza) => {

  let features = ["ToppingsMeatList", "ToppingsNonMeatsList"];

  let featuresLower =  features.map(feature => feature.toLowerCase());

  features.forEach(feature => {
    console.log(feature);

    let idName = "pizza" + feature + i; // ul "pizzaToppingsMeatList0"
    console.log("idName: " + idName);
    //let pizzaFeature = feature.toLowerCase();
    let pizzaFeature = feature[0].toLowerCase() + feature.slice(1);
    console.log("pizzaFeature: " + pizzaFeature);
    console.log("value:" + pizza[pizzaFeature]);

    let $cList = $(`#${idName}`) //Your list element
    //$cList.empty();

    let toppings = pizza[pizzaFeature];
    console.log("toppings is: " + toppings);
    
    toppings.forEach(topping => {
      console.log("topping is: " + topping);
      $cList.append("<li>" + topping + "</span></li>")
    });
  });
}

let getPizzaValues = () => {

}

/*let buildPizza = (i, pizza) => {
  $('<div/>', {
    html: $('<h1/>', {
        html: title
    }).after(
        $('<div/>', {
            'text': content,
            'class': 'content'
        })
    )
}).appendTo('body');
}*/
