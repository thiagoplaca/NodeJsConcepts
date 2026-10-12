const fs = require("fs");

const key = fs.readFileSync("./key.js");

function encrypt(plaintext) {
  const cipherText = Buffer.alloc(plaintext.length);

  for (let i = 0; i < plaintext.length; i++) {
    cipherText[i] = plaintext[i] ^ key[i];
    key[i] = 0;
  }

  return cipherText;
}

const msg1 = Buffer.from("Commander Hendrick: Stand by to launch.");
const msg1Encrypted = encrypt(msg1);
console.log(msg1Encrypted);
