const MongoProductDao = require('./productos/productDaoMongo.js');
const MongoCartDao = require('./carritos/cartDaoMongo.js')
const FsProductDao = require('./productos/productDaoArchivos.js');
const FsCartDao = require('./carritos/cartDaoArchivos.js')

// Change persistence by switching the value of this variable between the strings 'fs' and 'mongo' 
const dbToUse = 'mongo';

let productDao;
let cartDao;


switch (dbToUse) {
	case 'mongo':
		productDao = new MongoProductDao();
		cartDao = new MongoCartDao();
		break;
	case 'fs':
		productDao = new FsProductDao();
		cartDao = new FsCartDao();
		break;
	default:
		break;
}

module.exports = { productDao, cartDao, dbToUse };