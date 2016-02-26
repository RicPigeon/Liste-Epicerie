var config = require('../../config');

var secretKey = config.secretKey;


module.exports = function(app, express){

	var api = express.Router();

	api.route('/')
		.post(function(req, res){

		});



	return api;
}