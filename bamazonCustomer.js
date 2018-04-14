var inquirer = require('inquirer');
var mysql = require("mysql");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
    // connection.end();
});


function start() {
    inquirer
        .prompt({
            name: "buyornot",
            type: "list",
            message: "Welcome to bamazon! Would you like to shop around?",
            choices: ["YES", "NO"]
        })
        .then(function (answer) {
            // based on their answer, either call the buy function or display message
            if (answer.buyornot.toUpperCase() === "YES") {
                queryAllProducts(buyProduct);
            }
            else {
                console.log("Thank you for shopping with us. Please return soon!");
                connection.end();
            }
        });
}


function buyProduct(callback) {
    // prompt for info about the item being put up for auction
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "Please enter the item_id of the product you would like to buy."
            },
            {
                name: "units",
                type: "input",
                message: "How many units would you like to buy?"
            },
        ]).then(function (answers) {
            var idInput = answers.id;
            var quantityPurchased = answers.units;
            callback(idInput, quantityPurchased);
        });
}

function databasePurchase(item_id, unitsNeeded) {
    connection.query('SELECT * FROM products WHERE item_id = ' + item_id, function (err, response) {
        if (err) { console.log(err) };
        //check if we have product in stock
        if (unitsNeeded <= response[0].stock_quantity) {
            // calculate cost
            var totalCost = response[0].price * unitsNeeded;
            var newStock = response[0].stock_quantity - unitsNeeded;
            //let user know we have enought units to complete order
            console.log("We have enought units to fulfill your order!");
            console.log("Total: " + unitsNeeded + " " + response[0].product_name + " $" + totalCost + " Thank you!");

            connection.query('UPDATE products SET stock_quantity = ' + newStock + ' WHERE item_id = ' + item_id, function (err, response) {
                if (err) throw err;
                start();
            });
        } else {
            console.log("Sorry we don't have enough " + response[0].product_name + " to fulfill this order.");
            start();
        }
    })
}


function queryAllProducts(callback) {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        var table = new Table({
            head: ["item_id", "product_name", "dept_name", "price", "stock_quantity"],
            colWidths: [10, 35, 25, 10, 25]
        });
        for (var i = 0; i < res.length; i++) {

            table.push([res[i].item_id, res[i].product_name, res[i].dept_name, res[i].price, res[i].stock_quantity]);
        }
        console.log(table.toString());
        callback(databasePurchase);
    });
}