const path = require("path");
const fs = require("fs");

const requireDir = function(dir){
	dir = path.resolve(dir);
	const result = {};
	const files = fs.readdirSync(dir);
	for(let i = 0; i < files.length; i += 1){
		const file = files[i];
		result[file] = require(dir + "/" + file);
	}
	return result;
}
module.exports = requireDir;
