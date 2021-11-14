#SchoolProject #Solo

# Context

- Class: TCSS 460 A Wi 21: Client/Server Programming For Internet Applications
- Learned web development (Node.js, JavaScript, JQuery)
- (Technically group project, but partner became severely ill, and only did the HTML for the menu page (didn't do JS, JQuery, state management))

# What we were given

- Basic Node.JS project that had login/registration endpoints, and heroku-postgresql and add/remove DB endpoints configured (pool.query for SQL queries: get/post for login/register, get/post pizza order).
  - (We had worked on many of the Node.js endpoints (excl the DB ones and some of login/registration) throughout the quarter, and during assignments).

# What I did:

- My main job, was to do the frontend (JavaScript, JQuery, HTML5/CSS, local browser storage).
- In addition, I created a basic SQL DB for pizza orders, and backend node.js endpoinst with SQL queries that the frontend could call.
- Note: My SQL experience was gained from a separate databases class.

---

# The Aroma of Tacoma

## SQL:

### Member Table (given to us):

```
MemberID (PK)
fName
lName
email
pass
salt
```

- let salted_hash = getHash(password, salt)

### Pizza Orders Table:

```
OrderID (PK)
MemberID
OrderDetails (JSON)
```

- Stored each past order as a list of pizzas (JSON)

## Updating Pizza (new option selected)

- Got selected options using JQuery.
- let pizza = {name, quantity, size, crust, sauce, cheese, toppingsMeatList, toppingsNonMeatsList};
- Return the pizza object

# Order.js

JSON Objects used:

- "favorites": stores list of favorited orders
- "loggedInUser": stores username of current user.
- "currentOrder": stores list of pizzas in current order
- "editPizza": stores pizza that user clicked "edit" on in cart.html page
- "editIndex": Stores index of that pizza in current order, so that we can go back and replace it in the list of pizzas in current order.

## Startup function: [$(document).ready(function(){](../web/scripts/order.js#L163)

- Gets edit pizza from session storage (if they came from cart and clicked edit on a pizza, it will be stored here)
- gets editIndex (which pizza in list of pizzas in order, that the edited pizza is from)
- checks edit index
  - if we have a edited pizza queued up), then run loadEditedPizza() to load that given pizza up
    - If they edit pizza, and click "updatePizza", we run updatePizza() to get the updated edited pizza that they created, set currentOrders[editIndex] to update it in our current order, remove editPizza and editIndex from local storage.
  - Else, hide "updatePizza" button, and load a default pizza order.

## ResetPizza():

- Resets all clicked button, radios buttons, checked properties state, and then updatePizza(), updateRadio() and updateCheckBoxes() to re-load default state.

## Registration

### FrontEnd: [../web/scripts/loginRegister.js#L108](../web/scripts/loginRegister.js#L108)

- Encodes email and pass, sends it to auth GET endpoint to login, passes credentials in header.
- If reponse is OK, stores email, encoded pass, memberid in loggedInUserObject at sessionStorage
- Else, pop up error.

### BackEnd (POST API): [../routes/register.js#L52](../routes/register.js#L52)

- Validates inputs.
- Insert new user via SQL.
  - If email already exists (PK), then return error.
  - If user not found, return 404,ro if credenitals don't match, return 400 error.

## Login

### FrontEnd: [../web/scripts/loginRegister.js#L108](../web/scripts/loginRegister.js#L108)

- Sends in Email and Pass Header: 'Authorization': 'Basic ' + encoded
  - `let encoded = window.btoa(email + ':' + pass)`
  - If successful, store user in `loggedInUserObject` session storage, show "Login Successfull" pop up
  - Else, "Login unsuccessful popup"

### BackEnd (GET API): [../web/routes/signin.js#L47](../web/routes/signin.js#L47)

- Checks credetials, returns authentication cookie and JWT.

## Pizza Ordering:

### Get Pizza (Returns all ordered pizzas) [../web/routes/pizza_orders.js#L30](../web/routes/pizza_orders.js#L30)

### Add Pizza (place order) [../web/routes/pizza_orders.js#L95](../web/routes/pizza_orders.js#L95)

### Delete Pizza, or all pizzas (remove order) [../web/routes/pizza_orders.js#L196](../web/routes/pizza_orders.js#L196)
