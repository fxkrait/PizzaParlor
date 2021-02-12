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