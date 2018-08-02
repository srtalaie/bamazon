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
    console.log('Welcome Manager!');
    inquirer.prompt([
        {
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: ['View Products for Sale', 'See Which Products are Low on Inventory', 'Add Inventory to a Product', 'Add a New Product'],
            name: 'choice'
        }
    ]).then(function(answer){
        switch(answer.choice){
            case 'View Products for Sale':
                viewProductsForSale();
                break;
            case 'See Which Products are Low on Inventory':
                lowInventory();
                break;
            case 'Add Inventory to a Product':
                addToInventory();
                break;
            case 'Add a New Product':
                addNewProduct();
                break;
            default:
                console.log('Please make a choice.');
        }
    })
}

start();

//UTILS
function viewProductsForSale(){
    connection.query('SELECT * FROM products', function(err, res){
        if (err) throw err;

        res.forEach(item => {
            console.log(`
                ID: ${item.item_id}
                Product: ${item.product_name}
                Price: $${item.price}
                Stock: ${item.stock_quantity}
                Department: ${item.department_name}
                //////////////////////////////////////////////////////////
            `)
        });
    })
}

function lowInventory(){
    connection.query('SELECT * FROM products WHERE stock_quantity < 5', function(err, res){
        if (err) throw err;
        res.forEach(item => {
            console.log(`
                ID: ${item.item_id}
                Product: ${item.product_name}
                Stock: ${item.stock_quantity}
                Department: ${item.department_name}
                //////////////////////////////////////////////////////////
            `)
        });
    })
}

function addToInventory(){
    viewProductsForSale()
    inquirer.prompt([
        {
            name: 'itemId',
            message: 'Which Product would you like to add inventory to?(Choose by item ID.)',
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
            message: 'How much inventory would you like to add to the stock?',
            type: 'input',
            validate: function(name){
                if(isNaN(name) || name < 0){
                    return 'Please choose the product ID of the item you would like to purchase.';
                } else {
                    return true;
                }
            }
        }
    ]).then(function(answer){
        let query = `UPDATE products SET stock_quantity = stock_quantity + ${answer.amount} WHERE item_id = ${answer.itemId}`;
        connection.query(query, function(err, res){
            if (err) throw err;
            console.log(`Congrats you resupplied the inventory.`);
        })
    })
}

function addNewProduct(){
    inquirer.prompt([
        {
            type: 'input',
            message: 'Please enter in the name of the item.',
            name: 'item'
        },
        {
            type: 'input',
            message: 'Please enter in the department name for the item.',
            name: 'department'
        },
        {
            type: 'input',
            message: 'Please set the price for the individual item (00.00 format).',
            name: 'price'
        },
        {
            type: 'input',
            message: 'Please enter in the amount of the stock we have for this item.',
            name: 'stock',
            validate: function(name){
                if(isNaN(name) || name < 0){
                    return 'Please choose the product ID of the item you would like to purchase.';
                } else {
                    return true;
                }
            }
        }
    ]).then(function(answer){
        let query = `INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES('${answer.item}', '${answer.department}', ${answer.price}, ${answer.stock})`;
        connection.query(query, function(err, res){
            if (err) throw err;
            console.log('Congrats new item successfully added.')
        })
    })
}