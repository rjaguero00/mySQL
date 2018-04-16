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
    queryAllProducts();
});


function managerView() {
    //inquire for input
    inquirer.prompt([
        {
            name: "action",
            type: "list",
            message: "Which option would you like to manage?",
            choices: ["Add New Product", "Restock Inventory", "View Low Inventory", "Exit"]
        }
    ]).then(function (answer) {
        switch (answer.action) {
            case "Add New Product":
                addProductToInv();
                break;
            case "Restock Inventory":
                restockInv();
                break;
            case "View Low Inventory":
                viewLowInv();
                break;
            case "Exit":
                console.log("Exiting Program.")
                connection.end();
                break;
        }
    })
}


function queryAllProducts() {
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
        managerView();
    });
}

function restockInv() {

}

function viewLowInv() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 3", function (err, res) {
        if (err) throw err;

        var table = new Table({
            head: ["item_id", "product_name", "dept_name", "price", "stock_quantity"],
            colWidths: [10, 35, 25, 10, 25]
        });
        for (var i = 0; i < res.length; i++) {

            table.push([res[i].item_id, res[i].product_name, res[i].dept_name, res[i].price, res[i].stock_quantity]);
        }
        console.log(table.toString());
        managerView();
    });
}


function addProductToInv() {

}