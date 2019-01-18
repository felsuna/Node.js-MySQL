const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log(`Connected with ID: ${connection.threadId}`);
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);

        inquirer.prompt([
            {
                type: "number",
                name: "question1",
                message: "What is the ID of the product would you like to buy?"
            },
            {
                type: "number",
                name: "question2",
                message: "How many units of the product would you like to buy?"
            }
        ]).then(function (answers) {
            console.log(answers);
            connection.query(`SELECT * FROM products WHERE item_id = ${answers.question1}`, function (err, res) {
                if (err) throw err;
console.log(answers.question1)
                if (res[0].stock_quantity >= answers.question2) {
                    var newQuantity = res[0].stock_quantity - answers.question2;
                    var total = answers.question2 * res[0].price;

                    connection.query(`UPDATE products SET stock_quantity = ${newQuantity} WHERE item_id= ${answers.question1}`, function (err, res) {
                        if (err) throw err;
                        console.log(`Congrats your order is complete, your total cost is $${total}${"\n"} You ordered: ${"\n"} ${answers.question2}`);
                        connection.end();
                    })
                } else {
                    console.log("We don't have enough in stock!")
                    connection.end();
                }
            })
        })
    });
}
