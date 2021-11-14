[../web/scripts/order.js](../web/scripts/order.js#L123)

#SchoolProject #Solo

# Context

- Class: TCSS 460 A Wi 21: Client/Server Programming For Internet Applications
- Learned web development (Node.js, JavaScript, JQuery)
- (Technically group project, but partner got Cancer, and only did some HTML and a table displaying menu (didn't do JS, JQuery, state management))

# What we were given

- Basic Node.JS project that had login/registration endpoints, and heroku-postgresql and add/remove DB endpoints configured (pool.query for SQL queries: get/post for login/register, get/post pizza order).
  - (We had worked on many of the Node.js endpoints (excl the DB ones and some of login/registration) throughout the quarter, and during assignments).

# What I did:

- My main job, was to do the frontend (JavaScript, JQuery, HTML5/CSS, local browser storage), create the SQL database for Orders, and the SQL queries on the frontend that were sent to the backend node.js endpoints.
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

### Favorite Orders Table:

```
FavOrderID (PK)
MemberID
OrderDetails (JSON)
```

- Stored past orders an an array of orders (JSON).

## Updating Pizza (new option selected)

- Got selected options using JQuery.
- let pizza = {name, quantity, size, crust, sauce, cheese, toppingsMeatList, toppingsNonMeatsList};
- Return the pizza object

# Order.js

## Startup function: [$(document).ready(function(){](https://github.com/greghab/PizzaParlor/blob/f80ab692a079e33870c45a23a38bb39983eac08a/web/scripts/order.js#L163)

- Gets edit pizza from session storage (if they came from cart and clicked edit on a pizza, it will be stored here)
- gets editIndex (which pizza in list of pizzas in order, that the edited pizza is from)
- checks edit index
  - if we have a edited pizza queued up), then run loadEditedPizza() to load that given pizza up
    - If they edit pizza, and click "updatePizza", we run updatePizza() to get the updated edited pizza that they created, and then set currentOrders[editIndex] to update it in our current order.
  - Else, hide "updatePizza" button, and load a default pizza order.

## Registration

### FrontEnd:

-

### BackEnd (POST API):

- Validates inputs.
- Insert new user via SQL.
  - If email already exists (PK), then return error.
- Login (GET api):
  - If user not found, return 404.
  -

## Login

### FrontEnd:

- Sends in Email and Pass Header: 'Authorization': 'Basic ' + encoded
  - `let encoded = window.btoa(email + ':' + pass)`
  - If successful, store user in `loggedInUserObject` session storage, show "Login Successfull" pop up
  - Else, "Login unsuccessful popup"

### BackEnd (GET API):
