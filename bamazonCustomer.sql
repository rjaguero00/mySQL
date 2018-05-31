DROP DATABASE IF EXISTS bamazonDBB;

CREATE DATABASE bamazonDBB;

USE bamazonDBB;

CREATE TABLE departments(
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(45) NULL,
    over_hc INT NULL,
    PRIMARY KEY(department_id)
);


CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(45) NULL,
    dept_name VARCHAR(45) NULL,
    price FLOAT (10, 2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ('Hayabusa T3 Boxing Gloves', 'Sports & Fitness', 119.99, 23);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ('Bose Soundlink Headphones', 'Electronics', 229.00, 5);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ('PlayStation 4 Pro 1TB Console', 'Electronics', 389.99, 17);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ('Fry Cry 5', 'Video Games', 56.99, 12);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ('Titleist Pro V1 Gold Balls', 'Sports & Outdoors', 47.99, 4);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ('BenQ 27-Inch Gaming Monitor', 'Electronics', 229.99, 8);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ('Eloquent JavaScript: A Modern Introduction to Programming', 'Books', 31.96, 23);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ('UFC 3', 'Video Games', 59.99, 45);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ('Sauder Beginnings Computer Desk', 'Furniture', 57.99, 2);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ('Canon Fisheye Lens', 'Electronics', 599.95, 11);