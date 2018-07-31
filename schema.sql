DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

CREATE TABLE IF NOT EXISTS products(
	item_id INT(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT(10),
    PRIMARY KEY (item_id)
);