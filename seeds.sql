DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE IF NOT EXISTS products(
	item_id INT(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT(10),
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('Baseball', 'Sports & Outdoors', 1.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('Toothpaste', 'Bed & Bath', 4.39, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('Flatscreen TV', 'Electronics', 1200.89, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('Bowl', 'Kitchenware', 15.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('Towels(2)', 'Bed & Bath', 25.89, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('Speakers', 'Electronics', 100.00, 36);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('Hiking Boots', 'Sports & Outdoors', 130.00, 80);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('Pen & Pencil Set', 'Office', 13.50, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('Picture Frame', 'Home Essentials', 20.00, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Chef's Knife", 'Kitchenware', 89.00, 10);