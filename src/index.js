let fs = require('fs');

fs.readFile(`${__dirname}/products.json`, 'utf8', (err, file) => {
	var products = JSON.parse(file);
	console.log(products);
});