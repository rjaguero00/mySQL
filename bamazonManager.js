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
    database: "bamazonDBB"
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
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "Enter the item_id of product you would like to restock."
        }, {
            name: "stock",
            type: "input",
            message: "How many units would you like to add?"
        }
    ]).then(function (answers) {

        connection.query("SELECT stock_quantity FROM products WHERE item_id = ?",
            [
                answers.id
            ],
            function (err, res) {
                if (err) throw err;
                console.log(res[0].stock_quantity)
                connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?",
                    [
                        parseInt(answers.stock) + res[0].stock_quantity,
                        answers.id
                    ],
                    function (err) {
                        if (err) throw err;
                        // console.log("Your product was successfully added!")
                        queryAllProducts();
                        // managerView();
                    }
                )
            }

        );



        // connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?",
        //     [
        //         answers.stock,
        //         answers.id
        //     ],
        //     function (err) {
        //         if (err) throw err;
        //         // console.log("Your product was successfully added!")
        //         queryAllProducts();
        //         managerView();
        //     }
        // )
    });
}

function viewLowInv() {
    connection.query("SELECT * FROM products WHERE stock_quantity <= 3", function (err, res) {
        if (err) throw err;
        console.log("These are the products currently low in inventory")

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
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Enter the product name"
        }, {
            name: "dept",
            type: "input",
            message: "What department does this product belong to?"
        }, {
            name: "price",
            type: "input",
            message: "What is the price of this product?"
        }, {
            name: "stock",
            type: "input",
            message: "How many units are we add??"
        }
    ]).then(function (answers) {
        connection.query("INSERT INTO products SET ?",
            {
                product_name: answers.name,
                dept_name: answers.dept,
                price: answers.price,
                stock_quantity: answers.stock
            },
            function (err) {
                if (err) throw err;
                console.log("Your product was successfully added!")
                queryAllProducts();
            }
        )
    });
}