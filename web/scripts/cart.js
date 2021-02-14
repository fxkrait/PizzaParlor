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

let redirectToOrderPage = () => {
    window.location.href = "order.html";
}

let noPizzasInCartScreen = () => {
  $( ".toHideIfNoOrders" ).remove();
  $("body").append("<h2>Please add some pizzas into your shopping cart first.<\h2>");
  $("body").append('<input class="btn btn-primary center" type="button" onclick="redirectToOrderPage()" name="submit" value="Add pizzas (click here)" />');
  //class="toHideIfNoOrders"
}

// run on load
$(document).ready(function(){
  buildHTMLPizzas();

  let currentOrder = JSON.parse(sessionStorage.getItem("currentOrder"));

  console.log("start currentOrder is: ");
  console.log(currentOrder);
  if(currentOrder === null || currentOrder.length === 0) {
    noPizzasInCartScreen();
  }
   // Delete Pizza Button
  //$(document).on('click', '.deletePizzaButton', function () {
    $(".deletePizzaButton").click(function() {
      // your function here
        console.log("deletePizzaButton");
        let i = $(this).attr('data-index-number');
        console.log("i is: " + i);
        deletePizza(i);
      });
    $(".editPizzaButton").click(function() {
      // your function here
      console.log("editPizzaButton");
      let i = $(this).attr('data-index-number');
      console.log("i is: " + i);
      editPizza(i);
    });

});

let editPizza = (i) => {
  if (typeof Storage !== "undefined") {
    console.log("");
    console.log("editPizza()");
    //let pizza = updatePizza();

    let currentOrder = JSON.parse(sessionStorage.getItem("currentOrder"));
    let editPizza = currentOrder[i];
    let editIndex = i;

    sessionStorage["editPizza"] = JSON.stringify(editPizza);
    sessionStorage["editIndex"] = JSON.stringify(editIndex);
    
    console.log("pizza to edit:");
    console.log(editPizza);
    console.log("edit index (pizza index)");
    console.log(editIndex);

    /*let editPizzaTest = JSON.parse(sessionStorage.getItem("editPizza"));
    let editPizzaIndex = JSON.parse(sessionStorage.getItem("editIndex"));

    console.log("editPizzaTest:");
    console.log(editPizzaTest);
    console.log("editPizzaIndex");
    console.log(editPizzaIndex);
*/


    //window.location.href = "checkout.html";
    window.location.href="order.html";

} else {
    window.alert("Sorry, your browser does not support Web Storage...");
}
}

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



/*

'<input class="btn btn-primary editPizzaButton" type="button" onclick=editPizza(' + `${i}` +') name="submit" value="Edit" />',
        '<input class="btn btn-primary deletePizzaButton" type="button" onclick=deletePizza(' + `${i}` +') name="submit" value="Remove" />',
*/


let buildPizza = (i, pizza) => {

  let accordian = [
    '<div class=accordion ' + 'data-index-number='+ `${i} ` + 'style="width: 300px;">',
    '<div class="card-header">',
        '<a class="card-title" id=pizzaName' + `${i} ` + 'data-index-number='+ `${i}` + '>',
            'Pizza',
        '</a>',
    '</div>',
    '<div id="collapseOne" class="card-body show" data-parent="#accordion">',
        '<input class="btn btn-primary editPizzaButton" ' + 'data-index-number='+ `${i} ` + 'type="button" name="submit" value="Edit" />',
        '<input class="btn btn-primary deletePizzaButton" ' + 'data-index-number='+ `${i} ` + 'type="button" name="submit" value="Remove" />',
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

// buy your order
let purchaseOrder = () => {
  console.log("purchaseOrder");
  //$("div").removeClass("accordion");
  $( "div" ).remove(".accordion");
  $( "div" ).remove(".price");
  $( "div" ).remove(".fields");
  $( "div" ).remove(".info");

  alertify.set('notifier','position', 'top-center');
  alertify.success("Thank you for your order!");
  //$("div#accordian").remove();
  sessionStorage.removeItem("currentOrder");
}


// remove pizza from current order
//   i is the index of the pizza to remove from the array of pizzas (currentOrder)
let deletePizza = (i) => {
  if (typeof Storage !== "undefined") {
    let currentOrder = JSON.parse(sessionStorage.getItem("currentOrder"));
    console.log("current order before:")
    console.log(currentOrder);
    currentOrder.splice(i, 1); // delete the ith pizza, shift everything else to the left.
    //console.log("currend order after is: ");
    //console.log(currendOrder);
    console.log("current order after is: ");
    console.log(currentOrder);
    sessionStorage.setItem("currentOrder", JSON.stringify(currentOrder));

    //console.log($( "div" ).attr("accordion").css("data-index-number"));
    //$('.div:not(.first)') 
    $('div[data-index-number=' + `${i}` +']').remove();
    /*if ($('div[data-index-number="spine_text"]').val().length > 22) {
    }*/

    /*$("div").filter(function() {
      return  $(this).attr("data-index-number") > i;
    });*/


    // find each child of accordian (all children of pizza HTML object)
    $("div .accordion").each(function() {
      let val = $(this).attr('data-index-number');
      if (val > i) {
        console.log("val is");
        console.log(val);
        $(this).find('[data-index-number]').attr('data-index-number', val-1);
        //$(this).find('[data-index-number]').attr('data-index-number', val-1);
        $(this).attr('data-index-number', val-1); 
      }
    });
    updateTotalPrice();

    //updateOrderPrice(i);
  
    //.css("background-color", "#173F5F"); 
    //sessionStorage.setItem("currentOrder", currentOrder);

    // traverse every displayed HTML pizza who has a data-index-number > i, and decremente their index numbers by 1
    //  (so that they have the correct index)
    //   also change deletePizza(i) to deletePizza(i-1)

    if(currentOrder === null || currentOrder.length === 0) {
      noPizzasInCartScreen();
    }
    


    ///window.location.href = "checkout.html";
    //window.location.href="cart.html";

  } else {
      window.alert("Sorry, your browser does not support Web Storage...");
  }
}

let buildHTMLPizzas = () => {
  console.log("cart buildHTMLPizzas()");
  //buildCart();
  let currentOrder = JSON.parse(sessionStorage.getItem("currentOrder"));

  console.log("currentOrder is");
  console.log(currentOrder);
  let i = 0;
  // traverse orders
  let price = 0;
  if(currentOrder !== null) {
    currentOrder.forEach((pizza) => {
      console.log("pizza price:");
      console.log(pizza.price);
      price += parseFloat(pizza.price);
      console.log(i);
      console.log(pizza);
      //console.log("hey");
      buildPizza(i, pizza);
      i = i+1;
    });
    //$("#totalPrice").text(price.toString());
  }
  $("#totalPrice").text(price.toString());  
}

let updateTotalPrice = () => {
  console.log("cart updateTotalPrice()");
  //buildCart();
  let currentOrder = JSON.parse(sessionStorage.getItem("currentOrder"));
  console.log("currentOrder updateTotalPrice is");
  console.log(currentOrder);

  let i = 0;
  // traverse orders
  let price = 0;
  currentOrder.forEach((pizza) => {
    console.log("pizza price:");
    console.log(pizza.price);
    price += parseFloat(pizza.price);
    console.log(i);
    console.log(pizza);
    //console.log("hey");
    i = i+1;
  });
  $("#totalPrice").text(price.toString());
}

let updateOrderPrice = (i) => {
  console.log("updateOrderPrice");
  
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
