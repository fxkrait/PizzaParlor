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