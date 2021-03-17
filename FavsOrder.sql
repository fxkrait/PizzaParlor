DROP TABLE IF EXISTS FavOrders CASCADE;
CREATE TABLE FavOrders (FavOrderID SERIAL PRIMARY KEY,
                        MemberID INT,
                        OrderName VARCHAR(255) NOT NULL,
                        OrderDetails VARCHAR(255) NOT NULL,
                        FOREIGN KEY(MemberID) REFERENCES Members(MemberID)
);


INSERT INTO 
    FavOrders(FavOrderID, MemberID, OrderName, NameOrderDetails)
VALUES
    ('0', '0', 'Big Pizza', 'xlarge deep ranch normal T T T T T T T T T T T T T T T T T T T T T T T')
