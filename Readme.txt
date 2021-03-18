Assignment 2 Readme

1. Your webserver/service source code folder zipped up. 
   1. PLEASE leave out node_modules folder. Before you zip, just delete it.
   2. To get it back later, run    npm i  

2. Readme.txt file – Spell check and grammar check the file! 
   1. Name all students who this submission is for

      Gregory Hablutzel, Patrick Lauer

   2. Write about what you have or haven’t implemented.

      We have implemented every functionality.
      

     1. If you implemented an extra feature, make a note of it here

         - HTML Endpoints so that user can interact with POST/GET/DELETE past orders
            ./web/r/addOrder.html
            ./web/r/deleteOrders.html
            ./web/r/displayOrders.html
            ./web/r/loadOrder.html
         - Added DELETE previous order endpoint, as well as a POST JSON String order endpoint.
         - Unit Tested DELETE endpoint, and a POST JSON String endpoint.
         - "No Freezing principle": Have non-blocking pop-ups to user indicating what the status of requests are.

      Implement delete of pizzas via route.

   3. Add a link to your Github repository - add cfb3 as a collaborator

    https://github.com/greghab/PizzaParlor

   4. Add a link to the home page of your website 
        https://the-aroma-of-tacoma.herokuapp.com/