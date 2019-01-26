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
    console.log(`Connected with ID: ${connection.threadId}${"\n"}`);
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log(`Item ID: ${res[i].item_id}${"\n"}Product name: ${res[i].product_name}${"\n"}Department name: ${res[i].department_name}${"\n"}Price: ${res[i].price}${"\n"}Stock quantity: ${res[i].stock_quantity}${"\n"}`)
        }

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
                    const newQuantity = res[0].stock_quantity - answers.question2;
                    const total = answers.question2 * res[0].price;
                    const productName = res[0].product_name;
                    connection.query(`UPDATE products SET stock_quantity = ${newQuantity} WHERE item_id = ${answers.question1}`, function (err, res) {
                        if (err) throw err;
                        console.log(`${"\n"}Congrats your order is complete, your total cost is $${total.toFixed(2)}${"\n"} You ordered: ${"\n"} ${answers.question2} ${productName}s`);
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
