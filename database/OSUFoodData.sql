INSERT INTO Restaurant(restaurant_Name, phone, is_Open) VALUES 
('Luigi’s Pizza', 5551234, 1),
('Sushi Samurai', 5552234, 0),
('Burger Bomb', 5553234, 1),
('Curry Castle', 5554234, 1),
('Taco Tempest', 5555234, 0),
('Pho Paradise', 5556234, 1),
('Steak Street', 5557234, 1),
('Vegan Valley', 5558234, 1),
('Waffle World', 5559234, 1),
('Dim Sum Delights', 5560234, 1);


--- AI TRASH DO NOT SHIP

-- Luigi’s Pizza
INSERT INTO Review(restaurant_Id, rating, reviewer, comments, is_Verified) VALUES 
((SELECT restaurant_Id FROM Restaurant WHERE restaurant_Name = 'Luigi’s Pizza'), 5, 'Mario', 'Mamma mia, it’s good!', 1),
((SELECT restaurant_Id FROM Restaurant WHERE restaurant_Name = 'Luigi’s Pizza'), 4, 'Luigi', 'Pretty decent pizza.', 1),
((SELECT restaurant_Id FROM Restaurant WHERE restaurant_Name = 'Luigi’s Pizza'), 3, 'Peach', 'Not bad.', 1);

-- Sushi Samurai
INSERT INTO Review(restaurant_Id, rating, reviewer, comments, is_Verified) VALUES 
((SELECT restaurant_Id FROM Restaurant WHERE restaurant_Name = 'Sushi Samurai'), 4, 'Kenji', 'Great rolls!', 1),
((SELECT restaurant_Id FROM Restaurant WHERE restaurant_Name = 'Sushi Samurai'), 2, 'Yuki', 'Too salty.', 1);

-- Burger Bomb
INSERT INTO Review(restaurant_Id, rating, reviewer, comments, is_Verified) VALUES 
((SELECT restaurant_Id FROM Restaurant WHERE restaurant_Name = 'Burger Bomb'), 5, 'Tom', 'Explosive flavor!', 1),
((SELECT restaurant_Id FROM Restaurant WHERE restaurant_Name = 'Burger Bomb'), 4, 'Jerry', 'Juicy burgers!', 1),
((SELECT restaurant_Id FROM Restaurant WHERE restaurant_Name = 'Burger Bomb'), 1, 'Spike', 'Too greasy.', 1);

-- Curry Castle
INSERT INTO Review(restaurant_Id, rating, reviewer, comments, is_Verified) VALUES 
((SELECT restaurant_Id FROM Restaurant WHERE restaurant_Name = 'Curry Castle'), 3, 'Anya', 'Decent spice.', 1),
((SELECT restaurant_Id FROM Restaurant WHERE restaurant_Name = 'Curry Castle'), 5, 'Dev', 'Authentic taste!', 1),
((SELECT restaurant_Id FROM Restaurant WHERE restaurant_Name = 'Curry Castle'), 4, 'Ravi', 'Loved it.', 1);

-- Taco Tempest
INSERT INTO Review(restaurant_Id, rating, reviewer, comments, is_Verified) VALUES 
((SELECT restaurant_Id FROM Restaurant WHERE restaurant_Name = 'Taco Tempest'), 2, 'Miguel', 'Messy tacos.', 1),
((SELECT restaurant_Id FROM Restaurant WHERE restaurant_Name = 'Taco Tempest'), 3, 'Sofia', 'Not spicy enough.', 1);

-- Pho Paradise
INSERT INTO Review(restaurant_Id, rating, reviewer, comments, is_Verified) VALUES 
((SELECT restaurant_Id FROM Restaurant WHERE restaurant_Name = 'Pho Paradise'), 5, 'Linh', 'Perfect broth.', 1),
((SELECT restaurant_Id FROM Restaurant WHERE restaurant_Name = 'Pho Paradise'), 4, 'Huy', 'Comfort food.', 1);

-- Steak Street
INSERT INTO Review(restaurant_Id, rating, reviewer, comments, is_Verified) VALUES 
((SELECT restaurant_Id FROM Restaurant WHERE restaurant_Name = 'Steak Street'), 4, 'John', 'Nice cut.', 1),
((SELECT restaurant_Id FROM Restaurant WHERE restaurant_Name = 'Steak Street'), 3, 'Alice', 'Could be juicier.', 1);

-- Vegan Valley
INSERT INTO Review(restaurant_Id, rating, reviewer, comments, is_Verified) VALUES 
((SELECT restaurant_Id FROM Restaurant WHERE restaurant_Name = 'Vegan Valley'), 5, 'Emma', 'Tastes better than meat!', 1),
((SELECT restaurant_Id FROM Restaurant WHERE restaurant_Name = 'Vegan Valley'), 4, 'Noah', 'Surprisingly good.', 1);

-- Waffle World
INSERT INTO Review(restaurant_Id, rating, reviewer, comments, is_Verified) VALUES 
((SELECT restaurant_Id FROM Restaurant WHERE restaurant_Name = 'Waffle World'), 5, 'Chloe', 'Heavenly waffles!', 1),
((SELECT restaurant_Id FROM Restaurant WHERE restaurant_Name = 'Waffle World'), 4, 'Liam', 'Maple madness!', 1);

-- Dim Sum Delights
INSERT INTO Review(restaurant_Id, rating, reviewer, comments, is_Verified) VALUES 
((SELECT restaurant_Id FROM Restaurant WHERE restaurant_Name = 'Dim Sum Delights'), 5, 'Chen', 'Best I’ve had.', 1),
((SELECT restaurant_Id FROM Restaurant WHERE restaurant_Name = 'Dim Sum Delights'), 3, 'Ming', 'Crowded but good.', 1);


SELECT * FROM Review;
