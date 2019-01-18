DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
    item_id INT(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price FLOAT(5 , 2 ) NOT NULL,
    stock_quantity INT(11) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("chocolate macaron", "dessert", 3.50, 50), ("vanilla macaron", "dessert", 3.50, 60), ("strawberry macaron", "dessert", 3.50, 75),
("salted caramel macaron", "dessert", 2.50, 100), ("green tea", "tea", 2.50, 100), ("jasmine tea", "tea", 2.50, 120), ("oolong tea", "tea", 2.50, 90), 
("light Roast", "coffee", 3.95, 70), ("medium roast", "coffee", 3.95, 80), ("dark roast", "coffee", 3.95, 110);
