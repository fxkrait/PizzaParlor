DROP TABLE IF EXISTS FavOrders CASCADE;
CREATE TABLE FavOrders (FavOrderID SERIAL PRIMARY KEY,
                        MemberID INT,
                        OrderDetails VARCHAR(255) NOT NULL,
                        FOREIGN KEY(MemberID) REFERENCES Members(MemberID)
);
