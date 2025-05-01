 INSERT INTO Restaurant(restaurant_Name, phone, is_Open) VALUES ('The Drunken Clam', 213213, 1);
INSERT INTO Review(restaurant_Id, rating, reviewer, comments, is_Verified) VALUES ((SELECT restaurant_Id FROM Restaurant WHERE restaurant_Name = 'The Drunken Clam'), 
    4, 'Ethan', 'I liked it kinda', 1);

select * from Restaurant;
select * from Review;