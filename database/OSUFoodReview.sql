

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

  CREATE OR REPLACE TABLE Restaurant(
    restaurant_Id int(11) NOT NULL UNIQUE AUTO_INCREMENT,
    restaurant_Name varchar(64) NOT NULL,
    phone varchar(16),
    is_Open boolean,
    PRIMARY KEY(restaurant_Id) -- HMMM
  );

  CREATE OR REPLACE TABLE Review(
    review_Id int(11) NOT NULL AUTO_INCREMENT,
    restaurant_Id int(11),
    rating int NOT NULL check(rating >=1 and rating <=5),
    reviewer varchar(64) NOT NULL,
    comments varchar(2048) NOT NULL,
    is_Verified boolean,
    PRIMARY KEY(review_Id),
    FOREIGN KEY(restaurant_Id) REFERENCES Restaurant(restaurant_Id) ON DELETE CASCADE
  );

   