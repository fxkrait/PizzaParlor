DROP TABLE IF EXISTS FavoriteOrders CASCADE;
CREATE TABLE FavOrders (FavOrderID SERIAL PRIMARY KEY,
                        MemberID INT,
                        OrderDetails VARCHAR(65535) NOT NULL,
                        FOREIGN KEY(MemberID) REFERENCES Members(MemberID)
);
