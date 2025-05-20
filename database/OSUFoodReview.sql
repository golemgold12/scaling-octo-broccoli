

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

  CREATE OR REPLACE TABLE Restaurant(
    restaurant_Id int(11) NOT NULL UNIQUE AUTO_INCREMENT,
    restaurant_Name varchar(64) NOT NULL,
    phone varchar(16),
    foodType varchar(32),
    openHour int NOT NULL check(openHour >=1 and openHour <=24),
    closeHour int NOT NULL check(closeHour >= openHour),
    is_Open boolean,
    PRIMARY KEY(restaurant_Id) -- HMMM
  );

  CREATE OR REPLACE TABLE Review(
    review_Id int(11) NOT NULL AUTO_INCREMENT,
    restaurant_Id int(11),
    user_ID int(11),
    rating int NOT NULL check(rating >=1 and rating <=10),
    reviewer varchar(64) NOT NULL,
    comments varchar(2048) NOT NULL,
    is_Verified boolean,
    PRIMARY KEY(review_Id),
    FOREIGN KEY(restaurant_Id) REFERENCES Restaurant(restaurant_Id) ON DELETE CASCADE,
    FOREIGN KEY(user_ID) REFERENCES Users(user_ID) ON DELETE CASCADE
  );

  CREATE OR REPLACE TABLE Users (
    user_ID INT AUTO_INCREMENT PRIMARY KEY,
    username varchar(64) NOT NULL UNIQUE,
    passHash varchar(255) NOT NULL UNIQUE,
    date_of_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );