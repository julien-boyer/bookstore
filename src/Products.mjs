import fs from 'fs';

export default class Products {

	constructor(path, callback){
		this.path = path;
		this.list = null;
		this.read(callback);
	}

	getAllProducts(callback){
		if(!callback) callback = ()=>{};
		this.read((err)=>{
			if(err) return callback(err);
			console.log('Bienvenue. Voici les produits disponibles:');
			this.list.forEach(product => {
				console.log(`${product.id} - ${product.name} / ${product.EUR_price} / ${product.orders_counter}`);
			});
			if(callback) callback(null, this.list);
		});
	}
	
	orderProductById(id, callback){
		if(!callback) callback = ()=>{};
		this.read((err)=>{
			if(err) return callback(err);
			let product = this.list.find(p => p.id == id);
			product.orders_counter ++;
			console.log('Commande terminée. Voici votre fichier: '+product.file_link);
			this.write(callback);
		})
	}

	read(callback){
		fs.readFile(this.path, 'utf8', (err, file) => {
			if(err) {
				return callback(err);
			}
			try {
				this.list = JSON.parse(file);
				callback(null, this);
			} catch(e) {
				console.error(e);
				callback(e);
			}
		});
	}

	write(callback){
		let str = JSON.stringify(this.list, null, 2);
		fs.writeFile(this.path, str, (err) => {
			callback(err);
		});
	}
}