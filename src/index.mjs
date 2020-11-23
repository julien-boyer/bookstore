import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';
import Products from './Products.mjs';

const rl = readline.createInterface({input: process.stdin, output: process.stdout, terminal: false});

const productsPath = path.join(path.dirname(fileURLToPath(import.meta.url)),'products.json');

new Products(productsPath, (err, products) => {
	if(err) return console.error(err);
	products.getAllProducts();
	
	rl.on('line', function(line){
		console.log('I want product', line);
		products.orderProductById(line.toString());
	})
});
