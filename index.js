const path = require("path");
const fs = require("fs");

const requireDir = function(dir){
	dir = path.resolve(dir);
	const result = {};
	const files = fs.readdirSync(dir);
	for(let i = 0; i < files.length; i += 1){
		const file = files[i];
		let fileWithoutExtension;
		// Just don't make any folder names end with .js or .json, ok?
		if(file.endsWith(".js")){
			fileWithoutExtension = file.substring(0, file.length - 3);
		}else if(file.endsWith(".json")){
			fileWithoutExtension = file.substring(0, file.length - 5);
		}
		result[fileWithoutExtension] = require(dir + "/" + file);
	}
	return result;
}
module.exports = requireDir;
