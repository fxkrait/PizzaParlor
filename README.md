# Assigment 2 Portion of Readme:

This features server side order storage, and user storage.
login and registration is checked client side, before being sent to server side.
in the /r directory is the files that are priviledege (add/remove/delete order).




# Created for TCSS460 UWT Wi '20 Assignment 1

https://the-aroma-of-tacoma.herokuapp.com/

# Description of Files in this package

- `package.json` and `package-lock.json`
  - These files are used to describe dependencies for the project. There are several packages we use for connecting to databases, connecting to our Mail client, etc.
  - Highly recommended reading: https://docs.npmjs.com/files/package.json
- `Procfile`
  - This is used by Heroku on deployment. It defines what command should be run to start the server.
  - Recommended reading: https://devcenter.heroku.com/articles/procfile
  - **NOTE** If you change the name of the .js file from index.js, you will need to update the Procfile accordingly.
- `.gitignore`
  - This file stops certain files from being commited in git, when you run `git add .`. For example, I'm using the vscode text editor, and it has a few files in the .vscode directory that aren't related to the code and therefore shouldn't be committed.
  - Please avoid committing the `node_modules/` folder that will be created when you run `npm i`. Its a mess of a directory and contains a lot of stuff that's required for node.js to run, but really shouldn't be committed alongside the code

---

# Notes:

Price is 12 dollars, unlimited toppings.

## Size:

- Small 10"
- Medium 12" (+2)
- Large 14" (+2)
- X-Large" (+2)

## Crust:

- Thin
- Thick
- Deep Dish (+2.95)

## Sauce: (Can select none)

- None (check box)
- Robust Inspired Tomato Sauce
- Hearty Marinara Sauce
- Honey BBQ Sauce
- Garlic Parmesan Sauce
- Alfredo Sauce
- Ranch

## Cheese: (can select none)

- None (have a checkbox)
- Light
- Normal
- Extra
- Double

## Toppings:

### Meats: (can select none)

- Ham
- Beef
- Salami
- Pepperoni
- Italian Sausage
- Premium Chicken
- Bacon
- Philly Steak

## Non-Meats: (can select none)

- Hot Buffalo Sauce
- Garlic
- Jalapeno Peppers
- Onions
- Banana Peppers
- Diced Tomatoes
- Black Olives
- Mushrooms
- Pineapple
- Shredded Provolone Cheese
- Cheddar Cheese
- Green Peppers
- Spinach
- Roasted Red Peppers
- Feta Cheese
- Shredded Parmesan Asiago
