const inquirer = require('inquirer');
const mysql = require('mysql');

const myPass = require('./password.js');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: myPass.password,
    database: 'bamazon'
});

function start(){
    console.log('Please choose an item you would like to purchase:')
    displayItems();

    inquirer.prompt([
        {
            name: 'itemId',
            message: 'Please enter in the product ID of the item you would like to purchase.',
            type: 'input',
            validate: function(name){
                if(isNaN(name)){
                    return 'Please choose the product ID of the item you would like to purchase.';
                } else {
                    return true;
                }
            }
        },
        {
            name: 'amount',
            message: 'How many would you like to purchase?',
            type: 'input',
            validate: function(name){
                if(isNaN(name)){
                    return 'Please enter in a valid number.';
                } else {
                    return true;
                }
            }
        }
    ]).then(function(answer){
        fulfillOrder(answer.itemId, answer.amount);
    })
}


start();


//UTILS
function displayItems(){
    connection.query('SELECT * FROM products', function(err, res){
        if (err) throw err;

        res.forEach(item => {
            console.log(`
                ID: ${item.item_id}
                Product: ${item.product_name}
                Price: $${item.price}
                Department: ${item.department_name}
                //////////////////////////////////////////////////////////
            `)
        });
    })
}

function fulfillOrder(id, amount){
    let query = `UPDATE products SET stock_quantity = stock_quantity - ${amount} WHERE item_id = ${id} and stock_quantity > ${amount}`;
    connection.query(query, function(err, res){
        if (err) throw err;
        //Check to see if there is enough in supply
        if (res.changedRows === 0){
            console.log('Insufficient Supply.');
            start();
        } else {
            console.log('Congrats! Your order of has gone through.');
            start();
        }
    })
}