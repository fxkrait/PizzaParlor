DROP TABLE IF EXISTS PizzaOrders CASCADE;
CREATE TABLE PizzaOrders (OrderID SERIAL PRIMARY KEY,
                        MemberID INT,
                        OrderDetails VARCHAR(65535) NOT NULL,
                        FOREIGN KEY(MemberID) REFERENCES Members(MemberID)
);
