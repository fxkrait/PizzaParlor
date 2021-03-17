DROP TABLE IF EXISTS FavoriteOrders CASCADE;
CREATE TABLE FavoriteOrders (OrderID SERIAL PRIMARY KEY,
                        MemberID INT,
                        OrderDetails VARCHAR(65535) NOT NULL,
                        FOREIGN KEY(MemberID) REFERENCES Members(MemberID)
);
