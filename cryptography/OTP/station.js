const fs = require("fs");

const key = fs.readFileSync("./key.js");

function decrypt(cipherText) {
  const plaintext = Buffer.alloc(cipherText.length);

  for (let i = 0; i < plaintext.length; i++) {
    plaintext[i] = cipherText[i] ^ key[i];
    key[i] = 0;
  }

  return plaintext;
}

const cipherText = Buffer.from(
  "d4c653bacd25f19854611024612f196c2a218c3d199ab10d73a43cfd4813793364f5336bc88876",
  "hex",
);
const plaintext = decrypt(cipherText);
console.log(plaintext.toString("utf8"));
