const zlib = require("zlib");
const fs = require("fs");

const src = fs.createReadStream("./bigFile.txt");
const dest = fs.createWriteStream("./compressed");

src.pipe(zlib.createGzip()).pipe(dest);
