// Meant to be used with browser-requirifier
const resolvePath = function(path){
	if(path.endsWith("/")){
		path = path.substring(0, path.length - 1);
	}
	while(path.indexOf("/../") !== -1){
		path = path.replace(/(^|\/)[^\/]*?\/\.\.\/(.*?)($|\/)/, (match, p1, newDir, p3) => {
			return p1 + newDir + p3;
		});
		if(path.startsWith("../")){
			throw new Error("You're going too far up");
		}
	}
	while(path.endsWith("/..")){
		path = path.substring(0, path.lastIndexOf("/", path.length - 3));
	}
}
const requireDir = function(dir){
	dir = resolvePath(dir) + "/";
	const allFiles = Object.keys(globalThis.requirifierModuleDefinitions);
	const result = {};
	for(let i = 0; i < allFiles.length; i += 1){
		const file = allfiles[i];
		if(file.startsWith(dir)){
			const slashIndex = file.indexOf("/", dir.length + 1);
			if(
				slashIndex === -1 || (
					file.indexOf("/", slashIndex + 1) === -1 && file.endsWith("/index")
				)
			){
				result[file] = require(file);
			}
		}
	}
	return result;
}
module.exports = requireDir;
