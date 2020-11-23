let fs = require('fs');
let path = require('path');
var readline = require('readline');
let Products = require('./Products.js')

var rl = readline.createInterface({input: process.stdin, output: process.stdout, terminal: false});

new Products(path.join(__dirname,'products.json'), (err, products) => {
	if(err) return console.error(err);
	products.getAllProducts();
	
	rl.on('line', function(line){
		console.log('I want product', line);
		products.orderProductById(line.toString());
	})
});
